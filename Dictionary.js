const searchBtn = document.querySelector("#searchButton");
const inp = document.querySelector("#input");
const first = document.querySelector("#firstDef");
const second = document.querySelector("#secondDef");
const third = document.querySelector("#thirdDef");
const image = document.querySelector("#imagen");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const llamarAPI = (word) => {
  fetch(`${url}${word}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data[0]) {
        let definitions = data[0].meanings[0].definitions;

        first.innerHTML = `<b>Def 1: </b>${definitions[0].definition}`;

        if (definitions[1] != undefined) {
          second.innerHTML = `<b>Def 2: </b>${definitions[1].definition}`;
        } else second.innerHTML = "";

        if (definitions[2] != undefined) {
          third.innerHTML = `<b>Def 3: </b>${definitions[2].definition}`;
        } else third.innerHTML = "";
      } else {
        first.innerHTML = "No Definitions Found";
        second.innerHTML =
          "Sorry, we couldn't find definitions for the word you were looking for.";
        third.innerHTML =
          "You can try the search again at later time or head to the web instead.";
      }
    });
};

const llamarAPIGifs = (word) => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=xJPHWaeQSRx8GHnAcO38Cc6eUywGjkkY&q=${word}&limit=25&offset=0&rating=g&lang=en`
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (first.innerHTML == "No Definitions Found") {
        image.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"/>`;
      } else
        image.innerHTML = `<img src="${data.data[0].images.original.url}"/>`;
    });
};

searchBtn.addEventListener("click", () => {
  const content = inp.value;
  llamarAPI(content);
  llamarAPIGifs(content);
});
