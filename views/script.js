fetch("https://official-joke-api.appspot.com/random_joke")
  .then((data) => data.json())
  .then((data) => {
    let index = Math.floor(Math.random() * (data.length - 1));
    document.querySelector("#setup").innerHTML = data.setup;
    document.querySelector("#punchline").innerHTML = data.punchline;
    document.querySelector("#button").addEventListener("click", () => {
      if (document.querySelector("#punchline").style.display === "none") {
        document.querySelector("#punchline").style.display = "block";
      } else {
        document.querySelector("#punchline").style.display = "none";
      }
    });
  });
