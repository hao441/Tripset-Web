let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config();

//Express
let app = express();
const port = 9000;

//Mongoose connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Schema creation
let userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    homeCity: "object",
    trips: "object"
});

//Model creation
let User = mongoose.model('User', userSchema);

//Express Middleware
app.use(cors());
app.use(express.json());

//Listening Port
app.listen(port, () => {
    console.log(`Tripset is listening on port ${port}`);
});

//Test
app.get('/testAPI', (req, res) => {
    res.send('Hello World!');
});

app.get('/testSignUp', (req, res) => {
    res.send('Hello Sign Up!');
});

//Sign in
app.post('/signin', (req, res) => {

    User.find({email: req.body.email}, (err,data) => {
        if (err) return res.json({result: false, token: '', username: '', errorMessage: err})
        if (data[0] == null) return res.json({result: false, token: '', username: '', errorMessage: 'User doesn\'t exist.'});
        bcrypt.compare(req.body.password, data[0].password, (err,result) => {
            if (err) res.json({result: false, token: '', username: '', errorMessage: err})

            if (result) {
                console.log(`Password correct: ${result}`);

               let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})

               const expiryDate = new Date(Date.now() + 3600000);
               
                console.log(`expiry datetime: ${expiryDate}`)

               res.json({result: true, token: newToken, username: data, tokenExpiry: expiryDate, errorMessage: ''})
            } else {
                console.log(`Password incorrect: ${result}`);
                res.json({result: false, token: '', username: '', errorMessage: 'Incorrect password.'})
            }
        })

    });
});

//Sign up
app.post('/signup', (req, res) => {

    User.find({email: req.body.email}, (err,data) => {
        if (err) return res.json({result: false, token: '', username: '', errorMessage: err})

        if (data[0] != null) return res.json({result: false, token: '', username: '', errorMessage: 'A user account with that email address already exists.'})

        bcrypt.hash(req.body.password, 10, (err,hash) => {
            if (err) return res.json({result: false, token: '', username: '', errorMessage: err})

            if (hash) {
                let newUser = new User({
                    name: '',
                    email: req.body.email,
                    password: hash.toString()
                });
                
               newUser.save((err,user) => {
                if (err) return res.json({result: false, token: '', username: '', errorMessage: err});

                console.log(user)

                let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})
                const expiryDate = new Date(Date.now() + 3600000);
                
                res.json({result: true, token: newToken, username: user.email, tokenExpiry: expiryDate, errorMessage: ''})
               })

            } else {
                res.json({result: false, token: '', username: '', errorMessage: 'Failed to hash password.'})
            }
        })

    })
});

//verify user
app.post('/verifyuser', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return res.json({result: false, token: '', username: ''})

        result ? res.json({result: true, token: req.body.token, username: result}) : res.json({result: false, token: '', username: ''});
    })
});

//setUsercity
app.post('/usercity', (req, res) => {

        User.findOne({email: req.body.email}, (err,data) => {
            

            if (err) return res.json({result: false, errorMessage: err})
            

            if (data) {
                data['homeCity'] = {}
                data['homeCity']['city'] = req.body.city
                data['homeCity']['country'] = req.body.country
                data['homeCity']['lat'] = req.body.lat
                data['homeCity']['lng'] = req.body.lng

                data.save((err,user) => {
                    
                    if (err) return res.json({result: false, errorMessage: err})
                    
                    if (user !== null) {
                        console.log(`Updated user data is: ${user}`)
                        return res.json({result: true});
                    } else {
                        return res.json({result: false, errorMessage: "User returned null."})
                    }
                })
            } else {
                return res.json({result: false, errorMessage: 'User account doesn\'t exist.'})
            }
        })
})

//Find Trips
app.post('/findtrips', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return res.json({result: false, errorMessage: err})
        if (!result) return res.json({result: false, errorMessage: 'Invalid JWT.'})


        User.findOne({ email: result.email }, (err, data) => {

            if (err) return res.json({result: false, errorMessage: err})
            if (data === null) return res.json({result: false, errorMessage: 'User not found.'})
            if (!data.trips) return res.json({result: false, errorMessage: 'No trips found.'})

            res.json({result: true, message: 'Trips found', trips: data.trips});
        })
    })
})

//tripCreation
app.post('/tripcreation', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return console.log(err)

        if (!result) return res.json({result: false, message: 'Invalid JWT'});

        User.findOne({ email: result.email }, (err, data) => {
            //user error handling
            if (err) return console.log(err);
            if (data == null) return res.json({result: false, errorMessage: 'User not found.'})

            //data.trips creation if necessary
            if (data.trips == null) data.trips = {}

            //trip creation
            data.trips[req.body.tripName] = {location: req.body.location, startDate: req.body.startDate, endDate: req.body.endDate};

            //trip save
            data.save((err, data) => {
                if (err) return res.json({result: false, errorMessage: err})

                if (!data) return res.json({result: false, errorMessage: 'Unable to save.'}) 
                res.json({result: true, message: 'Trip created'});
                console.log('Document updated successfully');
            });

            
        })
    })
})
    