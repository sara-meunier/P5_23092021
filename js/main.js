const API_URL = "http://localhost:3000/api/teddies";
//localStorage.clear();

//on initialise le panier (vide) dans le local storage//
/*var panierInitial = [0];
var panierInitialStorage = JSON.stringify(panierInitial);
localStorage.setItem ("panier", panierInitialStorage);*/

//------------------------------------------------------création de la classe produit OK
class Product {
    constructor (colors,_id, name, price, description, imageUrl){
        this.colors=colors;
        this._id=_id;
        this.name=name;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
    }
}

//---------------------------------------------------- fonction pour récupérer toutes les infos de l'API OK
function getProducts() {
    fetch (API_URL+"/")
.then ( function(res) {//res = reponse de la requete
    if (res.ok) {
        return res.json();}
        //si la requete s'est bien passé, on récupére les données au format json
})
.then (function (value) {//value = les données récupérées
console.log(value);
})
.catch (function(err) {
    console.log("ohoh... Il y a un probléme")
});
}

 //------------------------------------------------------- créer la liste de produits avec l'idée d'objet

function creerListProduit (nounours) {
    return fetch (API_URL+"/")
    .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();
        }
            //si la requete s'est bien passé, on récupére les données au format json
    })

    .then (function (value) {//value = les données récupérées
        let nounours = [];
        
        for (i = 0; i<value.length; i++) {
            let colorsproduct = value[i].colors;
            let idproduct = value[i]._id;
            let nameproduct = value[i].name;
            let priceproduct = value[i].price;
            let descriptionproduct =value[i].description;
            let imageUrlproduct = value [i].imageUrl; 
    
        console.log(i + " : " + nameproduct); //pour verifier que la boucle a bien marche OK

        let product = new Product (
            colorsproduct,
            idproduct,
            nameproduct,
            priceproduct,
            descriptionproduct,
            imageUrlproduct
        );
     
        nounours.push (product);
        console.log (nounours.length);
        }
        return nounours;
    })

    .catch (function(err) {
    console.log("ohoh... Il y a un probléme")
    });
}


//----------------------------------------------------fonction pour récupérer les infos de 1 objets de l'API OK
function getProduct(id) {
    return fetch (API_URL+"/"+ id)
        .then ( function(res) {
            if (res.ok) {
                return res.json();}
        })
        
        .then (function (value) {//value = les données récupérées
            
            let colorsproduct = value.colors;
            let idproduct = value._id;
            let nameproduct = value.name;
            let priceproduct = value.price;
            let descriptionproduct =value.description;
            let imageUrlproduct = value.imageUrl; 
    
            let product = new Product (
                colorsproduct,
                idproduct,
                nameproduct,
                priceproduct,
                descriptionproduct,
                imageUrlproduct
            );
            return product;
            })

        .catch (function(err) {
            console.log("ohoh... Il y a un probléme");
        })
}
//---------------------------------------------------------------------function pour créer une card ?
/*function creerCard (product) {
    let productCard = document.createElement('div');
    productCard.classList.add('card', "col-md-4");

    let productCardBody = document.createElement("div");
    productCardBody.classList.add('card-body');
  

    let productCardTitle = document.createElement("h5");
    productCardTitle.classList.add('card-title');
    productCardTitle = document.innerText= product.name;


    let productCardButton = document.createElement("a");
    productCardButton.classList.add("btn" , "btn-primary");
    productCardButton.innerText = "détails";
    productCardButton.href='product.html?id=' + product._id;

    let productDiv= document.getElementById("produits");
    productDiv.appendChild(productCard);

    productCard.appendChild(productCardBody);

    productCardBody.appendChild(productCardTitle);
    productCardBody.appendChild(productCardButton);
}*/