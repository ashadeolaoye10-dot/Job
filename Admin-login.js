/* ==========================================
   ADMIN LOGIN
========================================== */

/* ==========================================
   GET ELEMENTS
========================================== */

const adminLoginBtn =
    document.getElementById("adminLoginBtn");

const adminEmail =
    document.getElementById("adminEmail");

const adminPassword =
    document.getElementById("adminPassword");

const adminTogglePassword =
    document.querySelector(".admin-toggle-password");


/* ==========================================
   ADMIN CREDENTIALS
========================================== */

const ADMIN_EMAIL = "Timi@gmail.com";
const ADMIN_PASSWORD = "199621";


/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

if (adminTogglePassword && adminPassword) {

    adminTogglePassword.addEventListener(
        "click",
        function () {

            if (adminPassword.type === "password") {

                adminPassword.type = "text";

                adminTogglePassword.classList.remove(
                    "fa-eye"
                );

                adminTogglePassword.classList.add(
                    "fa-eye-slash"
                );

            } else {

                adminPassword.type = "password";

                adminTogglePassword.classList.remove(
                    "fa-eye-slash"
                );

                adminTogglePassword.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}


/* ==========================================
   ADMIN LOGIN VALIDATION
========================================== */

if (adminLoginBtn) {

    adminLoginBtn.addEventListener(
        "click",
        function (event) {

            /* Prevent the link from opening
               before authentication */

            event.preventDefault();


            /* Get entered values */

            const email =
                adminEmail.value.trim();

            const password =
                adminPassword.value.trim();


            /* ======================================
               CHECK EMPTY EMAIL
            ====================================== */

            if (email === "") {

                alert(
                    "⚠️ Please enter your admin email address."
                );

                adminEmail.focus();

                return;

            }


            /* ======================================
               CHECK EMPTY PASSWORD
            ====================================== */

            if (password === "") {

                alert(
                    "⚠️ Please enter your admin password."
                );

                adminPassword.focus();

                return;

            }


            /* ======================================
               CHECK ADMIN EMAIL
            ====================================== */

            if (email !== ADMIN_EMAIL) {

                alert(
                    "❌ Incorrect admin email address."
                );

                adminEmail.focus();

                return;

            }


            /* ======================================
               CHECK ADMIN PASSWORD
            ====================================== */

            if (password !== ADMIN_PASSWORD) {

                alert(
                    "❌ Incorrect admin password."
                );

                adminPassword.focus();

                return;

            }


            /* ======================================
               LOGIN SUCCESSFUL
            ====================================== */

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            localStorage.setItem(
                "adminEmail",
                ADMIN_EMAIL
            );


            /* ======================================
               SUCCESS MESSAGE
            ====================================== */

            alert(
                "✅ Admin login successful!\n\nWelcome, Administrator."
            );


            /* ======================================
               GO TO ADMIN DASHBOARD
            ====================================== */

            window.location.href =
                "Admin-dashboard.html";

        }
    );

}