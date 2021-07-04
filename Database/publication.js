const mongoose = require("mongoose");

//publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


//publication Model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;