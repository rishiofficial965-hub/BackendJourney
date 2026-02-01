const express = require("express");
const noteModel = require("./models/notes.model");
//server created here..
const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {

  res.status(200).json({
    message: "added",
    notes: note,
  });
  
});

module.exports = app;
