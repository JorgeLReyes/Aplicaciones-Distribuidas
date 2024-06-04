# Aplicaciones-Distribuidas

<br />
<div align="center">
  <img src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202116inboxlogosocialsocialmedia-115701_115600.png" alt="Logo" width="80" height="80">
  <h3 align="center">Proyecto final</h3>
  <p align="center">
    Mejora la manera de enviar tus correos!
    <br />
    <a href="https://fastsend.onrender.com/usuarios" target="_blank">Ver despliegue</a>
    ·
    <a href="https://server-graph-final.onrender.com/graphql">Servidor GraphQL</a>
    ·
    <a href="https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/Proyecto%20final">Repositorio</a>
  </p>
</div>

**Ejercicios**
1. [Sockets](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#sockets)
3. [WebSockets](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#Web-Sockets)
2. [RMI con UTP](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#udp)
4. [SOAP](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#soap)
5. [API Rest _Ful_](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#api-rest-ful)
6. [GraphQL](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#graphql)

_*Nota:*_ Los ejercicios basados en web (web sockets, api rest y graphql) se encuentran desplegados. Los clientes se encuentran dentro de cada una de las carpetas de estos temas pero estos funcionan de manera independiente, es decir, se puede extraer el código cliente unicamente sin ningún problema.

## Sockets
> _*Repositorio: [Sockets](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/Sockets)*_ 

Este ejecicicio se hizo con Java. Pueden descargar el proyecto rar desde la [carpeta rar](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/AppsRar) de este repositorio
>_Cliente enviando mensaje a servidor_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/clienteJava.png)

>_Servidor recibiendo mensaje desde el cliente_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/servidorJava.png)

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)

## Web sockets
> _*Repositorio: [Web sockets](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/WebSockets)*_

>**Sitio web Cliente**
_*[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/WebSockets/SocketClient/)*_

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express con la liberia de **Sockets** alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en el servicio de Supabase

En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/socket.io.png)

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)

## UDP

> _*Repositorio: [UDP](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/SocketUDP)*_

Este ejecicicio se hizo con Java con el protocolo UDP. Pueden descargar el proyecto rar desde la [carpeta rar](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/AppsRar) de este repositorio
>_Cliente enviando mensaje a servidor_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/clienteutp.png)

>_Servidor recibiendo mensaje desde el cliente_
>>![imagen cliente](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Img/serverutp.png)

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)

# SOAP

> _*Repositorio: [SOAP](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/SOAP)*_

Este ejercicio se realizó con Python y Java. Pueden descargar el proyecto rar desde la [carpeta rar](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/AppsRar) de este repositorio.

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)


## API Rest _Ful_

> _*Repositorio: [API Rest](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/API%20Rest)*_

>**Sitio web Cliente**
_*[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/API%20Rest/Client/)*_

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en el servicio de Supabase

**EndPoints API**

| Petición HTTP | URL | Headers | Valores requeridos
| ----------- | ----------- | ----------- | ----------- |
| GET | [Obtener todos los usuarios](https://apirestful-users.onrender.com/users)| |
| POST | Añadir un nuevo usuario: _*https://apirestful-users.onrender.com/user*_ | Token : 1324 | nombre
| PUT | Editar un usuario: _*https://apirestful-users.onrender.com/user*_ | Token : 1324 | id y nombre
| DELETE | Eliminar un usuario: _*https://apirestful-users.onrender.com/user*_  | Token : 1324 | id

Formato para mandar el objeto de la petición
```json
{
  "data":{
    "id":"<ID>",
    "nombre":"<NOMBRE>",
  }  
}
```
En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/API.png)

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)

## GraphQL

> _*Repositorio: [GraphQL](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main/GraphQL)*_

>**Sitio web Cliente**
_*[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/GraphQL/client/)*_

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con GraphQL y Apollo alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en mongoDB con el servicio de Atlas 

URL para realizar pruebas con el servidor desplegado (Metodo _POST_): _*https://graphql-psn7.onrender.com/graphql*_

Cuerpo para las distintas peticiones desde el cliente

1. Obtener usuarios
```GraphQL
query {
  getAllUsers {
    id
    name
    email
    password
  }
}
```
2. Crear usuario
```GraphQL
mutation {
  createUser(name: "<NAME>", email: "<EMAIL>", password: "<PASSWORD>") {
    id
    name
    email
  }
}
```
3. Actualizar usuario
```GraphQL
mutation {
  updateUser(id: "<USER_ID>", name: "<NAME>", email: "<EMAIL>") {
    id
    name
    email
  }
}

```
4. Eliminar usuario
```GraphQL
mutation {
  deleteUser(id: "<USER_ID>")
}
```
En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/graphql.jpg)

[⇧ Regresar al menú](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/tree/main?tab=readme-ov-file#aplicaciones-distribuidas)
