//this is where our schema will live
//setting up my mongoose connection
const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    isPaid: Boolean
})

const Bills = mongoose.model('Bills', billsSchema);

module.exports = Bills;