/*---------------------------------------------------- mise en page du panier*/

let formulaire = document.getElementById("formulaire");
const divPanier = document.getElementById("panier");

if (localStorage.getItem("panier") === null) { //si le panier n'existe pas
    let panierVide = document.createElement('p');
    panierVide.innerText= " Votre panier est vide";
    divPanier.appendChild(panierVide);
}
else { //si le panier existe
    creationTableauPanier();
    creationBoutonCommande();    
}

/*-------------envoie d'un objet au serveur*/


const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", sendOrder);


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
            console.log("panier lenght = " + panier.lenght);
            console.log("panier = " + JSON.stringify(panier) )

            if (panier[i].productPanierNumber === 0){ //si la quantité du produit decend à 0
                panier.splice(i, 1);
                ligne.remove; // on retire le produit de la page

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
    let divResume = document.createElement("p");
    let total = 0;
    for (let i in panier) {
        total += panier[i].productPanierPrice * panier[i].productPanierNumber;        
    };
    divResume.innerText = "total de votre commande :    " + total/100 + " euros";
    divResume.classList.add("col", "border", "m-2", "font-weight-bold",);
    divPanier.appendChild(divResume);

    if (total === 0) {
        console.log("panier supprimé");
                    localStorage.removeItem("panier");
                   location.reload();

    }
}

function creationBoutonCommande () {
    let divButtonBuy = document.getElementById("buttonBuy");

    let buttonBuy = document.createElement('button');
    buttonBuy.innerText = "commander";
    buttonBuy.classList.add("btn","btn-primary", "col-2", "m-2", "text-center", "add" );
    buttonBuy.type = "button"; 
    divButtonBuy.appendChild(buttonBuy);

    // on rend le formulaire de contact accessible aprés le click sur le bouton "'commander"
    buttonBuy.addEventListener("click", () => {
        formulaire.classList.remove("d-none");
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

        let products = [];
        let panierStorage = localStorage.getItem("panier");
        let panier = JSON.parse(panierStorage);

        for (let i in panier) {
            for (let j = panier[i].productPanierNumber; j!=0; j--) {
                products.push(panier[i].productPanierId);
            }
        };
        let order = {
            contact : contact,
            products : products,
        }
        return order;
    };
}

function sendOrder(e) {
        
    let order = creationOrder();
    let form = document.getElementById("form");

    if (order === null || !form.checkValidity()) { // si le formulaire n'est pas valide
        console.log("form pas validé");
     return;}

    else { //si le formulaire est valide
        e.preventDefault();
        // on envoie la commande au serveur
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order),
        })

        //on récupére la réponse du serveur
        .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        else { console.log ("ça ne marche pas");}
        })

        // on redirige sur la page de confirmation de commande
        .then(function(orderResult) {
            location.assign("confirmation.html?orderId=" + orderResult.orderId) 
        });
    }
}

// forms validation de Bootstrap
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()