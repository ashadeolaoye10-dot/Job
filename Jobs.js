/* =========================================================
   JOBS PAGE - COMPLETE JAVASCRIPT
========================================================= */


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

        if (sidebar) {

            sidebar.classList.remove("active");

        }

        if (menuToggle) {

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =========================================================
   GET JOBS FROM LOCAL STORAGE
========================================================= */

function getJobs() {

    try {

        const savedJobs =
            localStorage.getItem("jobs");

        if (!savedJobs) {

            return [];

        }

        const jobs =
            JSON.parse(savedJobs);

        if (!Array.isArray(jobs)) {

            return [];

        }

        return jobs;

    } catch (error) {

        console.error("Error reading jobs:", error);

        return [];

    }

}


/* =========================================================
   ELEMENTS
========================================================= */

const jobsGrid =
    document.getElementById("jobsGrid");

const jobCount =
    document.getElementById("jobCount");

const noResults =
    document.getElementById("noResults");

const searchInput =
    document.getElementById("jobSearch");

const locationFilter =
    document.getElementById("locationFilter");

const jobTypeFilter =
    document.getElementById("jobTypeFilter");


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   CREATE JOB CARD
========================================================= */

function createJobCard(job) {

    const card =
        document.createElement("article");

    card.className = "job-card";

    card.dataset.jobId =
        String(job.id);

    card.dataset.location =
        String(job.location || "")
            .toLowerCase();

    card.dataset.type =
        String(job.type || "")
            .toLowerCase()
            .replace(/\s+/g, "-");


    card.innerHTML = `

        <div class="job-icon">

            <i class="fa-solid fa-briefcase"></i>

        </div>


        <div class="job-content">

            <span class="job-type">

                💼 ${escapeHTML(job.type || "Job")}

            </span>


            <h2>

                ${escapeHTML(job.title)}

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

                    <i class="fa-solid fa-layer-group"></i>

                    ${escapeHTML(job.category || "General")}

                </span>

            </div>


            <p class="job-description">

                ${escapeHTML(job.description || "")}

            </p>


            ${
                job.salary
                    ? `
                        <p class="job-salary">

                            <i class="fa-solid fa-naira-sign"></i>

                            ${escapeHTML(job.salary)}

                        </p>
                      `
                    : ""
            }


            <div class="job-actions">

                <button
                    type="button"
                    class="view-job-btn"
                    data-job-id="${escapeHTML(job.id)}">

                    👁️ View Details

                </button>


                <button
                    type="button"
                    class="apply-btn"
                    data-job-id="${escapeHTML(job.id)}">

                    📝 Apply Now

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </div>

    `;


    return card;

}


/* =========================================================
   DISPLAY JOBS
========================================================= */

function displayJobs() {

    if (!jobsGrid) {

        return;

    }


    const jobs = getJobs();


    jobsGrid.innerHTML = "";


    if (jobs.length === 0) {

        if (jobCount) {

            jobCount.textContent = "0";

        }

        if (noResults) {

            noResults.style.display = "block";

            const heading =
                noResults.querySelector("h2");

            const paragraph =
                noResults.querySelector("p");

            if (heading) {

                heading.textContent =
                    "No Jobs Available";

            }

            if (paragraph) {

                paragraph.textContent =
                    "There are currently no jobs posted.";

            }

        }

        return;

    }


    if (noResults) {

        noResults.style.display = "none";

    }


    jobs.forEach(function (job) {

        const card =
            createJobCard(job);

        jobsGrid.appendChild(card);

    });


    if (jobCount) {

        jobCount.textContent =
            jobs.length;

    }

}


/* =========================================================
   FIND JOB BY ID
========================================================= */

function findJobById(jobId) {

    const jobs =
        getJobs();


    if (!jobId) {

        return null;

    }


    return jobs.find(function (job) {

        return String(job.id) ===
            String(jobId);

    }) || null;

}


/* =========================================================
   VIEW JOB DETAILS
========================================================= */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".view-job-btn");


    if (!button) {

        return;

    }


    const jobId =
        button.getAttribute("data-job-id");


    const job =
        findJobById(jobId);


    if (!job) {

        alert(
            "❌ Job information could not be found."
        );

        return;

    }


    const details =

        "💼 " + job.title + "\n\n" +

        "🏢 Unicorn Innovation Hill Limited\n\n" +

        "📂 Category: " +
        (job.category || "Not specified") +

        "\n\n" +

        "📍 Location: " +
        (job.location || "Not specified") +

        "\n\n" +

        "🕐 Employment Type: " +
        (job.type || "Not specified") +

        "\n\n" +

        "💰 Salary: " +
        (job.salary || "Not specified") +

        "\n\n" +

        "📝 Description:\n" +
        (job.description || "Not specified") +

        "\n\n" +

        "📋 Requirements:\n" +
        (job.requirements || "Not specified") +

        "\n\n" +

        "📅 Application Deadline: " +
        (job.deadline || "Not specified") +

        "\n\n" +

        "👥 Openings: " +
        (job.openings || "Not specified");


    alert(details);

});


/* =========================================================
   APPLY NOW
========================================================= */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".apply-btn");


    if (!button) {

        return;

    }


    const jobId =
        button.getAttribute("data-job-id");


    const job =
        findJobById(jobId);


    if (!job) {

        alert(
            "❌ Job information could not be found."
        );

        return;

    }


    /* =====================================================
       CHECK CV UPLOAD
       
       IMPORTANT:
       Your Upload CV page saves:
       
       cvUploaded = "true"
       applicantCVName = CV filename
       
       So we MUST check those exact keys.
    ===================================================== */

    const cvUploaded =
        localStorage.getItem("cvUploaded");

    const applicantCVName =
        localStorage.getItem("applicantCVName");


    const hasCV =
        cvUploaded === "true" &&
        applicantCVName;


    /* =====================================================
       CV NOT UPLOADED
    ===================================================== */

    if (!hasCV) {

        const goToCV =
            confirm(

                "📄 CV Required\n\n" +

                "You need to upload your CV before " +
                "applying for this job.\n\n" +

                "Click OK to go to the Upload CV page."

            );


        if (goToCV) {

            /* Save the job the applicant wants to apply for */

            localStorage.setItem(
                "pendingJobId",
                String(job.id)
            );


            window.location.href =
                "Upload Cv.html";

        }


        return;

    }


    /* =====================================================
       CV EXISTS
    ===================================================== */

    console.log(
        "CV found:",
        applicantCVName
    );


    /* =====================================================
       GET EXISTING APPLICATIONS
    ===================================================== */

    let applications = [];


    try {

        applications =
            JSON.parse(
                localStorage.getItem("applications")
            ) || [];

    } catch (error) {

        console.error(
            "Error reading applications:",
            error
        );

        applications = [];

    }


    if (!Array.isArray(applications)) {

        applications = [];

    }


    /* =====================================================
       CHECK IF ALREADY APPLIED
    ===================================================== */

    const alreadyApplied =
        applications.some(function (application) {

            return (

                String(application.jobId) ===
                String(job.id)

            );

        });


    if (alreadyApplied) {

        alert(
            "ℹ️ You have already applied for this job."
        );

        return;

    }


    /* =====================================================
       CREATE APPLICATION
    ===================================================== */

    const application = {

        id:
            Date.now().toString(),

        jobId:
            String(job.id),

        jobTitle:
            job.title,

        company:
            "Unicorn Innovation Hill Limited",

        applicantEmail:
            localStorage.getItem("loggedInEmail") ||
            "Applicant",

        cv:
            applicantCVName,

        dateApplied:
            new Date().toLocaleDateString(),

        status:
            "Pending"

    };


    /* =====================================================
       SAVE APPLICATION
    ===================================================== */

    applications.push(application);


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    /* =====================================================
       UPDATE JOB APPLICATION COUNT
    ===================================================== */

    let jobs =
        getJobs();


    jobs =
        jobs.map(function (savedJob) {

            if (
                String(savedJob.id) ===
                String(job.id)
            ) {

                savedJob.applications =
                    Number(
                        savedJob.applications || 0
                    ) + 1;

            }


            return savedJob;

        });


    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );


    /* =====================================================
       REMOVE PENDING JOB
    ===================================================== */

    localStorage.removeItem(
        "pendingJobId"
    );


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    alert(

        "✅ Application Successful!\n\n" +

        "You have successfully applied for:\n\n" +

        job.title +

        "\n\nYour application is now pending review."

    );


    /* Refresh */

    displayJobs();

});


/* =========================================================
   SEARCH AND FILTER
========================================================= */

function filterJobs() {

    if (!jobsGrid) {

        return;

    }


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedLocation =
        locationFilter
            ? locationFilter.value.toLowerCase()
            : "all";


    const selectedType =
        jobTypeFilter
            ? jobTypeFilter.value.toLowerCase()
            : "all";


    const cards =
        jobsGrid.querySelectorAll(".job-card");


    let visibleCount = 0;


    cards.forEach(function (card) {

        const title =
            card.querySelector("h2")
                ?.textContent
                .toLowerCase() || "";


        const description =
            card.querySelector(".job-description")
                ?.textContent
                .toLowerCase() || "";


        const location =
            card.dataset.location || "";


        const type =
            card.dataset.type || "";


        const matchesSearch =
            title.includes(search) ||
            description.includes(search);


        const matchesLocation =
            selectedLocation === "all" ||
            location.includes(selectedLocation);


        const matchesType =
            selectedType === "all" ||
            type.includes(selectedType);


        if (
            matchesSearch &&
            matchesLocation &&
            matchesType
        ) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (jobCount) {

        jobCount.textContent =
            visibleCount;

    }


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   SEARCH EVENTS
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
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
   LOAD JOBS
========================================================= */

displayJobs();