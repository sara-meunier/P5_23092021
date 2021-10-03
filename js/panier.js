/*---------------------------------------------------- mise en page du panier*/


const divPanier = document.getElementById("panier");

if (localStorage.getItem("panier") === null) { //si le panier est vide
    console.log("il n'y a pas de panier/ le panier est vide");
    let panierVide = document.createElement('p');
    panierVide.innerText= " Votre panier est vide";
    divPanier.appendChild(panierVide);

}
else { //si le panier est plein
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
        divProductName.classList.add("col", "border", "m-2");
        divProduct.appendChild(divProductName);
        
        //on crée la div avec le prix du produit
        let divProductPrice = document.createElement('div');
        divProductPrice.innerText = panier[i].productPanierPrice/100;
        divProductPrice.classList.add("col", "border", "m-2", "text-center");
        divProduct.appendChild(divProductPrice);

        // on crée le bouton +
        let buttonAdd = document.createElement('button');
        buttonAdd.innerText = "+";
        buttonAdd.classList.add("btn","btn-primary", "col-2", "m-2", "text-center", "add" );
        buttonAdd.type = "button"; 
       // buttonAdd.id = "add";
        divProduct.appendChild(buttonAdd);
        buttonAdd.addEventListener("click", () => {
            alert("click-add");
            panier[i].productPanierNumber += 1;
            divNumber.innerText = panier[i].productPanierNumber;
            localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
            let variableStorage = JSON.stringify(panier);
            localStorage.setItem("panier", variableStorage);

        })
        
        //on crée le bouton -
        let buttonRemove = document.createElement('button');
        buttonRemove.classList.add("btn","btn-primary", "col-2", "m-2", "text-center","remove" );
        buttonRemove.type = "button";
        buttonRemove.innerText = "-";
        divProduct.appendChild(buttonRemove);
        buttonRemove.addEventListener("click", () => {
            alert("click-add");
            panier[i].productPanierNumber -= 1;
            divNumber.innerText = panier[i].productPanierNumber;
            localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
            let variableStorage = JSON.stringify(panier);
            localStorage.setItem("panier", variableStorage);

        })

        //on crée la div avec la quantité du produit
        let divNumber = document.createElement('div');
        divNumber.classList.add("col", "border", "m-2", "text-center", "divNumber");
        divNumber.innerText = panier[i].productPanierNumber;
        divProduct.appendChild(divNumber);
    };

    //on crée la div avec le total
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
