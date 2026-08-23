/* =========================================================
   ADMIN DASHBOARD - COMPLETE JAVASCRIPT
   MongoDB + Java Backend Version
========================================================= */


/* =========================================================
   API
========================================================= */

const API_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com/api/jobs";

/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const adminSidebar =
    document.getElementById("adminSidebar");


if (menuToggle && adminSidebar) {

    menuToggle.addEventListener(
        "click",
        function () {

            adminSidebar.classList.toggle(
                "active"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (
                    adminSidebar.classList.contains(
                        "active"
                    )
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }
            }
        }
    );
}


/* =========================================================
   CLOSE SIDEBAR WHEN LINK IS CLICKED
========================================================= */

document
    .querySelectorAll(".admin-menu a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 992 &&
                    adminSidebar
                ) {

                    adminSidebar.classList.remove(
                        "active"
                    );
                }

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
        );
    });


/* =========================================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (

            window.innerWidth <= 992 &&

            adminSidebar &&

            menuToggle &&

            adminSidebar.classList.contains(
                "active"
            ) &&

            !adminSidebar.contains(
                event.target
            ) &&

            !menuToggle.contains(
                event.target
            )

        ) {

            adminSidebar.classList.remove(
                "active"
            );

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
);


/* =========================================================
   GET JOBS FROM JAVA BACKEND
========================================================= */

async function getJobs() {

    try {

        const response =
            await fetch(API_URL, {
                method: "GET"
            });


        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " +
                response.status
            );
        }


        const jobs =
            await response.json();


        if (!Array.isArray(jobs)) {

            console.error(
                "Backend did not return an array:",
                jobs
            );

            return [];
        }


        console.log(
            "Jobs loaded from MongoDB:",
            jobs
        );


        return jobs;


    } catch (error) {

        console.error(
            "Could not load jobs from backend:",
            error
        );


        return [];
    }
}


/* =========================================================
   GET APPLICATIONS
========================================================= */

function getApplications() {

    try {

        const savedApplications =
            localStorage.getItem(
                "applications"
            );


        if (!savedApplications) {

            return [];
        }


        const applications =
            JSON.parse(
                savedApplications
            );


        return Array.isArray(
            applications
        )
            ? applications
            : [];


    } catch (error) {

        console.error(
            "Error loading applications:",
            error
        );

        return [];
    }
}


/* =========================================================
   FIND DASHBOARD ELEMENT
========================================================= */

function findElement(ids) {

    for (
        const id of ids
    ) {

        const element =
            document.getElementById(id);


        if (element) {

            return element;
        }
    }


    return null;
}


/* =========================================================
   UPDATE DASHBOARD STATISTICS
========================================================= */

async function updateStatistics() {

    const jobs =
        await getJobs();


    const applications =
        getApplications();


    /* ==========================================
       TOTAL JOBS
    ========================================== */

    const totalJobs =
        jobs.length;


    /* ==========================================
       TOTAL APPLICATIONS
    ========================================== */

    const totalApplications =
        applications.length;


    /* ==========================================
       PENDING APPLICATIONS
    ========================================== */

    const pendingApplications =
        applications.filter(
            function (application) {

                return (
                    String(
                        application.status ||
                        ""
                    ).toLowerCase()
                    ===
                    "pending"
                );
            }
        ).length;


    /* ==========================================
       TOTAL APPLICANTS
    ========================================== */

    const uniqueApplicants =
        new Set(

            applications.map(
                function (application) {

                    return (
                        application.applicantEmail ||
                        "Unknown Applicant"
                    );
                }
            )
        );


    const totalApplicants =
        uniqueApplicants.size;


    /* ==========================================
       FIND ELEMENTS
    ========================================== */

    const jobsElement =
        findElement([
            "totalJobs",
            "jobCount",
            "totalJobCount"
        ]);


    const applicationsElement =
        findElement([
            "totalApplications",
            "applicationCount",
            "totalApplicationCount"
        ]);


    const applicantsElement =
        findElement([
            "totalApplicants",
            "applicantCount",
            "totalApplicantCount"
        ]);


    const pendingElement =
        findElement([
            "pendingApplications",
            "pendingCount",
            "pendingApplicationCount"
        ]);


    /* ==========================================
       UPDATE ELEMENTS
    ========================================== */

    if (jobsElement) {

        jobsElement.textContent =
            totalJobs;
    }


    if (applicationsElement) {

        applicationsElement.textContent =
            totalApplications;
    }


    if (applicantsElement) {

        applicantsElement.textContent =
            totalApplicants;
    }


    if (pendingElement) {

        pendingElement.textContent =
            pendingApplications;
    }


    console.log(
        "Dashboard statistics:",
        {
            jobs: totalJobs,
            applicants: totalApplicants,
            applications: totalApplications,
            pending: pendingApplications
        }
    );
}


/* =========================================================
   UPDATE RECENT JOBS
========================================================= */

async function updateRecentJobs() {

    const jobs =
        await getJobs();


    /*
       This supports the admin job list
    */

    const container =
        document.getElementById(
            "adminJobList"
        );


    /*
       If your dashboard also has
       a recentJobs container,
       use it as well.
    */

    const recentContainer =
        document.getElementById(
            "recentJobs"
        );


    /* ==========================================
       DISPLAY IN ADMIN JOB LIST
    ========================================== */

    if (container) {

        container.innerHTML = "";


        if (jobs.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <i class="fa-solid fa-briefcase"></i>

                    <h3>
                        No Jobs Posted Yet
                    </h3>

                    <p>
                        You have not posted any jobs.
                    </p>

                    <a href="Admin-post-job.html">

                        <i class="fa-solid fa-plus"></i>

                        Post New Job

                    </a>

                </div>

            `;

        } else {

            /*
               Newest jobs first
            */

            const recentJobs =
                [...jobs]
                    .reverse()
                    .slice(0, 10);


            recentJobs.forEach(
                function (job) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "admin-job-item";


                    item.dataset.jobId =
                        String(job.id);


                    item.innerHTML = `

                        <div class="job-icon">

                            <i class="fa-solid fa-briefcase"></i>

                        </div>


                        <div class="admin-job-info">

                            <h3>

                                ${escapeHTML(
                                    job.title ||
                                    "Untitled Job"
                                )}

                            </h3>


                            <p>

                                📍 ${escapeHTML(
                                    job.location ||
                                    "Location not specified"
                                )}

                                &nbsp; • &nbsp;

                                💼 ${escapeHTML(
                                    job.type ||
                                    "Not specified"
                                )}

                            </p>


                            <small>

                                Posted:

                                ${escapeHTML(
                                    job.datePosted ||
                                    "Recently"
                                )}

                            </small>

                        </div>


                        <div class="admin-job-actions">

                            <button
                                type="button"
                                class="edit-job-btn"
                                data-job-id="${escapeHTML(
                                    job.id
                                )}"
                            >

                                ✏️ Edit

                            </button>


                            <button
                                type="button"
                                class="delete-job-btn"
                                data-job-id="${escapeHTML(
                                    job.id
                                )}"
                            >

                                🗑️ Delete

                            </button>

                        </div>

                    `;


                    container.appendChild(
                        item
                    );
                }
            );
        }
    }


    /* ==========================================
       DISPLAY RECENT JOBS IF AVAILABLE
       ========================================== */

    if (recentContainer) {

        recentContainer.innerHTML = "";


        if (jobs.length === 0) {

            recentContainer.innerHTML = `

                <div class="empty-state">

                    <i class="fa-solid fa-briefcase"></i>

                    <p>
                        No jobs have been posted yet.
                    </p>

                    <a href="Admin-post-job.html">

                        Post Your First Job

                    </a>

                </div>

            `;

        } else {

            const recentJobs =
                [...jobs]
                    .reverse()
                    .slice(0, 5);


            recentJobs.forEach(
                function (job) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "recent-job-item";


                    item.innerHTML = `

                        <div class="recent-job-icon">

                            <i class="fa-solid fa-briefcase"></i>

                        </div>


                        <div class="recent-job-info">

                            <h3>

                                ${escapeHTML(
                                    job.title ||
                                    "Untitled Job"
                                )}

                            </h3>


                            <p>

                                ${escapeHTML(
                                    job.location ||
                                    "Location not specified"
                                )}

                            </p>


                            <small>

                                ${escapeHTML(
                                    job.type ||
                                    "Job"
                                )}

                            </small>

                        </div>

                    `;


                    recentContainer.appendChild(
                        item
                    );
                }
            );
        }
    }
}


/* =========================================================
   UPDATE RECENT APPLICATIONS
========================================================= */

function updateRecentApplications() {

    const applications =
        getApplications();


    const container =
        document.getElementById(
            "recentApplications"
        );


    if (!container) {

        return;
    }


    container.innerHTML = "";


    if (applications.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-file-lines"></i>

                <p>
                    No applications yet.
                </p>

            </div>

        `;

        return;
    }


    const recentApplications =
        [...applications]
            .reverse()
            .slice(0, 5);


    recentApplications.forEach(
        function (application) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "recent-application-item";


            const status =
                application.status ||
                "Pending";


            item.innerHTML = `

                <div class="application-icon">

                    <i class="fa-solid fa-user"></i>

                </div>


                <div class="application-info">

                    <h3>

                        ${escapeHTML(
                            application.applicantEmail ||
                            "Applicant"
                        )}

                    </h3>


                    <p>

                        ${escapeHTML(
                            application.jobTitle ||
                            "Job Application"
                        )}

                    </p>


                    <small>

                        ${escapeHTML(
                            application.dateApplied ||
                            ""
                        )}

                    </small>

                </div>


                <span
                    class="application-status ${escapeHTML(
                        status.toLowerCase()
                    )}"
                >

                    ${escapeHTML(status)}

                </span>

            `;


            container.appendChild(
                item
            );
        }
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   REFRESH DASHBOARD
========================================================= */

async function updateAdminDashboard() {

    await updateStatistics();

    await updateRecentJobs();

    updateRecentApplications();
}


/* =========================================================
   DELETE JOB FROM MONGODB
========================================================= */

document.addEventListener(
    "click",
    async function (event) {

        const deleteButton =
            event.target.closest(
                ".delete-job-btn"
            );


        if (!deleteButton) {

            return;
        }


        const jobId =
            deleteButton.getAttribute(
                "data-job-id"
            );


        if (!jobId) {

            alert(
                "❌ Job ID was not found."
            );

            return;
        }


        /*
           Find the job from backend
        */

        const jobs =
            await getJobs();


        const job =
            jobs.find(
                function (item) {

                    return String(
                        item.id
                    ) === String(jobId);

                }
            );


        if (!job) {

            alert(
                "❌ Job could not be found."
            );

            return;
        }


        /* ==========================================
           CONFIRM DELETE
        ========================================== */

        const confirmed =
            confirm(

                "🗑️ Delete Job?\n\n" +

                "Are you sure you want to delete:\n\n" +

                job.title +

                "\n\nThis will permanently remove the job from the database."

            );


        if (!confirmed) {

            return;
        }


        try {

            /* ==========================================
               DELETE FROM JAVA BACKEND
            ========================================== */

            const response =
                await fetch(
                    API_URL +
                    "/" +
                    encodeURIComponent(
                        jobId
                    ),
                    {
                        method: "DELETE"
                    }
                );


            if (!response.ok) {

                const errorText =
                    await response.text();


                console.error(
                    "Delete error:",
                    errorText
                );


                throw new Error(
                    "Delete failed. Server returned HTTP " +
                    response.status
                );
            }


            const result =
                await response.json();


            console.log(
                "Delete response:",
                result
            );


            alert(
                "✅ Job deleted successfully from MongoDB."
            );


            /* ==========================================
               REFRESH DASHBOARD
            ========================================== */

            await updateAdminDashboard();


        } catch (error) {

            console.error(
                "Could not delete job:",
                error
            );


            alert(

                "❌ Could not delete the job.\n\n" +

                "Make sure the Java backend is running."

            );
        }
    }
);


/* =========================================================
   EDIT JOB
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const editButton =
            event.target.closest(
                ".edit-job-btn"
            );


        if (!editButton) {

            return;
        }


        const jobId =
            editButton.getAttribute(
                "data-job-id"
            );


        if (!jobId) {

            alert(
                "❌ Job ID was not found."
            );

            return;
        }


        console.log(
            "Editing job ID:",
            jobId
        );


        window.location.href =
            "Admin-edit-job.html?id=" +
            encodeURIComponent(
                jobId
            );
    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

updateAdminDashboard();


/* =========================================================
   REFRESH WHEN WINDOW GETS FOCUS
========================================================= */

window.addEventListener(
    "focus",
    function () {

        updateAdminDashboard();

    }
);


/* =========================================================
   PERIODIC REFRESH
========================================================= */

setInterval(
    function () {

        updateAdminDashboard();

    },
    5000
);