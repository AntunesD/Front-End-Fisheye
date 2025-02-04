// Fonction pour afficher la modal
function displayModalPhoto(filteredMedia, firstName, src, title) {
  // Vérifier si la modal existe déjà
  const existingModal = document.querySelector(".modal-photo");
  if (existingModal) {
    // Si elle existe, la supprimer
    existingModal.parentNode.removeChild(existingModal);
  }

  // Créer la structure HTML de la modal
  const modal = document.createElement("div");
  modal.classList.add("modal-photo");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.classList.add("close-button");
  closeButton.setAttribute("aria-label", "Fermer la modal");
  closeButton.onclick = function () {
    modal.remove();
  };

  const leftArrow = document.createElement("button");
  leftArrow.innerHTML = `<span class="fa-solid fa-chevron-left"></span>`;
  leftArrow.classList.add("arrow", "left-arrow");
  leftArrow.setAttribute("aria-label", "Photo précédente");
  leftArrow.onclick = afficherMediaPrecedent;

  // Fonction pour afficher le média précédent
  function afficherMediaPrecedent() {
    const currentIndex = filteredMedia.findIndex(
      (media) => media.title === title
    );
    const previousIndex =
      (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    const previousMedia = filteredMedia[previousIndex];

    // Détacher l'écouteur d'événements de la touche gauche
    document.removeEventListener("keydown", onKeyDown);

    // Supprimer la modal
    modal.remove();

    // Afficher la nouvelle modal avec le média précédent
    displayModalPhoto(
      filteredMedia,
      firstName,
      previousMedia.image ? previousMedia.image : previousMedia.video,
      previousMedia.title
    );
  }

  const rightArrow = document.createElement("button");
  rightArrow.innerHTML = `<span class="fa-solid fa-chevron-right"></span>`;
  rightArrow.classList.add("arrow", "right-arrow");
  rightArrow.setAttribute("aria-label", "Photo suivante");
  rightArrow.onclick = afficherMediaSuivant;
  // Fonction pour afficher le média suivant
  function afficherMediaSuivant() {
    const currentIndex = filteredMedia.findIndex(
      (media) => media.title === title
    );
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    const nextMedia = filteredMedia[nextIndex];

    // Détacher l'écouteur d'événements de la touche droite
    document.removeEventListener("keydown", onKeyDown);

    // Supprimer la modal
    modal.remove();

    // Afficher la nouvelle modal avec le média suivant
    displayModalPhoto(
      filteredMedia,
      firstName,
      nextMedia.image ? nextMedia.image : nextMedia.video,
      nextMedia.title
    );
  }

  // Gestionnaire d'événements du clavier
  function onKeyDown(event) {
    // Vérifier si l'élément avec la classe "modal-photo" est présent
    const modalPhoto = document.querySelector(".modal-photo");
    if (!modalPhoto) {
      return; // Quitter la fonction si l'élément n'est pas trouvé
    }

    if (event.key === "ArrowRight") {
      afficherMediaSuivant();
    } else if (event.key === "ArrowLeft") {
      afficherMediaPrecedent();
    } else if (event.key === "Escape") {
      // Supprimer la modal si la touche "Escape" est pressée
      modal.remove();
      // Détacher les écouteurs d'événements de la touche gauche et droite
      document.removeEventListener("keydown", onKeyDown);
    }
  }

  // Ajouter l'écouteur d'événements pour la touche droite
  document.addEventListener("keydown", onKeyDown);

  const modalMedia = document.createElement(
    src.endsWith(".mp4") ? "video" : "img"
  );
  modalMedia.src = `../../assets/images/${firstName}/${src}`;
  modalMedia.alt = title;

  if (src.endsWith(".mp4")) {
    modalMedia.setAttribute("controls", "");
    modalMedia.setAttribute("autoplay", "");
  }

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;

  modalContent.appendChild(closeButton);
  modalContent.appendChild(leftArrow);
  modalContent.appendChild(modalMedia);
  modalContent.appendChild(rightArrow);
  modalContent.appendChild(modalTitle);
  modal.appendChild(modalContent);

  // Ajouter la modal au body
  document.body.appendChild(modal);

  // Fermer la modal en cliquant en dehors de celle-ci
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.remove();
    }
  };
}
