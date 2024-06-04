const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    getLogin(email: String!, password: String!): Auth
    getUsers: [User]
    getUsersChange: [User]
    getUser(id: ID!): User
    getUsersAccept: [UsersAccept]
    getRole: [Role]
    getMessages(id: ID!, column: String!): [Chat]
    getMessage(id: Int!): Chat
    getLastMessage(id: [Int!]!, column: String!, usuario: ID!): [Chat]
    getUrl(url: String!): Chat
  }

  type Mutation {

    createUser(id: String!, rol: String!): User 
    updateUser(id: ID!, correo: String, nombre: String, rol_id: Int): User
    deleteUser(uuid: ID!): User

    createUserAccept(input: UserAccept!): [UsersAccept]
    updateUsersAccept(id: ID!, email: String, password: String, nombre: String!):UsersAccept
    deleteUsersAccept(id: String!): UsersAccept
    
    updatePassword(uuid: ID!, mail: String!, oldPassword: String!, newPassword: String!): Auth
    resetPassword(uuid: ID!, newPassword: String!): Auth
    updateRole(id: ID!, rol: Int): User
    updateUsername(id: ID!, newUsername: String!): User

    createChat(fecha: String!, usuario_id: String!, usuario_dest: String!, mensaje: String!,
    asunto: String!, visto :String, atendido: String, url: String):Chat

    updateChat(id: ID!, fecha: String!, usuario_id: String!, usuario_dest: String!, mensaje: String!, asunto: String!, visto: String, atendido: String, url: String ):Chat

    deleteChat(id: ID!): Chat
    addMessage(input: [AddMessage!]): [Chat]
    updateMessage(input: UpdateMessage!): Chat
  }

  type Auth{
    id: ID!
    email: String!
    role: String!
  }

  type User {
    id: ID!
    correo: String!
    nombre: String!
    rol_id: Int!
    roles: String!
  }

  type UsersAccept {
    id: ID!
    email: String!
    password: String!
    nombre: String!
  }
  
  type Role {
    id: String!
    rol: String!
  }
  
  type Chat {
    id: ID!
    fecha: String!
    usuario_id: String!
    usuario_id_nombre: String
    usuario_dest: String!
    usuario_dest_nombre: String
    mensaje: String!
    asunto: String!
    visto: String
    atendido: String
    url: String
    delete_uid: String
    delete_udest: String
  }

  input UpdateMessage{
    id: Int!
    visto: String
    atendido: String
    delete_uid: Boolean
    delete_udest: Boolean
  }

  input AddMessage{
    asunto: String!
    mensaje: String!
    usuario_dest: ID!
    usuario_id: ID!
    fecha: String!
    url: String
  }

  input UserAccept{
    email: String!
    password: String!
    nombre: String!    
  }
  `);

module.exports = schema;
