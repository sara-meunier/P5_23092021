

//---------------------------------------------------------fonction pour créer UNE div OK
function creerDiv () {
    const newElement = document.createElement("div");//nouvel element
    let divproduit1 = document.getElementById("produit1");//repere la div produit1 dans le DOM
    divproduit1.appendChild(newElement);//associe newElement au parent produit1
    newElement.innerHTML = "texte de la function creerDiv </br>";// j'écris dans la nouvelle div
    newElement.classList.add("truc");
    return newElement;// pour pouvoir ecrire dans le newelement apres ?
 } 

 //----------------------------------------------------------fonction pour créer la boucle de div = une div/produit OK
 function creerDivBoucle(){
    fetch (API_URL+"/")
    .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();}
            //si la requete s'est bien passé, on récupére les données au format json
    })
    .then (function (value) {//value = les données récupérées
        for (let i= 0 ; i<value.length; i++) {
             console.log(i + " a pour nom "+ value[i].name);
             creerDiv();              
        };
    })
    .catch (function(err) {
        console.log("ohoh... Il y a un probléme")
    });
 }


 //----------------------------------------------------------fonction pour afficher 1 objet dans 1 div du DOM OK

function afficheListeProduit () {
    fetch (API_URL+"/")
    .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();}
            //si la requete s'est bien passé, on récupére les données au format json
    })
    .then (function (value) {//value = les données récupérées
        for (let i= 0 ; i<value.length; i++) {
             console.log(" function afficheListProduit : l' objet numero " + i + " s'appelle "+ value[i].name);
             document.getElementById("photo1").innerHTML = "fonction AfficheListeProduit : l'ours numero " + i + " s'appelle " + value[i].name + " et coute " + value[i].price + "</br>";
        };
    })
    .catch (function(err) {
        console.log("ohoh... Il y a un probléme")
    });
}