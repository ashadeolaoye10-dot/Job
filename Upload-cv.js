/* =========================================================
   UPLOAD CV JAVASCRIPT
   Works with:
   POST http://localhost:8080/api/cv/upload
========================================================= */

const API_URL = "http://localhost:8080";

/* =========================================================
   MOBILE SIDEBAR
========================================================= */

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

/* =========================================================
   CLOSE SIDEBAR WHEN LINK IS CLICKED
========================================================= */

document.querySelectorAll(".sidebar-menu a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 992 && sidebar) {

            sidebar.classList.remove("active");

            if (menuToggle) {

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        }
    });
});

/* =========================================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================================= */

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

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }
});

/* =========================================================
   APPLICANT NAME
========================================================= */

const applicantName = document.getElementById("applicantName");

const savedApplicantName =
    localStorage.getItem("applicantName");

if (applicantName && savedApplicantName) {
    applicantName.textContent = savedApplicantName;
}

/* =========================================================
   CV ELEMENTS
========================================================= */

const cvFile = document.getElementById("cvFile");
const uploadArea = document.getElementById("uploadArea");
const filePreview = document.getElementById("filePreview");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const removeFile = document.getElementById("removeFile");
const uploadBtn = document.getElementById("uploadBtn");
const uploadMessage = document.getElementById("uploadMessage");

/* =========================================================
   SELECTED FILE
========================================================= */

let selectedFile = null;

/* =========================================================
   VALIDATE FILE
========================================================= */

function validateFile(file) {

    if (!file) {

        return {
            valid: false,
            message: "Please choose your CV first."
        };
    }

    const allowedExtensions = [
        ".pdf",
        ".doc",
        ".docx"
    ];

    const lowerName = file.name.toLowerCase();

    const validExtension =
        allowedExtensions.some(function (extension) {
            return lowerName.endsWith(extension);
        });

    if (!validExtension) {

        return {
            valid: false,
            message:
                "❌ Only PDF, DOC and DOCX files are allowed."
        };
    }

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {

        return {
            valid: false,
            message:
                "❌ Your CV must not be larger than 5MB."
        };
    }

    return {
        valid: true,
        message: ""
    };
}

/* =========================================================
   FORMAT FILE SIZE
========================================================= */

function formatFileSize(bytes) {

    if (!bytes || bytes < 1024) {
        return (bytes || 0) + " Bytes";
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

/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(message, type) {

    if (!uploadMessage) {
        return;
    }

    uploadMessage.textContent = message;

    uploadMessage.className =
        "upload-message " + type;

    uploadMessage.style.display = "block";
}

/* =========================================================
   DISPLAY SELECTED FILE
========================================================= */

function displayFile(file) {

    if (!filePreview || !fileName || !fileSize) {
        return;
    }

    fileName.textContent = file.name;

    fileSize.textContent =
        formatFileSize(file.size);

    filePreview.style.display = "flex";

    const icon =
        filePreview.querySelector(".file-icon i");

    if (icon) {

        if (
            file.name
                .toLowerCase()
                .endsWith(".pdf")
        ) {

            icon.className =
                "fa-solid fa-file-pdf";

        } else {

            icon.className =
                "fa-solid fa-file-word";
        }
    }
}

/* =========================================================
   HANDLE FILE
========================================================= */

function handleFile(file) {

    const validation =
        validateFile(file);

    if (!validation.valid) {

        selectedFile = null;

        if (filePreview) {
            filePreview.style.display = "none";
        }

        showMessage(
            validation.message,
            "error"
        );

        return;
    }

    selectedFile = file;

    displayFile(file);

    if (uploadMessage) {
        uploadMessage.style.display = "none";
    }
}

/* =========================================================
   CHOOSE CV
========================================================= */

if (cvFile) {

    cvFile.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {
            handleFile(file);
        }
    });
}

/* =========================================================
   DRAG AND DROP
========================================================= */

if (uploadArea) {

    uploadArea.addEventListener("dragover", function (event) {

        event.preventDefault();

        uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", function () {

        uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", function (event) {

        event.preventDefault();

        uploadArea.classList.remove("dragover");

        const file =
            event.dataTransfer.files[0];

        if (file) {
            handleFile(file);
        }
    });
}

/* =========================================================
   REMOVE CV
========================================================= */

if (removeFile) {

    removeFile.addEventListener("click", function () {

        selectedFile = null;

        if (cvFile) {
            cvFile.value = "";
        }

        if (filePreview) {
            filePreview.style.display = "none";
        }

        localStorage.removeItem("cvUploaded");
        localStorage.removeItem("applicantCVName");
        localStorage.removeItem("applicantCVSize");
        localStorage.removeItem("applicantCVSavedName");

        if (uploadBtn) {

            uploadBtn.disabled = false;

            uploadBtn.innerHTML =
                '<i class="fa-solid fa-upload"></i> Upload CV';

            uploadBtn.style.background = "";
            uploadBtn.style.cursor = "pointer";
        }

        showMessage(
            "CV removed.",
            "success"
        );
    });
}

/* =========================================================
   UPLOAD CV
========================================================= */

if (uploadBtn) {

    uploadBtn.addEventListener("click", async function () {

        /* -----------------------------------------------
           CHECK FILE
        ------------------------------------------------ */

        if (!selectedFile) {

            showMessage(
                "⚠️ Please choose your CV before uploading.",
                "error"
            );

            return;
        }

        /* -----------------------------------------------
           VALIDATE FILE
        ------------------------------------------------ */

        const validation =
            validateFile(selectedFile);

        if (!validation.valid) {

            showMessage(
                validation.message,
                "error"
            );

            return;
        }

        /* -----------------------------------------------
           DISABLE BUTTON
        ------------------------------------------------ */

        uploadBtn.disabled = true;

        uploadBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';

        showMessage(
            "Uploading your CV...",
            "info"
        );

        try {

            /* ===========================================
               CREATE MULTIPART FORM DATA
            =========================================== */

            const formData = new FormData();

            /*
             * VERY IMPORTANT
             *
             * CvApi.java searches for:
             *
             * filename=
             *
             * and the multipart field is:
             *
             * file
             */

            formData.append(
                "file",
                selectedFile,
                selectedFile.name
            );

            console.log(
                "Sending CV:",
                selectedFile.name
            );

            console.log(
                "CV size:",
                selectedFile.size,
                "bytes"
            );

            /* ===========================================
               SEND REQUEST
            =========================================== */

            const response = await fetch(
                API_URL + "/api/cv/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            console.log(
                "Java HTTP status:",
                response.status
            );

            /* ===========================================
               GET RESPONSE TEXT
            =========================================== */

            const responseText =
                await response.text();

            console.log(
                "Java response:",
                responseText
            );

            /* ===========================================
               PARSE JSON
            =========================================== */

            let data;

            try {

                data =
                    JSON.parse(responseText);

            } catch (jsonError) {

                console.error(
                    "JSON parsing error:",
                    jsonError
                );

                throw new Error(
                    "Java server returned an invalid response."
                );
            }

            console.log(
                "Parsed Java response:",
                data
            );

            /* ===========================================
               CHECK SERVER RESPONSE
            =========================================== */

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "The Java server rejected the CV upload."
                );
            }

            if (data.success !== true) {

                throw new Error(
                    data.message ||
                    "CV upload failed."
                );
            }

            /* ===========================================
               SAVE SUCCESS INFORMATION
            =========================================== */

            localStorage.setItem(
                "cvUploaded",
                "true"
            );

            localStorage.setItem(
                "applicantCVName",
                data.fileName ||
                selectedFile.name
            );

            localStorage.setItem(
                "applicantCVSize",
                String(
                    data.size ||
                    selectedFile.size
                )
            );

            /*
             * Save the name generated by Java.
             */

            if (data.savedFileName) {

                localStorage.setItem(
                    "applicantCVSavedName",
                    data.savedFileName
                );
            }

            /* ===========================================
               SHOW SUCCESS
            =========================================== */

            showMessage(
                "✅ Your CV has been uploaded successfully!",
                "success"
            );

            /* ===========================================
               UPDATE BUTTON
            =========================================== */

            uploadBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> CV Uploaded';

            uploadBtn.style.background =
                "#198754";

            uploadBtn.disabled = true;

            uploadBtn.style.cursor =
                "not-allowed";

            console.log(
                "✅ CV upload completed successfully."
            );

        } catch (error) {

            console.error(
                "❌ CV upload error:",
                error
            );

            /* ===========================================
               RESTORE BUTTON
            =========================================== */

            uploadBtn.disabled = false;

            uploadBtn.innerHTML =
                '<i class="fa-solid fa-upload"></i> Upload CV';

            uploadBtn.style.background = "";

            uploadBtn.style.cursor = "pointer";

            /* ===========================================
               SHOW CORRECT ERROR
            =========================================== */

            let message =
                error.message ||
                "Unable to upload CV.";

            /*
             * If the browser cannot connect to Java.
             */

            if (
                error instanceof TypeError &&
                error.message.toLowerCase()
                    .includes("fetch")
            ) {

                message =
                    "❌ Cannot connect to the Java server. Make sure Main.java is running on http://localhost:8080.";
            }

            showMessage(
                message,
                "error"
            );
        }
    });
}

/* =========================================================
   RESTORE SAVED CV
========================================================= */

function restoreSavedCV() {

    const savedName =
        localStorage.getItem(
            "applicantCVName"
        );

    const savedSize =
        localStorage.getItem(
            "applicantCVSize"
        );

    const uploaded =
        localStorage.getItem(
            "cvUploaded"
        );

    if (
        savedName &&
        savedSize &&
        uploaded === "true"
    ) {

        if (fileName) {

            fileName.textContent =
                savedName;
        }

        if (fileSize) {

            fileSize.textContent =
                formatFileSize(
                    Number(savedSize)
                );
        }

        if (filePreview) {

            filePreview.style.display =
                "flex";
        }

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

/* =========================================================
   START
========================================================= */

restoreSavedCV();