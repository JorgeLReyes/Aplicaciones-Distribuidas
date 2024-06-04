import Alert from "../../components/Alert.js";

const formPasssword = document.getElementById("form-reset-password"),
  formName = document.getElementById("form-update-name");

let validatePassword = false;
const password = document.getElementById("verify-password"),
  oldPassword = document.querySelector("input[name='oldPassword']"),
  newPassword = document.querySelector("input[name='newPassword']");

const equalsPasswords = () => password.value === newPassword.value;

const validations = [
  {
    element: oldPassword,
    message: "Ingrese su contraseña",
    isValid: () => oldPassword.value.length,
    errorElement: oldPassword.closest(".input").nextElementSibling,
  },
  {
    element: password,
    message: "La contraseña no cumple los requisitos",
    isValid: () => validatePassword,
    errorElement: password.closest(".input").nextElementSibling,
  },
  {
    element: newPassword,
    message: "Las contraseñas no coinciden",
    isValid: equalsPasswords,
    errorElement: newPassword.closest(".input").nextElementSibling,
  },
];

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
    const res = await fetch(url, obj);
    const { data, error } = await res.json();
    if (error) throw error;
    return { data, error };
  } catch (error) {
    throw error;
  }
};

const validate = () => {
  const listItems = document.querySelectorAll("#list li");

  let pattern = {
    charLength: function () {
      return password.value.length >= 8;
    },
    letters: function () {
      return /[a-z]/.test(password.value) && /[A-Z]/.test(password.value);
    },
    numbers: function () {
      return /\d/.test(password.value);
    },
    special: function () {
      return /[\W_]/.test(password.value);
    },
  };

  const addClass = (el, className) => {
    el.classList.add(className);
  };

  const removeClass = (el, className) => {
    el.classList.remove(className);
  };

  const patternTest = (testResult, element) => {
    if (testResult) {
      addClass(element, "valid");
    } else {
      removeClass(element, "valid");
    }
    return testResult;
  };

  password.addEventListener("keyup", () => {
    const charLengthValid = patternTest(pattern.charLength(), listItems[0]);
    const lettersValid = patternTest(pattern.letters(), listItems[1]);
    const numbersValid = patternTest(pattern.numbers(), listItems[2]);
    const specialValid = patternTest(pattern.special(), listItems[3]);

    validatePassword =
      charLengthValid && lettersValid && numbersValid && specialValid;
  });
};

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.target === formPasssword) {
    document.querySelectorAll(".error").forEach((el) => el.remove());

    validations.forEach(({ element, message, isValid }) => {
      if (!isValid()) {
        const errorElement = document.createElement("p");
        errorElement.textContent = message;
        errorElement.className = "error";
        element.parentElement.insertAdjacentElement("afterend", errorElement);
      }
    });

    if (document.querySelectorAll(".error").length) return;

    const form = new FormData(e.target);

    let data = {};
    for (const [key, value] of form) {
      data[key] = value;
    }

    try {
      const { data: reset, error } = await peticion({
        url: "/update-password",
        method: "PUT",
        body: data,
      });

      if (error) throw error;

      Alert({
        mensaje: reset,
        color: "var(--color-green)",
        icon: '<ion-icon name="bag-check-outline"></ion-icon>',
      });

      e.target.reset();
    } catch (error) {
      Alert({
        mensaje: error,
        color: "var(--color-red)",
        icon: '<ion-icon name="alert-outline"></ion-icon>',
      });
    }
  }
  if (e.target === formName) {
    const newName = document.querySelector("[name='newUsername']");
    if (!newName.value.length) {
      const error = newName.closest(".input").nextElementSibling;
      if (error) error.remove();

      const errorElement = document.createElement("p");
      errorElement.textContent = "Ingresa un nuevo nombre";
      errorElement.className = "error";
      newName
        .closest(".container-input")
        .insertAdjacentElement("beforeend", errorElement);
      return;
    }
    try {
      console.log(newName.value);
      const { data: name, error } = await peticion({
        url: "/update-username",
        method: "POST",
        body: { newName: newName.value },
      });

      if (error) throw error;

      Alert({
        mensaje: name,
        color: "var(--color-green)",
        icon: '<ion-icon name="bag-check-outline"></ion-icon>',
      });

      e.target.reset();

      setInterval(() => {
        location.reload();
      }, 3000);
    } catch (error) {
      Alert({
        mensaje: error,
        color: "var(--color-red)",
        icon: '<ion-icon name="alert-outline"></ion-icon>',
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", validate);
