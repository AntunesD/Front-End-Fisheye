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
    // Obtient les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Récupère l'ID du photographe à partir des paramètres de l'URL
    const photographerId = urlParams.get("photographeId");
    console.log(photographerId);

    if (!photographerId) {
      console.error("ID du photographe non trouvé.");
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
    const photographerName = filteredPhotographers[0].name;

    // Extraire la première partie du nom du photographe
    const firstName = photographerName.split(" ")[0];

    // Ajouter le nom du photographe a la modal de contact
    var modalHeader = document.querySelector("#contact_modal .modal header h2");

    modalHeader.innerHTML += ` <br> ${photographerName}`;

    // Filtrer les médias par photographerId
    const filteredMedia = media.filter(
      (item) => item.photographerId == photographerId
    );
    totalLikes(filteredMedia);
    selected(firstName, filteredMedia);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation de l'application :",
      error
    );
    return;
  }
}

function totalLikes(filteredMedia) {
  // Calculer la somme des likes des médias
  const totalLikes = filteredMedia.reduce(
    (total, mediaItem) => total + mediaItem.likes,
    0
  );

  // Sélectionner l'élément où placer le résultat
  const likesPriceElement = document.querySelector(".likes_price");
  // Placer le résultat dans l'élément
  const textTotalLikes = document.createElement("li");
  textTotalLikes.classList.add("likes_total");
  textTotalLikes.textContent = totalLikes.toString() + " \u2764";
  likesPriceElement.appendChild(textTotalLikes);
}

// Lancer l'initialisation de l'application
init();
