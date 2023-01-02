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
    trips: {type: Array}
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
        if (err) return console.log(err)

        if (data[0] == null) return console.log('User doesn\'t exist.');

        bcrypt.compare(req.body.password, data[0].password, (err,result) => {
            if (err) return console.log(err)

            if (result) {
                console.log(`Password correct: ${result}`);

               let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})

               const expiryDate = new Date(Date.now() + 3600000);
               
                console.log(`expiry datetime: ${expiryDate}`)

               res.json({result: true, token: newToken, tokenExpiry: expiryDate})
            } else {
                console.log(`Password incorrect: ${result}`);
                res.json({result: false, message: 'Incorrect password.'})
            }
        })

    });
});

//Sign up
app.post('/signup', (req, res) => {

    User.find({email: req.body.email}, (err,data) => {
        if (err) return console.log(err)

        if (data[0] != null) return console.log('user exists');

        bcrypt.hash(req.body.password, 10, (err,hash) => {
            if (err) return console.log(err)

            if (hash) {
                let newUser = new User({
                    name: '',
                    email: req.body.email,
                    password: hash.toString(),
                    trips: []
                });
                
               newUser.save();

               let newToken = jwt.sign({email : req.body.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1hr'})

               const expiryDate = new Date(Date.now() + 3600000);
                
                console.log(`Token Expiry: ${expiryDate}`)

               res.json({result: true, token: newToken, tokenExpiry: expiryDate})

            } else {
                res.json({result: false, message: 'Failed to hash password.'})
            }
        })

    })
});

//verify user
app.post('/verifyuser', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return console.log(err)

        result ? res.json({result: true}) : res.json({result: false});
    })
});

//setUsercity
app.post('/usercity', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return console.log(err)

        if (!result) return res.json({result: false, message: 'Invalid JWT.'})

        console.log(req.body.city)
        console.log(result.email)

        
        User.updateOne({ email: result.email }, {name: req.body.city }, (err, data) => {
            if (err) return console.log(err);
            
            data != null ? res.json({result: true}) : res.json({result: false})

            console.log('Document updated successfully');
          });
    })
})

//tripCreation
app.post('/tripcreation', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return console.log(err)

        if (!result) return res.json({result: false, message: 'Invalid JWT'});

        User.findOne({ email: result.email }, (err, data) => {
            if (err) return console.log(err);

            if (data == null) return res.json({result: false})

            console.log('Document updated successfully');
            data.trips.push({tripName: req.body.tripName});

            data.save((err, data) => {
                if (err) return console.log(err);

                console.log('Document updated successfully');
            });

            res.json({result: true, message: 'Trip created'});
        })
    })
})

//Find Trips
app.post('/findtrips', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, result) => {
        if (err) return console.log(err)
        if (!result) return res.json({result: false, message: 'Invalid JWT'});

        User.findOne({ email: result.email }, (err, data) => {
            if (err) return res.json({result: false, message: 'error'}) && console.log(err);
            if (data == null) return res.json({result: false, message: 'data is null'})

            let arr = []
            arr.push(data.trips)

            res.json({result: true, message: 'Trip created', trips: data.trips});
        })
    })
})
    