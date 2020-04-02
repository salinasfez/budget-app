//this is where our schema will live
//setting up my mongoose connection
const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    name: String,
    amount: Number
})

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;