const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // lets us read JSON bodies

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/notesapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Note model
const Note = mongoose.model("Note", new mongoose.Schema({
  title: String,
  content: String,
}));

// Routes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.delete("/api/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// Start server
app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
