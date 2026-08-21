/* =========================================================
   ADMIN EDIT JOB
   MONGODB + JAVA BACKEND VERSION
========================================================= */

const API_URL = "http://localhost:8080/api/jobs";


/* =========================================================
   GET JOB ID FROM URL
========================================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const jobId = urlParams.get("id");

console.log("========================================");
console.log("ADMIN EDIT JOB");
console.log("Job ID received:", jobId);
console.log("========================================");


/* =========================================================
   FORM ELEMENTS
========================================================= */

const editJobForm =
    document.getElementById("editJobForm");

const jobIdInput =
    document.getElementById("jobId");

const jobTitle =
    document.getElementById("jobTitle");

const jobCategory =
    document.getElementById("jobCategory");

const jobType =
    document.getElementById("jobType");

const jobLocation =
    document.getElementById("jobLocation");

const jobSalary =
    document.getElementById("jobSalary");

const jobDescription =
    document.getElementById("jobDescription");

const jobRequirements =
    document.getElementById("jobRequirements");

const applicationDeadline =
    document.getElementById("applicationDeadline");

const numberOfOpenings =
    document.getElementById("numberOfOpenings");


/* =========================================================
   CHECK JOB ID
========================================================= */

if (!jobId) {

    alert(
        "❌ Job ID was not found.\n\n" +
        "Please return to the Admin Dashboard " +
        "and click Edit again."
    );

    window.location.href =
        "Admin-dashboard.html";

}


/* =========================================================
   GET JOB FROM MONGODB
========================================================= */

async function getJobFromDatabase() {

    try {

        console.log(
            "Loading job from MongoDB..."
        );

        console.log(
            "Request URL:",
            API_URL + "/" + encodeURIComponent(jobId)
        );


        const response =
            await fetch(
                API_URL +
                "/" +
                encodeURIComponent(jobId)
            );


        console.log(
            "Backend response status:",
            response.status
        );


        if (!response.ok) {

            /*
             * If the individual GET endpoint doesn't exist,
             * try loading all jobs and find the correct one.
             */

            console.log(
                "Individual job endpoint failed."
            );

            console.log(
                "Trying GET /api/jobs instead..."
            );


            const allJobsResponse =
                await fetch(API_URL);


            if (!allJobsResponse.ok) {

                throw new Error(
                    "Could not load jobs from backend."
                );

            }


            const allJobs =
                await allJobsResponse.json();


            console.log(
                "All jobs from MongoDB:",
                allJobs
            );


            const jobs =
                Array.isArray(allJobs)
                    ? allJobs
                    : (
                        Array.isArray(allJobs.jobs)
                            ? allJobs.jobs
                            : []
                    );


            const foundJob =
                jobs.find(function (job) {

                    return (

                        String(job.id) ===
                        String(jobId)

                    ) || (

                        String(job._id) ===
                        String(jobId)

                    ) || (

                        String(job.jobId) ===
                        String(jobId)

                    );

                });


            if (!foundJob) {

                throw new Error(
                    "Job was not found in MongoDB."
                );

            }


            console.log(
                "Job found in MongoDB:",
                foundJob
            );


            return foundJob;

        }


        const job =
            await response.json();


        console.log(
            "Job loaded from MongoDB:",
            job
        );


        return job;


    } catch (error) {

        console.error(
            "Error loading job:",
            error
        );


        alert(
            "❌ Could not load this job.\n\n" +
            "Make sure your Java backend is running " +
            "on port 8080."
        );


        return null;

    }

}


/* =========================================================
   LOAD JOB INTO FORM
========================================================= */

function loadJobIntoForm(job) {

    if (!job) {

        return;

    }


    console.log(
        "Putting job information into form:",
        job
    );


    /* ==========================================
       JOB ID
    ========================================== */

    if (jobIdInput) {

        jobIdInput.value =
            job.id ||
            job._id ||
            job.jobId ||
            jobId;

    }


    /* ==========================================
       TITLE
    ========================================== */

    if (jobTitle) {

        jobTitle.value =
            job.title || "";

    }


    /* ==========================================
       CATEGORY
    ========================================== */

    if (jobCategory) {

        jobCategory.value =
            job.category || "";

    }


    /* ==========================================
       TYPE
    ========================================== */

    if (jobType) {

        jobType.value =
            job.type || "";

    }


    /* ==========================================
       LOCATION
    ========================================== */

    if (jobLocation) {

        jobLocation.value =
            job.location || "";

    }


    /* ==========================================
       SALARY
    ========================================== */

    if (jobSalary) {

        jobSalary.value =
            job.salary || "";

    }


    /* ==========================================
       DESCRIPTION
    ========================================== */

    if (jobDescription) {

        jobDescription.value =
            job.description || "";

    }


    /* ==========================================
       REQUIREMENTS
    ========================================== */

    if (jobRequirements) {

        /*
         * If requirements is an array,
         * convert it to readable text.
         */

        if (Array.isArray(job.requirements)) {

            jobRequirements.value =
                job.requirements.join("\n");

        } else {

            jobRequirements.value =
                job.requirements || "";

        }

    }


    /* ==========================================
       DEADLINE
    ========================================== */

    if (applicationDeadline) {

        let deadline =
            job.deadline || "";


        /*
         * Convert ISO date to YYYY-MM-DD
         * for the HTML date input.
         */

        if (deadline) {

            try {

                if (
                    deadline.includes("T")
                ) {

                    deadline =
                        deadline.split("T")[0];

                }

            } catch (error) {

                console.log(
                    "Could not format deadline."
                );

            }

        }


        applicationDeadline.value =
            deadline;

    }


    /* ==========================================
       OPENINGS
    ========================================== */

    if (numberOfOpenings) {

        numberOfOpenings.value =
            job.openings || "";

    }


    console.log(
        "✅ Job successfully loaded into form."
    );

}


/* =========================================================
   UPDATE JOB IN MONGODB
========================================================= */

async function updateJobInDatabase(updatedJob) {

    try {

        console.log(
            "Updating MongoDB job:",
            updatedJob
        );


        const response =
            await fetch(
                API_URL +
                "/" +
                encodeURIComponent(jobId),
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedJob)

                }
            );


        console.log(
            "Update response status:",
            response.status
        );


        if (!response.ok) {

            let errorMessage =
                "Failed to update job.";

            try {

                const errorData =
                    await response.json();

                console.error(
                    "Backend error:",
                    errorData
                );

                errorMessage =
                    errorData.message ||
                    errorData.error ||
                    errorMessage;

            } catch (error) {

                console.error(
                    "Backend returned no JSON error."
                );

            }


            throw new Error(
                errorMessage
            );

        }


        let result = null;


        try {

            result =
                await response.json();

        } catch (error) {

            console.log(
                "Backend returned no JSON body."
            );

        }


        console.log(
            "✅ Job updated successfully:",
            result
        );


        return true;


    } catch (error) {

        console.error(
            "❌ Update failed:",
            error
        );


        alert(
            "❌ Could not update the job.\n\n" +
            error.message
        );


        return false;

    }

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (editJobForm) {

    editJobForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            console.log(
                "Save Changes clicked."
            );


            /* ==========================================
               GET FORM VALUES
            ========================================== */

            const title =
                jobTitle.value.trim();


            const category =
                jobCategory.value;


            const type =
                jobType.value;


            const location =
                jobLocation.value.trim();


            const salary =
                jobSalary.value.trim();


            const description =
                jobDescription.value.trim();


            const requirements =
                jobRequirements.value.trim();


            const deadline =
                applicationDeadline.value;


            const openings =
                numberOfOpenings.value;


            /* ==========================================
               VALIDATION
            ========================================== */

            if (!title) {

                alert(
                    "Please enter the job title."
                );

                jobTitle.focus();

                return;

            }


            if (!category) {

                alert(
                    "Please select a category."
                );

                jobCategory.focus();

                return;

            }


            if (!type) {

                alert(
                    "Please select the employment type."
                );

                jobType.focus();

                return;

            }


            if (!location) {

                alert(
                    "Please enter the job location."
                );

                jobLocation.focus();

                return;

            }


            if (!description) {

                alert(
                    "Please enter the job description."
                );

                jobDescription.focus();

                return;

            }


            if (!requirements) {

                alert(
                    "Please enter the job requirements."
                );

                jobRequirements.focus();

                return;

            }


            /* ==========================================
               CREATE UPDATED JOB
            ========================================== */

            const updatedJob = {

                id:
                    jobId,

                title:
                    title,

                category:
                    category,

                type:
                    type,

                location:
                    location,

                salary:
                    salary,

                description:
                    description,

                requirements:
                    requirements,

                deadline:
                    deadline,

                openings:
                    openings

            };


            console.log(
                "Updated job to send:",
                updatedJob
            );


            /* ==========================================
               DISABLE BUTTON
            ========================================== */

            const saveButton =
                editJobForm.querySelector(
                    ".save-btn"
                );


            if (saveButton) {

                saveButton.disabled = true;

                saveButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Saving...
                `;

            }


            /* ==========================================
               UPDATE DATABASE
            ========================================== */

            const success =
                await updateJobInDatabase(
                    updatedJob
                );


            /* ==========================================
               RE-ENABLE BUTTON
            ========================================== */

            if (saveButton) {

                saveButton.disabled = false;

                saveButton.innerHTML = `
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save Changes
                `;

            }


            if (!success) {

                return;

            }


            /* ==========================================
               SUCCESS
            ========================================== */

            alert(
                "✅ Job updated successfully!"
            );


            /* ==========================================
               RETURN TO DASHBOARD
            ========================================== */

            window.location.href =
                "Admin-dashboard.html";

        }
    );

} else {

    console.error(
        "❌ editJobForm was not found."
    );

}


/* =========================================================
   LOAD JOB WHEN PAGE OPENS
========================================================= */

async function initializeEditPage() {

    console.log(
        "Initializing Edit Job page..."
    );


    const job =
        await getJobFromDatabase();


    if (!job) {

        alert(
            "❌ Job could not be found in MongoDB.\n\n" +
            "Job ID:\n" +
            jobId
        );


        window.location.href =
            "Admin-dashboard.html";


        return;

    }


    loadJobIntoForm(job);

}


/* =========================================================
   START
========================================================= */

initializeEditPage();