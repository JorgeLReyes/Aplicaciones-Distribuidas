require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { gql } = require("apollo-server-express");
const { Schema } = mongoose;

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "personas");

const typeDefs = gql`
  # Definiciones de tipo para el modelo de usuario
  type User {
    id: ID!
    name: String!
    email: String!
    password: String! # Normalmente, las contraseñas no se devuelven, pero para fines de ejemplo
    createdAt: String
    updatedAt: String
  }

  # Consultas para obtener datos
  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
  }

  # Mutaciones para crear, actualizar y eliminar datos
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    getUserById: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const newUser = new User({ name, email, password });
      await newUser.save();
      return newUser;
    },
    updateUser: async (_, { id, name, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteUser: async (_, { id }) => {
      const deleted = await User.findByIdAndDelete(id);
      return deleted !== null; // Retorna `true` si se eliminó, `false` si no se encontró
    },
  },
};

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(port);
};

startServer();
