/**
 * @file Méthodes
 * @author Anaïs Mannée-Batschy
 * @version 0.0.1
 * */


const validation_formulaire = {
    //conserve la référence de l'élément de formulaire
    refFormulaire:null,
    //conserve le tableau des messages d'erreur
    tErreurs:[],
    //tableau des validités des champs
    tValide:[],
    tPaiementValide:[],
    intCptBoleen:0,
    intP:0,
    btnValidationEtapeUn : document.getElementById("versEtapeDeux"),
    btnValidationEtapeDeux : document.getElementById("versEtapeTrois"),
    btnValidationEtapeTroisCC : document.getElementById("versEtapeQuatreI"),
    btnValidationEtapeTroisPB : document.getElementById("versEtapeQuatreII"),
    btnRetourEtapeUn : document.getElementById("retourEtapeUn"),
    btnRetourEtapeDeuxI : document.getElementById("retourEtapeDeuxI"),
    btnRetourEtapeDeuxII : document.getElementById("retourEtapeDeuxII"),
    btnRetourEtapeTrois : document.getElementById("retourEtapeTrois"),

    /**
     * Initialise le formulaire
     */
    initialiser: function(){

        //si le javascript et activé, la classe js est placée dans le body indiquant au CSS qu'il est actif
        document.body.className = "js";

        //obtient la référence de la balise <form> en utilisant la classe formulaire
        this.refFormulaire = document.querySelector(".formulaire");

        //empêche la validation html quand il y a du javascript
        this.refFormulaire.setAttribute('novalidate', 'novalidate');

        // Validité des 4 grandes parties du formulaire
        this.btnValidationEtapeUn.addEventListener('click', this.validerPartieDon.bind(this));
        this.btnValidationEtapeDeux.addEventListener('click', this.validerPartieDonateur.bind(this));
        this.btnValidationEtapeTroisCC.addEventListener('click', this.validerPartiePaiement.bind(this));
        this.btnValidationEtapeTroisPB.addEventListener('click', this.validerPartiePaiement.bind(this));

        this.btnRetourEtapeUn.addEventListener("click", this.accederSectionPrecedente.bind(this));
        this.btnRetourEtapeDeuxI.addEventListener("click", this.accederSectionPrecedente.bind(this));
        this.btnRetourEtapeDeuxII.addEventListener("click", this.accederSectionPrecedente.bind(this));
        this.btnRetourEtapeTrois.addEventListener("click", this.accederSectionPrecedente.bind(this));

        // Validité des champs partie Donateur
        this.refFormulaire.querySelector("#prenom").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#nom").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#courriel").addEventListener("blur", this.validerChampTexte.bind(this));
        //this.refFormulaire.querySelector("#confirmCourriel").addEventListener("blur", this.validerConfirmationCourriel.bind(this));
        this.refFormulaire.querySelector("#adresse").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#ville").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#codePostal").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#numTel").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#titre").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#societe").addEventListener("blur", this.validerChampTexte.bind(this));

        this.refFormulaire.querySelector(".autreDon__inputInsertionDon").addEventListener("blur", this.validerChampTexte.bind(this));

        //Validité des listes Donateur
        this.refFormulaire.querySelector("#typeTel").addEventListener("blur", this.validerListe.bind(this));
        this.refFormulaire.querySelector("#province").addEventListener("blur", this.validerListe.bind(this));
        this.refFormulaire.querySelector("#pays").addEventListener("blur", this.validerListe.bind(this));


        //Initialiser le tableau de validité Donateur
        this.tValide["prenom"]=false;
        this.tValide["nom"]=false;
        this.tValide["courriel"]=false;
        this.tValide["titre"]=false;
        this.tValide["societe"]=false;
        this.tValide["typeTel"]=false;
        this.tValide["numTel"]=false;
        this.tValide["adresse"]=false;
        this.tValide["province"]=false;
        this.tValide["pays"]=false;
        this.tValide["codePostal"]=false;
        this.tValide["ville"]=false;

        // Validité des champs partie Paiement
        this.refFormulaire.querySelector("#numCarte").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#paiementNom").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#cvv").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#numTransit").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#numInstitution").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#numCompte").addEventListener("blur", this.validerChampTexte.bind(this));
        //Validité des listes Paiement
        this.refFormulaire.querySelector("#expirationMois").addEventListener("blur", this.validerListe.bind(this));
        this.refFormulaire.querySelector("#expirationAnnee").addEventListener("blur", this.validerListe.bind(this));
        this.refFormulaire.querySelector("#banque").addEventListener("blur", this.validerListe.bind(this));

        this.refFormulaire.querySelector(".hyperlien").addEventListener("click", this.afficherPagesuivante.bind(this));
        this.refFormulaire.querySelector(".hyperlien").addEventListener("click", this.verifierPaiementPaypal.bind(this));
        },


    /**
     * Récupère le contenu du JSON
     * @param {object} objJSON
     */
    chargeJSON: function(objJSON){
        //fonction fetch (chargement asynchrone du JSON)
        fetch(objJSON)
            .then(response => response.json()) //la prommesse retourne une réponse de type JSON
            .then(monJSON => this.tErreurs=monJSON); // une fois reçu, on stock le JSON dans la variable
    },


    /**
     * Valide la partie Don du formulaire
     * @param {event} evt
     */
    validerPartieDon: function (evt){
        let btnTypeDonSelectionne = document.querySelector("[name=typeDon]:checked");
        let typeDonSelectionne = document.querySelector("[name=typeDon]");
        let btnMontantSelectionne = document.querySelector("[name=montantDon]:checked");
        let montantSelectionne = document.querySelector("[name=montantDon]");
        const typeDonChoisi = document.querySelector(".recapDon__typeDonChoix");
        const montantDonChoisi = document.querySelector(".recapDon__montantDonChoix");
        const caseFraisAdmin = document.querySelector(".don__fraisAdminInput");

        if(btnTypeDonSelectionne !== null && btnMontantSelectionne !== null){
            typeDonChoisi.innerText=btnTypeDonSelectionne.nextElementSibling.innerHTML
            montantDonChoisi.innerText=btnMontantSelectionne.nextElementSibling.innerHTML
            this.validerCaseACocher(caseFraisAdmin);
            document.querySelector(".progression__don").classList.remove("enCours");
            document.querySelector(".progression__don").classList.add("rempli");
            document.querySelector(".progression__donateur").classList.add("enCours");
            document.querySelector(".don__retroaction").innerHTML="";
            this.accederSectionSuivante(evt)
        }else{
            document.querySelector(".don__retroaction").innerHTML+="<img src='liaisons/images/erreur.svg' alt='' /> ";
            if(btnTypeDonSelectionne === null){
                document.querySelector(".don__retroaction").innerHTML+=this.tErreurs["typeDon"]["vide"]+"<br>";
            }
            if(btnMontantSelectionne === null){
                document.querySelector(".don__retroaction").innerHTML+=this.tErreurs["montantDon"]["vide"];
            }
            evt.preventDefault();
        }
    },


    /**
     * Valide la partie Donateur du formulaire
     * @param {event} evt
     */
    validerPartieDonateur: function (evt){
        let intCptClasse=0;
        const arrListeClasseEntreprise=document.querySelector(".donEntreprise").classList;
        const caseInfolettre = document.querySelector(".informationDonateur__nouvellesCheckbox");
        arrListeClasseEntreprise.forEach(
            (element) => {
                if(element === "screen-reader-only"){
                    intCptClasse++
                }
            }
        )
        if(intCptClasse>0){
            if(this.intCptBoleen===((Object.keys(this.tValide).length)-2)){
                document.querySelector(".progression__donateur").classList.remove("enCours");
                document.querySelector(".progression__donateur").classList.add("rempli");
                document.querySelector(".progression__paiement").classList.add("enCours");
                this.accederSectionSuivante(evt)
            }else{
                arrSpan = document.querySelectorAll(".essai span")
                arrSpan.forEach(
                    element=>{
                        let elementVideId=element.previousElementSibling.id;
                        if(element.children.length===1){
                            let sourceImg=element.querySelector("img").src;
                            if(sourceImg.indexOf("complete")===-1){
                                if(elementVideId==="societe" || elementVideId==="titre"){
                                    if(document.querySelector("[name=typeDonateur]:checked").id==="entreprise"){
                                        document.querySelector(".donateur__retroaction").innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                                    }
                                }else{
                                    document.querySelector(".donateur__retroaction").innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                                }
                            }
                        }else{
                            document.querySelector(".donateur__retroaction").innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                        }
                    }
                )
                evt.preventDefault();
            }
        }else{
            const btnTypeDonateurSelectionne = document.querySelector("[name=typeDonateur]:checked");
            if(this.intCptBoleen===Object.keys(this.tValide).length){
                document.querySelector(".recapDonateur__typeDonateurChoix").innerHTML=btnTypeDonateurSelectionne.nextElementSibling.innerHTML;
                document.querySelector(".progression__donateur").classList.remove("enCours");
                document.querySelector(".progression__donateur").classList.add("rempli");
                document.querySelector(".progression__paiement").classList.add("enCours");
                this.accederSectionSuivante(evt);
                }else{
                this.afficherMessageGeneralErreur();
                    evt.preventDefault();
                }
        }
        this.validerCaseACocher(caseInfolettre);
    },


    /**
     * Valide la partie Paiement du formulaire
     * @param {event} evt
     */
    validerPartiePaiement: function (evt){
        let btnId = document.querySelector("[name=choixPaiement]:checked").id;
        const arrRetro=document.querySelectorAll('.'+btnId+' fieldset p');
        let intP=0;
        arrRetro.forEach(
            (element)=>{
                if(element.innerText===""){
                    this.intP++
                    intP++;
                }
            }
        )

        if(intP===arrRetro.length){
            document.querySelector(".progression__paiement").classList.remove("enCours");
            document.querySelector(".progression__paiement").classList.add("rempli");
            document.querySelector(".progression__recap").classList.add("enCours");
            this.accederSectionSuivante(evt);
        }else{
            this.afficherMessageGeneralErreur();
            evt.preventDefault();
        }
        document.querySelector("p.recapPrelevement__typePaiementP").innerHTML=document.querySelector("[name=choixPaiement]:checked").nextElementSibling.innerHTML;


        if(this.intP===arrRetro.length){
            document.querySelector(".progression__paiement").classList.remove("enCours");
            document.querySelector(".progression__paiement").classList.add("rempli");
            document.querySelector(".progression__recap").classList.add("enCours");
            this.accederSectionSuivante(evt);
        }else{
            this.afficherMessageGeneralErreur();
            evt.preventDefault();
        }
        document.querySelector("p.recapPrelevement__typePaiementP").innerHTML=document.querySelector("[name=choixPaiement]:checked").nextElementSibling.innerHTML;


    },



    /**
     * Insérer le nom du mode paiement Paypal dans le récapitulatif
     */
    verifierPaiementPaypal: function(){
        document.querySelector("p.recapPrelevement__typePaiementP").innerHTML=document.querySelector("[name=choixPaiement]:checked").nextElementSibling.innerHTML;
        document.querySelector(".progression__paiement").classList.remove("enCours");
        document.querySelector(".progression__paiement").classList.add("rempli");
        document.querySelector(".progression__recap").classList.add("enCours");
    },


    /**
     * Afficher la page suivante pour le lien paypal
     * @param {event} evt
     */
    afficherPagesuivante: function (evt){
        document.querySelector(".recapitulatif").classList.remove("screen-reader-only");
        document.querySelector(".recapPaypal").classList.remove("screen-reader-only");
        this.refFormulaire.querySelector(".recapPrelevementBancaire").classList.add("screen-reader-only");
        this.refFormulaire.querySelector(".recapCarteCredit").classList.add("screen-reader-only");
        evt.target.parentNode.parentNode.classList.add("screen-reader-only");
    },


    //*********FONCTIONS UTILITAIRES
    /**
     * Afficher la page suivante
     * @param {event} evt
     */
    accederSectionSuivante: function (evt) {
        console.log(evt.target)
        if(evt.target.tagName==="BUTTON"){
            console.log(evt.target.id)
            switch (evt.target.id){
                case "versEtapeDeux":
                    evt.target.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.nextElementSibling.classList.add("entreeSuivant");
                    evt.target.parentNode.nextElementSibling.classList.remove("screen-reader-only");
                    break;
                case "versEtapeTrois":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.add("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.remove("screen-reader-only");
                    break;
                case "versEtapeQuatreI":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.add("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.remove("screen-reader-only");
                    this.refFormulaire.querySelector(".recapPrelevementBancaire").classList.add("screen-reader-only");
                    this.refFormulaire.querySelector(".recapCarteCredit").classList.remove("screen-reader-only");
                    break;
                case "versEtapeQuatreII":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.add("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.nextElementSibling.classList.remove("screen-reader-only");
                    this.refFormulaire.querySelector(".recapPrelevementBancaire").classList.remove("screen-reader-only");
                    this.refFormulaire.querySelector(".recapCarteCredit").classList.add("screen-reader-only");
                    break;
            }
        }
    },

    accederSectionPrecedente: function (evt) {
        console.log(evt.target)
        if(evt.target.tagName==="BUTTON"){
            console.log(evt.target.id)
            switch (evt.target.id){
                case "retourEtapeUn":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.previousElementSibling.classList.remove("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.add("entreePrecedent");
                    break;
                case "retourEtapeDeuxI":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.previousElementSibling.classList.add("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.previousElementSibling.classList.remove("screen-reader-only");
                    break;
                case "retourEtapeDeuxII":
                    evt.target.parentNode.parentNode.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.parentNode.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.previousElementSibling.classList.add("entreePrecedent");
                    evt.target.parentNode.parentNode.parentNode.previousElementSibling.classList.remove("screen-reader-only");
                    //this.refFormulaire.querySelector(".recapPrelevementBancaire").classList.add("screen-reader-only");
                    //this.refFormulaire.querySelector(".recapCarteCredit").classList.remove("screen-reader-only");
                    break;
                case "retourEtapeTrois":
                    evt.target.parentNode.classList.add("screen-reader-only");
                    evt.target.parentNode.classList.remove("entreeSuivant");
                    evt.target.parentNode.classList.remove("entreePrecedent");
                    evt.target.parentNode.previousElementSibling.classList.add("entreePrecedent");
                    evt.target.parentNode.previousElementSibling.classList.remove("screen-reader-only");
                    //this.refFormulaire.querySelector(".recapPrelevementBancaire").classList.remove("screen-reader-only");
                    //this.refFormulaire.querySelector(".recapCarteCredit").classList.add("screen-reader-only");
                    break;
            }
        }
    },


    /**
     * Affiche le message d'erreur global pour la partie paiement
     */
    afficherMessageGeneralErreur: function(){
        let choixPaiement = document.querySelector("[name=choixPaiement]:checked").id;
        let arrSpan;
        let pRetroPage;

        if(choixPaiement==="carteCredit"){
            arrSpan = document.querySelectorAll(".carteCredit span");
            pRetroPage=document.querySelector(".carteCredit__retroaction");
        }
        if(choixPaiement==="prelevementBancaire"){
            arrSpan = document.querySelectorAll(".prelevementBancaire span");
            pRetroPage=document.querySelector(".prelevementBancaire__retroaction");
        }

        arrSpan.forEach(
            element=>{
                let elementVideId=element.previousElementSibling.id;
                if(element.children.length===1){
                    console.log("il y a une balise img");
                    let sourceImg=element.querySelector("img").src
                    console.log(sourceImg)
                    if(sourceImg.indexOf("complete")===-1){
                        if(elementVideId==="societe" || elementVideId==="titre"){
                            if(document.querySelector("[name=typeDonateur]:checked").id==="entreprise"){
                                pRetroPage.innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                            }
                        }else{
                            pRetroPage.innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                        }
                    }
                }else{
                    console.log("il n'y a pas de balise img");
                    pRetroPage.innerHTML+=this.tErreurs[elementVideId]["vide"]+"<br/>";
                }
            }
        )
    },


    /**
     * Valide le champ
     * @param {event} evt
     */
    validerChampTexte: function(evt){
        let champValide;
        let champCible = evt.target;
        let strChaineExp=new RegExp(champCible.getAttribute('pattern'));
        if(champCible.value===""){
            console.log(this.tValide)
            champValide=false;
            this.afficherMsgErreur(champCible);
            this.modifierTableauValidation(champCible.id, champValide);
        }else{
            if(strChaineExp.test(champCible.value)){
                champValide=true;
                this.intCptBoleen++;
                this.effacerMsgErreur(champCible);
                this.modifierTableauValidation(champCible.id, champValide);
                this.cacherInformations(champCible);
            }else{
                champValide=false;
                this.afficherMsgErreur(champCible);
                this.modifierTableauValidation(champCible.id, champValide);
            }
        }
    },


    /**
     * Vérifie si une option a été choisie dans la liste
     * @param {event} evt
     */
    validerListe: function(evt){
        let champCible = evt.target;
        let champValide;
        let elementSelectionne = champCible.value;
        if(elementSelectionne === "0" || elementSelectionne === ""){
            champValide = false;
            this.modifierTableauValidation(champCible.id, champValide);
            this.afficherMsgErreur(champCible);
        }else{
            champValide=true;
            this.intCptBoleen++;
            this.modifierTableauValidation(champCible.id, champValide);
            this.effacerMsgErreur(champCible);
            if(champCible.id==="expirationMois" || champCible.id==="expirationAnnee"){
                const recapModification = document.querySelector(".recapitulatif span[class$='"+champCible.id+"Choix']")
                recapModification.innerText=champCible.value
            }else{
                const recapModif=document.querySelector(".recapitulatif p[class$='"+champCible.id+"Choix']");
                recapModif.innerText = champCible.value;
            }
            if(champCible.id==="pays"){
                const arrListeOptionProvince=document.querySelector(".informationDonateur__provinceSelect").children;
                const listeProvince=document.querySelector(".informationDonateur__provinceSelect");
                const codePostal = document.getElementById("codePostal")
                const aideCodePostal = document.querySelector(".informationDonateur__codePostalLabelInfo")

                if(champCible.value==="États-Unis"){
                    codePostal.pattern="^[0-9]{5}$";
                    aideCodePostal.innerText=" ex: 75001";
                    if(arrListeOptionProvince.length>1){
                        let intProvince=1
                        while(intProvince<arrListeOptionProvince.length){
                            listeProvince.removeChild(listeProvince[intProvince]);
                        }
                    }
                    listeProvince.innerHTML+="<option value='Californie'>Californie</option><option value='New-York'>New-York</option><option value='Texas'>Texas</option>"
                }else if (champCible.value==="Canada" || champCible.value==="0"){
                    codePostal.pattern="^([A-Za-z][0-9][A-Za-z])([0-9][A-Za-z][0-9])$";
                    aideCodePostal.innerText=" ex: G1G3V3";
                    if(arrListeOptionProvince.length>1){
                        let intProvince=1
                        while(intProvince<arrListeOptionProvince.length){
                            listeProvince.removeChild(listeProvince[intProvince]);
                        }
                    }
                    listeProvince.innerHTML+="<option value='Québec'>Québec</option><option value='Ontario'>Ontario</option><option value='Colombie-Britannique'>Colombie-Britannique</option>"
                }
            }
        }
    },


    /**
     * Affiche le message d'erreur du champ
     * @param {element} objCible
     */
    afficherMsgErreur: function (objCible){
        const pRetroaction = objCible.nextElementSibling.nextElementSibling;
        const label = objCible.previousElementSibling;
        objCible.nextElementSibling.innerHTML="<img src='liaisons/images/erreur.svg' alt='champ mal rempli' />";
        objCible.setAttribute("aria-invalid", "true")
        if(objCible.value==="" || objCible.value==="0"){
            console.log(this.tErreurs);
            pRetroaction.innerHTML=this.tErreurs[objCible.getAttribute("name")]["vide"];
        }else{
            pRetroaction.innerHTML=this.tErreurs[objCible.getAttribute("name")]["pattern"];
        }
        objCible.classList.add("erreur");
        pRetroaction.classList.add("retroactionErreur");
        label.classList.add("labelErreur");
    },


    /**
     * Efface le message d'erreur du champ
     * @param {element} objCible
     */
    effacerMsgErreur: function(objCible){
        const pRetroaction = objCible.nextElementSibling.nextElementSibling;
        const label = objCible.previousElementSibling;
        objCible.classList.remove("erreur");
        objCible.nextElementSibling.innerHTML="<img src='liaisons/images/formulaire_complete.svg' alt='champ bien rempli' />"
        objCible.setAttribute("aria-invalid", "false")
        pRetroaction.innerHTML="";
        pRetroaction.classList.remove("retroactionErreur");
        label.classList.remove("labelErreur");
    },


    /**
     * Vérifie si la case a été cochée
     * @param {element} elementFrais
     */
    validerCaseACocher: function(elementFrais){
        let caseFraisAdmin = document.getElementById("fraisAdmin");
        let montantInitial;
        const caseInfolettre = document.querySelector(".informationDonateur__nouvellesCheckbox");
        const choixInfolettre = document.querySelector(".recapDonateur__nouvellesChoix");
        let donChoisi

        if(elementFrais.id==="fraisAdmin"){
            let montantId = document.querySelector("[name=montantDon]:checked").id;
            if(montantId==="autre"){
                montantInitial=parseInt(document.querySelector(".autreDon__inputInsertionDon").value);
            }else{
                montantInitial=parseInt(montantId);
            }
            if (caseFraisAdmin.checked===true){
                console.log("frais administratif de 3$")
                donChoisi = montantInitial + 3;
                document.querySelector(".recapDon__fraisAdminChoix").innerHTML = "Oui";
                document.querySelector(".recapDon__montantTotalChoix").innerHTML = donChoisi+"$";
            }else{
                console.log("frais administratif de 0$")
                donChoisi = montantInitial;
                document.querySelector(".recapDon__fraisAdminChoix").innerHTML = "Non";
                document.querySelector(".recapDon__montantTotalChoix").innerHTML = donChoisi+"$";
            }
            document.querySelector(".recapDon__montantTotalChoix").innerHTML = donChoisi+"$";
        }
        if(elementFrais.id==="nouvelles"){
            if(caseInfolettre.checked===true){
                choixInfolettre.innerText="Oui";
            }else{
                choixInfolettre.innerText="Non";
            }
        }

    },


    /**
     * Cache une partie des informations privées du mode de paiement
     * @param {element} elementCible
     */
    cacherInformations: function(elementCible){
        switch (elementCible.id){
            case "numCarte":
                const recapModification=document.querySelector(".recapCarteCredit__numCarteChoix");
                recapModification.innerText = "XXXX XXXX XXXX " + elementCible.value.substr(11, 4);
                break;
            case "numTransit":
                const recapTransit=document.querySelector(".recapPrelevement__numTransitChoix");
                recapTransit.innerText = "XXX" + elementCible.value.substr(3, 2);
                break;
            case "numInstitution":
                const recapInstit=document.querySelector(".recapPrelevement__numInstitutionChoix");
                recapInstit.innerText = "XX" + elementCible.value.substr(2, 1);
                break;
            case "numCompte":
                const recapCompte=document.querySelector(".recapPrelevement__numCompteChoix");
                recapCompte.innerText = "XXXX" + elementCible.value.substr(3, 4);
                break;
            default:
                const recapChampRegulier=document.querySelector(".recapitulatif fieldset p[class$='"+elementCible.id+"Choix']")
                recapChampRegulier.innerText = elementCible.value
        }
    },


    /**
     * Méthode de d'inscription de l'état des champs dans le tableau de validation
     * @param {string} nomChamp
     * @param {string} valide
     */
    modifierTableauValidation:function(nomChamp,valide){
        this.tValide[nomChamp]=valide;
    },


};

window.addEventListener('load', validation_formulaire.initialiser.bind(validation_formulaire));