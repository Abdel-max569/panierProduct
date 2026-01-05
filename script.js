const produits = [
    {
        id: "PRO001",
        libelle: "Royce phantom",
        prix: 100500000,
        image: "roolf1.jpeg"
    },
    {
        id: "PRO002",
        libelle: "Tesla Model Pi",
        prix: 5000000,
        image: "tesla1.jpeg"
    },
    {
        id: "PRO003",
        libelle: "Tesla",
        prix: 800000,
        image: "tesla2.jpeg"
    },
    {
        id: "PRO004",
        libelle: "Porshe",
        prix: 2500000,
        image: "porshe.jpeg"
    },
    {
        id: "PRO005",
        libelle: "Moto",
        prix: 5000000,
        image: "moto.jpeg"
    }
    ,
    {
        id: "PRO006",
        libelle: "Range Rover",
        prix: 158400000,
        image: "range.jpeg"
    }
    ,
    {
        id: "PRO007",
        libelle: "RAV4",
        prix: 189250000,
        image: "rav4.jpeg"
    },
    {
        id: "PRO008",
        libelle: "Lamborgini",
        prix: 80000000,
        image: "lambo.jpeg"
    }
    ,
    {
        id: "PRO009",
        libelle: "Lamborgini V2",
        prix: 57825000,
        image: "lambo2.jpeg"
    }
    ,
    {
        id: "PRO0010",
        libelle: "Lamborgini V3",
        prix: 95554000,
        image: "lambo3.jpeg"
    }
    ,
    {
        id: "PRO0011",
        libelle: "Roll Royce",
        prix: 39845000,
        image: "rooll1.jpeg"
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
                                <div class="produit-info">
                                <h3>${produit.libelle}</h3>
                                <strong>${produit.prix} FCFA</strong> </br></br>
                                </div>

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

let spanNbreProduit = document.querySelector(".nbre_produit");

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
                                <button class="btn-modif" onClick="ajouterProduit('${element_of_panier.id}')">+</button>
                                <button class="btn-modif" onClick="modifierQuantiteMoins('${element_of_panier.id}')">--</button>                               
                                <button class="btn-modif btn-del" onClick="deleteProduct('${element_of_panier.id}')">❌</button>
                                `;
        elementPanier.appendChild(divProduit);
    });

    calculerMontantTotal();
    spanNbreProduit.textContent = productPanier.length;


}
afficherPanier();





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
        boutton_open.textContent = "Fermer panier";
        boutton_open.append(spanNbreProduit);
    } else {
        elementPanier.style.display = "none";
        boutton_open.textContent = "Voir panier";
        boutton_open.append(spanNbreProduit)
    }
}



