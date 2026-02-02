const express = require("express");
const model = require("./models/notes.model");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await model.create({
    title,
    description,
  });
  res.status(201).json({
    message: "note created",
    note: note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await model.find();
  res.status(200).json({
    message: "all notes",
    notes: notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await model.findByIdAndDelete(id);
  res.status(200).json({
    message: "deletion done",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await model.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "updation done",
  });
});
module.exports = app;
