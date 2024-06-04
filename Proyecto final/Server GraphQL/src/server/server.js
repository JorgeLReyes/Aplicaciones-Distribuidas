const express = require("express");
const graphqlRouter = require("./graphql");

const app = express();

// Rutas
app.use(graphqlRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
