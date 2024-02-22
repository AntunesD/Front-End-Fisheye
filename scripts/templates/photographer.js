function photographerTemplate(data, pageType) {
    const { name, id , portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        // Lien pour img  
        const link = document.createElement('a');
        link.classList.add('profil-link');

        // Vérifier le type de page
        if (pageType === 'index') {
            link.setAttribute('href', '../../photographer.html');
        } else if (pageType === 'photographer') {
            link.setAttribute('href', '#');
        }

        // Récupérer l'id dans le storage
        link.addEventListener('click', function() {
            localStorage.setItem('selectedPhotographerId', id);
        });

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);

        const h1 = document.createElement('h1');
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const priceParagraph = document.createElement('p');
        priceParagraph.classList.add('profil-price');
        priceParagraph.textContent = `${price}€ /jour`;

        
        // Ajout du div info
        const profilInfoDiv = document.createElement('div');
        profilInfoDiv.classList.add('profil-info');
        
        const countryParagraph = document.createElement('p');
        countryParagraph.classList.add('profil-country');
        countryParagraph.textContent = `${city}, ${country}`;
        
        const taglineParagraph = document.createElement('p');
        taglineParagraph.classList.add('profil-tagline');
        taglineParagraph.textContent = `${tagline}`;
        
        
        link.appendChild(img);
        article.appendChild(link);
        
        // Vérifier le type de page pour ajouter ou non h2 et priceParagraph
        if (pageType === 'photographer') {
            profilInfoDiv.appendChild(h1);
        } else if (pageType === 'index') {
            article.appendChild(h2);
        }
        
        profilInfoDiv.appendChild(countryParagraph);
        profilInfoDiv.appendChild(taglineParagraph);
        article.appendChild(profilInfoDiv);
        
        if (pageType === 'index') {
            profilInfoDiv.appendChild(priceParagraph);
        }
        
        return article;
    }
    
    return { name, picture, getUserCardDOM };
}
