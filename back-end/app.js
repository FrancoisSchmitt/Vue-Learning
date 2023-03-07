const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    next();
});

app.use(cors({
    origin: '*'
}));

app.use(express.json())
mongoose.connect('mongodb+srv://<user>:<password>@cluster0.seucnqg.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// app.use('/api/auth', userRoutes)
// app.use('', squadRoutes)
// app.use('', tournamentRoutes)


module.exports = app;