
// Make sure the page is loaded before kicking off any JS
document.addEventListener("DOMContentLoaded", function() {

    let header = document.querySelector('header');
    // We only want to build the name entry form if there is a header to append it to
    if(header) {
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

// Create the form for users to enter their preferred name, which will be used at the top of each page
function createNameForm() {
    let header = document.querySelector('header');

    let nameForm = document.querySelector("#nameContainer");
    // If the form element is already there, we want to remove it before we create the form.
    if(nameForm) {
        nameForm.remove();
    }

    // Build out all the elements and set their corresponding ID and CSS classes where relevant
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

    // Actually add the pieces to the container and the container to the header element
    formContainer.appendChild(formLabel);
    formContainer.appendChild(form);
    formContainer.appendChild(formSubmit);
    formContainer.appendChild(formHide);

    header.appendChild(formContainer);

    // Enable the click functionality to enter or reset the user's name
    formSubmit.addEventListener('click', function() {
        localStorage.setItem('userName', form.value);
        createWelcome();
    })
    formHide.addEventListener('click', function() {
        sessionStorage.setItem('hideForThisVisit', true);
        formContainer.remove();
    })
}

// Create the form to display the user's name and custom page string
function createWelcome() {

    // If the name entry form container is on the page, remove it before beginning
    let nameFormContainer = document.querySelector("#nameFormContainer");
        if(nameFormContainer) {
            nameFormContainer.remove();
        }

    // Create or query the relevant elements
    let nameContainer = document.createElement('div');
        nameContainer.setAttribute("id", "nameContainer");
    let header = document.querySelector('header');

    // If the user doesn't have a name saved or if they've saved a blank string, user gets called "Stranger"
    let name = '';
    if(localStorage.getItem('userName').trim() == '') {
        name = "Stranger"
    }
    // Otherwise, use the locally saved name. Makes the first letter uppercase and the rest of the name lowercase.
    else {
        name = localStorage.getItem('userName').trim().substring(0,1).toLocaleUpperCase() +
            localStorage.getItem('userName').trim().substring(1,localStorage.getItem('userName').length);
    }

    // let messageLine1 = document.createElement("p");
    // messageLine1.innerText = "Hello, "+name + "."
    let messageLine2 = document.createElement('p');

    // Create the page welcome string based on which page the user is on
    messageLine2.innerText = name + ', ' + getPageIntroduction();

    // Enable clearing the local storage to enable reset
    let formClear = document.createElement('button');
    formClear.setAttribute("id", "nameFormClearButton")
    formClear.innerText = "Reset my name";

    // Clear the name if the user clicks the reset button
    formClear.addEventListener('click',clearName)

    // Add the items to the respective container and the container to the page
    nameContainer.appendChild(messageLine2);
    nameContainer.appendChild(formClear);

    nameContainer.classList.add('m-4');
    nameContainer.classList.add('mt-2');
    nameContainer.classList.add('card');

    header.appendChild(nameContainer)
}

// Clear locally stored name and reset the create form
function clearName() {
    localStorage.clear();
    createNameForm()
}

// Use the current page URL to identify which message to use
function getPageIntroduction() {
    // If we're at index.html, use the default phrase
    if(window.location.href.charAt(window.location.href.length-1) == '/'
    || window.location.href.indexOf('index.html') > 0
    )
    {
        return 'May your trip through our site bring you knowledge and good fortune.'
    }
    // Otherwise, iterate through the list of pages and use the corresponding phrase if that page is found
    else {
        for(page in pages) {
            if(window.location.href.indexOf(page) > 0) {
                return pages[page]
            }
        }
    }
}

// The data for the welcome page
let pages = {
    'about.html': 'let this page enlighten you about the history of the Pistols.'
    , 'listen.html' : 'please use this page to listen to the music of the band.'
    , 'look.html' : 'here you may gaze upon the visual splendor of the band.'
    , 'equipment.html' : 'should you be curious about the equipment used by the band, this page may provide answers to your questions.'
    , 'shows.html' : 'are you interested in experiencing the Pistols live? Use this page to plan your showgoing adventures.'
    , 'contact.html' : 'please share your thoughts and feelings with the Pistols'
};

// Handles the contact form functionality on the Contact page
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const nameInput = document.querySelector("#name-input");
            const emailInput = document.querySelector("#email-input");
            const commentInput = document.querySelector("#comment-input");
            const responseBox = document.querySelector("#contact-response");

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = commentInput.value.trim();

            if (name === "" || email === "" || message === "") {
                responseBox.innerText = "Please complete all fields before submitting.";
                return;
            }

            localStorage.setItem("lastContactName", name);
            localStorage.setItem("lastContactEmail", email);

            responseBox.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h2>Message Preview</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong> ${message}</p>
                        <p>
                            Thanks, ${name}. This demo form shows how your message would be prepared.
                            To send it for real, email us at
                            <a href="mailto:thepistolsatdawn@gmail.com">thepistolsatdawn@gmail.com</a>.
                        </p>
                    </div>
                </div>
            `;
        });

        const savedName = localStorage.getItem("lastContactName");
        const savedEmail = localStorage.getItem("lastContactEmail");

        if (savedName) {
            document.querySelector("#name-input").value = savedName;
        }

        if (savedEmail) {
            document.querySelector("#email-input").value = savedEmail;
        }
    }
});