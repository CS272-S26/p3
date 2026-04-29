document.addEventListener("DOMContentLoaded", function() {
    // alert("Hey!");
    let header = document.querySelector('header');
    if(header) {
        // console.log("Header found");
        let savedName = localStorage.getItem('userName');
        console.log(savedName);
        if(sessionStorage.getItem('hideForThisVisit') != 'true') {
            if(savedName === null) {
                createNameForm();
            }
            else {
                createWelcome();
            }

        }

    }
    else {
        console.log("Header must be present to load custom text");

    }
})

function createNameForm() {
    let header = document.querySelector('header');

    let nameForm = document.querySelector("#nameContainer");
    if(nameForm) {
        nameForm.remove();
    }

    let form = document.createElement('input')
    form.setAttribute('id', "nameFormEntry");

    let formLabel = document.createElement('label');
    formLabel.setAttribute("id","nameFormLabel");
    formLabel.innerText = "Good day, pistolero. What name would you choose on your voyage through our site?";

    let formSubmit = document.createElement('button');
    formSubmit.setAttribute("id", "nameFormSubmitButton")
    formSubmit.innerText = "Submit";

    let formHide = document.createElement('button');
    formHide.setAttribute("id", "nameFormHideButton")
    formHide.innerText = "Hide for this visit";

    let formContainer = document.createElement('div');
    formContainer.setAttribute("id","nameFormContainer");
    formContainer.classList.add('m-4');
    formContainer.classList.add('mt-2');
    formContainer.classList.add('card');

    formContainer.appendChild(formLabel);
    formContainer.appendChild(form);
    formContainer.appendChild(formSubmit);
    formContainer.appendChild(formHide);

    header.appendChild(formContainer);

    formSubmit.addEventListener('click', function() {
        localStorage.setItem('userName', form.value);
        createWelcome();
    })
    formHide.addEventListener('click', function() {
        sessionStorage.setItem('hideForThisVisit', true);
        formContainer.remove();
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

    let name = '';
    if(localStorage.getItem('userName').trim() == '') {
        name = "Stranger"
    }
    else {
        name = localStorage.getItem('userName').trim().substring(0,1).toLocaleUpperCase() +
            localStorage.getItem('userName').trim().substring(1,localStorage.getItem('userName').length);
    }

    let messageLine1 = document.createElement("p");
    messageLine1.innerText = "Hello, "+name + "."
    let messageLine2 = document.createElement('p');
    // messageLine2.innerText = "May your trip through our site bring you knowledge and good fortune."
    messageLine2.innerText = name + ', ' + getPageIntroduction();

    let formClear = document.createElement('button');
    formClear.setAttribute("id", "nameFormClearButton")
    formClear.innerText = "Reset my name";

    formClear.addEventListener('click',clearName)

    // nameContainer.appendChild(messageLine1);
    nameContainer.appendChild(messageLine2);
    nameContainer.appendChild(formClear);

    nameContainer.classList.add('m-4');
    nameContainer.classList.add('mt-2');
    nameContainer.classList.add('card');

    header.appendChild(nameContainer)

}
function clearName() {
    localStorage.clear();
    createNameForm()
}

function getPageIntroduction() {
    // If we're at index.html
    if(window.location.href.charAt(window.location.href.length-1) == '/'
    || window.location.href.indexOf('index.html') > 0
    )
    {
        return 'May your trip through our site bring you knowledge and good fortune.'
    }
    else {
        for(page in pages) {
            if(window.location.href.indexOf(page) > 0) {
                return pages[page]
            }
        }
    }
}

let pages = {
    'about.html': 'let this page enlighten you about the history of the Pistols.'
    , 'listen.html' : 'please use this page to listen to the music of the band.'
    , 'look.html' : 'here you may gaze upon the visual splendor of the band.'
    , 'equipment.html' : 'should you be curious about the equipment used by the band, this page may provide answers to your questions.'
    , 'shows.html' : 'are you interested in experiencing the Pistols live? Use this page to plan your showgoing adventures.'
    , 'contact.html' : 'please share your thoughts and feelings with the Pistols'
};