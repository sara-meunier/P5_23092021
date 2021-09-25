//------------------------------------------------------création de la classe produit OK
class Product {
    constructor (_id, name, price, description, imageUrl){
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


//----------------------------------------------------fonction pour récupérer les infos de 1 objets de l'API OK
function getProduct(nombre) {fetch (API_URL+"/")
.then ( function(res) {
    if (res.ok) {
        return res.json();}
})
.then (function (value) {
console.log(value[nombre]);
let truc = value[nombre];
document.getElementById("photo1").innerText+= "fonction getProduct (nombre) : le nom de l'ours " + nombre + " est " + truc.name;
})
.catch (function(err) {
    console.log("ohoh... Il y a un probléme");
})
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

 //------------------------------------------------------- créer la liste de produits avec l'idée d'objet

 function creerListProduit (nounours) {
    //let nounours = [];
   // nounours.push = "gateau";
    //console.log (nounours);
    
        fetch (API_URL+"/")
    .then ( function(res) {//res = reponse de la requete
        if (res.ok) {
            return res.json();}
            //si la requete s'est bien passé, on récupére les données au format json
    })

    .then (function (value) {//value = les données récupérées
    //console.log(value);
    for (i = 0; i<value.length; i++) {
        let idproduct = value[i]._id;
        let nameproduct = value[i].name;
        let priceproduct = value[i].price;
        let descriptionproduct =value[i].description;
        let imageUrlproduct = value [i].imageUrl; 
    
        console.log(i + " : " + nameproduct); //pour verifier que la boucle a bien marche OK
        let product = new Product (idproduct, nameproduct, priceproduct, descriptionproduct, imageUrlproduct);
        console.log(product); // pour verifier la creation du produit OK
        nounours.push (product);
        console.log (nounours.length);
                                        }
    return nounours;
                                }
            )

    .catch (function(err) {
        console.log("ohoh... Il y a un probléme")
    });
     

 }