
/*----------------------------- contenu de la page */
panierActif();
creerListProduit()
.then (afficherListProduit);

//----------------------------- functions details

function afficherListProduit(nounours) {
       for (let i in nounours){

              let productContainer = document.createElement("div");
              productContainer.classList.add("col-md-4", "col-sm-6");

              let productCard = document.createElement('div');
              productCard.classList.add('card');

              let productImg = document.createElement ("img");
              productImg.classList.add("card-img-top", "cover");
              productImg.src=nounours[i].imageUrl;
    
              let productCardBody = document.createElement("div");
              productCardBody.classList.add('card-body');
      
              let productCardTitle = document.createElement("h5");
              productCardTitle.classList.add('card-title');
              productCardTitle.innerText= nounours[i].name;

              let productCardPrice = document.createElement("p");
              productCardPrice.innerText = nounours[i].price/100 + " euros";
    
              let productCardButton = document.createElement("a");
              productCardButton.classList.add("btn" , "btn-primary");
              productCardButton.innerText = "détails";
              productCardButton.href='product.html?id=' + nounours[i]._id;
    
              let productDiv= document.getElementById("produits");
              productDiv.appendChild(productContainer);

              productContainer.appendChild(productCard);

              productCard.appendChild(productImg);
              productCard.appendChild(productCardBody);
    
              productCardBody.appendChild(productCardTitle);
              productCardBody.appendChild(productCardPrice);
              productCardBody.appendChild(productCardButton);
       }
}
