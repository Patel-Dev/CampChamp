const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async function() {
    await Campground.deleteMany({});

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const newCampground = new Campground({
            author: "640f34c4fa9a46ed4cd669f6",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, asperiores optio? Doloribus eaque cumque assumenda ducimus dolorum totam illo. Provident debitis sint adipisci magnam esse. Consectetur doloremque laboriosam aperiam deserunt?',
            price: Math.floor(Math.random() * 20) + 10,
            images: [
                {
                  url: 'https://res.cloudinary.com/ddmglabdy/image/upload/v1678763301/YelpCamp/f2fxsukmiuztcqtcmrdy.png',
                  filename: 'YelpCamp/f2fxsukmiuztcqtcmrdy',
                },
                {
                  url: 'https://res.cloudinary.com/ddmglabdy/image/upload/v1678763301/YelpCamp/lkzstk0ey7icdaazpehx.jpg',
                  filename: 'YelpCamp/lkzstk0ey7icdaazpehx',
                }
            ]
        })
        await newCampground.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})