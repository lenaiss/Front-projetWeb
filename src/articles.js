// Récupération des articles éventuellement stockées dans le localStorage
let articles = window.localStorage.getItem("articles");
if (articles === null) {
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch('articles.json');
    let articles = await reponse.json();
    console.log(articles);
    console.log(articles.length);
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(articles);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("articles", valeurPieces);    
}
else {
    articles = JSON.parse(articles);
}

// Récupération des artistes éventuellement stockées dans le localStorage
let artistes = window.localStorage.getItem("artistes");
if (artistes === null) {
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch('artistes.json');
    let artistes = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(artistes);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("artistes", valeurPieces);    
}
else {
    artistes = JSON.parse(artistes);
}


function genererPieces(articles) {
    for (let i = 0; i < articles.length; i++) {

        const article = articles[i];
        // const pageProduit = "./produit?id="+articles[i].id

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("button");
        pieceElement.classList.add('card');
        pieceElement.addEventListener('click', () => {
            // Remplacer l'URL actuelle avec la nouvelle page
            // pageArticle(articles[i].id);
            localStorage.setItem("idArticleSelectionne", articles[i].idArticle);
            window.location.replace('./produit.html');
            pageArticle();
        });
                // On rattache la balise article à la section Fiches
                sectionFiches.appendChild(pieceElement);

        // On crée l’élément img.
        const imageElement = document.createElement("img");
        imageElement.classList.add('card-img');
                // On rattache l’image à pieceElement (la balise article)
                pieceElement.appendChild(imageElement);
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = articles[i].image;

        const infoElement = document.createElement("div");
        infoElement.classList.add('card-info')
                        // On rattache les infos à pieceElement (la balise article)
                        pieceElement.appendChild(infoElement);

        const nomElement = document.createElement("p");
        nomElement.classList.add('text-title')
        nomElement.innerText = article.nomArticle;
            infoElement.appendChild(nomElement);


        const footerElement = document.createElement("div");
        footerElement.classList.add('card-footer')
                        // On rattache le footer à pieceElement (la balise article)
                        pieceElement.appendChild(footerElement);
        
        const prixElement = document.createElement("span");
        prixElement.classList.add('text-title');
        prixElement.innerText = `Prix: ${article.prix} €`;
        // prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
            footerElement.appendChild(prixElement);

        
    }
   
}

// Premier affichage de la page
genererPieces(articles);

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    // window.location.replace('./index.html');
    const piecesOrdonnees = Array.from(articles);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Tous les articles";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(articles);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Tous les articles";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


const noms = articles.map(article => article.nom);
for (let i = articles.length - 1; i >= 0; i--) {
    if (articles[i].prix > 35) {
        noms.splice(i, 1);
    }
}

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}



const infos = articles.map(article => article.nom + " – " + article.prix + " €");
for (let i = articles.length - 1; i >= 0; i--) {
    if (!articles[i].disponibilite) {
        infos.splice(i, 1);
    }
}

const diponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const infoElement = document.createElement('li');
    infoElement.innerText = infos[i];
    diponiblesElements.appendChild(infoElement)
}


const inputPrixMax = document.querySelector('#prix-max');
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.prix <= inputPrixMax.value;
    });
    document.querySelector(".filtres label").innerHTML = "Max : "+inputPrixMax.value;
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});





/*CODE DE MOI AIE AIE AIE*/
const filtrerEnStock = document.querySelector(".btn-stock");
filtrerEnStock.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.disponibilite == "true";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Articles en stock";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGroupes = document.querySelector(".btn-groupes");
filtrerGroupes.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].categorie == "Groupe";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Groupes";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerSolos = document.querySelector(".btn-solos");
filtrerSolos.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        console.log(artistes[id-1].categorie);
        return artistes[id-1].categorie == "Solo";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


const filtrerBoysband = document.querySelector(".btn-boysband");
filtrerBoysband.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Boysband";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Boysbands";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGirlsband = document.querySelector(".btn-girlsband");
filtrerGirlsband.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Girlsband";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Girlsbands";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerMixte = document.querySelector(".btn-mixte");
filtrerMixte.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Mixte";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Groupes mixte";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerFille = document.querySelector(".btn-fille");
filtrerFille.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Fille";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Filles solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerGarcon = document.querySelector(".btn-garcon");
filtrerGarcon.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        let id = article.idArtiste;
        return artistes[id-1].sousCategorie == "Garçon";
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Garçons solos";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerAlbums = document.querySelector(".btn-albums");
filtrerAlbums.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.typeArticle == 2;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Albums";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


const filtrerLightstick = document.querySelector(".btn-lightsticks");
filtrerLightstick.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        // console.log(article.typeArticle);
        return article.typeArticle == 1;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Lightsticks";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const filtrerSeasonsGreet = document.querySelector(".btn-seasons-greet");
filtrerSeasonsGreet.addEventListener("click", function () {
    const piecesFiltrees = articles.filter(function (article) {
        return article.typeArticle == 3;
    });
    console.log(piecesFiltrees); // Vérifiez si les articles sont correctement filtrés
    // Effacement de l'écran et regénération de la page
    document.querySelector(".filtres label").innerHTML = "De 0 à 90";
    document.querySelector(".titre h1").innerHTML = "Season s Greetings";
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});