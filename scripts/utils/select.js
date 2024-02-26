// const menuSelected = document.querySelector(".menu-selected");
const options = document.querySelector(".options");
const optionItems = document.querySelectorAll(".option");
const menuButton = document.getElementById("menu-button");
const downArrow = document.querySelector(".fa-chevron-down");
const upArrow = document.querySelector(".fa-chevron-up");

upArrow.style.display = "none";

//Deroule le menu selon la sourie
options.addEventListener('mouseenter', expandList);
options.addEventListener('mouseleave', collapseList);

// Fonction pour dérouler le menu
function expandList() {
  options.setAttribute("aria-expanded", "true");
  options.style.height = "auto";
  downArrow.style.display = "none";
  upArrow.style.display = "block";
  const hyde = document.querySelectorAll(".hyde");
  hyde.forEach((element) => {
    element.style.opacity = "1";
  });
}

//Fonction pour fermer le menu
function collapseList() {
  options.setAttribute("aria-expanded", "false");
  options.style.height = "69px";
  downArrow.style.display = "block";
  upArrow.style.display = "none";
  const hyde = document.querySelectorAll(".hyde");
  hyde.forEach((element) => {
    element.style.opacity = "0";
  });
}

function selected(firstName, filteredMedia) {
  // Fonction pour afficher les médias en fonction de la valeur sélectionnée
  function displaySortedMedia(selectedValue) {
    let sortedMedia;
    if (selectedValue === "popularité") {
      sortedMedia = filteredMedia.sort((a, b) => b.likes - a.likes);
    } else if (selectedValue === "date") {
      sortedMedia = filteredMedia.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (selectedValue === "titre") {
      sortedMedia = filteredMedia.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
    // Afficher les médias réorganisés
    displayPhotographerMedia(firstName, sortedMedia);
  }

  optionItems.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.innerText.trim().toLowerCase();
      // Appelez la fonction pour afficher les médias réorganisés avec la valeur sélectionnée
      displaySortedMedia(selectedValue);
    });
  });

  // Initialiser les photos
  const selectElementValue = options
    .querySelector("li")
    .innerText.trim()
    .toLowerCase();

  // Appeler la fonction pour afficher les médias réorganisés avec la valeur initiale du sélecteur
  displaySortedMedia(selectElementValue);
}
let selectedOptionIndex = 0; // Indice de l'option actuellement sélectionnée

// Fonction pour mettre le focus sur l'option sélectionnée
function focusSelectedOption() {
  optionItems[selectedOptionIndex].focus();
}

// Gestion de la navigation avec les touches fléchées
document.addEventListener("keydown", function (event) {
  if (options.getAttribute("aria-expanded") === "true") {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectedOptionIndex = (selectedOptionIndex + 1) % optionItems.length;
      focusSelectedOption();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      selectedOptionIndex =
        (selectedOptionIndex - 1 + optionItems.length) % optionItems.length;
      focusSelectedOption();
    } else if (event.key === "Enter") {
      // Sélectionner l'option si "Entrée" est enfoncée
      optionItems[selectedOptionIndex].click();
    }
  }
});

// Mettre à jour l'indice de l'option sélectionnée lorsqu'une option est cliquée
optionItems.forEach((option, index) => {
  option.addEventListener("click", function () {
    selectedOptionIndex = index;
    optionItems.forEach((item) => {
      item.setAttribute("aria-selected", "false");
      item.classList.remove("view");
      item.classList.add("hyde");
    });

    this.setAttribute("aria-selected", "true");
    this.classList.remove("hyde");
    this.classList.add("view");
    option.parentNode.prepend(option); //Le remet en premier à son parent
  });
});

// Gérer le focus sur les options pour définir aria-expanded à true
optionItems.forEach((option) => {
  option.addEventListener("focus", function () {
    expandList()
  });
});

// Gérer le blur sur les options pour définir aria-expanded à false
optionItems.forEach((option) => {
  option.addEventListener("blur", function () {
    collapseList()
  });
});
