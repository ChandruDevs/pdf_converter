// server.js

const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");

app.use(express.static(path.join(__dirname, "build")));
const upload = multer({ dest: "uploads/" });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/upload", upload.single("pdfFile"), async (req, res) => {
  const file = req.file;
  if (file) {
    console.log(file);
    res.send({
      message: "File uploaded successfully!",
      filename: file.originalname,
    });
  }
});

app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename; // Get the filename from the request URL

  const filePath = path.join(__dirname, "uploads", filename);

  // Send the file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("File not found");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
