const express = require('express');
const router = express.Router();
const Expenses = require('../models/expenses.js');


router.get('/', (req, res) =>{
    Expenses.find({}, (err, foundExpenses) => {
        res.json(foundExpenses);
    })
});

router.delete('/:id', (req, res) => {
    Expenses.findByIdAndRemove(req.params.id, (err, deletedExpense) => {
        res.json(deletedExpense);
    })
})

router.post('/', (req, res) => {
    Expenses.create(req.body, (err, createdExpense) => {
        res.json(createdExpense);
    });
})

router.put('/:id', (req, res) => {
    Expenses.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedExpense) => {
        res.json(updatedExpense)
    })
})

module.exports = router;