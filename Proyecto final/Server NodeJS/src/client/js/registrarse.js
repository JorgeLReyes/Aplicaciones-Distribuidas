import request from "../helpers/peticionesSupabase.js";

let validatePassword = false;
const password = document.getElementById("verify-password"),
  confirmPassword = document.querySelector("input[name='password']"),
  email = document.getElementById("email"),
  nombre = document.getElementById("nombre");

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

    console.log(validatePassword);
  });
};

const equalsPasswords = () => password.value === confirmPassword.value;

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const validations = [
    {
      element: nombre,
      message: "Ingrese un nombre válido",
      isValid: () => /^[a-zA-Z\s]+$/.test(nombre.value),
      errorElement: nombre.closest(".input").nextElementSibling,
    },
    {
      element: email,
      message: "Ingrese un correo válido",
      isValid: () => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value),
      errorElement: email.closest(".input").nextElementSibling,
    },
    {
      element: password,
      message: "La contraseña no cumple los requisitos",
      isValid: () => validatePassword,
      errorElement: password.closest(".input").nextElementSibling,
    },
    {
      element: confirmPassword,
      message: "Las contraseñas no coinciden",
      isValid: equalsPasswords,
      errorElement: confirmPassword.closest(".input").nextElementSibling,
    },
  ];

  validations.forEach(({ element, message, isValid, errorElement }) => {
    if (errorElement && errorElement.classList.contains("error")) {
      errorElement.remove();
    }

    if (!isValid()) {
      element.parentElement.insertAdjacentHTML("afterend", mensaje(message));
    }
  });

  if (document.querySelectorAll(".error").length)
    return console.log("Hay errores en el formulario.");

  console.log("El formulario es válido.");
  request({
    method: "post",
    url: "/api/register",
    data: {
      credentials: {
        nombre: nombre.value,
        email: email.value,
        password: confirmPassword.value,
      },
    },
  })
    .then(() => {
      alert(
        "Cuenta pre-registrada con éxito. Espere respuesta de administrador"
      );
    })
    .catch((error) => {
      alert(
        `Hubo un error al pre-registar su cuenta. Intentelo de nuevo\n${error}`
      );
    });
});

document.addEventListener("DOMContentLoaded", () => {
  validate();
});
