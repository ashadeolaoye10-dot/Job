
/* =========================================================
   JOBS PAGE
   Unicorn Innovation Hill Limited

   MongoDB
      ↓
   Java Backend
      ↓
   /api/jobs
      ↓
   This page
========================================================= */

const API_URL = "http://localhost:8080";


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


let allJobs = [];


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("active");

    });

}


/* =========================================================
   LOAD JOBS FROM JAVA BACKEND
========================================================= */

async function loadJobs() {

    try {

        jobsGrid.innerHTML = `
            <div class="loading-jobs">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <p>Loading available jobs...</p>
            </div>
        `;


        const response =
            await fetch(
                API_URL + "/api/jobs"
            );


        if (!response.ok) {

            throw new Error(
                "Could not load jobs from the server."
            );

        }


        const data =
            await response.json();


        console.log(
            "Jobs received from backend:",
            data
        );


        /*
         * Accept either:
         *
         * [ {...}, {...} ]
         *
         * OR
         *
         * { jobs: [...] }
         */

        if (Array.isArray(data)) {

            allJobs = data;

        } else if (Array.isArray(data.jobs)) {

            allJobs = data.jobs;

        } else {

            allJobs = [];

        }


        renderJobs(allJobs);


    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );


        jobsGrid.innerHTML = `

            <div class="no-results">

                <i class="fa-solid fa-server"></i>

                <h2>
                    Unable to Load Jobs
                </h2>

                <p>
                    Make sure the Java backend is running.
                </p>

            </div>

        `;

        jobCount.textContent = "0";

    }

}


/* =========================================================
   RENDER JOBS
========================================================= */

function renderJobs(jobs) {

    jobsGrid.innerHTML = "";


    if (!jobs || jobs.length === 0) {

        noResults.style.display = "block";

        jobCount.textContent = "0";

        return;

    }


    noResults.style.display = "none";


    jobs.forEach(function (job) {

        const card =
            document.createElement("article");


        card.className =
            "job-card";


        card.setAttribute(
            "data-location",
            String(job.location || "").toLowerCase()
        );


        card.setAttribute(
            "data-type",
            String(job.type || "").toLowerCase()
        );


        card.setAttribute(
            "data-job-id",
            String(job.id)
        );


        card.innerHTML = `

            <div class="job-icon">

                <i class="fa-solid fa-briefcase"></i>

            </div>


            <div class="job-content">

                <span class="job-type">

                    💼 ${escapeHTML(job.type || "Job")}

                </span>


                <h2>

                    ${escapeHTML(job.title || "Untitled Job")}

                </h2>


                <p class="company">

                    <i class="fa-solid fa-building"></i>

                    Unicorn Innovation Hill Limited

                </p>


                <div class="job-details">

                    <span>

                        <i class="fa-solid fa-location-dot"></i>

                        ${escapeHTML(job.location || "Not specified")}

                    </span>


                    <span>

                        <i class="fa-solid fa-clock"></i>

                        ${escapeHTML(job.type || "Not specified")}

                    </span>

                </div>


                <p class="job-description">

                    ${escapeHTML(
                        job.description ||
                        "No job description provided."
                    )}

                </p>


                <div class="job-actions">

                    <button
                        type="button"
                        class="view-job-btn"
                        data-job-id="${escapeHTML(String(job.id))}">

                        👁️ View Details

                    </button>


                    <button
                        type="button"
                        class="apply-btn"
                        data-job-id="${escapeHTML(String(job.id))}">

                        📝 Apply Now

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            </div>

        `;


        jobsGrid.appendChild(card);

    });


    jobCount.textContent =
        jobs.length;

}


/* =========================================================
   VIEW JOB DETAILS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(".view-job-btn");


        if (!button) {

            return;

        }


        const jobId =
            button.getAttribute("data-job-id");


        const job =
            allJobs.find(function (item) {

                return String(item.id) ===
                    String(jobId);

            });


        if (!job) {

            alert(
                "❌ Job details could not be found."
            );

            return;

        }


        alert(

            "💼 JOB DETAILS\n\n" +

            "Job: " +
            (job.title || "N/A") +

            "\n\nLocation: " +
            (job.location || "N/A") +

            "\n\nType: " +
            (job.type || "N/A") +

            "\n\nDescription:\n" +
            (job.description || "No description available.") +

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
            event.target.closest(".apply-btn");


        if (!button) {

            return;

        }


        const jobId =
            button.getAttribute("data-job-id");


        const job =
            allJobs.find(function (item) {

                return String(item.id) ===
                    String(jobId);

            });


        if (!job) {

            alert(
                "❌ Job information could not be found."
            );

            return;

        }


        /* ==============================================
           CHECK LOGIN
        ============================================== */

        const loggedIn =
            localStorage.getItem(
                "isApplicantLoggedIn"
            );


        if (loggedIn !== "true") {

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


        /* ==============================================
           CHECK CV
        ============================================== */

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


        /* ==============================================
           APPLICANT INFORMATION
        ============================================== */

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


        if (!applicantName || !applicantEmail) {

            alert(
                "Your login information could not be found. Please login again."
            );


            window.location.href =
                "Applicant-login.html";


            return;

        }


        /* ==============================================
           CONFIRM APPLICATION
        ============================================== */

        const confirmed =
            confirm(

                "📝 Apply for this job?\n\n" +

                "Job: " +
                job.title +

                "\n\nApplicant: " +
                applicantName +

                "\nEmail: " +
                applicantEmail +

                "\n\nYour CV will be submitted."

            );


        if (!confirmed) {

            return;

        }


        /* ==============================================
           DISABLE BUTTON
        ============================================== */

        button.disabled = true;

        button.innerHTML =
            "⏳ Applying...";


        /* ==============================================
           APPLICATION DATA
        ============================================== */

        const applicationData = {

            jobId:
                String(job.id),

            jobTitle:
                job.title,

            applicantName:
                applicantName,

            applicantEmail:
                applicantEmail,

            cvFileName:
                applicantCVName,

            cvSavedName:
                applicantCVSavedName

        };


        /* ==============================================
           SEND TO JAVA
        ============================================== */

        try {

            const response =
                await fetch(
                    API_URL +
                    "/api/applications",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                applicationData
                            )

                    }
                );


            const result =
                await response.json();


            console.log(
                "Application response:",
                result
            );


            if (response.status === 409) {

                alert(
                    "ℹ️ You have already applied for this job."
                );


                resetApplyButton(button);

                return;

            }


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Application submission failed."
                );

            }


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


                return;

            }


            throw new Error(
                result.message ||
                "Unexpected server response."
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


            resetApplyButton(button);

        }

    }
);


/* =========================================================
   RESET APPLY BUTTON
========================================================= */

function resetApplyButton(button) {

    button.disabled =
        false;


    button.innerHTML =
        `📝 Apply Now
         <i class="fa-solid fa-arrow-right"></i>`;

}


/* =========================================================
   SEARCH + FILTER
========================================================= */

function filterJobs() {

    const search =
        (jobSearch.value || "")
            .trim()
            .toLowerCase();


    const location =
        locationFilter.value
            .toLowerCase();


    const type =
        jobTypeFilter.value
            .toLowerCase();


    const filtered =
        allJobs.filter(function (job) {

            const title =
                String(
                    job.title || ""
                ).toLowerCase();


            const description =
                String(
                    job.description || ""
                ).toLowerCase();


            const jobLocation =
                String(
                    job.location || ""
                ).toLowerCase();


            const jobType =
                String(
                    job.type || ""
                ).toLowerCase();


            const matchesSearch =
                title.includes(search) ||
                description.includes(search);


            const matchesLocation =
                location === "all" ||
                jobLocation === location;


            const matchesType =
                type === "all" ||
                jobType === type;


            return (
                matchesSearch &&
                matchesLocation &&
                matchesType
            );

        });


    renderJobs(filtered);

}


if (jobSearch) {

    jobSearch.addEventListener(
        "input",
        filterJobs
    );

}


if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterJobs
    );

}


if (jobTypeFilter) {

    jobTypeFilter.addEventListener(
        "change",
        filterJobs
    );


}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   START
========================================================= */

loadJobs();