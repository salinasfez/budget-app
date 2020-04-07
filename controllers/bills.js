const express = require('express');
const router = express.Router();
const Bills = require('../models/bills.js');

//index route where all my bills are displayed
router.get('/', (req, res) =>{
    Bills.find({}, (err, foundBills) => {
        res.json(foundBills);
    })
});
//show route
router.get('/:id', (req, res) => {
    Bills.findOne({ _id: req.params.id }).then(bill => {
      res.json(bill);
    // console.log('testing')
    });
  });
//delete route
router.delete('/:id', (req, res) => {
    Bills.findByIdAndRemove(req.params.id, (err, deletedBill) => {
        res.json(deletedBill);
    })
})

router.post('/', (req, res) => {
    Bills.create(req.body, (err, createdBill) => {
        res.json(createdBill);
    });
})


router.put('/:id', (req, res) => {
    Bills.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBill) => {
        res.json(updatedBill)
    })
})

module.exports = router;