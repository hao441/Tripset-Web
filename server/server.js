let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { ObjectID } = require('bson');
require('dotenv').config();

//Express
let app = express();
const port = 9000;

//Mongoose connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Schema creation
let userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    homeCity: "Object",
    trips: "Object"
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
    console.log('reached signin route')
    console.log(`req body email is: ${req.body.email}`)
    console.log(`req body password is: ${req.body.password}`)

    User.findOne({email: req.body.email}, (err,data) => {
        console.log('reached findOne')
        if (err) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: err})
        console.log('reached findOne 2')
        console.log(`data is: ${data}`) 
        if (!data) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: 'User doesn\'t exist.'});
        console.log('reached findOne 3')
        bcrypt.compare(req.body.password, data.password, (err,result) => {
            console.log('reached bcrypt compare')
            if (err) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: err})
            console.log('reached bcrypt compare 2')
            if (result) {
                console.log('reached bcrypt compare 3')
                console.log(`Password correct: ${result}`);

               let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})

               const expiryDate = new Date(Date.now() + 3600000);
               
                console.log(`expiry datetime: ${expiryDate}`)
                console.log(data.trips)

               return res.json({result: true, token: newToken, tokenExpiry: expiryDate,  username: data.email, name: data.name, trips: data.trips, homeCity: data.homeCity, message: ''})
            } else {
                console.log('reached bcrypt compare 4')
                console.log(`Password incorrect: ${result}`);
                return res.json({result: false, token: '', tokenExpiry: '', username: '', message: 'Incorrect password.'})
            }
        })

    });
});

//Sign up
app.post('/signup', (req, res) => {

    User.find({email: req.body.email}, (err,data) => {
        if (err) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: err})

        if (data[0] != null) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: 'A user account with that email address already exists.'})

        bcrypt.hash(req.body.password, 10, (err,hash) => {
            if (err) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: err})

            if (hash) {
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash.toString()
                });
                
               newUser.save((err,user) => {
                if (err) return res.json({result: false, token: '', tokenExpiry: '', username: '', message: err});

                console.log(user)

                let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})
                const expiryDate = new Date(Date.now() + 3600000);
                
                return res.json({result: true, token: newToken, tokenExpiry: expiryDate, username: user.email, name: req.body.name,  message: 'Success!'})
               })

            } else {
                return res.json({result: false, token: '', username: '', token: '', tokenExpiry: '', message: 'Failed to hash password.'})
            }
        })

    })
});

//verify user
app.post('/loaduser', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return res.json({result: false, username: '', homeCity: '', trips: '', message: "Error in token validation."})
        if (!result) return json({result: false, username: '', homeCity: '', trips: '', message: "Invalid token."})

        User.findOne({email: result.email}, (err,data) => {
            if (err) return res.json({result: false, username: '', homeCity: '', trips: '', message: "Erroring finding user."})
            if (!data) return res.json({result: false, username: '', homeCity: '', trips: '', message: "Invalid token."})

            const tripNames = !data.trips || data.trips === [] ? '' : Object.keys(data.trips)
            
            return res.json({result: true, name: data.name, username: data.email, name: data.name, homeCity: data.homeCity, trips: data.trips, tripNames: tripNames,  message: ""})
        })
    })
});

//setUsercity
app.post('/setcity', (req, res) => {

        User.findOne({email: req.body.email}, (err,data) => {
            

            if (err) return res.json({result: false, homeCity: '', message: err})
            

            if (data) {
                data['homeCity'] = {}
                data['homeCity']['city'] = req.body.city
                data['homeCity']['country'] = req.body.country
                data['homeCity']['lat'] = req.body.lat
                data['homeCity']['lng'] = req.body.lng

                data.save((err,user) => {
                    
                    if (err) return res.json({result: false, homeCity: '', message: err})
                    
                    if (user !== null) {
                        console.log(`Updated user data is: ${user}`)
                        return res.json({result: true, homeCity: {city: req.body.city, country: req.body.country, lat: req.body.lat, lng: req.body.lng}, message: 'Success!'});
                    } else {
                        return res.json({result: false, homeCity: '', message: "User returned null."})
                    }
                })
            } else {
                return res.json({result: false, homeCity: '', message: 'User account doesn\'t exist.'})
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

            return res.json({result: true, message: 'Trips found', trips: data.trips});
        })
    })
})

//tripCreation
app.post('/settrip', (req, res) => {
    console.log(req.body.trip, req.body.tripName, req.body.email)

    User.findOneAndUpdate({email : req.body.email },{$set: {[`trips.${req.body.tripName}`]: req.body.trip}},  {new: true}, (err,data) => {
        console.log("User findOneAndUpdate hit")
        if (err) return res.json({result: false, message: err})
        console.log("User error handling hit")
        console.log(data.trips)
        return res.json({result: true, trips: data.trips, message: 'Trip created'});
    
    });
})

app.post('/deletetrip', (req, res) => {

    console.log(req.body.email, req.body.tripName)

    User.findOneAndUpdate({email : req.body.email },{$unset: {[`trips.${req.body.tripName}`]: ''}},  {new: true}, (err,data) => {
        console.log("User findOneAndUpdate hit")

        if (err) return res.json({result: false, message: err})

        console.log("User error handling hit")
        console.log(data.trips)
        
        return res.json({result: true, trips: data.trips, message: 'Trip deleted'});

    });
})

//setItinerary
app.post('/setitinerary', (req, res) => {

    User.findOneAndUpdate({email : req.body.email },{$set: {[`trips.${req.body.tripName}.itinerary.${req.body.itineraryName}`]: req.body.itinerary}}, {new: true}, (err,data) => {

        console.log("User findOneAndUpdate hit")

        if (err) return res.json({result: false, message: err})

        console.log("User error handling hit")
        return res.json({result: true, trips: data.trips, message: 'Trip created'});

    });
})

app.post('/deleteitineraryitem', (req, res) => {
    console.log('started deleteitineraryitem')

    const trip = req.body.tripName.toString()
    const itinerary = req.body.itineraryName.toString()

    User.findOneAndUpdate({email : req.body.email },{$unset: {[`trips.${req.body.tripName}.itinerary.${req.body.itineraryName}`]: ''}}, {new: true}, (err,data) => {

        console.log('started deleteitineraryitem callback')
        if (err) return res.json({result: false, message: err})
        console.log('deleteitineraryitem error handling hit')
        
        console.log(data.trips)
        
        return res.json({result: true, trips: data.trips, message: 'Itinerary item deleted.'})

    });

    

})



//Find Itinerary
app.post('/finditinerary', (req, res) => {
    User.findOne({ email: req.body.username }, (err, data) => {
        //error handling
        if (err) return res.json({result: false, errorMessage: err})
        if (data === null) return res.json({result: false, message: 'User not found.'})
        if (data.trips[req.body.trip] == null) return res.json({result: false, message: 'Trip not found.', code: 1})

        if (Object.keys(data.trips[req.body.trip]) == '') return res.json({result: false, message: 'No Itinerary found.', code: 2})

        return res.json({result: true, message: 'Itinerary found', trips: data.trips[req.body.trip]});
    })
})

//Find Trip
app.post('/findtripv2', (req, res) => {
    console.log('start')
    User.findOne({ email: req.body.username }, (err, data) => {
        if (err) return res.json({result: false, errorMessage: err})

        if (data === null) return res.json({result: false, message: 'User not found.'})

        if (!data.trips[req.body.tripName]) return res.json({result: false, message: 'This trip doesn\'t exist  .'})

        return res.json({result: true, message: 'Trips found', trips: data.trips});
    })
})

//Delete Account
app.post('/deleteaccount', (req, res) => {
    User.findOneAndDelete({ email: req.body.email}, (err, data) => {
        if (err) return res.json({result: false, errorMessage: err})
        if (data === null) return res.json({result: false, message: 'User not found.'})

        return res.json({result: true, message: `${req.body.email} has been deleted.`})
    })
})
