const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);