const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" },
    
];


/*affichage des produits dans le DOM*/

for(let produit of produits){
    const div = document.createElement('div');
    div.classList.add("produit")
    let image = document.createElement('img');
    image.classList.add ("images");
    image.src = produit.image;
    image.alt = produit.nom ;
    let nom = document.createElement('h3');
    nom.textContent = produit.nom;
    let price = document.createElement ('p');
    price.textContent=produit.prix + "€";
    let btn = document.createElement('button');
    btn.textContent="Ajouter au panier"

    
    let produitsContainer = document.getElementById('produits-container');
    produitsContainer.appendChild(div);
    div.appendChild(image);
    div.appendChild(nom);
    div.appendChild(price);
    div.appendChild(btn)
    
   
}

console.log(btn)

/*gestion du panier*/

btn.addEventListener("click",()=>{
    /*mettre la ul ici car pas besoin d'en recrée une pour chaque produit*/
    for(let i = 0; i < produits.length;i++){
        if(produit.nom === btn){}
    }

    

    
});

/*affichage du panier*/

const ul = document.createElement ('ul');
const li = document.createElement ('li');
let quantité = document.createElement ('p');
let sousTotal = document.createElement ('p')


ul.appendChild(li);
li.appendChild(nom);
li.appendChild(price);
li.appendChild(quantité);
li.appendChild(sousTotal)
