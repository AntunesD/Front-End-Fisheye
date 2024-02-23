// Affiche les données du photographe
async function displayPhotographerData(photographers) {
  try {
    const photographersSection = document.querySelector(".photograph-header");

    const photographer = photographers[0];

    const photographerModel = photographerTemplate(photographer, "h1");
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'affichage des données du photographe :",
      error
    );
  }
}

// Initialise l'application
async function init() {
  try {
    // Récupère l'ID stocké dans le local storage
    const photographerId = localStorage.getItem("selectedPhotographerId");

    if (!photographerId) {
      console.error("ID du photographe non trouvé dans le stockage local.");
      return;
    }

    // Récupère les données des photographes et des médias
    const { photographers, media } = await getPhotographers();

    // Filtrer les photographes pour n'afficher que celui correspondant à l'ID
    const filteredPhotographers = photographers.filter(
      (photographer) => photographer.id === parseInt(photographerId)
    );

    // Afficher les données filtrées du photographe
    displayPhotographerData(filteredPhotographers);

    // Récupérer le nom du photographe correspondant à photographerId
    const photographerName = photographers.find(
      (photographer) => photographer.id == photographerId
    )?.name;

    // Extraire la première partie du nom du photographe
    const firstName = photographerName.split(" ")[0];

    // Filtrer les médias par photographerId
    const filteredMedia = media.filter(
      (item) => item.photographerId == photographerId
    );

    // Calculer la somme des likes des médias
    const totalLikes = filteredMedia.reduce(
      (total, mediaItem) => total + mediaItem.likes,
      0
    );

    // Sélectionner l'élément où placer le résultat
    const likesPriceElement = document.querySelector(".likes_price");
    // Placer le résultat dans l'élément
    const textTotalLikes = document.createElement("p");
    textTotalLikes.textContent = totalLikes.toString() + " \u2764";
    likesPriceElement.appendChild(textTotalLikes);

    // Afficher les médias du photographe
    displayPhotographerMedia(firstName, filteredMedia);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation de l'application :",
      error
    );
  }
}

// Lancer l'initialisation de l'application
init();
