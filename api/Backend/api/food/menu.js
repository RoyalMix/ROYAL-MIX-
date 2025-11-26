const express = require("express");
const router = express.Router();
const db = require("../../common/db");

router.get("/menu", async (req, res) => {
  const food = await db.select().from("food_menu");
  res.json(food);
});

module.exports = router;
