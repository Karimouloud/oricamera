import {Cart} from './cart.js'
import {Fetch} from './cameras.service.js';

function sendProductsAndFormData() {
    // variable bouton formulaire
    const sendFormDataButton = document.getElementById('order')
    // ------ ajout d'un evenement au clic du bouton ------
    sendFormDataButton.addEventListener('click', (e) => {
        e.preventDefault()
        // valeurs des inputs dans des variables
        const firstName = document.getElementById('firstname').value
        const lastName = document.getElementById('lastname').value
        const email = document.getElementById('email').value
        const address = document.getElementById('address').value
        const city = document.getElementById('city').value
        // créer l'objet form
        const contact = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            city: city
        }
        // contrôle du formulaire
        //function alert
        const textAlert = (value) => {
            return `${value}: numbers and symbols are not allowed \nbetween 3 and 15
            characters`
        }
        // function regex
        const regexNameFirstName = (value) =>{
            return /^([A-Za-z]{3,15})?([-]{0,1})?([A-Za-z]{3,15})$/.test(value)
        }
        const regexEmail = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        }
        const regexAddressAndCity = (value) =>{
            return /^[A-Za-z0-9\s]{5,40}$/.test(value)
        }
        // controle PRENOM
        function controlFirstName(){
            const firstNameEntry = contact.firstname
            if(regexNameFirstName(firstNameEntry)){
                return true;
            } else{
                alert(textAlert('invalid first name '))
            }
        }
        // controle NOM
        function controlLastName(){
            const lastNameEntry = contact.lastname
            if(regexNameFirstName(lastNameEntry)){
                return true;
            } else{
                alert(textAlert('invalid last name '))
            }
        }
        // controle EMAIL
        function controlEmail(){
            const emailEntry = contact.email
            if(regexEmail(emailEntry)){
                return true;
            } else{
                alert('invalid email')
            }
        }
        // controle ADRESSE
        function controlAddress(){
            const addressEntry = contact.address
            if(regexAddressAndCity(addressEntry)){
                return true;
            } else{
                alert('invalid address')
            }
        }
        // controle CITY
        function controlCity(){
            const cityEntry = contact.city
            if(regexAddressAndCity(cityEntry)){
                return true;
            } else{
                alert(textAlert('invalid city '))
            }
        }
        if( controlFirstName()
         && controlLastName()
         && controlEmail()
         && controlAddress()
         && controlCity() ){
            const cart = Cart.getCart()
            console.log('Items => ', cart.items);
            // array vide pour les ID
            let productIds = [];
            // boucle forEach pour remplir l'array des ID des items
            cart.items.forEach(product => productIds.push(product._id));
            // variables des 2 key
            const dataToSend = {
                products: productIds,
                contact: contact
            }
            // envoi vers le serveur
            const promise = Fetch.fetchOrder(dataToSend)
            // async
            promise.then(async(response)=>{
                // gestion des erreurs
                try{
                    // await
                    const content = await response.json()                    
                    console.log(`contenu de response : ${content}`);
                    if(response.ok){
                        console.log(`résultat de response.ok : ${response.ok}`);
                        // recup id reponse serveur
                        console.log(`"id de response", ${content.orderId}`);
                        // total price
                        const total = document.getElementById('total__prices').innerHTML
                        // go vers page confirmation
                        window.location = `confirm.html?id=${content.orderId}&price=${total}&user=${firstName}`
                    }else{
                        console.log(`réponse du serveur : erreur ${response.status}`);
                        alert(`server problem: error ${response.status}`)
                    }
                }catch(e){
                    console.log("ERREUR qui vient du catch()");
                    console.log(e);
                    alert(`ERREUR qui vient du catch() ${e}`)
                }
            })
        }else{
            alert("Please fill out the form")
        }
    })
}

function main() {
    sendProductsAndFormData()
}

main()