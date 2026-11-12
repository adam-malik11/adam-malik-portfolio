const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const data = new FormData(form);
  const subject = data.get("subject") || "Message from your portfolio";
  const body = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    "",
    data.get("message"),
  ].join("\n");
  const mailto = `mailto:adamalik112005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = "Your email app should open with your message ready to send.";
  window.location.href = mailto;
});
