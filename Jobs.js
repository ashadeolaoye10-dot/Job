/* =========================================================
   JOBS PAGE
   Unicorn Innovation Hill Limited

   FRONTEND
      ↓
   Render Java Backend
      ↓
   /api/jobs
      ↓
   MongoDB

   LIVE BACKEND:
   https://unicorninnovationsjobbackend-1.onrender.com
========================================================= */


/* =========================================================
   API CONFIGURATION
========================================================= */

const API_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


/* =========================================================
   ELEMENTS
========================================================= */

const jobsGrid =
    document.getElementById("jobsGrid");

const jobCount =
    document.getElementById("jobCount");

const noResults =
    document.getElementById("noResults");

const jobSearch =
    document.getElementById("jobSearch");

const locationFilter =
    document.getElementById("locationFilter");

const jobTypeFilter =
    document.getElementById("jobTypeFilter");

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");


/* =========================================================
   JOB STORAGE
========================================================= */

let allJobs = [];


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (menuToggle && sidebar) {

    menuToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle("active");

        }
    );

}


/* =========================================================
   LOAD JOBS
========================================================= */

async function loadJobs() {

    if (!jobsGrid) {

        console.error(
            "jobsGrid element was not found."
        );

        return;

    }


    jobsGrid.innerHTML = `

        <div class="loading-jobs">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <p>
                Loading available jobs...
            </p>

        </div>

    `;


    try {

        /*
         * Send request to the LIVE Java backend.
         *
         * GET:
         * https://unicorninnovationsjobbackend-1.onrender.com/api/jobs
         */

        const response =
            await fetch(
                API_URL + "/api/jobs",
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        /* =================================================
           CHECK HTTP RESPONSE
        ================================================= */

        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " +
                response.status
            );

        }


        /* =================================================
           READ JSON
        ================================================= */

        const data =
            await response.json();


        console.log(
            "Jobs received from Java backend:",
            data
        );


        /* =================================================
           ACCEPT ARRAY RESPONSE
        ================================================= */

        if (Array.isArray(data)) {

            allJobs = data;

        }


        /* =================================================
           ACCEPT { jobs: [...] } RESPONSE
        ================================================= */

        else if (
            data &&
            Array.isArray(data.jobs)
        ) {

            allJobs = data.jobs;

        }


        /* =================================================
           INVALID RESPONSE
        ================================================= */

        else {

            allJobs = [];

        }


        /* =================================================
           RENDER JOBS
        ================================================= */

        renderJobs(allJobs);


    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );


        allJobs = [];


        jobsGrid.innerHTML = `

            <div class="no-results">

                <i class="fa-solid fa-server"></i>

                <h2>
                    Unable to Load Jobs
                </h2>

                <p>
                    The job server is temporarily unavailable.
                    Please try again.
                </p>

                <button
                    type="button"
                    onclick="loadJobs()"
                    class="retry-btn">

                    🔄 Try Again

                </button>

            </div>

        `;


        if (jobCount) {

            jobCount.textContent =
                "0";

        }

    }

}


/* =========================================================
   RENDER JOBS
========================================================= */

function renderJobs(jobs) {

    if (!jobsGrid) {

        return;

    }


    jobsGrid.innerHTML = "";


    /* =====================================================
       NO JOBS
    ===================================================== */

    if (
        !Array.isArray(jobs) ||
        jobs.length === 0
    ) {

        if (noResults) {

            noResults.style.display =
                "block";

        }


        if (jobCount) {

            jobCount.textContent =
                "0";

        }


        return;

    }


    /* =====================================================
       HIDE NO RESULTS
    ===================================================== */

    if (noResults) {

        noResults.style.display =
            "none";

    }


    /* =====================================================
       CREATE JOB CARDS
    ===================================================== */

    jobs.forEach(
        function (job) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "job-card";


            const jobId =
                String(
                    job.id || ""
                );


            card.setAttribute(
                "data-location",
                String(
                    job.location || ""
                ).toLowerCase()
            );


            card.setAttribute(
                "data-type",
                String(
                    job.type || ""
                ).toLowerCase()
            );


            card.setAttribute(
                "data-job-id",
                jobId
            );


            card.innerHTML = `

                <div class="job-icon">

                    <i class="fa-solid fa-briefcase"></i>

                </div>


                <div class="job-content">

                    <span class="job-type">

                        💼
                        ${escapeHTML(
                            job.type || "Job"
                        )}

                    </span>


                    <h2>

                        ${escapeHTML(
                            job.title ||
                            "Untitled Job"
                        )}

                    </h2>


                    <p class="company">

                        <i class="fa-solid fa-building"></i>

                        Unicorn Innovation Hill Limited

                    </p>


                    <div class="job-details">

                        <span>

                            <i class="fa-solid fa-location-dot"></i>

                            ${escapeHTML(
                                job.location ||
                                "Not specified"
                            )}

                        </span>


                        <span>

                            <i class="fa-solid fa-clock"></i>

                            ${escapeHTML(
                                job.type ||
                                "Not specified"
                            )}

                        </span>


                        ${
                            job.salary
                                ? `
                                    <span>

                                        <i class="fa-solid fa-money-bill"></i>

                                        ${escapeHTML(
                                            job.salary
                                        )}

                                    </span>
                                  `
                                : ""
                        }

                    </div>


                    <p class="job-description">

                        ${escapeHTML(
                            job.description ||
                            "No job description provided."
                        )}

                    </p>


                    ${
                        job.deadline
                            ? `
                                <p class="job-deadline">

                                    <i class="fa-solid fa-calendar"></i>

                                    Deadline:
                                    ${escapeHTML(
                                        job.deadline
                                    )}

                                </p>
                              `
                            : ""
                    }


                    <div class="job-actions">

                        <button
                            type="button"
                            class="view-job-btn"
                            data-job-id="${escapeHTML(
                                jobId
                            )}">

                            👁️ View Details

                        </button>


                        <button
                            type="button"
                            class="apply-btn"
                            data-job-id="${escapeHTML(
                                jobId
                            )}">

                            📝 Apply Now

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                    </div>

                </div>

            `;


            jobsGrid.appendChild(
                card
            );

        }
    );


    /* =====================================================
       UPDATE JOB COUNT
    ===================================================== */

    if (jobCount) {

        jobCount.textContent =
            String(jobs.length);

    }

}


/* =========================================================
   VIEW JOB DETAILS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".view-job-btn"
            );


        if (!button) {

            return;

        }


        const jobId =
            button.getAttribute(
                "data-job-id"
            );


        const job =
            allJobs.find(
                function (item) {

                    return String(
                        item.id
                    ) === String(
                        jobId
                    );

                }
            );


        if (!job) {

            alert(
                "❌ Job details could not be found."
            );

            return;

        }


        alert(

            "💼 JOB DETAILS\n\n" +

            "Job: " +
            (
                job.title ||
                "N/A"
            ) +

            "\n\nCategory: " +
            (
                job.category ||
                "N/A"
            ) +

            "\n\nLocation: " +
            (
                job.location ||
                "N/A"
            ) +

            "\n\nType: " +
            (
                job.type ||
                "N/A"
            ) +

            "\n\nSalary: " +
            (
                job.salary ||
                "N/A"
            ) +

            "\n\nDeadline: " +
            (
                job.deadline ||
                "N/A"
            ) +

            "\n\nDescription:\n" +
            (
                job.description ||
                "No description available."
            ) +

            "\n\nClick Apply Now to apply."

        );

    }
);


/* =========================================================
   APPLY NOW
========================================================= */

document.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest(
                ".apply-btn"
            );


        if (!button) {

            return;

        }


        const jobId =
            button.getAttribute(
                "data-job-id"
            );


        const job =
            allJobs.find(
                function (item) {

                    return String(
                        item.id
                    ) === String(
                        jobId
                    );

                }
            );


        if (!job) {

            alert(
                "❌ Job information could not be found."
            );

            return;

        }


        /* =================================================
           CHECK APPLICANT LOGIN
        ================================================= */

        const loggedIn =
            localStorage.getItem(
                "isApplicantLoggedIn"
            );


        if (
            loggedIn !== "true"
        ) {

            alert(
                "Please login to your applicant account before applying."
            );


            localStorage.setItem(
                "pendingJobId",
                String(job.id)
            );


            window.location.href =
                "Applicant-login.html";


            return;

        }


        /* =================================================
           CHECK CV
        ================================================= */

        const cvUploaded =
            localStorage.getItem(
                "cvUploaded"
            );


        const applicantCVName =
            localStorage.getItem(
                "applicantCVName"
            );


        const applicantCVSavedName =
            localStorage.getItem(
                "applicantCVSavedName"
            );


        const hasCV =
            cvUploaded === "true" &&
            applicantCVName &&
            applicantCVSavedName;


        if (!hasCV) {

            const goToCV =
                confirm(

                    "📄 CV Required\n\n" +

                    "You must upload your CV before applying.\n\n" +

                    "Click OK to upload your CV."

                );


            if (goToCV) {

                localStorage.setItem(
                    "pendingJobId",
                    String(job.id)
                );


                window.location.href =
                    "Upload Cv.html";

            }


            return;

        }


        /* =================================================
           APPLICANT INFORMATION
        ================================================= */

        const applicantName =
            localStorage.getItem(
                "applicantName"
            ) ||
            localStorage.getItem(
                "loggedInName"
            ) ||
            "";


        const applicantEmail =
            localStorage.getItem(
                "loggedInEmail"
            ) ||
            localStorage.getItem(
                "applicantEmail"
            ) ||
            "";


        if (
            !applicantName ||
            !applicantEmail
        ) {

            alert(
                "Your login information could not be found. Please login again."
            );


            window.location.href =
                "Applicant-login.html";


            return;

        }


        /* =================================================
           CONFIRM APPLICATION
        ================================================= */

        const confirmed =
            confirm(

                "📝 Apply for this job?\n\n" +

                "Job: " +
                (
                    job.title ||
                    "N/A"
                ) +

                "\n\nApplicant: " +
                applicantName +

                "\nEmail: " +
                applicantEmail +

                "\n\nYour CV will be submitted."

            );


        if (!confirmed) {

            return;

        }


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        button.disabled =
            true;


        button.innerHTML =
            "⏳ Applying...";


        /* =================================================
           APPLICATION DATA
        ================================================= */

        const applicationData = {

            jobId:
                String(
                    job.id
                ),

            jobTitle:
                job.title || "",

            applicantName:
                applicantName,

            applicantEmail:
                applicantEmail,

            cvFileName:
                applicantCVName,

            cvSavedName:
                applicantCVSavedName

        };


        console.log(
            "Sending application:",
            applicationData
        );


        /* =================================================
           SEND APPLICATION TO JAVA BACKEND
        ================================================= */

        try {

            const response =
                await fetch(

                    API_URL +
                    "/api/applications",

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                applicationData
                            )

                    }

                );


            /* =================================================
               READ SERVER RESPONSE
            ================================================= */

            let result = {};

            try {

                result =
                    await response.json();

            } catch (jsonError) {

                console.warn(
                    "Server did not return JSON.",
                    jsonError
                );

            }


            console.log(
                "Application response:",
                result
            );


            /* =================================================
               DUPLICATE APPLICATION
            ================================================= */

            if (
                response.status === 409
            ) {

                alert(
                    "ℹ️ You have already applied for this job."
                );


                resetApplyButton(
                    button
                );


                return;

            }


            /* =================================================
               OTHER SERVER ERROR
            ================================================= */

            if (!response.ok) {

                throw new Error(

                    result.message ||

                    "Application submission failed. " +

                    "Server status: " +
                    response.status

                );

            }


            /* =================================================
               APPLICATION + EMAIL SUCCESS
            ================================================= */

            if (
                result.success === true &&
                result.emailSent === true
            ) {

                alert(

                    "✅ Application Submitted Successfully!\n\n" +

                    "Your application has been sent to the administrator."

                );


                button.innerHTML =
                    "✅ Applied";


                button.disabled =
                    true;


                button.style.opacity =
                    "0.7";


                localStorage.removeItem(
                    "pendingJobId"
                );


                return;

            }


            /* =================================================
               APPLICATION SAVED
            ================================================= */

            if (
                result.applicationSaved === true
            ) {

                alert(
                    "✅ Application saved successfully."
                );


                button.innerHTML =
                    "✅ Applied";


                button.disabled =
                    true;


                button.style.opacity =
                    "0.7";


                localStorage.removeItem(
                    "pendingJobId"
                );


                return;

            }


            /* =================================================
               GENERIC SUCCESS
            ================================================= */

            if (
                result.success === true
            ) {

                alert(
                    "✅ Application submitted successfully."
                );


                button.innerHTML =
                    "✅ Applied";


                button.disabled =
                    true;


                button.style.opacity =
                    "0.7";


                localStorage.removeItem(
                    "pendingJobId"
                );


                return;

            }


            /* =================================================
               UNKNOWN RESPONSE
            ================================================= */

            throw new Error(

                result.message ||
                "Unexpected response from the server."

            );


        } catch (error) {

            console.error(
                "Application error:",
                error
            );


            alert(

                "❌ Application could not be submitted.\n\n" +

                error.message

            );


            resetApplyButton(
                button
            );

        }

    }
);


/* =========================================================
   RESET APPLY BUTTON
========================================================= */

function resetApplyButton(
    button
) {

    if (!button) {

        return;

    }


    button.disabled =
        false;


    button.innerHTML = `

        📝 Apply Now

        <i class="fa-solid fa-arrow-right"></i>

    `;

}


/* =========================================================
   SEARCH + FILTER
========================================================= */

function filterJobs() {

    if (!jobSearch) {

        return;

    }


    const search =
        (
            jobSearch.value ||
            ""
        )
        .trim()
        .toLowerCase();


    const location =
        locationFilter
            ? locationFilter.value.toLowerCase()
            : "all";


    const type =
        jobTypeFilter
            ? jobTypeFilter.value.toLowerCase()
            : "all";


    const filtered =
        allJobs.filter(
            function (job) {

                const title =
                    String(
                        job.title ||
                        ""
                    )
                    .toLowerCase();


                const description =
                    String(
                        job.description ||
                        ""
                    )
                    .toLowerCase();


                const category =
                    String(
                        job.category ||
                        ""
                    )
                    .toLowerCase();


                const jobLocation =
                    String(
                        job.location ||
                        ""
                    )
                    .toLowerCase();


                const jobType =
                    String(
                        job.type ||
                        ""
                    )
                    .toLowerCase();


                /* =========================================
                   SEARCH
                ========================================= */

                const matchesSearch =
                    title.includes(
                        search
                    ) ||

                    description.includes(
                        search
                    ) ||

                    category.includes(
                        search
                    );


                /* =========================================
                   LOCATION
                ========================================= */

                const matchesLocation =
                    location === "all" ||

                    jobLocation ===
                    location;


                /* =========================================
                   TYPE
                ========================================= */

                const matchesType =
                    type === "all" ||

                    jobType ===
                    type;


                return (
                    matchesSearch &&
                    matchesLocation &&
                    matchesType
                );

            }
        );


    renderJobs(
        filtered
    );

}


/* =========================================================
   SEARCH LISTENER
========================================================= */

if (jobSearch) {

    jobSearch.addEventListener(
        "input",
        filterJobs
    );

}


/* =========================================================
   LOCATION LISTENER
========================================================= */

if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterJobs
    );

}


/* =========================================================
   JOB TYPE LISTENER
========================================================= */

if (jobTypeFilter) {

    jobTypeFilter.addEventListener(
        "change",
        filterJobs
    );

}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
    .replaceAll(
        "&",
        "&amp;"
    )
    .replaceAll(
        "<",
        "&lt;"
    )
    .replaceAll(
        ">",
        "&gt;"
    )
    .replaceAll(
        '"',
        "&quot;"
    )
    .replaceAll(
        "'",
        "&#039;"
    );

}


/* =========================================================
   START JOB PAGE
========================================================= */

loadJobs();