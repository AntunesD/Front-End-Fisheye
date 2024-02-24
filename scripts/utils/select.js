const menuButton = document.querySelector(".menu-button");
const options = document.querySelector(".options");
const optionItems = document.querySelectorAll(".option");

menuButton.addEventListener("click", function () {
  const expanded = this.getAttribute("aria-expanded") === "true" || false;
  this.setAttribute("aria-expanded", !expanded);
  options.style.display = expanded ? "none" : "block";

  // Filtrer les options pour cacher celle déjà sélectionnée
  optionItems.forEach((option) => {
    if (option.getAttribute("aria-selected") === "true") {
      option.style.display = "none";
    } else {
      option.style.display = "block";
    }
  });
});

optionItems.forEach((option) => {
  option.addEventListener("click", function () {
    optionItems.forEach((item) => item.setAttribute("aria-selected", "false"));
    this.setAttribute("aria-selected", "true");
    menuButton.innerHTML = `${this.textContent} <i class="fas fa-chevron-down fa-chevron"></i> <i class="fas fa-chevron-up fa-chevron"></i>`;
    options.style.display = "none";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

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


  // Ecouter l'événement de changement sur le sélecteur
  const selectElementValue = document
    .getElementById("menu-button")
    .innerText.trim()
    .toLowerCase();

  // Appeler la fonction pour afficher les médias réorganisés avec la valeur initiale du sélecteur
  displaySortedMedia(selectElementValue);
}
