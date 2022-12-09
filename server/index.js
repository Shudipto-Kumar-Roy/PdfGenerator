const express = require("express");
const pdf = require("html-pdf");
const app = express();

const pdfTemplate = require("./documents");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(4000, () =>
  console.log(`Server is running on http://localhost:4000`)
);
