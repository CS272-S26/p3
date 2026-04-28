document.addEventListener("DOMContentLoaded", function() {
    // alert("Hey!");
    let header = document.querySelector('header');
    if(header) {
        console.log("Header found");
        let savedName = localStorage.getItem('userName');
        console.log(savedName);
        if(savedName === null) {
            createNameForm();
        }
        else {
            createWelcome();
        }
    }
    else {
        console.log("No Header");

    }
})

function createNameForm() {
    let header = document.querySelector('header');

    let form = document.createElement('input')
    form.setAttribute('id', "nameFormEntry");

    let formLabel = document.createElement('label');
    formLabel.setAttribute("id","nameFormLabel");
    formLabel.innerText = "Good day, pistolero. What name would you choose on your voyage through our site?";

    let formSubmit = document.createElement('button');
    formSubmit.setAttribute("id", "nameFormSubmitButton")
    formSubmit.innerText = "Submit";

    let formContainer = document.createElement('div');
    formContainer.setAttribute("id","nameFormContainer");
    formContainer.classList.add('m-4');
    formContainer.classList.add('mt-2');
    formContainer.classList.add('card');

    formContainer.appendChild(formLabel);
    formContainer.appendChild(form);
    formContainer.appendChild(formSubmit);

    header.appendChild(formContainer);

    formSubmit.addEventListener('click', function() {
        localStorage.setItem('userName', form.value);
        createWelcome();
    })
}

function createWelcome() {
    let nameFormContainer = document.querySelector("#nameFormContainer");
        if(nameFormContainer) {
            nameFormContainer.remove();
        }
    let nameContainer = document.createElement('div');
        nameContainer.setAttribute("id", "nameContainer");
    let header = document.querySelector('header');

    let messageLine1 = document.createElement("p");
    messageLine1.innerText = "Welcome, "+localStorage.getItem('userName') + "."
    let messageLine2 = document.createElement('p');
    messageLine2.innerText = "May your trip through our site bring you knowledge and good fortune."

    nameContainer.appendChild(messageLine1);
    nameContainer.appendChild(messageLine2);

    nameContainer.classList.add('m-4');
    nameContainer.classList.add('mt-2');
    nameContainer.classList.add('card');

    header.appendChild(nameContainer)

}
function clearName() {
    localStorage.clear();
    createNameForm()
}