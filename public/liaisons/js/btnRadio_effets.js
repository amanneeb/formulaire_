
const verificateur = {
    fldTypePaiement : document.querySelector(".typePaiement"),
    fldTypeDonateur : document.querySelector(".typeDonateur"),
    fldMontantDon : document.querySelector(".montantDon"),
    montantDonChoisi:document.querySelector(".recapDon__montantDonChoix"),
    fldCarte : document.querySelector(".carteCredit"),
    fldPaypal : document.querySelector(".paypal"),
    fldPrelevement : document.querySelector(".prelevementBancaire"),

    /**
     * Initialiser les boutons radios
     */
    initialiser: function(){
        this.fldMontantDon.addEventListener("click", this.verifierMontantDon);
        this.fldTypeDonateur.addEventListener("click", this.verifierTypeDonateur);
        this.fldTypePaiement.addEventListener("click", this.verifierModePaiement);
    },

    /**
     * Vérifier quel montant a été sélectionné
     */
    verifierMontantDon: function(){
        let btnMontantSelectionne = document.querySelector("[name=montantDon]:checked");
        const fldAutreDon = document.querySelector(".autreDonChamp");
        if(btnMontantSelectionne.id === "autre"){
            fldAutreDon.classList.remove("cache");
        }else{
            fldAutreDon.classList.add("cache");
        }
    },

    /**
     * Vérifier quel donateur a été sélectionné
     */
    verifierTypeDonateur: function(){
        let idBtnDonateurSelectionne = document.querySelector("[name=typeDonateur]:checked").id;
        const fldInfoEntreprise = document.querySelector(".donEntreprise");
        const champTxtEntreprise=document.querySelector(".donEntreprise__societeInput");
        const champTxtTitre=document.querySelector(".donEntreprise__titreInput");
        if(idBtnDonateurSelectionne === "entreprise"){
            fldInfoEntreprise.classList.remove("screen-reader-only");
            champTxtEntreprise.setAttribute("aria-disabled", "false");
            champTxtEntreprise.removeAttribute("disabled")
            champTxtTitre.setAttribute("aria-disabled", "false");
            champTxtTitre.removeAttribute("disabled")
            document.querySelector(".recapEntreprise").classList.remove("screen-reader-only");
        }else{
            fldInfoEntreprise.classList.add("screen-reader-only");
            champTxtEntreprise.setAttribute("aria-disabled", "true");
            champTxtEntreprise.setAttribute("disabled", "true");
            champTxtTitre.setAttribute("aria-disabled", "true");
            champTxtTitre.setAttribute("disabled", "true");
            document.querySelector(".recapEntreprise").classList.add("screen-reader-only");
        }
    },

    /**
     * Vérifier quel mode de paiement a été sélectionné
     */
    verifierModePaiement: function(){
        let idBtnPaiementSelectionne = document.querySelector("[name=choixPaiement]:checked").id
        const fldCarte = document.querySelector(".carteCredit");
        const fldPaypal = document.querySelector(".paypal");
        const fldPrelevement = document.querySelector(".prelevementBancaire");

        switch (idBtnPaiementSelectionne){
            case "carteCredit" :
                fldCarte.classList.remove("screen-reader-only");
                fldPaypal.classList.add("screen-reader-only");
                fldPrelevement.classList.add("screen-reader-only");
                break;
            case "paypal":
                fldCarte.classList.add("screen-reader-only");
                fldPaypal.classList.remove("screen-reader-only");
                fldPrelevement.classList.add("screen-reader-only");
                break;
            case "prelevementBancaire":
                fldCarte.classList.add("screen-reader-only");
                fldPaypal.classList.add("screen-reader-only");
                fldPrelevement.classList.remove("screen-reader-only");
                break;
        }
    },


}

window.addEventListener('load', verificateur.initialiser.bind(verificateur));











