function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //div pour img pour mieux géré son CSS 
        const div = document.createElement('div');
        div.classList.add('profil-img')
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // Ajout du div avec les trois paragraphes
        const profilInfoDiv = document.createElement('div');
        profilInfoDiv.classList.add('profil-info');

        const countryParagraph = document.createElement('p');
        countryParagraph.classList.add('profil-country');
        countryParagraph.textContent = `${city}, ${country}`;

        const taglineParagraph = document.createElement('p');
        taglineParagraph.classList.add('profil-tagline');
        taglineParagraph.textContent = `${tagline}`;

        const priceParagraph = document.createElement('p');
        priceParagraph.classList.add('profil-price');
        priceParagraph.textContent = `${price}€ /jour`;

        profilInfoDiv.appendChild(countryParagraph);
        profilInfoDiv.appendChild(taglineParagraph);
        profilInfoDiv.appendChild(priceParagraph);


        div.appendChild(img);
        article.appendChild(div);
        article.appendChild(h2);
        article.appendChild(profilInfoDiv)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}