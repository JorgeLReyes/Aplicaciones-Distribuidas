# Aplicaciones-Distribuidas

## UDP

Este ejecicicio se hizo con Java con el protocolo UDP. Pueden descargar el proyecto rar desde la [carpeta rar](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/AppsRar) de este repositorio
>_Cliente enviando mensaje a servidor_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/clienteutp.png)

>_Servidor recibiendo mensaje desde el cliente_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/serverutp.png)

## Sockets

Este ejecicicio se hizo con Java. Pueden descargar el proyecto rar desde la [carpeta rar](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/AppsRar) de este repositorio
>_Cliente enviando mensaje a servidor_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/clienteJava.png)

>_Servidor recibiendo mensaje desde el cliente_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/servidorJava.png)

## Web sockets

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express con la liberia de **Sockets** alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en el servicio de Supabase

**Sitio web Cliente**
[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/WebSockets/SocketClient/)

En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/socket.io.png)

## API Rest _Ful_

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en el servicio de Supabase

**EndPoints API**

| Petición HTTP | URL | Headers | Valores requeridos
| ----------- | ----------- | ----------- | ----------- |
| GET | [Obtener todos los usuarios](https://apirestful-users.onrender.com/users)| |
| POST | Añadir un nuevo usuario: https://apirestful-users.onrender.com/user | Token : 1324 | nombre
| PUT | Editar un usuario: https://apirestful-users.onrender.com/user | Token : 1324 | id y nombre
| DELETE | Eliminar un usuario: https://apirestful-users.onrender.com/user  | Token : 1324 | id

```
Formato para mandar el objeto de la petición
{
  "data":{
    "id":[valor],
    "nombre":[valor],
  }  
}
```
**Sitio web Cliente**
[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/API%20Rest/Client/)

En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/API.png)

## GraphQL

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con GraphQL y Apollo alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada mongoDB con el servicio de Atlas 

La URL para acceder a las distintas operaciones de CRUD es: https://graphql-psn7.onrender.com/graphql

> Queries

1. getAllUsers
```GraphQL
query {
  getAllUsers {
    id
    name
    email
  }
}
```
1. createUser
```GraphQL
mutation {
  createUser(name: "Alice", email: "alice@example.com", password: "12345") {
    id
    name
    email
  }
}
```
1. updateUser
```GraphQL
mutation {
  updateUser(id: "<USER_ID>", name: "Nuevo Nombre", email: "nuevoemail@example.com") {
    id
    name
    email
  }
}

```
1. deleteUser
```GraphQL
mutation {
  deleteUser(id: "<USER_ID>")
}
```
