const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    // Check if data is available
    if (global.food_items && global.foodCategory) {
      res.send([global.food_items, global.foodCategory]);  // Send both food items and categories
    } else {
      res.status(404).send("No data found");  // If no data is found, return 404
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;


