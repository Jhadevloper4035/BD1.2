const express = require('express');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal += newItemPrice;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  let discountAmount;
  if (isMember)
    discountAmount = cartTotal - (cartTotal * discountPercentage) / 100;
  else discountAmount = cartTotal;
  res.send(discountAmount.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let TaxAmount = (cartTotal * taxRate) / 100;
  res.send(TaxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod === 'express';
  let distance = parseFloat(req.query.distance);
  let dilveryTime;
  if (shippingMethod) dilveryTime = distance / 100;
  else dilveryTime = distance / 50;
  res.send(dilveryTime.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
