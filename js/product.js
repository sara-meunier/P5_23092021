const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// on récupére l'id présent dans l'URL de la page

/*----------------------------------------------------------------------------- contenu de la page */
panierActif();
getProduct(id)
.then (creationFicheProduit);

/*---------------------------------------------------------------- ajout des articles dans le panier*/

const button = document.getElementById("ajout");
button.addEventListener("click", ajoutProduitPanier);

//----------------------------- functions details

function creationFicheProduit (nounours) {
  
  let titre = document.getElementById("titre");
  titre.innerText = "Recontrez " +  nounours.name; 
  
  let name = document.getElementById("nom");
  name.innerText = nounours.name;

  let description = document.getElementById("description");
  description.innerText = nounours.description;

  let photo = document.getElementById("photo");
  photo.src= nounours.imageUrl;

  let prix=document.getElementById("prix");
  prix.innerText = nounours.price/ 100 + " euros";

  let optionCouleur = document.getElementById("option-couleur");
  for (let i in nounours.colors) {
    let couleur = document.createElement("option");
    couleur.innerText = nounours.colors[i];
    optionCouleur.appendChild(couleur);
  }
}

function ajoutProduitPanier () {
  let productNumber = parseInt(document.getElementById("quantite-produit").value,10);
  getProduct(id)
    /* on créer l'objet contenant le produit + les infos pour le panier*/
 

  .then(function (nounours) {                 
    let productPanier = { 
      productPanierId: id,
      productPanierNumber: productNumber,
      productPanierName : nounours.name,
      productPanierPrice : nounours.price };
    return productPanier;
  })

     /* on récupére le panier du local storage et on regarde si il est vide*/                                         
  .then (function (productPanier) {
    if (localStorage.getItem("panier") === null) { // le panier n'existe pas encore
      console.log("le panier etait vide");
      let panierTemp = [];
      panierTemp.push(productPanier);
      let variableStorage = JSON.stringify(panierTemp);
      localStorage.setItem("panier", variableStorage);
      alert("Produit(s) ajouté(s) au panier");
    }

    else { // le panier existe déjà
      let panierTempStorage = localStorage.getItem("panier");
      let panierTemp = JSON.parse(panierTempStorage); //on récupére le panier et on va le modifier

      /*on compare les id de l'objet aux id du panier*/
      let doublon = false;
      for (let i in panierTemp) {
        if (panierTemp[i].productPanierId === id) { // on regarde si le produit est déjà dans le panier
          console.log ("il y avait deja cet element dans le panier");
          panierTemp[i].productPanierNumber += productNumber; //on change le nombre de produit dans le panier
          doublon = true;
          break;
        }       
      };

      if (doublon === true) { //si il y a un doublon
        localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
        let variableStorage = JSON.stringify(panierTemp);
        localStorage.setItem("panier", variableStorage);
        alert("Produit(s) ajouté(s) au panier");
      }
      else {
        localStorage.removeItem("panier"); // si pas de doublon
        panierTemp.push(productPanier);// on ajout le nouveau produit et on remplace l'ancien panier par le nouveau
        let variableStorage = JSON.stringify(panierTemp);
        localStorage.setItem("panier", variableStorage);
        alert("Produit(s) ajouté(s) au panier");  
      };
    }
  })
}

