const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();
app.use(formidable());
app.use(cors());
require("dotenv").config();

var API_KEY = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon serveur" });
}); //pour tester la route

app.post("/form", (req, res) => {
  //console.log(req.fields);

  const { firstname, lastname, email } = req.fields;
  const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "subtilis747@yahoo.fr",
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
    console.log(error);

    if (error === undefined) {
      res.json({ message: "Données reçues. Un mail a été envoyé" });
    } else {
      res.json({ message: "An error occurred" });
    }
  });
});

app.all("*", (req, res) => {
  res.json({ message: "Route introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
