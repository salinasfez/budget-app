// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection;
const method = require('method-override');//method override 
require('dotenv').config();



// Environment Variables
const mongoURI = process.env.USER_AUTH;
const PORT = process.env.PORT || 3000

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)
//open connection to mongo
db.on('open', () => {});
// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json())// returns middleware that only parses JSON
app.use(method('_method'));
app.use(express.static('public'))

// Routes
const billsController = require('./controllers/bills.js')
app.use('/bills', billsController)
const incomeController = require('./controllers/income.js');
app.use('/income', incomeController);
const expensesController = require('./controllers/expenses.js');
app.use('/expenses', expensesController);


// this will catch any route that doesn't exist
app.get('*', (req, res) => {
  res.status(404).json('Sorry, page not found')
})



app.listen(PORT, (req, res) => {
    console.log('listening to the ninjas...');
})