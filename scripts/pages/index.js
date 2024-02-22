async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données des photographes"
    );
  }
  const data = await response.json();
  const photographers = data.photographers;
  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer, 'index');
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
