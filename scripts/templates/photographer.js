function photographerTemplate(data, titleType) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Lien pour img
    const link = document.createElement("a");
    link.classList.add("profil-link");
    link.href = `../../photographer.html?${id}`;
    link.setAttribute("aria-label", `page de ${name}`);

    // Mettre l'id du photographe dans le storage au click
    link.addEventListener("click", function () {
      localStorage.setItem("selectedPhotographerId", id);
    });

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const htype = document.createElement(titleType);
    htype.textContent = name;

    // Ajout du div info
    const profilInfoDiv = document.createElement("ul");
    profilInfoDiv.classList.add("profil-info");

    const countryParagraph = document.createElement("li");
    countryParagraph.classList.add("profil-country");
    countryParagraph.textContent = `${city}, ${country}`;

    const taglineParagraph = document.createElement("li");
    taglineParagraph.classList.add("profil-tagline");
    taglineParagraph.textContent = `${tagline}`;

    const priceParagraph = document.createElement("li");
    priceParagraph.classList.add("profil-price");
    priceParagraph.textContent = `${price}€ /jour`;

    //Placer les élement avec leur parents

    link.appendChild(img);
    article.appendChild(link);
    if (titleType === "h2") {
      link.appendChild(htype);
    } else {
      const li = document.createElement("li");
      li.appendChild(htype);
      profilInfoDiv.appendChild(li);
    }

    profilInfoDiv.appendChild(countryParagraph);
    profilInfoDiv.appendChild(taglineParagraph);
    article.appendChild(profilInfoDiv);

    if (titleType === "h2") {
      profilInfoDiv.appendChild(priceParagraph);
    } else {
      const likesPriceElement = document.querySelector(".likes_price");
      likesPriceElement.appendChild(priceParagraph);
    }

    return article;
  }

  return { name, picture, getUserCardDOM };
}
