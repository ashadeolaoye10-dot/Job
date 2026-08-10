/* ==========================================
   APPLICANT PROFILE JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE SIDEBAR
========================================== */

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");


if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("active");

        const icon =
            menuToggle.querySelector("i");

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
   SIDEBAR LINKS
========================================== */

const sidebarLinks =
    document.querySelectorAll(".sidebar-menu a");


sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (
            window.innerWidth <= 992 &&
            sidebar
        ) {

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
   CLOSE SIDEBAR OUTSIDE
========================================== */

document.addEventListener("click", function (event) {

    if (!sidebar || !menuToggle) {
        return;
    }


    if (
        window.innerWidth <= 992 &&
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
   RESET SIDEBAR ON DESKTOP
========================================== */

window.addEventListener("resize", function () {

    if (
        window.innerWidth > 992 &&
        sidebar
    ) {

        sidebar.classList.remove("active");

        if (menuToggle) {

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    }

});


/* ==========================================
   GET SAVED APPLICANT NAME
========================================== */

const savedApplicantName =
    localStorage.getItem("applicantName");


/* ==========================================
   DISPLAY APPLICANT NAME
========================================== */

const profileName =
    document.getElementById("profileName");

const fullNameDisplay =
    document.getElementById("fullNameDisplay");


if (
    savedApplicantName &&
    profileName
) {

    profileName.textContent =
        savedApplicantName;

}


if (
    savedApplicantName &&
    fullNameDisplay
) {

    fullNameDisplay.textContent =
        savedApplicantName;

}


/* ==========================================
   PROFILE PHOTO
========================================== */

const changePhotoBtn =
    document.getElementById("changePhotoBtn");

const profileImage =
    document.getElementById("profileImage");

const profilePreview =
    document.getElementById("profilePreview");


/* ==========================================
   LOAD SAVED PHOTO
========================================== */

const savedProfileImage =
    localStorage.getItem(
        "applicantProfileImage"
    );


if (
    savedProfileImage &&
    profilePreview
) {

    profilePreview.src =
        savedProfileImage;

}


/* ==========================================
   OPEN PHOTO SELECTOR
========================================== */

if (
    changePhotoBtn &&
    profileImage
) {

    changePhotoBtn.addEventListener(
        "click",
        function () {

            profileImage.click();

        }
    );

}


/* ==========================================
   CHANGE PROFILE PHOTO
========================================== */

if (
    profileImage &&
    profilePreview
) {

    profileImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            /* Check file */

            if (
                !file.type.startsWith("image/")
            ) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }


            /* File reader */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const imageData =
                        event.target.result;


                    /* Display */

                    profilePreview.src =
                        imageData;


                    /* Save */

                    localStorage.setItem(
                        "applicantProfileImage",
                        imageData
                    );


                    alert(
                        "Profile photo changed successfully!"
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* ==========================================
   CV
========================================== */

const uploadCvBtn =
    document.getElementById("uploadCvBtn");

const cvInput =
    document.getElementById("cvInput");

const cvFileName =
    document.getElementById("cvFileName");

const cvStatus =
    document.getElementById("cvStatus");


/* ==========================================
   LOAD SAVED CV NAME
========================================== */

const savedCVName =
    localStorage.getItem(
        "applicantCVName"
    );


if (
    savedCVName &&
    cvFileName &&
    cvStatus
) {

    cvFileName.textContent =
        savedCVName;

    cvStatus.textContent =
        "CV selected successfully.";

}


/* ==========================================
   OPEN CV SELECTOR
========================================== */

if (
    uploadCvBtn &&
    cvInput
) {

    uploadCvBtn.addEventListener(
        "click",
        function () {

            cvInput.click();

        }
    );

}


/* ==========================================
   SELECT CV
========================================== */

if (
    cvInput &&
    cvFileName &&
    cvStatus
) {

    cvInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            /* Allowed extensions */

            const fileName =
                file.name.toLowerCase();


            const allowed =
                fileName.endsWith(".pdf") ||
                fileName.endsWith(".doc") ||
                fileName.endsWith(".docx");


            if (!allowed) {

                alert(
                    "Please select a PDF, DOC or DOCX file."
                );

                this.value = "";

                return;

            }


            /* Display filename */

            cvFileName.textContent =
                file.name;


            cvStatus.textContent =
                "CV selected successfully.";


            /* Save filename */

            localStorage.setItem(
                "applicantCVName",
                file.name
            );


            alert(
                "CV selected successfully!"
            );

        }
    );

}


/* ==========================================
   EDIT PROFILE
========================================== */

const editProfileBtn =
    document.getElementById(
        "editProfileBtn"
    );


if (editProfileBtn) {

    editProfileBtn.addEventListener(
        "click",
        function () {

            alert(
                "Profile editing will be available soon."
            );

        }
    );

}