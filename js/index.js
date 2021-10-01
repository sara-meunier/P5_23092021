//test pour vérifier que le javascript est bien chargé
console.log("hello world");





//getProducts();
//document.getElementById("description1").innerText="blabla, test dans la div description";
//afficheListeProduit();
//getProduct(2);

/*document.getElementById("photo1").innerText= getProduct(2); NON*/

//creerDivBoucle();

creerListProduit()
.then (function (nounours){
    console.log(nounours);
    console.log(nounours[2])
});

//console.log("deuxieme log : "+nounours[3]);

creerListProduit()
.then ( function (nounours) {
 for (let i in nounours){

        let productCard = document.createElement('div');
        productCard.classList.add('card', "col-md-4", "col-sm-6");

        let productImg = document.createElement ("img");
        productImg.classList.add("card-img-top");
        productImg.src=nounours[i].imageUrl;
    
        let productCardBody = document.createElement("div");
        productCardBody.classList.add('card-body');
      
    
        let productCardTitle = document.createElement("h5");
        productCardTitle.classList.add('card-title');
        productCardTitle.innerText= nounours[i].name;
    
    
        let productCardButton = document.createElement("a");
        productCardButton.classList.add("btn" , "btn-primary");
        productCardButton.innerText = "détails";
        productCardButton.href='product.html?id=' + nounours[i]._id;
    
        let productDiv= document.getElementById("produits");
        productDiv.appendChild(productCard);

        productCard.appendChild(productImg);
        productCard.appendChild(productCardBody);
        
    
        productCardBody.appendChild(productCardTitle);
        productCardBody.appendChild(productCardButton);
 }
    
});
//pourquoi ç amarche pas ?
//console.log(nounours [2]);