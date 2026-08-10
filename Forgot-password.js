/* ==========================================
   FORGOT PASSWORD FORM
========================================== */

const forgotForm = document.querySelector(".forgot-form");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        if (email === "") {

            alert("Please enter your email address.");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Password reset link has been sent successfully!");

        forgotForm.reset();

    });

}