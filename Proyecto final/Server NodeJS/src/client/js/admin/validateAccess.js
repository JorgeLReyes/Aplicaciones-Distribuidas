import TableHeader from "../../components/TableHead.js";
import tableHead from "../../helpers/headsTable.js";
import Alert from "../../components/Alert.js";

let roles;

const optionRoles = () => {
  const fragment = document.createDocumentFragment();
  roles.forEach((e) => {
    const option = document.createElement("option");
    option.value = e.id;
    option.text = e.value;
    fragment.append(option);
  });

  return fragment;
};

const peticion = async (obj) => {
  const { method, url, body } = obj;
  delete obj.url;
  if (!method) obj.method = "GET";
  if (body) {
    obj.body = JSON.stringify(body);
    obj.headers = {
      "Content-Type": "application/json",
      ...obj.headers,
    };
  } else {
    delete obj.body;
  }

  try {
    const response = await fetch(url, obj);
    const data = await response.json();
    console.log(data);
    if (data.error) throw data.error;

    return data;
  } catch (error) {
    throw error;
  }
};

const TableBody = async () => {
  const table = document.getElementById("table");
  if (table.querySelector("tbody")) table.querySelector("tbody").innerHTML = "";

  const tbody = document.createElement("tbody");
  try {
    const res = await peticion({ url: "/api/register" });
    const rolOption = optionRoles();

    if (!res.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.classList.add("no-data");
      td.textContent = "No hay datos para mostrar";
      td.colSpan = 100;
      tr.insertAdjacentElement("beforeend", td);
      tbody.insertAdjacentElement("beforeend", tr);
    }
    res.forEach((e) => {
      const { id, nombre, email } = e;
      const tr = document.createElement("tr");
      tr.dataset.id = id;

      const html = `
          <td>${nombre}</td>
          <td>${email}</td>
          <td>
            <select name="rol_id"></select>
          </td>
          <td>
            <button class="btnAccept">Aceptar</button>
            <button class="btnDelete">Eliminar</button>
          </td>
      `;

      tr.innerHTML = html;
      tr.querySelector("[name='rol_id']").append(rolOption.cloneNode(true));
      tbody.append(tr);
    });
  } catch (err) {
    console.log(err);
  } finally {
    table.append(tbody);
  }
};

const TableBodyUsers = async () => {
  const table = document.getElementById("table-users");
  if (table.querySelector("tbody")) table.querySelector("tbody").remove();

  const tbody = document.createElement("tbody");
  try {
    const res = await peticion({
      url: "/usuarios",
      method: "POST",
    });
    const rolOption = optionRoles();

    if (!res.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.classList.add("no-data");
      td.textContent = "No hay datos para mostrar";
      td.colSpan = 100;
      tr.insertAdjacentElement("beforeend", td);
      tbody.insertAdjacentElement("beforeend", tr);
    }
    res.forEach((e) => {
      const { id, nombre, correo, rol_id } = e;

      const tr = document.createElement("tr");
      tr.dataset.id = id;
      tr.dataset.correo = correo;
      tr.dataset.nombre = nombre;

      const html = `
          <td>${nombre}</td>
          <td>${correo}</td>
          <td>
            <select name="rol_id"></select>
          </td>
          <td>
            <button class="flex btnPasswordUser">
              <ion-icon name="key-outline"></ion-icon>
              <span>Contraseña</span>
            </button>
            <button class="btnDeleteUser">Eliminar</button>
          </td>
      `;

      tr.innerHTML = html;
      const select = tr.querySelector("[name='rol_id']");
      select.append(rolOption.cloneNode(true));
      select.value = rol_id;
      select.setAttribute("data-previous-value", select.value);
      tbody.append(tr);
    });
  } catch (err) {
    Alert({
      mensaje: "Hubo un error al cargar algunos datos",
      icon: '<ion-icon name="alert-outline"></ion-icon>',
      color: "var(--color-red)",
    });
  } finally {
    table.append(tbody);
  }
};

const setPasswordModal = ({ id, nombre, correo }) => {
  const html = `
    <section class="flex modal-password">
      <section class="flex modal-container">
        <section class="flex modal-title">
          <p>Actualizar contraseña de usuario</p>
        </section>
        <section class="flex modal-form">
          <form data-id=${id} class="flex">
            <label class="flex input readonly">
              <span>Usuario</span>
              <input type="text" value="${nombre}" readonly>
            </label>
            <label class="flex input readonly">
              <span>Correo</span>
              <input type="text" value="${correo}" readonly>
            </label>
            <label class="flex input">
              <span>Nueva contraseña</span>
              <input type="text" name="newPassword">
            </label>
            <section class="flex form-buttons">
              <button type="button" class="btnFormClose">Cancelar</button>
              <button type="submit">Cambiar contraseña</button>            
            </section>
          </form>
        </section>
      </section>
    </section>
  `;

  return html;
};

document.addEventListener("click", async (e) => {
  if (e.target.closest(".btnAccept")) {
    const id = e.target.closest("tr").dataset.id;
    const rol = e.target.closest("tr").querySelector("[name='rol_id']").value;
    try {
      const data = await peticion({
        method: "put",
        url: "/api/register",
        body: { id, rol },
      });
      Alert({
        mensaje: data.mensaje,
        color: "var(--color-green)",
        icon: '<ion-icon name="checkmark-outline"></ion-icon>',
      });
      TableBody();
      TableBodyUsers();
    } catch (error) {
      Alert({
        mensaje: error,
        color: "var(--color-red)",
        icon: '<ion-icon name="close-outline"></ion-icon>',
      });
    }
  }
  if (e.target.closest(".btnDelete")) {
    const id = e.target.closest("tr").dataset.id;
    try {
      const data = await peticion({
        method: "delete",
        url: "/api/register",
        body: { id },
      });
      Alert({
        mensaje: data.mensaje,
        color: "var(--color-green)",
        icon: '<ion-icon name="checkmark-outline"></ion-icon>',
      });
      TableBody();
    } catch (error) {
      Alert({
        mensaje: error,
        color: "var(--color-red)",
        icon: '<ion-icon name="close-outline"></ion-icon>',
      });
    }
  }
  if (e.target.closest(".btnPasswordUser")) {
    if (document.querySelector(".modal-password"))
      document.querySelector(".modal-password").remove();

    const id = e.target.closest("tr").dataset.id;
    const correo = e.target.closest("tr").dataset.correo;
    const nombre = e.target.closest("tr").dataset.nombre;
    const modal = setPasswordModal({ id, nombre, correo });
    document.body.insertAdjacentHTML("beforeend", modal);
  }
  if (e.target.closest(".btnDeleteUser")) {
    const nombre = e.target.closest("tr").dataset.nombre;
    const id = e.target.closest("tr").dataset.id;
    const confirmDel = confirm(
      `Confirme que desea eliminar al usuario ${nombre}`
    );
    if (!confirmDel) return;

    try {
      const id = e.target.closest("tr").dataset.id;
      // const rol_id = e.target.value;

      const { data, error } = await peticion({
        method: "DELETE",
        url: "/delete-user-system",
        body: { uuid: id },
      });

      if (error) throw error;

      Alert({
        mensaje: "Usuario eliminado correctamente",
        icon: '<ion-icon name="checkmark-outline"></ion-icon>',
        color: "var(--color-green)",
      });

      TableBodyUsers();
    } catch (error) {
      Alert({
        mensaje: error,
        icon: '<ion-icon name="alert-outline"></ion-icon>',
        color: "var(--color-red)",
      });
    }
  }
  if (e.target.closest(".btnFormClose")) {
    e.target.closest(".modal-password").remove();
  }
});

document.addEventListener("change", async (e) => {
  e.preventDefault();
  if (e.target.closest("#table-users [name='rol_id']")) {
    console.log("object");
    const confirmar = confirm("¿Está segundo de actualizar el rol?");
    if (!confirmar) {
      return (e.target.value = e.target.getAttribute("data-previous-value"));
    }
    try {
      const id = e.target.closest("tr").dataset.id;
      const rol_id = e.target.value;

      const { data, error } = await peticion({
        method: "POST",
        url: "/update-rol",
        body: { id, rol_id },
      });

      if (error) throw error;

      console.log(data);
      e.target.setAttribute("data-previous-value", e.target.value);
      Alert({
        mensaje: "Rol actualizado correctamente",
        icon: '<ion-icon name="checkmark-outline"></ion-icon>',
        color: "var(--color-green)",
      });
    } catch (error) {
      Alert({
        mensaje: error,
        icon: '<ion-icon name="alert-outline"></ion-icon>',
        color: "var(--color-red)",
      });
    }
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.target.closest(".modal-password")) {
    try {
      const id = e.target.dataset.id;
      const newPassword = e.target.querySelector("[name='newPassword']").value;
      console.log(id, newPassword);
      const { data: reset, error } = await peticion({
        method: "POST",
        url: "/reset-password",
        body: { id, newPassword },
      });
      if (error) throw error;

      Alert({
        mensaje: reset,
        color: "var(--color-green)",
        icon: '<ion-icon name="bag-check-outline"></ion-icon>',
      });

      e.target.closest(".modal-password").remove();
    } catch (error) {
      console.log(error);
      Alert({
        mensaje: error,
        icon: '<ion-icon name="alert-outline"></ion-icon>',
        color: "var(--color-red)",
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const table = document.getElementById("table");

  try {
    roles = await peticion({ url: "/roles", method: "POST" });
  } catch (error) {
    Alert({
      mensaje: "Hubo un error al cargar algunos datos",
      icon: '<ion-icon name="alert-outline"></ion-icon>',
      color: "var(--color-red)",
    });
  }

  table.insertAdjacentElement(
    "afterbegin",
    TableHeader(tableHead.headersUsers)
  );

  TableBody();
  if (document.getElementById("table-users")) {
    const tableUsers = document.getElementById("table-users");
    tableUsers.insertAdjacentElement(
      "afterbegin",
      TableHeader(tableHead.headersUsersSystem)
    );
    TableBodyUsers();
  }
});
