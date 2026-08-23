/* ==========================================
   MY APPLICATIONS JAVASCRIPT
   Unicorn Innovation Hill Limited
========================================== */

const API_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


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
   CLOSE SIDEBAR ON LINK CLICK
========================================== */

document
    .querySelectorAll(".sidebar-menu a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                window.innerWidth <= 992 &&
                sidebar
            ) {

                sidebar.classList.remove("active");

                const icon =
                    menuToggle?.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    });


/* ==========================================
   APPLICATION ELEMENTS
========================================== */

const applicationsBody =
    document.getElementById("applicationsBody");

const statusFilter =
    document.getElementById("statusFilter");


/* ==========================================
   GET LOGGED-IN APPLICANT EMAIL
========================================== */

function getApplicantEmail() {

    return (
        localStorage.getItem("loggedInEmail") ||
        localStorage.getItem("applicantEmail") ||
        ""
    ).trim();

}


/* ==========================================
   LOAD APPLICATIONS FROM JAVA BACKEND
========================================== */

async function loadApplications() {

    if (!applicationsBody) {
        return;
    }

    applicationsBody.innerHTML = `

        <tr>

            <td colspan="6" class="no-application">

                <i class="fa-solid fa-spinner fa-spin"></i>

                <p>Loading your applications...</p>

            </td>

        </tr>

    `;


    try {

        const response =
            await fetch(
                API_URL +
                "/api/applications"
            );


        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status
            );

        }


        const applications =
            await response.json();


        console.log(
            "Applications received:",
            applications
        );


        if (!Array.isArray(applications)) {

            throw new Error(
                "Invalid applications response."
            );

        }


        /*
         * Only show applications belonging
         * to the currently logged-in applicant.
         */

        const applicantEmail =
            getApplicantEmail();


        const myApplications =
            applications.filter(function (application) {

                return String(
                    application.applicantEmail || ""
                ).toLowerCase() ===
                applicantEmail.toLowerCase();

            });


        displayApplications(
            myApplications,
            statusFilter
                ? statusFilter.value
                : "all"
        );


    } catch (error) {

        console.error(
            "Error loading applications:",
            error
        );


        applicationsBody.innerHTML = `

            <tr>

                <td colspan="6" class="no-application">

                    <i class="fa-solid fa-server"></i>

                    <p>
                        Unable to load applications.
                    </p>

                </td>

            </tr>

        `;

    }

}


/* ==========================================
   DISPLAY APPLICATIONS
========================================== */

function displayApplications(
    applications,
    filter = "all"
) {

    if (!applicationsBody) {
        return;
    }


    applicationsBody.innerHTML = "";


    let displayedApplications =
        applications;


    if (filter !== "all") {

        displayedApplications =
            applications.filter(function (application) {

                return String(
                    application.status || ""
                ).toLowerCase() ===
                filter.toLowerCase();

            });

    }


    if (
        !displayedApplications ||
        displayedApplications.length === 0
    ) {

        applicationsBody.innerHTML = `

            <tr>

                <td colspan="6" class="no-application">

                    <i class="fa-solid fa-file-circle-xmark"></i>

                    <p>No applications found.</p>

                </td>

            </tr>

        `;

        return;

    }


    displayedApplications.forEach(
        function (application) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        application.applicationId ||
                        application.id ||
                        "N/A"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        application.jobTitle ||
                        "N/A"
                    )}
                </td>

                <td>
                    Unicorn Innovation Hill Limited
                </td>

                <td>
                    ${escapeHTML(
                        application.dateApplied ||
                        "N/A"
                    )}
                </td>

                <td>

                    <span class="status ${
                        String(
                            application.status ||
                            "Pending"
                        ).toLowerCase()
                    }">

                        ${escapeHTML(
                            application.status ||
                            "Pending"
                        )}

                    </span>

                </td>

                <td>

                    <button
                        class="view-btn"
                        data-id="${
                            escapeHTML(
                                String(
                                    application.applicationId ||
                                    application.id ||
                                    ""
                                )
                            )
                        }">

                        <i class="fa-solid fa-eye"></i>

                        View

                    </button>

                </td>

            `;


            applicationsBody.appendChild(row);

        }
    );


    attachViewButtons();

}


/* ==========================================
   VIEW APPLICATION
========================================== */

function attachViewButtons() {

    document
        .querySelectorAll(".view-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const applicationId =
                        button.getAttribute(
                            "data-id"
                        );


                    if (!applicationId) {

                        alert(
                            "Application ID not found."
                        );

                        return;

                    }


                    try {

                        const response =
                            await fetch(
                                API_URL +
                                "/api/applications/" +
                                encodeURIComponent(
                                    applicationId
                                )
                            );


                        if (!response.ok) {

                            throw new Error(
                                "Application not found."
                            );

                        }


                        const application =
                            await response.json();


                        alert(

                            "APPLICATION DETAILS\n\n" +

                            "Application ID: " +
                            (
                                application.applicationId ||
                                application.id ||
                                "N/A"
                            ) +

                            "\n\nPosition: " +
                            (
                                application.jobTitle ||
                                "N/A"
                            ) +

                            "\n\nApplicant: " +
                            (
                                application.applicantName ||
                                "N/A"
                            ) +

                            "\n\nEmail: " +
                            (
                                application.applicantEmail ||
                                "N/A"
                            ) +

                            "\n\nDate Applied: " +
                            (
                                application.dateApplied ||
                                "N/A"
                            ) +

                            "\n\nStatus: " +
                            (
                                application.status ||
                                "Pending"
                            ) +

                            "\n\nCV: " +
                            (
                                application.cvFileName ||
                                "N/A"
                            )

                        );


                    } catch (error) {

                        console.error(
                            "View application error:",
                            error
                        );


                        alert(
                            "Unable to load application details."
                        );

                    }

                }
            );

        });

}


/* ==========================================
   STATUS FILTER
========================================== */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        loadApplications
    );

}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ==========================================
   MOBILE OUTSIDE CLICK
========================================== */

document.addEventListener(
    "click",
    function (event) {

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

    }
);


/* ==========================================
   START
========================================== */

loadApplications();