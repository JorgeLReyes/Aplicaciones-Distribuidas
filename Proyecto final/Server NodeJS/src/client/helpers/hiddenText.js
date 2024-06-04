document.addEventListener("click", (e) => {
  if (e.target.closest("[data-eye]")) {
    const btn = e.target;
    btn.setAttribute(
      "name",
      btn.getAttribute("name") === "eye-off-outline"
        ? "eye-outline"
        : "eye-off-outline"
    );
    const input = btn.closest(".input-icon").previousElementSibling;
    if (input && input.tagName === "INPUT") {
      input.setAttribute(
        "type",
        input.getAttribute("type") === "text" ? "password" : "text"
      );
    }
  }
});
