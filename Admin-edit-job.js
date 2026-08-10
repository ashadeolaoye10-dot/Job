/* =========================================================
   ADMIN EDIT JOB - COMPLETE JAVASCRIPT
========================================================= */


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

        console.error(
            "Error reading jobs:",
            error
        );

        return [];

    }

}


/* =========================================================
   GET JOB ID FROM URL
========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const jobId =
    urlParams.get("id");


console.log(
    "EDITING JOB ID:",
    jobId
);


/* =========================================================
   FORM ELEMENTS
========================================================= */

const editJobForm =
    document.getElementById("editJobForm");

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
        "❌ No Job ID was provided."
    );

    window.location.href =
        "Admin-dashboard.html";

}


/* =========================================================
   LOAD ALL JOBS
========================================================= */

let jobs =
    getJobs();


console.log(
    "ALL JOBS:",
    jobs
);


/* =========================================================
   FIND THE JOB
========================================================= */

const jobIndex =
    jobs.findIndex(function (item) {

        return String(item.id) ===
            String(jobId);

    });


console.log(
    "JOB INDEX:",
    jobIndex
);


/* =========================================================
   JOB NOT FOUND
========================================================= */

if (jobIndex === -1) {

    alert(
        "❌ Job information could not be found."
    );

    window.location.href =
        "Admin-dashboard.html";

}


/* =========================================================
   GET THE JOB
========================================================= */

const job =
    jobs[jobIndex];


console.log(
    "JOB BEING EDITED:",
    job
);


/* =========================================================
   PUT EXISTING JOB DATA INTO FORM
========================================================= */

if (job) {

    if (jobTitle) {

        jobTitle.value =
            job.title || "";

    }


    if (jobCategory) {

        jobCategory.value =
            job.category || "";

    }


    if (jobType) {

        jobType.value =
            job.type || "";

    }


    if (jobLocation) {

        jobLocation.value =
            job.location || "";

    }


    if (jobSalary) {

        jobSalary.value =
            job.salary || "";

    }


    if (jobDescription) {

        jobDescription.value =
            job.description || "";

    }


    if (jobRequirements) {

        jobRequirements.value =
            job.requirements || "";

    }


    if (applicationDeadline) {

        applicationDeadline.value =
            job.deadline || "";

    }


    if (numberOfOpenings) {

        numberOfOpenings.value =
            job.openings || "";

    }

}


/* =========================================================
   SAVE EDITED JOB
========================================================= */

if (editJobForm) {

    editJobForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================================
               GET NEW VALUES
            ========================================= */

            const title =
                jobTitle
                    ? jobTitle.value.trim()
                    : "";

            const category =
                jobCategory
                    ? jobCategory.value
                    : "";

            const type =
                jobType
                    ? jobType.value
                    : "";

            const location =
                jobLocation
                    ? jobLocation.value.trim()
                    : "";

            const salary =
                jobSalary
                    ? jobSalary.value.trim()
                    : "";

            const description =
                jobDescription
                    ? jobDescription.value.trim()
                    : "";

            const requirements =
                jobRequirements
                    ? jobRequirements.value.trim()
                    : "";

            const deadline =
                applicationDeadline
                    ? applicationDeadline.value
                    : "";

            const openings =
                numberOfOpenings
                    ? numberOfOpenings.value
                    : "";


            /* =========================================
               VALIDATION
            ========================================= */

            if (!title) {

                alert(
                    "⚠️ Please enter the job title."
                );

                if (jobTitle) {

                    jobTitle.focus();

                }

                return;

            }


            if (!category) {

                alert(
                    "⚠️ Please select a job category."
                );

                if (jobCategory) {

                    jobCategory.focus();

                }

                return;

            }


            if (!type) {

                alert(
                    "⚠️ Please select the employment type."
                );

                if (jobType) {

                    jobType.focus();

                }

                return;

            }


            if (!location) {

                alert(
                    "⚠️ Please enter the job location."
                );

                if (jobLocation) {

                    jobLocation.focus();

                }

                return;

            }


            if (!description) {

                alert(
                    "⚠️ Please enter the job description."
                );

                if (jobDescription) {

                    jobDescription.focus();

                }

                return;

            }


            if (!requirements) {

                alert(
                    "⚠️ Please enter the job requirements."
                );

                if (jobRequirements) {

                    jobRequirements.focus();

                }

                return;

            }


            /* =========================================
               UPDATE EXISTING JOB
            ========================================= */

            jobs[jobIndex] = {

                ...jobs[jobIndex],

                id:
                    jobs[jobIndex].id,

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


            /* =========================================
               SAVE UPDATED JOBS
            ========================================= */

            localStorage.setItem(
                "jobs",
                JSON.stringify(jobs)
            );


            /* =========================================
               VERIFY SAVE
            ========================================= */

            const verifyJobs =
                JSON.parse(
                    localStorage.getItem("jobs")
                );


            console.log(
                "UPDATED JOBS SAVED:",
                verifyJobs
            );


            console.log(
                "UPDATED JOB:",
                verifyJobs[jobIndex]
            );


            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            alert(
                "✅ Job updated successfully!"
            );


            /* =========================================
               RETURN TO DASHBOARD
            ========================================= */

            window.location.href =
                "Admin-dashboard.html";

        }
    );

}