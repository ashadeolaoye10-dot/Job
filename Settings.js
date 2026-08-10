/* ==========================================
   SETTINGS JAVASCRIPT
   Unicorn Innovation Hill Limited
========================================== */


/* ==========================================
   MOBILE SIDEBAR
========================================== */

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (sidebar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* ==========================================
   CLOSE SIDEBAR AFTER CLICKING LINK
========================================== */

const sidebarLinks =
    document.querySelectorAll(".sidebar-menu a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 992 && sidebar) {

            sidebar.classList.remove("active");

            const icon =
                menuToggle
                    ? menuToggle.querySelector("i")
                    : null;

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* ==========================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================== */

document.addEventListener("click", function (event) {

    if (
        window.innerWidth <= 992 &&
        sidebar &&
        menuToggle &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        sidebar.classList.remove("active");

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

});


/* ==========================================
   APPLICANT NAME
========================================== */

const fullName =
    document.getElementById("fullName");

const savedName =
    localStorage.getItem("applicantName");

if (fullName && savedName) {

    fullName.value = savedName;

}


/* ==========================================
   APPLICANT EMAIL
========================================== */

const email =
    document.getElementById("email");

const savedEmail =
    localStorage.getItem("applicantEmail");

if (email && savedEmail) {

    email.value = savedEmail;

}


/* ==========================================
   PROFILE PHOTO
========================================== */

const profilePhoto =
    document.getElementById("profilePhoto");

const profilePreview =
    document.getElementById("profilePreview");

const savedProfileImage =
    localStorage.getItem("applicantProfileImage");


/* Show existing profile picture */

if (
    profilePreview &&
    savedProfileImage
) {

    profilePreview.src =
        savedProfileImage;

}


/* ==========================================
   CHANGE PROFILE PHOTO
========================================== */

if (profilePhoto && profilePreview) {

    profilePhoto.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {

                return;

            }


            /* Check image type */

            if (!file.type.startsWith("image/")) {

                alert(
                    "❌ Please select a valid image file."
                );

                profilePhoto.value = "";

                return;

            }


            /* Maximum 5MB */

            if (file.size > 5 * 1024 * 1024) {

                alert(
                    "❌ Image must be smaller than 5MB."
                );

                profilePhoto.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    profilePreview.src =
                        event.target.result;

                };


            reader.readAsDataURL(file);

        }
    );

}


/* ==========================================
   SAVE PROFILE
========================================== */

const saveProfile =
    document.getElementById("saveProfile");

if (saveProfile) {

    saveProfile.addEventListener(
        "click",
        function () {

            const name =
                fullName
                    ? fullName.value.trim()
                    : "";

            const userEmail =
                email
                    ? email.value.trim()
                    : "";


            /* Validate name */

            if (!name) {

                alert(
                    "⚠️ Please enter your full name."
                );

                return;

            }


            /* Validate email */

            if (!userEmail) {

                alert(
                    "⚠️ Please enter your email address."
                );

                return;

            }


            /* Basic email check */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(userEmail)) {

                alert(
                    "❌ Please enter a valid email address."
                );

                return;

            }


            /* Save name */

            localStorage.setItem(
                "applicantName",
                name
            );


            /* Save email */

            localStorage.setItem(
                "applicantEmail",
                userEmail
            );


            /* Save profile image */

            if (
                profilePreview &&
                profilePreview.src &&
                !profilePreview.src.includes(
                    "default-profile.png"
                )
            ) {

                localStorage.setItem(
                    "applicantProfileImage",
                    profilePreview.src
                );

            }


            alert(
                "✅ Profile updated successfully!"
            );

        }
    );

}


/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

const passwordToggles =
    document.querySelectorAll(".toggle-password");


passwordToggles.forEach(function (toggle) {

    toggle.addEventListener(
        "click",
        function () {

            const targetId =
                this.getAttribute("data-target");

            const input =
                document.getElementById(targetId);


            if (!input) {

                return;

            }


            if (input.type === "password") {

                input.type = "text";

                this.classList.remove(
                    "fa-eye"
                );

                this.classList.add(
                    "fa-eye-slash"
                );

            } else {

                input.type = "password";

                this.classList.remove(
                    "fa-eye-slash"
                );

                this.classList.add(
                    "fa-eye"
                );

            }

        }
    );

});


/* ==========================================
   CHANGE PASSWORD
========================================== */

const changePassword =
    document.getElementById("changePassword");

if (changePassword) {

    changePassword.addEventListener(
        "click",
        function () {

            const currentPassword =
                document.getElementById(
                    "currentPassword"
                );

            const newPassword =
                document.getElementById(
                    "newPassword"
                );

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                );


            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {

                return;

            }


            const current =
                currentPassword.value.trim();

            const newPass =
                newPassword.value.trim();

            const confirm =
                confirmPassword.value.trim();


            /* Empty fields */

            if (
                !current ||
                !newPass ||
                !confirm
            ) {

                alert(
                    "⚠️ Please fill in all password fields."
                );

                return;

            }


            /* Minimum password length */

            if (newPass.length < 8) {

                alert(
                    "❌ New password must contain at least 8 characters."
                );

                return;

            }


            /* Confirm password */

            if (newPass !== confirm) {

                alert(
                    "❌ New passwords do not match."
                );

                return;

            }


            /* Prevent same password */

            if (current === newPass) {

                alert(
                    "❌ Your new password must be different from your current password."
                );

                return;

            }


            /*
               FRONTEND DEMO ONLY

               A real password change must
               eventually be handled by your
               Java backend.
            */

            localStorage.setItem(
                "passwordChanged",
                "true"
            );


            currentPassword.value = "";
            newPassword.value = "";
            confirmPassword.value = "";


            alert(
                "✅ Password updated successfully!"
            );

        }
    );

}


/* ==========================================
   NOTIFICATION SETTINGS
========================================== */

const jobAlerts =
    document.getElementById("jobAlerts");

const applicationUpdates =
    document.getElementById(
        "applicationUpdates"
    );

const emailNotifications =
    document.getElementById(
        "emailNotifications"
    );


/* ==========================================
   LOAD SAVED NOTIFICATION SETTINGS
========================================== */

const savedJobAlerts =
    localStorage.getItem("jobAlerts");

const savedApplicationUpdates =
    localStorage.getItem(
        "applicationUpdates"
    );

const savedEmailNotifications =
    localStorage.getItem(
        "emailNotifications"
    );


if (
    jobAlerts &&
    savedJobAlerts !== null
) {

    jobAlerts.checked =
        savedJobAlerts === "true";

}


if (
    applicationUpdates &&
    savedApplicationUpdates !== null
) {

    applicationUpdates.checked =
        savedApplicationUpdates === "true";

}


if (
    emailNotifications &&
    savedEmailNotifications !== null
) {

    emailNotifications.checked =
        savedEmailNotifications === "true";

}


/* ==========================================
   SAVE NOTIFICATION SETTINGS
========================================== */

const saveNotifications =
    document.getElementById(
        "saveNotifications"
    );


if (saveNotifications) {

    saveNotifications.addEventListener(
        "click",
        function () {


            if (jobAlerts) {

                localStorage.setItem(
                    "jobAlerts",
                    jobAlerts.checked
                );

            }


            if (applicationUpdates) {

                localStorage.setItem(
                    "applicationUpdates",
                    applicationUpdates.checked
                );

            }


            if (emailNotifications) {

                localStorage.setItem(
                    "emailNotifications",
                    emailNotifications.checked
                );

            }


            alert(
                "✅ Notification preferences saved!"
            );

        }
    );

}


/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 992 &&
            sidebar
        ) {

            sidebar.classList.remove(
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