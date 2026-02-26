const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let sharedText = "";
let timeout = null;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Set text
app.post("/set", (req, res) => {
  sharedText = req.body.text;

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    sharedText = "";
  }, 5 * 60 * 1000); // 5 minutes auto-delete

  res.sendStatus(200);
});

// Get text
app.get("/get", (req, res) => {
  res.json({ text: sharedText });
});

// Clear manually
app.post("/clear", (req, res) => {
  sharedText = "";
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));