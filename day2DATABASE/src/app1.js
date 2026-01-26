const express = require("express");

//server created here..
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes:notes
  })
});

app.delete("/notes/:id",(req,res)=>{
    let idx = req.params.id
    delete notes[idx]
    res.status(204).json()
})
module.exports = app;
