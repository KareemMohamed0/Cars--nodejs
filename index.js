const express = require('express');

const async_await = require('express-async-await')

const app = async_await(express());


const cors = require('cors');

const path = require('path');

const bodyparser = require('body-parser');


const port = process.env.PORT || 3000;

const passport = require('passport');


// /**
//  * هimport routes
//  */
// //delimiter for adding generated module
const country = require('./api/country/route');

const make = require('./api/make/route');

const car = require('./api/car/route');

const user = require('./api/user/route');


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));
app.use(passport.initialize());
require('./config/passport')(passport);


// /**
//  * main routes will defined here sub route api folder
//  */

app.use('/user', user);
// //delimiter for adding generated apis
app.use('/country', country);
app.use('/make', make);
app.use('/car', car);
// app.use('/comments', comments);
// app.use('/posts', posts);


app.listen(port, () => {
    console.log(`server work on port : ${port}`)
});


