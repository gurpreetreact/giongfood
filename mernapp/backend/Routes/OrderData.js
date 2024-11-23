const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;

  // Prepending order date
  data.unshift({ Order_date: new Date().toDateString() });

  try {
    let eId = await Order.findOne({ email: req.body.email });

    if (!eId) {
      // Create a new order if the user does not exist
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      return res.json({ success: true });
    } else {
      // Update existing user's order data
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      return res.json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Server Error", message: error.message });
  }
});

router.post('/myorderData', async (req, res) => {
try{
  let myData = await Order.findOne({'email':req.body.email})
  res.json({orderData:myData})
}catch(error){
  res.send("Server Error", error.message)
}
})


module.exports = router;
