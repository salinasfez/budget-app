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
// //edit route/page
// router.get('/:id/edit', (req, res) =>{
//     Bills.findById(req.params.id, (err, foundBill) => { //find the bill
//         res.render(
//             'edit.jsx',
//             {
//                 bill: foundBill //pass it found bill
//             }
//         );
//     });
// });

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

// router.put('/:id', (req, res) => {
//     res.send(req.body);
// })

module.exports = router;