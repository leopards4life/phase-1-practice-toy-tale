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
      <button class="like-btn" id=${toy.id}> Like ❤️ </button>`
      toyCollection.appendChild(card);
    });
  };
});
