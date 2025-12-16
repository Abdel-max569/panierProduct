const produits = [
    {
        id: "PRO001",
        libelle: "Lait",
        prix: 1000
    },
    {
        id: "PRO002",
        libelle: "Riz",
        prix: 50000
    },
    {
        id: "PRO003",
        libelle: "Vitago",
        prix: 100
    },
    {
        id: "PRO004",
        libelle: "Ordinateur",
        prix: 250000
    },
    {
        id: "PRO005",
        libelle: "Souris",
        prix: 5000
    }
]

let productPanier = [];

function afficherProduit(event) {
    let divProduits = document.getElementById("produit");
    divProduits.innerHTML = "";
    produits.forEach(produit => {
        let divProduit = document.createElement("div");
        divProduit.className = "produit";
        divProduits.append(divProduit);
        divProduit.id = produit.id;

        divProduit.innerHTML = `<h3>${produit.libelle}</h3>
                                <strong>${produit.prix} FCFA</strong> </br></br>
                                <button id=${produit.id} class="produit-btn">Add to panier</button>
                                <hr/>`;


    })
}
afficherProduit()



function ajouterProduit(id) {
    let produit_select = produits.find(produit => produit.id === id);
    const produit_panier = productPanier.find(itemPanier => itemPanier.id === produit_select.id)
    if (produit_panier) {
        produit_panier.qtite++;
    } else {
        productPanier.push({ ...produit_select, qtite: 1 });

    }
    console.log(productPanier);
    afficherPanier();
    
    

}
// ajouterProduit("PRO001");
// ajouterProduit("PRO001");
// ajouterProduit("PRO001");
// ajouterProduit("PRO002");
// ajouterProduit("PRO004");

console.log(productPanier);
divAllproduct = document.querySelectorAll(".produit-btn");

divAllproduct.forEach((produit) => {
    produit.addEventListener("click", (event) => {
        let idProduict = event.target.id;
        console.log(idProduict);
        ajouterProduit(idProduict)
        calculerMontantTotal()
        
    }
    )
})

function afficherPanier() {
    let elementPanier = document.getElementById("panier");
    elementPanier.innerHTML = "";

    productPanier.forEach(element_of_panier => {
        let divProduit = document.createElement("div");
        divProduit.className = "produit-panier";
        elementPanier.append(divProduit);
        divProduit.id = element_of_panier.id;
        divProduit.innerHTML = `<h3>${element_of_panier.libelle}</h3>
                                <strong>${element_of_panier.prix} FCFA</strong> 
                                <br> <strong>Quantite :${element_of_panier.qtite}</strong>
                                <button>+</button>
                                <button>-</button>

                                `;


    })
}


function calculerMontantTotal(){
    let spanMontant = document.getElementById("total");
    let montantTotal=0;
    productPanier.forEach(element=>{
        montantTotal+=element.prix * element.qtite;
        console.log(montantTotal);

    })
    spanMontant.textContent=montantTotal+" FCFA";
}



function ouvrirPanier() {
    const elementPanier = document.querySelector(".body-panier");
    if (!elementPanier) return;

    const styleActuel = window.getComputedStyle(elementPanier).display;

    if (styleActuel === "none") {
        elementPanier.style.display = "block";
    }
    else {
        elementPanier.style.display = "none";
    }
}








