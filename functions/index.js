const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HxFd6D0Fe8Zcq3kGjx1wejl0eg6STaNwBTWiFw13TimrQyMXJ16fvpURRasJZu4aC0aIz7qmcWGX5OF8Vk0W3F600RrGYBwkK"
);

//api

//app config
const app = express();

//middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API router
app.get("/", (req, res) => res.status(200).send("hello"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("boom", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //currency
    currency: "inr",
  });
  // ok
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

//api endpoint

//http://localhost:5001/clone-3eed1/us-central1/api
