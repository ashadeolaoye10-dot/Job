/* ==========================================
   ADMIN POST JOB
   Sends a new job to the Java backend
========================================== */


/* ==========================================
   JAVA BACKEND API
========================================== */

const API_URL =
    "http://localhost:8080/api/jobs";


/* ==========================================
   GET POST JOB FORM
========================================== */

const jobForm =
    document.getElementById("jobForm");


/* ==========================================
   HANDLE FORM SUBMISSION
========================================== */

if (jobForm) {

    jobForm.addEventListener(
        "submit",
        async function (event) {

            /* Stop the page from refreshing */

            event.preventDefault();


            /* ==========================================
               GET FORM VALUES
            ========================================== */

            const title =
                document
                    .getElementById("jobTitle")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("jobCategory")
                    .value;


            const type =
                document
                    .getElementById("jobType")
                    .value;


            const location =
                document
                    .getElementById("jobLocation")
                    .value
                    .trim();


            const salary =
                document
                    .getElementById("jobSalary")
                    .value
                    .trim();


            const description =
                document
                    .getElementById("jobDescription")
                    .value
                    .trim();


            const requirements =
                document
                    .getElementById("jobRequirements")
                    .value
                    .trim();


            const deadline =
                document
                    .getElementById("applicationDeadline")
                    .value;


            const openings =
                document
                    .getElementById("numberOfOpenings")
                    .value;


            /* ==========================================
               VALIDATION
            ========================================== */

            if (!title) {

                alert(
                    "Please enter the job title."
                );

                document
                    .getElementById("jobTitle")
                    .focus();

                return;

            }


            if (!category) {

                alert(
                    "Please select a job category."
                );

                document
                    .getElementById("jobCategory")
                    .focus();

                return;

            }


            if (!type) {

                alert(
                    "Please select the employment type."
                );

                document
                    .getElementById("jobType")
                    .focus();

                return;

            }


            if (!location) {

                alert(
                    "Please enter the job location."
                );

                document
                    .getElementById("jobLocation")
                    .focus();

                return;

            }


            if (!description) {

                alert(
                    "Please enter the job description."
                );

                document
                    .getElementById("jobDescription")
                    .focus();

                return;

            }


            if (!requirements) {

                alert(
                    "Please enter the job requirements."
                );

                document
                    .getElementById("jobRequirements")
                    .focus();

                return;

            }


            /* ==========================================
               CREATE JOB DATA
            ========================================== */

            const newJob = {

                id:
                    Date.now().toString(),

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
                    "Not specified",

                datePosted:
                    new Date()
                        .toLocaleDateString()

            };


            /* ==========================================
               SEND JOB TO JAVA BACKEND
            ========================================== */

            try {

                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(newJob)
                        }
                    );


                /* ==========================================
                   CHECK SERVER RESPONSE
                ========================================== */

                if (!response.ok) {

                    const errorText =
                        await response.text();

                    console.error(
                        "Backend error:",
                        errorText
                    );


                    throw new Error(
                        "Server returned status " +
                        response.status
                    );

                }


                /* ==========================================
                   GET BACKEND RESPONSE
                ========================================== */

                const savedJob =
                    await response.json();


                console.log(
                    "Job saved to MongoDB:",
                    savedJob
                );


                /* ==========================================
                   SUCCESS
                ========================================== */

                alert(
                    "✅ Job posted successfully!\n\n" +
                    "The job has been saved to MongoDB " +
                    "and will appear on the applicant Jobs page."
                );


                /* Clear the form */

                jobForm.reset();


                /* ==========================================
                   RETURN TO ADMIN DASHBOARD
                ========================================== */

                window.location.href =
                    "Admin-dashboard.html";


            } catch (error) {

                console.error(
                    "Error posting job:",
                    error
                );


                alert(
                    "❌ Could not post the job.\n\n" +
                    "Make sure the Java backend is running " +
                    "and try again."
                );

            }

        }
    );

}