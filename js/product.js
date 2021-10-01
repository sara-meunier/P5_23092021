const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// on récupére l'id présent dans l'URL de la page

/*----------------------------------------------------------------------------- contenu de la page */
getProduct(id)
.then(function(nounours) {
  console.log(nounours);

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
  
  });


  /* verification du panier pour test*/

  let test = localStorage.getItem("panier");
  //let test= JSON.parse(testStor);
  console.log( "dans le panier actuellement : " + test);

/*---------------------------------------------------------------- ajout des articles dans le panier*/

const button = document.getElementById("ajout");

/* on ajoute un event au moment du click */
button.addEventListener("click", () => {

  /*test pour verifier le localstorage*/
  let testlocalstorage= "test local storage réussi";
  localStorage.setItem("test", testlocalstorage);

  let productNumber = parseInt(document.getElementById("quantite-produit").value,10);

  getProduct(id)
    /* on créer l'objet contenant le produit + les infos pour le panier*/
  .then(function (nounours) {                 
    let productPanier = { productPanierId: id, productPanierNumber: productNumber, productPanierName : nounours.name, productPanierImageUrl: nounours.imageUrl, productPanierPrice : nounours.price };
    console.log ("productPanier : " + JSON.stringify(productPanier));
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
    }


    else { // le panier existe déjà
      console.log("il y avait quelque chose dans le panier");
      let panierTempStorage = localStorage.getItem("panier");
      let panierTemp = JSON.parse(panierTempStorage); //on récupére le panier et on va le modifier

      /*on compare les id de l'objet aux id du panier*/
      let doublon = false;
      //let productNumberBefore = 0;
      for (let i in panierTemp) {
        if (panierTemp[i].productPanierId === id) { // on regarde si le produit est déjà dans le panier
          console.log ("il y a deja cet element dans le panier");
          panierTemp[i].productPanierNumber += productNumber;
          console.log("il y avait deja  produits avec cet id dans le panier")
          doublon = true;
          break;
        }       
      };

      console.log("doublon : " + doublon);

      if (doublon === true) {
        console.log("il y a maintenant : " +  productPanier.productPanierNumber +"produits");
        localStorage.removeItem("panier");
        let variableStorage = JSON.stringify(panierTemp);
        localStorage.setItem("panier", variableStorage);
      }
      else {
        localStorage.removeItem("panier");
        panierTemp.push(productPanier);
        let variableStorage = JSON.stringify(panierTemp);
        localStorage.setItem("panier", variableStorage);       
      };
    }
  })
})
