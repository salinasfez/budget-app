const express = require('express');
const router = express.Router();
const Income = require('../models/income.js');


router.get('/', (req, res) =>{
    Income.find({}, (err, foundIncome) => {
        res.json(foundIncome);
    })
});

router.delete('/:id', (req, res) => {
    Income.findByIdAndRemove(req.params.id, (err, deletedIncome) => {
        res.json(deletedIncome);
    })
})

router.post('/', (req, res) => {
    Income.create(req.body, (err, createdIncome) => {
        res.json(createdIncome);
    });
})

router.put('/:id', (req, res) => {
    Income.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedIncome) => {
        res.json(updatedIncome)
    })
})

module.exports = router;