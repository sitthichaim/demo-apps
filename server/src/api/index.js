const express = require('express');

const emojis = require('./emojis');
const users = require("./users");
const reactApps = require("./react-apps");

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use("/users", users);
router.use("/react-apps", reactApps);

module.exports = router;
