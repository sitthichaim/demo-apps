const express = require('express');
const { promisify } = require('util');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const reactApps = db.get('reactApps');

// const redis = require('redis');
const Redis = require("ioredis");

// Connect to 127.0.0.1:6379
const client = new Redis();

client.on('error', (error) => {
  console.log('redis error => ', error);
});

const redisGetAsync = promisify(client.get).bind(client);

const body = Joi.object({
  pages: Joi.string().trim().required(),
  _id: Joi.string(),
});

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const value = await body.validateAsync(req.body);
    const redisKey = `pages:${value.pages}`;
    const redisCache = await redisGetAsync(redisKey);
    if (redisCache) {
      return res.json(JSON.parse(redisCache));
    }

    console.log('value :>> ', value);
    const items = await reactApps.findOne(value);
    if (!items) return next();

    client.setex(redisKey, 60 * 2, JSON.stringify(items.data));
    return res.json(items.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;