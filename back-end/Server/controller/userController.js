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


exports.findUsers = (req, res, next) => {
    Userdb.find()
        .then(AllUsers => res.status(200).json(AllUsers))
        .catch(error => res.status(400).json({ error }));
}

exports.findUserByID = (req, res, next) => {
    Userdb.findOne({ _id: req.params.id })
        .then(userId => res.status(200).json(userId))
        .catch(error => res.status(404).json({ error }));
}

