const produits = [
  {
    id: 1,
    nom: "Thé Vert Bio",
    prix: 12.99,
    quantite: 1,
    image:
      "https://www.coffee-webstore.com/modules/prestablog/views/img/grid-for-1-7/up-img/426.jpg",
  },
  {
    id: 2,
    nom: "Café Arabica",
    prix: 8.5,
    quantite: 1,
    image:
      "https://www.losprimos.fr/sites/default/files/inline-images/caf%C3%A9%20arabica.jpg",
  },
  {
    id: 3,
    nom: "Infusion Menthe",
    prix: 5.0,
    quantite: 1,
    image:
      "https://www.herboristerieduvalmont.com/mes-remedes-naturels/wp-content/uploads/2023/11/menthe-tisane-scaled.jpeg",
  },
  {
    id: 4,
    nom: "Chocolat Chaud",
    prix: 15.0,
    quantite: 1,
    image:
      "https://www.cocktail.fr/wp-content/uploads/2017/05/cocktail.fr-44087-1013x675.jpg.webp",
  },
];

let panier = [];

/*===================================*/
/*affichage des produits dans le DOM*/
/*==================================*/

for (let produit of produits) {
  const div = document.createElement("div");
  div.classList.add("produit");

  let image = document.createElement("img");
  image.classList.add("images");
  image.src = produit.image;
  image.alt = produit.nom;

  let nom = document.createElement("h3");
  nom.textContent = produit.nom;

  let price = document.createElement("p");
  price.textContent = produit.prix + "€";

  let btn = document.createElement("button");
  btn.textContent = "Ajouter au panier";

  btn.addEventListener("click", () => {
    ajouterPanier(produit);
  });

  let produitsContainer = document.getElementById("produits-container");
  div.appendChild(image);
  div.appendChild(nom);
  div.appendChild(price);
  div.appendChild(btn);

  produitsContainer.appendChild(div);
}

/*==================*/
/*gestion du panier*/
/*=================*/

function ajouterPanier(produit) {
  let produitsExistant = panier.find(
    (produitDuPanier) => produitDuPanier.nom === produit.nom
  );

  if (produitsExistant) {
    produitsExistant.quantite++;
  } else {
    panier.push({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: 1,
    });
  }

  affichagePanier();
}

/*====================*/
/*affichage du panier*/
/*==================*/

function calculerMontantTotal() {
  let total = 0;
  for (let produit of panier) {
    total += produit.prix * produit.quantite;
  }
  return total;
}

function affichagePanier() {
  const panierContainer = document.getElementById("panier-liste");
  let montantTotal = document.getElementById("montant-total");
  panierContainer.textContent = "";

  if (panier.length === 0) {
    panierContainer.textContent = "Votre panier est vide";
    return;
  }

  const ul = document.createElement("ul");

  for (let produit of panier) {
    const li = document.createElement("li");
    const sousTotalArticle = produit.prix * produit.quantite;

    const nomProduit = document.createElement("p");
    nomProduit.textContent = produit.nom;

    const prixUnitaire = document.createElement("p");
    prixUnitaire.textContent = produit.prix + "€";

    const quantite = document.createElement("p");
    quantite.textContent = "x" + produit.quantite;

    /*bouton ajouter produit*/

    const btnAjouterProduit = document.createElement("button");
    btnAjouterProduit.textContent = "ajouter un produit";

    btnAjouterProduit.addEventListener("click", () => {
      produit.quantite++;
      affichagePanier();
    });

    /*bouton supprimer produit*/
    const btnSupProduit = document.createElement("button");
    btnSupProduit.textContent = "supprimer un produit";

    btnSupProduit.addEventListener("click", () => {
      if (produit.quantite > 1) {
        produit.quantite--;
        affichagePanier();
      } else {
        li.remove(produit);
      }
    });

    /*bouton supprimer produit peux importe le nb de produit*/

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Supprimer du panier";

    btnDelete.addEventListener("click", () => {
      // Trouve l'index du produit dans le tableau panier
      const index = panier.findIndex((p) => p.nom === produit.nom);

      // Supprime le produit du tableau
      if (index !== -1) {
        panier.splice(index, 1);
      }

      // Réaffiche le panier
      affichagePanier();
    });

    /*=============================*/
    /*====Calculs==================*/
    /*=============================*/
    const sousTotal = document.createElement("p");
    sousTotal.textContent = `Sous-total: ${sousTotalArticle}€`;
    /******************************/

    li.appendChild(nomProduit);
    li.appendChild(prixUnitaire);
    li.appendChild(quantite);
    li.appendChild(btnAjouterProduit);
    li.appendChild(btnSupProduit);
    li.appendChild(sousTotal);
    li.appendChild(btnDelete);

    ul.appendChild(li);
  }

  panierContainer.appendChild(ul);

  const totalFinal = calculerMontantTotal();
  montantTotal.textContent = totalFinal.toFixed(2);
}

affichagePanier();

/*===========================================*/
/*========Validation de commande ===========*/
/*==========================================*/

let btnCommander = document.getElementById("btn-commander");
let input = document.getElementById("email-client");
const regexAdresseMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const msgFeedback = document.getElementById("message-feedback");

function validerCommande() {
  input.textContent = input.value;

  if (!regexAdresseMail.test(input.value)) {
    msgFeedback.textContent = "Veuillez entrer une adresse e-mail valide.";
    msgFeedback.style.color = "red";
    msgFeedback.style.fontSize = "x-small";
    msgFeedback.style.fontFamily = "Roboto";
  } else {
    msgFeedback.textContent = "Adresse mail valide";
    msgFeedback.style.color = "green";
    msgFeedback.style.fontSize = "x-small";
    msgFeedback.style.fontFamily = "Roboto";
  }
  console.log(input.value);
  return;
}

btnCommander.addEventListener("click", () => {
  validerCommande();

  let msgCommande = document.getElementById("message-confirmation");
  if (!regexAdresseMail.test(input.value)) {
    msgCommande.textContent =
      "Impossible de passer la commande l'adresse mail n'est pas valide";
    msgCommande.style.color = "red";
    msgCommande.style.fontSize = "Large";
    msgCommande.style.fontFamily = "Roboto";
  } else {
    msgCommande.textContent = "Commande validée";
    msgCommande.style.color = "green";
    msgCommande.style.fontSize = "Large";
    msgCommande.style.fontFamily = "Roboto";
  }
});
