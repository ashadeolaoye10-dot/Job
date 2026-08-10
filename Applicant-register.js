/* ==========================================
   NAVBAR
========================================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    // Close menu when a navigation link is clicked

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", (e) => {

        if (
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target)
        ) {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");

        }

    });

    // Close menu when window is resized to desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");

        }

    });

}

/* ==========================================
   PROFILE IMAGE PREVIEW
========================================== */

const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

if (profileImage && profilePreview) {

    profileImage.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            profilePreview.src = URL.createObjectURL(file);

        }

    });

}

/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

const password = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");

if (togglePassword && password) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

}

/* ==========================================
   SHOW / HIDE CONFIRM PASSWORD
========================================== */

const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirm = document.querySelector(".toggle-confirm");

if (toggleConfirm && confirmPassword) {

    toggleConfirm.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirm.classList.remove("fa-eye");
            toggleConfirm.classList.add("fa-eye-slash");

        } else {

            confirmPassword.type = "password";

            toggleConfirm.classList.remove("fa-eye-slash");
            toggleConfirm.classList.add("fa-eye");

        }

    });

}

/* ==========================================
   PASSWORD STRENGTH
========================================== */

const strengthBar = document.querySelector(".strength-bar");

if (password && strengthBar) {

    password.addEventListener("input", () => {

        const value = password.value;

        let strength = 0;

        if (value.length >= 8) strength++;

        if (/[A-Z]/.test(value)) strength++;

        if (/[0-9]/.test(value)) strength++;

        if (/[^A-Za-z0-9]/.test(value)) strength++;

        switch (strength) {

            case 1:

                strengthBar.style.width = "25%";
                strengthBar.style.background = "#ff3b30";

                break;

            case 2:

                strengthBar.style.width = "50%";
                strengthBar.style.background = "#ff9500";

                break;

            case 3:

                strengthBar.style.width = "75%";
                strengthBar.style.background = "#ffd60a";

                break;

            case 4:

                strengthBar.style.width = "100%";
                strengthBar.style.background = "#34c759";

                break;

            default:

                strengthBar.style.width = "0";

        }

    });

}

/* ==========================================
   FORM VALIDATION
========================================== */

const registerForm = document.querySelector(".register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (password.value !== confirmPassword.value) {

            alert("Passwords do not match.");

            return;

        }

        alert("Registration successful! Backend integration will be added later.");

        registerForm.reset();

        strengthBar.style.width = "0";

        profilePreview.src = "images/default-user.png";

    });

}

/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm = document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener("submit",function(e){

        e.preventDefault();

        const email = this.querySelector("input").value.trim();

        if(email === ""){

            alert("Please enter your email address.");

            return;

        }

        alert("Thank you for subscribing!");

        this.reset();

    });

}
const registerBtn =
    document.getElementById("registerBtn");

registerBtn.addEventListener("click", function () {

    const fullName =
        document.getElementById("fullName").value.trim();

    const profileImage =
        document.getElementById("profileImage").files[0];


    if (!fullName) {

        alert("Please enter your full name.");

        return;

    }


    /* Save the applicant's name */

    localStorage.setItem(
        "applicantName",
        fullName
    );


    /* Save profile picture */

    if (profileImage) {

        const reader = new FileReader();

        reader.onload = function (event) {

            localStorage.setItem(
                "applicantProfileImage",
                event.target.result
            );

            window.location.href =
                "Applicant-login.html";

        };

        reader.readAsDataURL(profileImage);

    } else {

        window.location.href =
            "Applicant-login.html";

    }

});