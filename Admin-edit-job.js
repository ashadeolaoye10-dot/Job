/* =========================================================
   ADMIN EDIT JOB
   MONGODB + JAVA BACKEND
========================================================= */


/* =========================================================
   JAVA BACKEND API
========================================================= */

const API_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com/api/jobs";


/* =========================================================
   GET JOB ID FROM URL
========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const jobId =
    urlParams.get("id");


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

        const requestUrl =
            API_URL +
            "/" +
            encodeURIComponent(jobId);


        console.log(
            "Loading job:",
            requestUrl
        );


        /* =====================================================
           TRY GET /api/jobs/{id}
        ===================================================== */

        let response =
            await fetch(requestUrl);


        console.log(
            "Individual job response:",
            response.status
        );


        if (response.ok) {

            const job =
                await response.json();


            console.log(
                "Job loaded:",
                job
            );


            return job;
        }


        /* =====================================================
           FALLBACK: GET ALL JOBS
        ===================================================== */

        console.log(
            "Individual endpoint failed."
        );

        console.log(
            "Trying GET /api/jobs..."
        );


        response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Could not load jobs from the backend. HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        const jobs =
            Array.isArray(data)
                ? data
                : (
                    Array.isArray(data.jobs)
                        ? data.jobs
                        : []
                );


        console.log(
            "Jobs received:",
            jobs
        );


        const foundJob =
            jobs.find(
                function (job) {

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

                }
            );


        if (!foundJob) {

            throw new Error(
                "Job was not found in MongoDB."
            );
        }


        console.log(
            "Job found:",
            foundJob
        );


        return foundJob;


    } catch (error) {

        console.error(
            "Error loading job:",
            error
        );


        alert(
            "❌ Could not load this job.\n\n" +
            error.message
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


    /* =====================================================
       ID
    ===================================================== */

    if (jobIdInput) {

        jobIdInput.value =
            job.id ||
            job._id ||
            job.jobId ||
            jobId;
    }


    /* =====================================================
       TITLE
    ===================================================== */

    if (jobTitle) {

        jobTitle.value =
            job.title || "";
    }


    /* =====================================================
       CATEGORY
    ===================================================== */

    if (jobCategory) {

        jobCategory.value =
            job.category || "";
    }


    /* =====================================================
       TYPE
    ===================================================== */

    if (jobType) {

        jobType.value =
            job.type || "";
    }


    /* =====================================================
       LOCATION
    ===================================================== */

    if (jobLocation) {

        jobLocation.value =
            job.location || "";
    }


    /* =====================================================
       SALARY
    ===================================================== */

    if (jobSalary) {

        jobSalary.value =
            job.salary || "";
    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    if (jobDescription) {

        jobDescription.value =
            job.description || "";
    }


    /* =====================================================
       REQUIREMENTS
    ===================================================== */

    if (jobRequirements) {

        if (
            Array.isArray(
                job.requirements
            )
        ) {

            jobRequirements.value =
                job.requirements.join("\n");

        } else {

            jobRequirements.value =
                job.requirements || "";
        }
    }


    /* =====================================================
       DEADLINE
    ===================================================== */

    if (applicationDeadline) {

        let deadline =
            job.deadline || "";


        if (deadline.includes("T")) {

            deadline =
                deadline.split("T")[0];
        }


        applicationDeadline.value =
            deadline;
    }


    /* =====================================================
       OPENINGS
    ===================================================== */

    if (numberOfOpenings) {

        numberOfOpenings.value =
            job.openings || "";
    }


    console.log(
        "✅ Job information loaded into form."
    );
}


/* =========================================================
   UPDATE JOB IN MONGODB
========================================================= */

async function updateJobInDatabase(
    updatedJob
) {

    try {

        const requestUrl =
            API_URL +
            "/" +
            encodeURIComponent(jobId);


        console.log(
            "Updating job:",
            updatedJob
        );


        const response =
            await fetch(
                requestUrl,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedJob
                        )
                }
            );


        console.log(
            "Update response:",
            response.status
        );


        if (!response.ok) {

            let message =
                "Failed to update job.";


            try {

                const errorData =
                    await response.json();


                message =
                    errorData.message ||
                    errorData.error ||
                    message;

            } catch (error) {

                console.error(
                    "Could not read error response."
                );
            }


            throw new Error(
                message
            );
        }


        let result = null;


        try {

            result =
                await response.json();

        } catch (error) {

            console.log(
                "No JSON response body."
            );
        }


        console.log(
            "✅ Job updated:",
            result
        );


        return true;


    } catch (error) {

        console.error(
            "❌ Update error:",
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


            /* =================================================
               GET VALUES
            ================================================= */

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


            /* =================================================
               VALIDATION
            ================================================= */

            if (!title) {

                alert(
                    "Please enter the job title."
                );

                jobTitle.focus();

                return;
            }


            if (!category) {

                alert(
                    "Please select a job category."
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


            /* =================================================
               UPDATED JOB
            ================================================= */

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
                    salary ||
                    "Salary not specified",

                description:
                    description,

                requirements:
                    requirements,

                deadline:
                    deadline ||
                    "Not specified",

                openings:
                    openings ||
                    "Not specified"
            };


            console.log(
                "Sending updated job:",
                updatedJob
            );


            /* =================================================
               SAVE BUTTON
            ================================================= */

            const saveButton =
                editJobForm.querySelector(
                    ".save-btn"
                );


            if (saveButton) {

                saveButton.disabled =
                    true;


                saveButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Saving...
                `;
            }


            /* =================================================
               UPDATE DATABASE
            ================================================= */

            const success =
                await updateJobInDatabase(
                    updatedJob
                );


            /* =================================================
               RESTORE BUTTON
            ================================================= */

            if (saveButton) {

                saveButton.disabled =
                    false;


                saveButton.innerHTML = `
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save Changes
                `;
            }


            if (!success) {

                return;
            }


            /* =================================================
               SUCCESS
            ================================================= */

            alert(
                "✅ Job updated successfully!"
            );


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
   INITIALIZE PAGE
========================================================= */

async function initializeEditPage() {

    if (!jobId) {

        return;
    }


    console.log(
        "Initializing Edit Job page..."
    );


    const job =
        await getJobFromDatabase();


    if (!job) {

        alert(
            "❌ Job could not be found.\n\n" +
            "Job ID: " +
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