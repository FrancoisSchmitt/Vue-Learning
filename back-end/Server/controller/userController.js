const Userdb = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userCreate = (req, res) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new Userdb({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            user,
            message: "Utilisateur créer",
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.userLogin = (req, res, next) => {
    Userdb.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.findUsers = (req, res, next) => {
  Userdb.find()
    .then((AllUsers) => res.status(200).json(AllUsers))
    .catch((error) => res.status(400).json({ error }));
};

exports.findUserByID = (req, res, next) => {
  Userdb.findOne({ _id: req.params.id })
    .then((userId) => res.status(200).json(userId))
    .catch((error) => res.status(404).json({ error }));
};


exports.userProfile = (req, res, next) => {
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = Userdb.findOne({ _id: decodedJwtToken.userId })

        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'utilsateur invalide !' });
            }
            console.log(decodedJwtToken)
            res.status(200).json(user)
            console.log(user)
            return user.toObject()
        })
        .catch(error => res.status(404).json(error))

}