
const divPanier = document.getElementById("panier");

if (localStorage.getItem("panier") === null) {
    console.log("il n'y a pas de panier/ le panier est vide");
    let panierVide = document.createElement('p');
    panierVide.innerText= " Votre panier est vide";
    divPanier.appendChild(panierVide);

}
else {
    //let panier = JSON.parse(localStorage.getItem("panier"));
    console.log ("le panier contient des objets");
    console.log(localStorage.panier);

    let panierStorage = localStorage.getItem("panier");
    let panier = JSON.parse(panierStorage);
    for (let i in panier) {
        //on crée la div qui contient le produit
        let divProduct = document.createElement('div');
        divProduct.classList.add("row");
        divPanier.appendChild(divProduct);
        
        //on crée la div avec le nom du produit
        let divProductName = document.createElement('div');
        divProductName.innerText = panier[i].productPanierName;
        divProductName.classList.add("col-6", "border", "m-2");
        divProduct.appendChild(divProductName);

        let divProductPrice = document.createElement('div');
        divProductPrice.innerText = panier[i].productPanierPrice/100;
        divProductPrice.classList.add("col", "border", "m-2", "text-center");
        divProduct.appendChild(divProductPrice);

        let buttonAdd = document.createElement('button');
        buttonAdd.innerText = "+";
        buttonAdd.classList.add("btn","btn-primary", "col", "m-2", "text-center" );
        buttonAdd.type = "button";
        buttonAdd.id = "add";
        divProduct.appendChild(buttonAdd);
        

        let buttonRemove = document.createElement('button');
        //buttonRemove.classList.add("col-md-1");
        buttonRemove.classList.add("btn","btn-primary", "col", "m-2" );
        buttonRemove.type = "button";
        buttonRemove.id = "remove";
        buttonRemove.innerText = "-";
        divProduct.appendChild(buttonRemove);


        let divNumber = document.createElement('div');
        divNumber.classList.add("col", "border", "m-2", "text-center");
        divNumber.innerText = panier[i].productPanierNumber;
        divProduct.appendChild(divNumber);
    };
    let divResume = document.createElement("div");
    let total = 0;
    for (let i in panier) {
        total += panier[i].productPanierPrice * panier[i].productPanierNumber; 
        console.log(total);       
    };
    divResume.innerText = "total de votre commande :    " + total/100 + " euros";
    divResume.classList.add("col", "border", "m-2",);
    divPanier.appendChild(divResume);
}
;


let resulttest = localStorage.getItem ("test");
console.log( "resultat du test du local storage : " + resulttest);

