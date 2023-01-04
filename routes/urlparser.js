const Router = require("express");
const param = require("express-validator");
const body = require("express-validator");
const URLSchemaParser = require("../models/urlparser.model");

const URLRouter = Router();

const mongoose = require("mongoose");

//GET Request
URLRouter.route("/").get((req, res) => {
  URLSchemaParser.find()
    .then((link) => res.status(200).json(link))
    .catch((err) => res.status(404).json("Error: " + err));
});

//POST request for add

URLRouter.route("/add").post((req, res) => {
  const { URL } = req.body;
  console.log(URL);
  if (!URL) {
    return res.status(400).json({
      message: "URL is  required",
    });
  } else {
  }

  const newURL = new URLSchemaParser({
    URL,
  });

  newURL
    .save()
    .then(() => res.status(201).json(newURL))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Get using id
URLRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await URLSchemaParser.findById(id);

    if (!product) res.status(404).json({ message: "URL does Not Found" });
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid Id" });
    }
  }
});

//delete
URLRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await URLSchemaParser.findByIdAndDelete(id);
    console.log(product);
    if (!product) res.status(404).json({ message: "Id does Not Found" });
    res.status(200).json({ message: "URL deleted" });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid Id" });
    }
  }
});

//update
URLRouter.put("/:id", async (request, response, next) => {
  const URL = await URLSchemaParser.findById(request.params.id);

  if (!URL) {
    return response.status(404).json({ error: "URL not found" });
  }

  URL.URL = request.body.URL;

  const savedProduct = await URL.save();
  console.log(savedProduct);
  response.json(savedProduct);
});

module.exports = URLRouter;
