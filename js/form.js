// affichage du formulaire
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



function main(){
    formDisplay()
}

main()