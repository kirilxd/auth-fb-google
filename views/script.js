fetch("https://official-joke-api.appspot.com/random_joke")
  .then((data) => data.json())
  .then((data) => {
    let index = Math.floor(Math.random() * (data.length - 1));
    let setupElement = document.querySelector("#setup");
    let punchlineElement = document.querySelector("#punchline");
    setupElement.innerHTML = data.setup;
    punchlineElement.innerHTML = data.punchline;
    document.querySelector("#button").addEventListener("click", () => {
      if (punchlineElement.style.display === "none") {
        punchlineElement.style.display = "block";
      } else {
        punchlineElement.style.display = "none";
      }
    });
  });
