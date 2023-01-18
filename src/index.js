let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => renderToys(json))
};

  function renderToys(toys) {
    const toyCollection = document.getElementById("toy-collection");
    toys.forEach(toy => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} Likes</p>
      <button class="like-btn" onclick="updateLikes(event)" data=${toy.likes} id=${toy.id}> Like ❤️ </button>`
      toyCollection.appendChild(card);
    });
  };
});

function newToy(event){
fetch ("http://localhost:3000/toys", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
})
.then(res => res.json())
};

const createToyButton = document.querySelector(".submit");
createToyButton.addEventListener("click", newToy);


function updateLikes(event) {
  let id = parseInt(event.target.id);
  let newNumberOfLikes = parseInt(event.target.attributes.data.value) + 1;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  "likes": newNumberOfLikes
})
})
.then(res => res.json());
let likeDisplay = event.target.previousElementSibling;
likeDisplay.innerHTML = `${newNumberOfLikes} Likes`; 
event.target.attributes.data.value = newNumberOfLikes;
};
