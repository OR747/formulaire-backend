const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();
app.use(formidable());
app.use(cors());
require("dotenv").config();

var API_KEY = "ae639a46ea1ec9a95cd17a842d6b052c-9b1bf5d3-dbb62770";
var DOMAIN = "sandbox850347cc241f424d8e3c68111d919bbf.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon serveur" });
}); //pour tester la route

app.post("/form", (req, res) => {
  //console.log(req.fields);
  const { firstname, lastname, email, subject, message } = req.fields;
  const data = {
    from: "Promo Phoenix20 <me@samples.mailgun.org>",
    to: req.fields.email,
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

app.listen(3000, () => {
  console.log("Server started");
});
