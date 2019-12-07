const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'lab-mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
    {
        name: "tom cruise",
        occupation: "actor",
        catchPhrase: "osjfozjf",

    },

    {
        name: "kim kardashian",
        occupation: "unknown",
        catchPhrase: "a kurrrrr",

    }


]

Celebrity.create(celebrities, (err) => {
    if (err) { throw (err)}
    console.log(`Created ${celebrities.length} celebrities`);

    mongoose.connection.close();
});