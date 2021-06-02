import {Cart} from './cart.js';
import {Regex} from './regex.js';
import {Request} from './cameras.service.js';

const cart = Cart.getCart()

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
        const textAlert = (value) => {return `${value}: numbers and symbols are not allowed \nbetween 3 and 15 characters`}
        // controle PRENOM
        function controlFirstName(){
            const firstNameEntry = contact.firstname
            if(Regex.regexNameFirstName(firstNameEntry)){
                return true;
            } else{
                alert(textAlert('invalid first name '))
            }
        }
        // controle NOM
        function controlLastName(){
            const lastNameEntry = contact.lastname
            if(Regex.regexNameFirstName(lastNameEntry)){
                return true;
            } else{
                alert(textAlert('invalid last name '))
            }
        }
        // controle EMAIL
        function controlEmail(){
            const emailEntry = contact.email
            if(Regex.regexEmail(emailEntry)){
                return true;
            } else{
                alert('invalid email')
            }
        }
        // controle ADRESSE
        function controlAddress(){
            const addressEntry = contact.address
            if(Regex.regexAddressAndCity(addressEntry)){
                return true;
            } else{
                alert('invalid address')
            }
        }
        // controle CITY
        function controlCity(){
            const cityEntry = contact.city
            if(Regex.regexAddressAndCity(cityEntry)){
                return true;
            } else{
                alert(textAlert('invalid city '))
            }
        }
        if( controlFirstName()
         && controlLastName()
         && controlEmail()
         && controlAddress()
         && controlCity()
         && cart !== null ){ 
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
            const promise = Request.sendOrder(dataToSend)
            // async
            promise.then(async(response)=>{
                // gestion des erreurs
                try{
                    // await
                    const content = await response.json()  
                    if(response.ok){
                        // total price
                        const total = document.getElementById('total__prices').innerHTML
                        // go vers page confirmation
                        window.location = `confirm.html?id=${content.orderId}&price=${total}&user=${firstName}`
                    }else{
                        alert(`server problem: error ${response.status}`)
                    }
                }catch(e){
                    alert(`ERREUR qui vient du catch() ${e}`)
                }
            })
        } else{
            alert("OUPS ! Something's wrong.. Take a look")
        }
    })
}

function main() {
    sendProductsAndFormData()
}

main()