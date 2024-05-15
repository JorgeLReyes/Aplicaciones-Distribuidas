const updateID = document.getElementById("update-id"),
  updateName = document.getElementById("update-name"),
  updateEmail = document.getElementById("update-email"),
  deleteID = document.getElementById("delete-id");

const peticion = async ({ query, element }) => {
  try {
    const response = await fetch("https://graphql-psn7.onrender.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    if (result.errors) {
      throw result.errors;
    }

    if (element) element.reset();
    return result;
  } catch (error) {
    alert(error);
  }
};

const fetchUsers = async () => {
  const query = ` { getAllUsers { id name email } } `;
  const data = await peticion({ query: query });
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  const fragment = document.createDocumentFragment();

  data.data.getAllUsers.forEach((user) => {
    const p = document.createElement("p");
    p.classList.add("user-data");
    p.dataset.id = user.id;
    p.dataset.email = user.email;
    p.dataset.name = user.name;
    p.textContent = `ID: ${user.id} - Nombre: ${user.name} - Email: ${user.email}`;
    fragment.append(p);
  });

  userList.append(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".user-data")) {
    updateID.value = e.target.dataset.id;
    updateName.value = e.target.dataset.name;
    updateEmail.value = e.target.dataset.email;
    deleteID.value = e.target.dataset.id;
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  let query;
  if (e.target.matches("#create-user-form")) {
    const name = document.getElementById("create-name").value;
    const email = document.getElementById("create-email").value;
    const password = document.getElementById("create-password").value;
    query = `
        mutation {
            createUser(name: "${name}", email: "${email}", password: "${password}")
            {id name email}
        }`;
  }
  if (e.target.matches("#update-user-form")) {
    const password = document.getElementById("update-password").value;
    query = `
        mutation {
            updateUser(id: "${updateID.value}", name: "${updateName.value}", email: "${updateEmail.value}", password: "${password}") {
                id
                name
                email
            }
        }
    `;
  }
  if (e.target.matches("#delete-user-form")) {
    query = ` mutation { deleteUser(id: "${deleteID.value}") } `;
  }
  await peticion({ query, element: e.target });
  fetchUsers();
});

document.addEventListener("DOMContentLoaded", fetchUsers);
