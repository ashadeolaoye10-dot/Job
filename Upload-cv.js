/* ==========================================
   UPLOAD CV JAVASCRIPT
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
   CLOSE SIDEBAR WHEN LINK IS CLICKED
========================================== */

const sidebarLinks =
    document.querySelectorAll(".sidebar-menu a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 992 && sidebar) {

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

const applicantName =
    document.getElementById("applicantName");

const savedApplicantName =
    localStorage.getItem("applicantName");

if (applicantName && savedApplicantName) {

    applicantName.textContent =
        savedApplicantName;

}


/* ==========================================
   CV ELEMENTS
========================================== */

const cvFile =
    document.getElementById("cvFile");

const uploadArea =
    document.getElementById("uploadArea");

const filePreview =
    document.getElementById("filePreview");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeFile =
    document.getElementById("removeFile");

const uploadBtn =
    document.getElementById("uploadBtn");

const uploadMessage =
    document.getElementById("uploadMessage");


/* ==========================================
   SELECTED FILE
========================================== */

let selectedFile = null;


/* ==========================================
   VALIDATE CV
========================================== */

function validateFile(file) {

    if (!file) {

        return {
            valid: false,
            message: "Please choose your CV first."
        };

    }


    const allowedTypes = [

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];


    const maxSize =
        5 * 1024 * 1024;


    if (!allowedTypes.includes(file.type)) {

        return {
            valid: false,
            message: "❌ Only PDF, DOC and DOCX files are allowed."
        };

    }


    if (file.size > maxSize) {

        return {
            valid: false,
            message: "❌ Your CV must not be larger than 5MB."
        };

    }


    return {
        valid: true,
        message: ""
    };

}


/* ==========================================
   FORMAT FILE SIZE
========================================== */

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " Bytes";

    }

    if (bytes < 1024 * 1024) {

        return (
            bytes / 1024
        ).toFixed(1) + " KB";

    }

    return (
        bytes / (1024 * 1024)
    ).toFixed(2) + " MB";

}


/* ==========================================
   SHOW MESSAGE
========================================== */

function showMessage(message, type) {

    if (!uploadMessage) return;

    uploadMessage.textContent =
        message;

    uploadMessage.className =
        "upload-message " + type;

    uploadMessage.style.display =
        "block";

}


/* ==========================================
   DISPLAY FILE
========================================== */

function displayFile(file) {

    if (!filePreview ||
        !fileName ||
        !fileSize) {

        return;

    }


    fileName.textContent =
        file.name;


    fileSize.textContent =
        formatFileSize(file.size);


    filePreview.style.display =
        "flex";


    const fileIcon =
        filePreview.querySelector(".file-icon i");


    if (fileIcon) {

        fileIcon.className =
            "fa-solid fa-file";


        if (file.type === "application/pdf") {

            fileIcon.className =
                "fa-solid fa-file-pdf";

        }

    }

}


/* ==========================================
   HANDLE SELECTED FILE
========================================== */

function handleFile(file) {

    const validation =
        validateFile(file);


    if (!validation.valid) {

        selectedFile = null;

        if (filePreview) {

            filePreview.style.display =
                "none";

        }

        showMessage(
            validation.message,
            "error"
        );

        return;

    }


    selectedFile =
        file;


    displayFile(file);


    if (uploadMessage) {

        uploadMessage.style.display =
            "none";

    }

}


/* ==========================================
   CHOOSE CV
========================================== */

if (cvFile) {

    cvFile.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (file) {

                handleFile(file);

            }

        }
    );

}


/* ==========================================
   DRAG & DROP
========================================== */

if (uploadArea) {

    uploadArea.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            uploadArea.classList.add(
                "dragover"
            );

        }
    );


    uploadArea.addEventListener(
        "dragleave",
        function () {

            uploadArea.classList.remove(
                "dragover"
            );

        }
    );


    uploadArea.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            uploadArea.classList.remove(
                "dragover"
            );


            const file =
                event.dataTransfer.files[0];


            if (file) {

                handleFile(file);

            }

        }
    );

}


/* ==========================================
   REMOVE CV
========================================== */

if (removeFile) {

    removeFile.addEventListener(
        "click",
        function () {

            selectedFile = null;


            if (cvFile) {

                cvFile.value = "";

            }


            if (filePreview) {

                filePreview.style.display =
                    "none";

            }


            /*
             * REMOVE SAVED CV STATUS
             */

            localStorage.removeItem(
                "cvUploaded"
            );

            localStorage.removeItem(
                "applicantCVName"
            );

            localStorage.removeItem(
                "applicantCVSize"
            );


            if (uploadBtn) {

                uploadBtn.disabled =
                    false;

                uploadBtn.innerHTML =
                    '<i class="fa-solid fa-cloud-arrow-up"></i> Upload CV';

                uploadBtn.style.background =
                    "";

                uploadBtn.style.cursor =
                    "pointer";

            }


            showMessage(
                "CV removed.",
                "success"
            );

        }
    );

}


/* ==========================================
   UPLOAD CV
========================================== */

if (uploadBtn) {

    uploadBtn.addEventListener(
        "click",
        function () {


            /* ----------------------------------
               CHECK FILE
            ---------------------------------- */

            if (!selectedFile) {

                showMessage(
                    "⚠️ Please choose your CV before uploading.",
                    "error"
                );

                return;

            }


            /* ----------------------------------
               VALIDATE AGAIN
            ---------------------------------- */

            const validation =
                validateFile(selectedFile);


            if (!validation.valid) {

                showMessage(
                    validation.message,
                    "error"
                );

                return;

            }


            /* ==================================
               SAVE CV INFORMATION
            ================================== */

            localStorage.setItem(
                "applicantCVName",
                selectedFile.name
            );


            localStorage.setItem(
                "applicantCVSize",
                String(selectedFile.size)
            );


            /*
             * THIS IS THE IMPORTANT PART.
             *
             * Apply Now will check this exact key.
             */

            localStorage.setItem(
                "cvUploaded",
                "true"
            );


            /* ==================================
               CONFIRM THAT IT WAS SAVED
            ================================== */

            const savedStatus =
                localStorage.getItem("cvUploaded");


            if (savedStatus !== "true") {

                showMessage(
                    "❌ CV could not be saved. Please try again.",
                    "error"
                );

                return;

            }


            /* ==================================
               SUCCESS
            ================================== */

            showMessage(
                "✅ Your CV has been uploaded successfully!",
                "success"
            );


            /* ==================================
               CHANGE BUTTON
            ================================== */

            uploadBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> CV Uploaded';


            uploadBtn.style.background =
                "#198754";


            uploadBtn.disabled =
                true;


            uploadBtn.style.cursor =
                "not-allowed";

        }
    );

}


/* ==========================================
   RESTORE PREVIOUS CV
========================================== */

function restoreSavedCV() {

    const savedCVName =
        localStorage.getItem("applicantCVName");

    const savedCVSize =
        localStorage.getItem("applicantCVSize");

    const cvUploaded =
        localStorage.getItem("cvUploaded");


    if (
        savedCVName &&
        savedCVSize &&
        cvUploaded === "true"
    ) {


        /* ------------------------------
           SHOW FILE NAME
        ------------------------------ */

        if (fileName) {

            fileName.textContent =
                savedCVName;

        }


        /* ------------------------------
           SHOW FILE SIZE
        ------------------------------ */

        if (fileSize) {

            fileSize.textContent =
                formatFileSize(
                    Number(savedCVSize)
                );

        }


        /* ------------------------------
           SHOW FILE PREVIEW
        ------------------------------ */

        if (filePreview) {

            filePreview.style.display =
                "flex";

        }


        /* ------------------------------
           UPDATE BUTTON
        ------------------------------ */

        if (uploadBtn) {

            uploadBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> CV Uploaded';


            uploadBtn.style.background =
                "#198754";


            uploadBtn.disabled =
                true;


            uploadBtn.style.cursor =
                "not-allowed";

        }

    }

}


/* ==========================================
   RUN WHEN PAGE LOADS
========================================== */

restoreSavedCV();