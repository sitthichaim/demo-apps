const express = require("express");
const monk = require("monk");
const Joi = require("@hapi/joi");

const db = monk(process.env.MONGO_URI);
const users = db.get("users");

const scheema = Joi.object({
  fName: Joi.string().trim().required(),
  lName: Joi.string().trim().required(),
  desc: Joi.string(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await users.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Read one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await users.findOne({
      _id: id,
    });
    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create one
router.post("/", async (req, res, next) => {
  try {
    const value = await scheema.validateAsync(req.body);
    const inserts = await users.insert(value);
    res.json({
      statusCode: 200,
      message: "Insert success",
      data: inserts,
    });
  } catch (error) {
    next(error);
  }
});

// Update one
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await scheema.validateAsync(req.body);
    const item = await users.findOne({
      _id: id,
    });
    if (!item) return next();
      await users.update(
        {
          _id: id,
        },
        { $set: value }
      );
    res.json({...value, _id: id});
  } catch (error) {
    next(error);
  }
});

// Delete one
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await users.remove({ _id: id });
    res.json({
      statusCode: 200,
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;