/* ==========================================
   MY APPLICATIONS JAVASCRIPT
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

        if (sidebar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* ==========================================
   CLOSE SIDEBAR ON LINK CLICK
========================================== */

document.querySelectorAll(".sidebar-menu a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 992 && sidebar) {

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
   APPLICATIONS
========================================== */

const applicationsBody =
    document.getElementById("applicationsBody");

const statusFilter =
    document.getElementById("statusFilter");


function getApplications() {

    return JSON.parse(
        localStorage.getItem("applicantApplications")
    ) || [];

}


/* ==========================================
   DISPLAY APPLICATIONS
========================================== */

function displayApplications(filter = "all") {

    if (!applicationsBody) {
        return;
    }


    const applications =
        getApplications();


    applicationsBody.innerHTML = "";


    let displayedApplications = applications;


    if (filter !== "all") {

        displayedApplications =
            applications.filter(function (application) {

                return application.status.toLowerCase() ===
                       filter.toLowerCase();

            });

    }


    /* No applications */

    if (displayedApplications.length === 0) {

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


    /* Create rows */

    displayedApplications.forEach(function (application) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${application.id}
            </td>

            <td>
                ${application.position}
            </td>

            <td>
                ${application.company}
            </td>

            <td>
                ${application.dateApplied}
            </td>

            <td>

                <span class="status ${application.status.toLowerCase()}">

                    ${application.status}

                </span>

            </td>

            <td>

                <button
                    class="view-btn"
                    data-id="${application.id}">

                    <i class="fa-solid fa-eye"></i>

                    View

                </button>

            </td>

        `;


        applicationsBody.appendChild(row);

    });


    attachViewButtons();

}


/* ==========================================
   VIEW APPLICATION
========================================== */

function attachViewButtons() {

    document.querySelectorAll(".view-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const applicationId =
                button.getAttribute("data-id");


            const applications =
                getApplications();


            const application =
                applications.find(function (item) {

                    return item.id === applicationId;

                });


            if (!application) {

                alert("Application not found.");

                return;

            }


            alert(

                "APPLICATION DETAILS\n\n" +

                "Application ID: " +
                application.id +

                "\n\nPosition: " +
                application.position +

                "\n\nCompany: " +
                application.company +

                "\n\nDate Applied: " +
                application.dateApplied +

                "\n\nStatus: " +
                application.status

            );

        });

    });

}


/* ==========================================
   FILTER
========================================== */

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        displayApplications(this.value);

    });

}


/* ==========================================
   INITIAL DISPLAY
========================================== */

displayApplications();


/* ==========================================
   MOBILE SIDEBAR OUTSIDE CLICK
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