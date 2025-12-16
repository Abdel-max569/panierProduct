const produits = [
    {
        id: "PRO001",
        libelle: "Lait",
        prix: 1000,
        image: "lait.jpeg"
    },
    {
        id: "PRO002",
        libelle: "Riz",
        prix: 50000,
        image: "riz.jpeg"
    },
    {
        id: "PRO003",
        libelle: "Vitago",
        prix: 100,
        image: "vitago.jpeg"
    },
    {
        id: "PRO004",
        libelle: "Ordinateur",
        prix: 250000,
        image: "pc.jpeg"
    },
    {
        id: "PRO005",
        libelle: "Souris",
        prix: 5000,
        image: "sours.jpeg"
    }
];

let productPanier = [];

function afficherProduit() {
    let divProduits = document.getElementById("produit");
    if (!divProduits) return;

    divProduits.innerHTML = "";
    produits.forEach(produit => {
        let divProduit = document.createElement("div");
        divProduit.className = "produitOne";
        divProduit.innerHTML = `<img src="img/${produit.image}"/>
        <h3>${produit.libelle}</h3>
                                <strong>${produit.prix} FCFA</strong> </br></br>
                                <button onClick="ajouterProduit('${produit.id}')" class="produit-btn">Add to panier</button>
                               `;
        divProduits.append(divProduit);
    });
}

function ajouterProduit(id) {
    let produit_select = produits.find(produit => produit.id === id);
    let produit_panier = productPanier.find(itemPanier => itemPanier.id === produit_select.id);

    if (produit_panier) {
        produit_panier.qtite++;
    } else {
        productPanier.push({ ...produit_select, qtite: 1 });
    }

    afficherPanier();
    calculerMontantTotal();
}
afficherProduit();


function afficherPanier() {
    let elementPanier = document.getElementById("panier");
    if (!elementPanier) return;

    elementPanier.innerHTML = "";

    productPanier.forEach(element_of_panier => {
        let divProduit = document.createElement("div");
        divProduit.className = "produit-panier";

        divProduit.innerHTML = `<h3>${element_of_panier.libelle}</h3>
                                <strong class="prix">${element_of_panier.prix} FCFA</strong> 
                                <br> <strong>Quantite : ${element_of_panier.qtite}</strong>
                                <button class="btn-modif" onClick="modifierQuantitePlus('${element_of_panier.id}', 1)">+</button>
                                <button class="btn-modif" onClick="modifierQuantiteMoins('${element_of_panier.id}', -1)">--</button>                               
                                <button class="btn-modif btn-del" onClick="deleteProduct('${element_of_panier.id}', -1)">❌</button>
                                `;
        elementPanier.appendChild(divProduit);
    });

    calculerMontantTotal();
}
afficherPanier();



function modifierQuantitePlus(id) {
    let produit_panier = productPanier.find(itemPanier => itemPanier.id === id);
    //console.log(produit_panier);
    if (produit_panier) {
        produit_panier.qtite++;
    }
    afficherPanier();
}

function modifierQuantiteMoins(id) {
    let produit_panier = productPanier.find((itemPanier) => itemPanier.id === id);

    if (produit_panier) {
        produit_panier.qtite--;
        if (produit_panier.qtite === 0) {
            let i = 0;
            for (product of productPanier) {
                if (product.id == id) {
                    productPanier.splice(i, 1);
                    break;
                }
                i++;
            }

        }
    }
    afficherPanier();
}

function deleteProduct(id) {
    let i = 0;
    for (product of productPanier) {
        if (product.id == id) {
            productPanier.splice(i, 1);
            break;
        }
        i++;
    }
    afficherPanier();

}


function calculerMontantTotal() {
    let montantTotal = 0;
    productPanier.forEach(element => {
        montantTotal += element.prix * element.qtite;
    });

    let spanMontant = document.getElementById("total");
    if (spanMontant) {
        spanMontant.textContent = montantTotal.toLocaleString() + " FCFA";
    }
    return montantTotal;
}

let boutton_open = document.querySelector(".btn-open");


function ouvriPanier() {
    let elementPanier = document.querySelector(".body-panier");
    if (!elementPanier) return;
    const styleActuel = window.getComputedStyle(elementPanier).display;
    if (styleActuel === "none") {
        elementPanier.style.display = "block";
        boutton_open.textContent = "Fermer le panier";
    } else {
        elementPanier.style.display = "none";
        boutton_open.textContent = "Ouvrir le panier";
    }
}



