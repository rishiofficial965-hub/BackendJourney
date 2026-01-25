const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("note created....");
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id]
  res.send("node del")
});

app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].title = req.body.title
    notes[req.params.id].description = req.body.description
    res.send("updated successfully")
});
app.put("/notes/:id",(req,res)=>{
    notes[req.params.id].title = req.body.title
    notes[req.params.id].description = req.body.description
})

module.exports = app;
