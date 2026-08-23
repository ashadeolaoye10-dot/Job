/* =========================================================
   APPLICANT REGISTER
   Unicorn Innovation Hill Limited
   PRODUCTION / RENDER VERSION
========================================================= */


/* =========================================================
   JAVA BACKEND API
========================================================= */

const API_BASE_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


/* =========================================================
   NAVBAR
========================================================= */

const hamburger =
    document.querySelector(".hamburger");

const navLinks =
    document.querySelector(".nav-links");


if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");

        navLinks.classList.toggle("active");

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");

                navLinks.classList.remove("active");

            });

        });


    document.addEventListener("click", (event) => {

        if (
            !hamburger.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {

            hamburger.classList.remove("active");

            navLinks.classList.remove("active");

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            hamburger.classList.remove("active");

            navLinks.classList.remove("active");

        }

    });

}


/* =========================================================
   PROFILE IMAGE PREVIEW
========================================================= */

const profileImage =
    document.getElementById("profileImage");

const profilePreview =
    document.getElementById("profilePreview");


if (profileImage && profilePreview) {

    profileImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (file) {

                profilePreview.src =
                    URL.createObjectURL(file);

            }

        }
    );

}


/* =========================================================
   PASSWORD
========================================================= */

const password =
    document.getElementById("password");


const togglePassword =
    document.querySelector(
        ".toggle-password"
    );


if (
    togglePassword &&
    password
) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";


                togglePassword.classList
                    .remove("fa-eye");


                togglePassword.classList
                    .add("fa-eye-slash");

            } else {

                password.type =
                    "password";


                togglePassword.classList
                    .remove(
                        "fa-eye-slash"
                    );


                togglePassword.classList
                    .add("fa-eye");

            }

        }
    );

}


/* =========================================================
   CONFIRM PASSWORD
========================================================= */

const confirmPassword =
    document.getElementById(
        "confirmPassword"
    );


const toggleConfirm =
    document.querySelector(
        ".toggle-confirm"
    );


if (
    toggleConfirm &&
    confirmPassword
) {

    toggleConfirm.addEventListener(
        "click",
        () => {

            if (
                confirmPassword.type ===
                "password"
            ) {

                confirmPassword.type =
                    "text";


                toggleConfirm.classList
                    .remove("fa-eye");


                toggleConfirm.classList
                    .add("fa-eye-slash");

            } else {

                confirmPassword.type =
                    "password";


                toggleConfirm.classList
                    .remove(
                        "fa-eye-slash"
                    );


                toggleConfirm.classList
                    .add("fa-eye");

            }

        }
    );

}


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

const strengthBar =
    document.querySelector(
        ".strength-bar"
    );


if (
    password &&
    strengthBar
) {

    password.addEventListener(
        "input",
        () => {

            const value =
                password.value;


            let strength = 0;


            if (
                value.length >= 8
            ) {

                strength++;

            }


            if (
                /[A-Z]/.test(value)
            ) {

                strength++;

            }


            if (
                /[0-9]/.test(value)
            ) {

                strength++;

            }


            if (
                /[^A-Za-z0-9]/.test(value)
            ) {

                strength++;

            }


            switch (strength) {

                case 1:

                    strengthBar.style.width =
                        "25%";

                    strengthBar.style.background =
                        "#ff3b30";

                    break;


                case 2:

                    strengthBar.style.width =
                        "50%";

                    strengthBar.style.background =
                        "#ff9500";

                    break;


                case 3:

                    strengthBar.style.width =
                        "75%";

                    strengthBar.style.background =
                        "#ffd60a";

                    break;


                case 4:

                    strengthBar.style.width =
                        "100%";

                    strengthBar.style.background =
                        "#34c759";

                    break;


                default:

                    strengthBar.style.width =
                        "0";

            }

        }
    );

}


/* =========================================================
   APPLICANT REGISTRATION
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ==========================================
               GET FORM VALUES
            ========================================== */

            const firstName =
                document
                    .getElementById("firstName")
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById("lastName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const gender =
                document
                    .getElementById("gender")
                    .value;


            const dateOfBirth =
                document
                    .getElementById("dateOfBirth")
                    .value;


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const qualification =
                document
                    .getElementById("qualification")
                    .value;


            const experience =
                document
                    .getElementById("experience")
                    .value;


            const passwordValue =
                password.value;


            const confirmPasswordValue =
                confirmPassword.value;


            /* ==========================================
               VALIDATION
            ========================================== */

            if (!firstName) {

                alert(
                    "Please enter your first name."
                );

                return;

            }


            if (!lastName) {

                alert(
                    "Please enter your last name."
                );

                return;

            }


            if (!email) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            if (!email.includes("@")) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            if (
                passwordValue !==
                confirmPasswordValue
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            if (
                passwordValue.length < 8
            ) {

                alert(
                    "Password must be at least 8 characters long."
                );

                return;

            }


            /* ==========================================
               CREATE FULL NAME
            ========================================== */

            const fullName =
                firstName +
                " " +
                lastName;


            /* ==========================================
               REGISTER BUTTON
            ========================================== */

            const registerBtn =
                document.getElementById(
                    "registerBtn"
                );


            if (registerBtn) {

                registerBtn.disabled =
                    true;


                registerBtn.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

            }


            /* ==========================================
               SEND TO DEPLOYED JAVA BACKEND
            ========================================== */

            try {

                const response =
                    await fetch(

                        API_BASE_URL +
                        "/api/applicants/register",

                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    name:
                                        fullName,

                                    email:
                                        email,

                                    phone:
                                        phone,

                                    gender:
                                        gender,

                                    dateOfBirth:
                                        dateOfBirth,

                                    address:
                                        address,

                                    qualification:
                                        qualification,

                                    experience:
                                        experience,

                                    password:
                                        passwordValue

                                })

                        }

                    );


                /* ==========================================
                   READ RESPONSE
                ========================================== */

                let data = {};


                try {

                    data =
                        await response.json();

                } catch (jsonError) {

                    console.error(
                        "Server returned invalid JSON."
                    );

                }


                console.log(
                    "Registration response:",
                    data
                );


                /* ==========================================
                   BACKEND ERROR
                ========================================== */

                if (!response.ok) {

                    throw new Error(

                        data.message ||
                        "Registration failed. HTTP " +
                        response.status

                    );

                }


                /* ==========================================
                   REGISTRATION SUCCESS
                ========================================== */

                if (
                    data.success === true
                ) {

                    /*
                     * Store only non-sensitive
                     * information.
                     *
                     * NEVER store password.
                     */

                    localStorage.setItem(
                        "applicantName",
                        fullName
                    );


                    localStorage.setItem(
                        "applicantEmail",
                        email
                    );


                    /* ======================================
                       PROFILE IMAGE
                    ====================================== */

                    if (
                        profileImage &&
                        profileImage.files &&
                        profileImage.files[0]
                    ) {

                        const imageFile =
                            profileImage.files[0];


                        const reader =
                            new FileReader();


                        reader.onload =
                            function (event) {

                                localStorage.setItem(
                                    "applicantProfileImage",
                                    event.target.result
                                );


                                alert(
                                    "✅ Account created successfully!"
                                );


                                window.location.href =
                                    "Applicant-login.html";

                            };


                        reader.readAsDataURL(
                            imageFile
                        );


                    } else {

                        alert(
                            "✅ Account created successfully!"
                        );


                        window.location.href =
                            "Applicant-login.html";

                    }


                    return;

                }


                /* ==========================================
                   UNKNOWN RESPONSE
                ========================================== */

                throw new Error(

                    data.message ||
                    "Registration failed."

                );


            } catch (error) {

                console.error(
                    "❌ Registration error:",
                    error
                );


                let message =
                    error.message ||
                    "Unable to create account.";


                if (
                    error instanceof TypeError
                ) {

                    message =
                        "Unable to connect to the deployed Java backend. Please check your Render service.";

                }


                alert(
                    "❌ " + message
                );


                if (registerBtn) {

                    registerBtn.disabled =
                        false;


                    registerBtn.innerHTML =
                        "Create Account";

                }

            }

        }
    );

}