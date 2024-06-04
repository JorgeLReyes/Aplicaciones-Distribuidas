const supabase = require("../services/supabaseClient");
const supabaseAdmin = require("../services/supabaseClient");

const resolvers = {
  // Usuario Auth
  getLogin: async ({ email: correo, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password,
      });
      if (error) throw error;
      const { id, role, email } = data.user;
      return { id, role, email };
    } catch (error) {
      throw error;
    }
  },

  // Usuarios
  getUsers: async () => {
    try {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error fetching users");
    }
  },
  getUsersChange: async () => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .neq("rol_id", 1);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error fetching users");
    }
  },
  getUser: async ({ id }) => {
    //Obtener Usuarios
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*,roles(rol)")
        .eq("id", id);
      console.log(data, error);
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      const { id: uuid, correo, nombre, rol_id, roles } = data[0];
      return { id: uuid, correo, nombre, rol_id, roles: roles.rol };
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error fetching users");
    }
  },
  createUser: async ({ id: idUser, rol }) => {
    try {
      const { data: usersAccept } = await supabase
        .from("usersAccept")
        .select("*")
        .eq("id", idUser);

      const { email, password, nombre } = usersAccept[0];
      const { data: Accept, error } = await supabaseAdmin.auth.admin.createUser(
        {
          email: email,
          password: password,
          email_confirm: true,
        }
      );

      if (error) throw error;

      const { id, email: correo } = Accept.user;
      const { data: user, error: errorUser } = await supabase
        .from("usuarios")
        .insert([{ id, correo, nombre, rol_id: rol }])
        .select();

      if (errorUser) throw errorUser;

      return user[0];
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error("Error creating user");
    }
  },
  updateUser: async ({ id, correo, nombre, rol_id }) => {
    //Actualizar Usuarios
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .update({ correo, nombre, rol_id })
        .match({ id });
      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      console.error("Error updating user:", err);
      throw new Error("Error updating user");
    }
  },
  deleteUser: async ({ uuid }) => {
    //Borrar Usuarios
    try {
      console.log("BORRAR");
      const { error: errorAuth } = await supabaseAdmin.auth.admin.deleteUser(
        uuid
      );
      if (errorAuth) throw errorAuth;

      const { error } = await supabase.from("usuarios").delete().eq("id", uuid);

      if (error) throw new Error(error.message);

      return { id: uuid };
    } catch (err) {
      console.log(err);
      // console.error("Error deleting user:", err);
      throw new Error("Error deleting user");
    }
  },

  //Operaciones Select, Insert Update,Delete de la tabla usersAccept
  getUsersAccept: async () => {
    //Obtener Usuarios Aceptados
    try {
      const { data, error } = await supabase.from("usersAccept").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error fetching users");
    }
  },
  createUserAccept: async (input) => {
    //Crear Usuarios Aceptados
    console.log(input.input);
    try {
      const { data, error } = await supabase
        .from("usersAccept")
        .insert([input.input])
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error("Error creating user");
    }
  },
  updateUsersAccept: async ({ id, email, password, nombre }) => {
    //Actualizar Usuarios Aceptados
    try {
      const { data, error } = await supabase
        .from("usersAccept")
        .update({ email, password, nombre })
        .match({ id });
      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      console.error("Error updating user:", err);
      throw new Error("Error updating user");
    }
  },
  deleteUsersAccept: async ({ id }) => {
    //Borrar Usuarios Aceptados
    try {
      const { error } = await supabase
        .from("usersAccept")
        .delete()
        .match({ id });
      if (error) {
        throw new Error(error.message);
      }
      return { id };
    } catch (err) {
      console.error("Error deleting user:", err);
      throw new Error("Error deleting user");
    }
  },

  //Operaciones Select, Insert Update,Delete  para usuarios
  getRole: async () => {
    //Obtener Rol
    try {
      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .neq("rol", "superAdmin")
        .or("id.neq.1")
        .order("id");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error("Error fetching role:", err);
      throw new Error("Error fetching role");
    }
  },
  updateRole: async ({ id, rol }) => {
    //Actualizar Usuarios
    try {
      console.log("UPDATE ROL");
      const { data, error } = await supabase
        .from("usuarios")
        .update({ rol_id: rol })
        .match({ id })
        .select();
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      console.log(data);
      const { id: uuid, correo, nombre, rol_id } = data[0];
      return { id: uuid, correo, nombre, rol_id };
    } catch (err) {
      console.error("Error updating role:", err);
      throw new Error("Error updating role");
    }
  },
  updatePassword: async ({ uuid, mail, oldPassword, newPassword }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: oldPassword,
      });
      if (error) throw "Contraseña actual incorrecta";

      const { data, error: errorChange } =
        await supabaseAdmin.auth.admin.updateUserById(uuid, {
          password: newPassword,
        });
      if (errorChange) throw "Error al actualizar la contraseña";
      console.log(data);
      const { id, role, email } = data.user;
      return { id, role, email };
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async ({ uuid, newPassword }) => {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        uuid,
        {
          password: newPassword,
        }
      );
      if (error) throw "Error al actualizar la contraseña";
      console.log(data);
      const { id, role, email } = data.user;
      return { id, role, email };
    } catch (error) {
      throw error;
    }
  },
  updateUsername: async ({ id, newUsername }) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .update({ nombre: newUsername })
        .eq("id", id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw "No se pudo actualizar el nombre de usuario";
    }
  },

  //Operaciones Select, Insert Update,Delete de la tabla Chat
  getMessages: async ({ id, column }) => {
    //Obtener Chat
    try {
      const { data, error } = await supabase
        .from("chat")
        .select("*,usuario_id(id,nombre),usuario_dest(id,nombre)")
        .eq(column, id)
        .order("fecha", { ascending: false });
      console.log(data, error);

      if (error) throw error;
      let mensajes = data;
      mensajes = mensajes.map((mensaje) => {
        const { usuario_id, usuario_dest, ...info } = mensaje;
        const { id: uID, nombre: usuario_id_nombre } = usuario_id;
        const { id: uDest, nombre: usuario_dest_nombre } = usuario_dest;
        return {
          ...info,
          usuario_id: uID,
          usuario_id_nombre,
          usuario_dest: uDest,
          usuario_dest_nombre,
        };
      });
      return mensajes;
    } catch (err) {
      console.error("Error fetching chat:", err);
      throw "Error al obtener los mensaje";
    }
  },
  getMessage: async ({ id }) => {
    //Obtener Chat
    try {
      const { data, error } = await supabase
        .from("chat")
        .select("*,usuario_id(id,nombre),usuario_dest(id,nombre)")
        .match({ id });
      if (error) {
        throw error;
      }

      const mensaje = data[0];
      console.log(mensaje);
      const { usuario_id, usuario_dest, ...info } = mensaje;
      const { id: uID, nombre: usuario_id_nombre } = usuario_id;
      const { id: uDest, nombre: usuario_dest_nombre } = usuario_dest;

      return {
        ...info,
        usuario_id: uID,
        usuario_id_nombre,
        usuario_dest: uDest,
        usuario_dest_nombre,
      };
    } catch (err) {
      console.error("Error fetching chat:", err);
      throw "Error al obtener el mensaje";
    }
  },
  getLastMessage: async ({ id, column, usuario }) => {
    //Obtener Chat
    try {
      console.log(column, usuario);
      let { data, error } = await supabase
        .from("chat")
        .select("*,usuario_id(id,nombre),usuario_dest(id,nombre)")
        .eq(column, usuario)
        .in("id", id);
      console.log(data, error);
      if (error) throw error;

      data = data.map((mensaje) => {
        const { usuario_id, usuario_dest, ...info } = mensaje;
        const { id: uID, nombre: usuario_id_nombre } = usuario_id;
        const { id: uDest, nombre: usuario_dest_nombre } = usuario_dest;
        return {
          ...info,
          usuario_id: uID,
          usuario_id_nombre,
          usuario_dest: uDest,
          usuario_dest_nombre,
        };
      });
      return data;
    } catch (err) {
      console.error("Error fetching chat:", err);
      throw "Error al obtener el mensaje";
    }
  },
  createChat: async ({
    fecha,
    usuario_id,
    usuario_dest,
    mensaje,
    asunto,
    visto,
    atendido,
    url,
  }) => {
    //Crear Chat
    try {
      const { data, error } = await supabase.from("chat").insert([
        {
          fecha,
          usuario_id,
          usuario_dest,
          mensaje,
          asunto,
          visto,
          atendido,
          url,
        },
      ]);
      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      console.error("Error creating chat:", err);
      throw new Error("Error creating chat");
    }
  },
  updateChat: async ({
    id,
    fecha,
    usuario_id,
    usuario_dest,
    mensaje,
    asunto,
    visto,
    atendido,
    url,
  }) => {
    //Actualizar Chat
    try {
      const { data, error } = await supabase
        .from("chat")
        .update({
          fecha,
          usuario_id,
          usuario_dest,
          mensaje,
          asunto,
          visto,
          atendido,
          url,
        })
        .match({ id });
      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      console.error("Error updating chat:", err);
      throw new Error("Error updating chat");
    }
  },
  deleteChat: async ({ id }) => {
    //Borrar Chat
    try {
      const { error } = await supabase.from("chat").delete().match({ id });
      if (error) {
        throw new Error(error.message);
      }
      return { id };
    } catch (err) {
      console.error("Error deleting chat:", err);
      throw new Error("Error deleting chat");
    }
  },
  addMessage: async ({ input }) => {
    try {
      const { data, error } = await supabase
        .from("chat")
        .insert(input)
        .select();

      if (error) error;

      return data;
    } catch (error) {
      throw error;
    }
  },
  updateMessage: async ({ input }) => {
    try {
      const { id, ...opc } = input;
      const { data, error } = await supabase
        .from("chat")
        .update(opc)
        .eq("id", id)
        .select();
      if (error) throw "Error al modificar el mensaje";

      return { ...data[0] };
    } catch (error) {
      throw error;
    }
  },
  getUrl: async ({ url }) => {
    //Obtener Chat
    try {
      console.log("URLLLLLLLLLLLLLLL");
      const { data, error } = await supabase
        .from("chat")
        .select("*")
        .match({ url });
      if (error) throw error;
      console.log(data[0]);
      return data[0];
    } catch (err) {
      console.error("Error fetching chat:", err);
      throw "Error al eliminar el mensaje";
    }
  },
};

module.exports = resolvers;
