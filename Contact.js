/* =========================================================
   CONTACT PAGE JAVASCRIPT
   UNICORN INNOVATION HILL LIMITED
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const contactNav =
    document.getElementById("contactNav");


if (menuToggle && contactNav) {

    menuToggle.addEventListener(
        "click",
        function () {

            contactNav.classList.toggle("active");


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                if (
                    contactNav.classList.contains("active")
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

document
    .querySelectorAll(".contact-nav a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (!contactNav) {
                    return;
                }


                contactNav.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );

    });


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !contactNav ||
            !menuToggle
        ) {

            return;

        }


        if (
            contactNav.classList.contains("active") &&
            !contactNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            contactNav.classList.remove(
                "active"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   RESET MOBILE MENU ON DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 700 &&
            contactNav
        ) {

            contactNav.classList.remove(
                "active"
            );


            if (menuToggle) {

                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


const contactMessageBox =
    document.getElementById(
        "contactMessageBox"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================================
               GET FORM VALUES
            ========================================= */

            const name =
                document
                    .getElementById("contactName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("contactEmail")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("contactSubject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("contactMessage")
                    .value
                    .trim();


            /* =========================================
               VALIDATION
            ========================================= */

            if (!name) {

                showContactMessage(
                    "⚠️ Please enter your full name.",
                    "error"
                );

                document
                    .getElementById("contactName")
                    .focus();

                return;

            }


            if (!email) {

                showContactMessage(
                    "⚠️ Please enter your email address.",
                    "error"
                );

                document
                    .getElementById("contactEmail")
                    .focus();

                return;

            }


            if (!isValidEmail(email)) {

                showContactMessage(
                    "❌ Please enter a valid email address.",
                    "error"
                );

                document
                    .getElementById("contactEmail")
                    .focus();

                return;

            }


            if (!subject) {

                showContactMessage(
                    "⚠️ Please enter a subject.",
                    "error"
                );

                document
                    .getElementById("contactSubject")
                    .focus();

                return;

            }


            if (!message) {

                showContactMessage(
                    "⚠️ Please enter your message.",
                    "error"
                );

                document
                    .getElementById("contactMessage")
                    .focus();

                return;

            }


            /* =========================================
               CREATE CONTACT MESSAGE
            ========================================= */

            const contactMessage = {

                id: Date.now().toString(),

                name: name,

                email: email,

                subject: subject,

                message: message,

                date:
                    new Date()
                        .toLocaleString(),

                status: "Unread"

            };


            /* =========================================
               GET EXISTING CONTACT MESSAGES
            ========================================= */

            let messages = [];


            try {

                messages =
                    JSON.parse(
                        localStorage.getItem(
                            "contactMessages"
                        )
                    ) || [];

            } catch (error) {

                console.error(
                    "Could not read contact messages:",
                    error
                );

                messages = [];

            }


            if (!Array.isArray(messages)) {

                messages = [];

            }


            /* =========================================
               ADD NEW MESSAGE
            ========================================= */

            messages.push(
                contactMessage
            );


            /* =========================================
               SAVE MESSAGE
            ========================================= */

            localStorage.setItem(
                "contactMessages",
                JSON.stringify(messages)
            );


            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            showContactMessage(

                "✅ Your message has been sent successfully! " +
                "Our team will get back to you soon.",

                "success"

            );


            /* =========================================
               CLEAR FORM
            ========================================= */

            contactForm.reset();


            /* =========================================
               SCROLL TO MESSAGE
            ========================================= */

            if (contactMessageBox) {

                contactMessageBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );

}


/* =========================================================
   SHOW CONTACT MESSAGE
========================================================= */

function showContactMessage(
    message,
    type
) {

    if (!contactMessageBox) {

        return;

    }


    contactMessageBox.textContent =
        message;


    contactMessageBox.className =
        "contact-message " + type;


    /* Remove message after 5 seconds */

    setTimeout(
        function () {

            if (contactMessageBox) {

                contactMessageBox.className =
                    "contact-message";

                contactMessageBox.textContent =
                    "";

            }

        },
        5000
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);

}


/* =========================================================
   AUTO-FILL APPLICANT INFORMATION
========================================================= */

/*
   If the user is already logged in and you
   saved their name/email in localStorage,
   this will automatically fill the form.
*/

const savedName =
    localStorage.getItem(
        "applicantName"
    );


const savedEmail =
    localStorage.getItem(
        "loggedInEmail"
    );


const nameInput =
    document.getElementById(
        "contactName"
    );


const emailInput =
    document.getElementById(
        "contactEmail"
    );


if (
    nameInput &&
    savedName
) {

    nameInput.value =
        savedName;

}


if (
    emailInput &&
    savedEmail
) {

    emailInput.value =
        savedEmail;

}