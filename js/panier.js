/*---------------------------------------------------- mise en page du panier*/

let formulaire = document.getElementById("formulaire");

const divPanier = document.getElementById("panier");

if (localStorage.getItem("panier") === null) { //si le panier est vide
    let panierVide = document.createElement('p');
    panierVide.innerText= " Votre panier est vide";
    divPanier.appendChild(panierVide);
}
else { //si le panier est plein
    creationTableauPanier();
    creationBoutonCommande();    
}


/*-------------envoie d'un objet au serveur*/


const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", sendOrder)




//----------------------------- functions details


function creationTableauPanier () {
    let tableau = document.getElementById("tablebody");

    let panierStorage = localStorage.getItem("panier");
    let panier = JSON.parse(panierStorage);

    // on crée le tableau de produits
    for (let i in panier) {
        //on crée la div qui contient le produit
        let ligne = document.createElement('tr');
        tableau.appendChild(ligne);

        let divProduct = document.createElement('th');
        //divProduct.innerText = i;
        ligne.appendChild(divProduct);

        //on crée la div avec le nom du produit
        let divProductName = document.createElement('td');
        divProductName.innerText = panier[i].productPanierName;
        ligne.appendChild(divProductName);
        
        //on crée la div avec le prix du produit
        let divProductPrice = document.createElement('td');
        divProductPrice.innerText = panier[i].productPanierPrice/100;
        ligne.appendChild(divProductPrice);

       
        let divButton = document.createElement("td");
        ligne.appendChild(divButton);

        // on crée le bouton +
        let buttonAdd = document.createElement('button');
        buttonAdd.innerText = "+";
        buttonAdd.classList.add("btn","btn-primary", "col-2", "m-2", "text-center", "add" );
        buttonAdd.type = "button"; 
        divButton.appendChild(buttonAdd);

        
        buttonAdd.addEventListener("click", () => {
            panier[i].productPanierNumber += 1;
            divNumber.innerText = panier[i].productPanierNumber;
            localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
            let variableStorage = JSON.stringify(panier);
            localStorage.setItem("panier", variableStorage);
            location.reload();
        });
        
        //on crée le bouton -
        let buttonRemove = document.createElement('button');
        buttonRemove.innerText = "-";
        buttonRemove.classList.add("btn","btn-primary", "col-2", "m-2", "text-center","remove" );
        buttonRemove.type = "button";        
        divButton.appendChild(buttonRemove);

        buttonRemove.addEventListener("click", () => {
            panier[i].productPanierNumber -= 1;

            if (panier[i].productPanierNumber === 0){
                panier.splice(i, 1);
                ligne.remove;
                localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
                let variableStorage = JSON.stringify(panier);
                localStorage.setItem("panier", variableStorage);
                location.reload();
            }
            else {
            divNumber.innerText = panier[i].productPanierNumber;
            localStorage.removeItem("panier");// on remplace l'ancien panier par le nouveau
            let variableStorage = JSON.stringify(panier);
            localStorage.setItem("panier", variableStorage);
            location.reload();
            }
        });

        //on crée la div avec la quantité du produit
        let divNumber = document.createElement('td');
        divNumber.innerText = panier[i].productPanierNumber;
        ligne.appendChild(divNumber);
    };

    //on crée la div avec le total
    let divResume = document.createElement("div");
    let total = 0;
    for (let i in panier) {
        total += panier[i].productPanierPrice * panier[i].productPanierNumber;        
    };
    divResume.innerText = "total de votre commande :    " + total/100 + " euros";
    divResume.classList.add("col", "border", "m-2",);
    divPanier.appendChild(divResume);
}

function creationBoutonCommande () {
    let divButtonBuy = document.getElementById("buttonBuy");

    let buttonBuy = document.createElement('button');
    buttonBuy.innerText = "commander";
    buttonBuy.classList.add("btn","btn-primary", "col-2", "m-2", "text-center", "add" );
    buttonBuy.type = "button"; 
    divButtonBuy.appendChild(buttonBuy);

    buttonBuy.addEventListener("click", () => {
        formulaire.hidden = false;
    });
}

function creationOrder () {

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    if (!firstName || !lastName || !address || !city || !email){ // si un des champs est nul
        console.log(" probleme avec le formulaire")
        return null;
    }
    else {
        let contact = {
            firstName : firstName,
            lastName : lastName,
            address : address,
            city : city,
            email : email,        
        };
        console.log(contact);

        let products = [];
        let panierStorage = localStorage.getItem("panier");
        let panier = JSON.parse(panierStorage);

        for (let i in panier) {
            for (let j = panier[i].productPanierNumber; j!=0; j--) {
                console.log("j = " + j);
                products.push(panier[i].productPanierId);
            }
        };
        let order = { contact : contact,
        products : products,
    }
        console.log (products);
        return order;
    };
}

function sendOrder(e) {
    e.preventDefault();
    let order = creationOrder();
    if (order === null) return;

    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    })

    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      else { console.log ("ça ne marche pas");}
    })

    .then(function(orderResult) {
        console.log(orderResult);
        location.assign("confirmation.html?orderId=" + orderResult.orderId)
    });
}

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();