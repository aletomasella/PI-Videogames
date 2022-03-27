const { Router } = require("express");
const { apiKey } = require("../db.js");
const axios = require("axios");

const router = Router();

router.get("/", (req, res, next) => {
  const { name } = req.query;
  if (!name) return next();
});

router.get("/", async (req, res) => {
  const response = await axios.get(`https://api.rawg.io/api/games${apiKey}`);
  const games = response.data;
  // console.log(games);
  res.json(games.results);
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

module.exports = router;
