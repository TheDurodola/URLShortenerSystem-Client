const input = document.querySelector(
  ".main .main-content .input-box input"
)

const submit = document.querySelector(".main .main-content .input-box button");

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  URL = input.value.trim();
  

  try {
    const response = await fetch("http://localhost:8080/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: String(URL) }), 
    });


    
    if (!response.ok) {
      throw new Error("Failed to send text");
    }

    const data = await response.json();
    console.log("Response from API:", data.shortUrl);
    input.value = "";
    
  } catch (error) {
    console.error("Error:", error);
  }
});

const path = location.pathname.slice(1);
if (path) {
  fetch(`/api/${path}`)
    .then(res => res.json())
    .then(data => {
      console.log('Backend data:', data); 
      const redirect = data.url || data.link;
      if (redirect) {
        window.location.replace(redirect);
      } else {
        navigate('/error');
      }
    })
    .catch(err => console.error('Fetch failed:', err));
}
