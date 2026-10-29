(function () {
  var configured = (typeof teBookingUrl === "function") ? teBookingUrl() : "";
  if (configured) {
    document.querySelectorAll("[data-booking]").forEach(function (el) {
      if (el.tagName === "A") {
        el.setAttribute("href", configured);
      } else if (el.tagName === "BUTTON") {
        el.onclick = function () {
          window.location.href = configured;
        };
      }
    });
  }

  document.querySelectorAll('form[action*="formspree.io"]').forEach(function (form) {
    var status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.hidden = true;
    form.appendChild(status);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.hidden = true;
      status.classList.remove("is-ok", "is-error");
      var button = form.querySelector('[type="submit"]');
      if (button) button.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          return { ok: response.ok, status: response.status, data: data };
        });
      }).then(function (result) {
        if (result.ok) {
          form.reset();
          status.hidden = false;
          status.classList.add("is-ok");
          status.textContent = "Sent. We received your message and will follow up.";
          return;
        }
        var serverMessage = "";
        if (result.data) {
          serverMessage = result.data.error || "";
          if (!serverMessage && result.data.errors && result.data.errors[0]) {
            serverMessage = result.data.errors[0].message || "";
          }
        }
        status.hidden = false;
        status.classList.add("is-error");
        status.textContent = serverMessage
          ? "Not sent. " + serverMessage
          : "Not sent. Please try again, or email info@tylerwork.com.";
      }).catch(function () {
        status.hidden = false;
        status.classList.add("is-error");
        status.textContent = "Not sent. Please try again, or email info@tylerwork.com.";
      }).then(function () {
        if (button) button.disabled = false;
      });
    });
  });
})();
