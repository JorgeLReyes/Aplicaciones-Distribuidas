const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const schema = require("./schema");
const resolvers = require("./resolvers");

const router = express.Router();

// Configuración de Express para manejar solicitudes GraphQL
router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Habilita GraphiQL en el endpoint /graphql
  })
);

module.exports = router;
