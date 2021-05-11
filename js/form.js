import {Cart} from './cart.js';


function formDisplay() {
    const formContactInfos = document.getElementById('form__confirm')
        const html = `
        <div id="formulaire">

            <h2 class="basket__title">
            SHIPMENT ADDRESS
            </h2>

            <form>

            <label for="firstname">First Name:</label>
            <input type="text" name="firstname" id="firstname" required>

            <label for="lastname">Last Name:</label>
            <input type="text" name="lastname" id="lastname" required>

            <label for="address">Address:</label>
            <textarea name="address" id="address" required></textarea>

            <label for="city">City:</label>
            <input type="text" name="city" id="city" required>

            <label for="email">Email:</label>
            <input type="text" name="email" id="email" required>

            <button id="order" type="submit" name="order">order</button>

            </form>

        </div>
        `
        formContactInfos.innerHTML = html
}

formDisplay()

function SendProductsAndFormData() {
    // variable bouton formulaire
    const sendFormDataButton = document.getElementById('order')
    //console.log(sendFormDataButton);

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
        const regexNameCityCountry = (value) =>{
            return /^([A-Za-z]{3,15})?([-]{0,1})?([A-Za-z]{3,15})$/.test(value)
        }
        const regexEmail = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        }
        const regexAdress = (value) =>{
            return /^[A-Za-z0-9\s]{5,50}$/.test(value)
        }
        // controle PRENOM
        function controlFirstName(){

            const firstNameEntry = contact.firstname
            if(regexNameCityCountry(firstNameEntry)){
                return true;
            } else{
                alert(textAlert('first name '))
            }
        }
        // controle NOM
        function controlLastName(){

            const lastNameEntry = contact.lastname
            if(regexNameCityCountry(lastNameEntry)){
                return true;
            } else{
                alert(textAlert('Last name '))
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
            if(regexAdress(addressEntry)){
                return true;
            } else{
                alert('invalid address')
            }
        }
        // controle CITY
        function controlCity(){

            const cityEntry = contact.city
            if(regexNameCityCountry(cityEntry)){
                return true;
            } else{
                alert(textAlert('first name '))
            }
        }

        if( controlFirstName()
         && controlLastName()
         && controlEmail()
         && controlAddress()
         && controlCity() ){
            const url = "http://localhost:3000/api/cameras/order"

            const cart = Cart.getCart()
            console.log('Items => ', cart.items);
            
            // 1 er solution
            // let productIds = [];
            // for(let index = 0 ; index < cart.items.length; index++){
            //     productIds.push(cart.items[index]._id)
            // }

            // 2 eme solution
            let productIds = [];
            cart.items.forEach(product => productIds.push(product._id));
            console.log(productIds);

            // 3 eme solution
            // productIds = cart.items.map(product => product._id)

            
            // variables des 2 key
            const dataToSend = {
                products: productIds,
                contact: contact
            }
            console.log(dataToSend);
            // envoi vers le serveur
            const promise = fetch(url, {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: {
                    "content-type": "application/json"
                }
            })
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
SendProductsAndFormData()