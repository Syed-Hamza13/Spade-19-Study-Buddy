
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/notesApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  res.send("Welcome to Notes App API");
});

app.post("/notes", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content
    });
    await newNote.save();
    res.send("Note added successfully!");
  } catch (error) {
    res.status(500).send("Error creating note");
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send("Error fetching notes");
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.send(" Note updated!");
  } catch (error) {
    res.status(500).send("Error updating note");
  }
});

// 4. DELETE Note (DELETE)
app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.send("Note deleted!");
  } catch (error) {
    res.status(500).send("Error deleting note");
  }
});

// Server listen
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
