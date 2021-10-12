//on récupére le numéro de commande
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId'); 

 //on récupére le prix total
let panierStorage = localStorage.getItem("panier");
let panier = JSON.parse(panierStorage);
let total = 0;
    for (let i in panier) {
        total += panier[i].productPanierPrice * panier[i].productPanierNumber;        
    };

//on affiche le numéro de commande et le prix total
let confirmation = document.getElementById("confirmation");
let order = document.createElement("p");
order.innerText = " Votre commande n° " + orderId + " d'un montant de " + total/100 + " euros est en cours de préparation."
confirmation.appendChild(order); 

//on supprime definitement le panier aprés la commande
localStorage.removeItem("panier"); 


