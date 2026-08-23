/* ==========================================
   ADMIN POST JOB
   Unicorn Innovation Hill Limited

   Frontend
       ↓
   Render Java Backend
       ↓
   MongoDB Atlas
========================================== */


/* ==========================================
   JAVA BACKEND API
========================================== */

const API_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


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

            /* Prevent page refresh */

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
                    "Please select the job category."
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
               DISABLE SUBMIT BUTTON
            ========================================== */

            const submitButton =
                jobForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Posting Job...";

            }


            /* ==========================================
               SEND JOB TO RENDER JAVA BACKEND
            ========================================== */

            try {

                const response =
                    await fetch(
                        API_URL + "/api/jobs",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    newJob
                                )

                        }
                    );


                /* ==========================================
                   READ RESPONSE
                ========================================== */

                const responseText =
                    await response.text();


                let result = null;


                try {

                    result =
                        responseText
                            ? JSON.parse(
                                responseText
                            )
                            : null;

                } catch (jsonError) {

                    console.error(
                        "Invalid JSON response:",
                        responseText
                    );

                }


                /* ==========================================
                   CHECK RESPONSE
                ========================================== */

                if (!response.ok) {

                    console.error(
                        "Backend error:",
                        response.status,
                        responseText
                    );


                    throw new Error(
                        result?.message ||
                        "Server returned status " +
                        response.status
                    );

                }


                /* ==========================================
                   SUCCESS
                ========================================== */

                console.log(
                    "Job successfully posted:",
                    result
                );


                alert(
                    "✅ Job posted successfully!\n\n" +
                    "The job has been saved to MongoDB " +
                    "and is now available on the Jobs page."
                );


                /* Clear form */

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
                    error.message +
                    "\n\nPlease try again."
                );


                /* Re-enable button */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Post Job";

                }

            }

        }
    );

}