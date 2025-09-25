const input = document.querySelector(".main .main-content .input-box input");
const urlbox = document.querySelector(".shorten-url-box");
const submit = document.querySelector(".main .main-content .input-box button");

window.copyToClipboard = copyToClipboard;

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  let URL = input.value.trim();
  const matches = URL.match(/https?:\/\//g);

  if (!URL.startsWith("https://") && !URL.startsWith("http://")) {
    URL = "https://" + URL;
  }

  if (
    URL === "" ||
    !URL.includes(".") ||
    URL.length < 5 ||
    URL === "." ||
    URL === "https://." ||
    URL === "http://." ||
    URL === ".com" ||
    URL === "https://.com" ||
    URL === "http://.com" ||
    URL === "www." ||
    URL === "https://www." ||
    URL === "http://www." 

  ) {
    alert("Please enter a valid URL");
    return;
  }

  if (matches && matches.length > 1) {
    alert("Please enter a valid URL");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: URL }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to shorten URL");
      throw new Error("Request failed");
    }

    const data = await response.json();
    const fullShortUrl = `${window.location.origin}/${data.shortUrl}`;

    urlbox.innerHTML = `
      <input id="ShortenUrl" type="text" readonly value="${fullShortUrl}" />
      <button onclick="copyToClipboard('ShortenUrl')">COPY</button>
    `;

    input.value = "";
  } catch (error) {
    console.error("Error:", error);
  }
});

const path = location.pathname.slice(1);
if (path) {
  fetch(`/api/${path}`)
    .then((res) => res.json())
    .then((data) => {
      const redirect = data.url || data.link;
      if (redirect) window.location.replace(redirect);
      else window.location.href = "/error.html";
    })
    .catch((err) => console.error("Fetch failed:", err));
}

function copyToClipboard(inputId) {
  const input = document.getElementById(inputId);
  input.select();

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
