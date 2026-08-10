/* ==========================================
   ADMIN POST JOB
========================================== */

const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ==========================================
           GET FORM VALUES
        ========================================== */

        const title =
            document.getElementById("jobTitle").value.trim();

        const category =
            document.getElementById("jobCategory").value;

        const type =
            document.getElementById("jobType").value;

        const location =
            document.getElementById("jobLocation").value.trim();

        const salary =
            document.getElementById("jobSalary").value.trim();

        const description =
            document.getElementById("jobDescription").value.trim();

        const requirements =
            document.getElementById("jobRequirements").value.trim();

        const deadline =
            document.getElementById("applicationDeadline").value;

        const openings =
            document.getElementById("numberOfOpenings").value;


        /* ==========================================
           VALIDATION
        ========================================== */

        if (!title) {

            alert("Please enter the job title.");

            document.getElementById("jobTitle").focus();

            return;
        }


        if (!category) {

            alert("Please select a job category.");

            document.getElementById("jobCategory").focus();

            return;
        }


        if (!type) {

            alert("Please select the employment type.");

            document.getElementById("jobType").focus();

            return;
        }


        if (!location) {

            alert("Please enter the job location.");

            document.getElementById("jobLocation").focus();

            return;
        }


        if (!description) {

            alert("Please enter the job description.");

            document.getElementById("jobDescription").focus();

            return;
        }


        if (!requirements) {

            alert("Please enter the job requirements.");

            document.getElementById("jobRequirements").focus();

            return;
        }


        /* ==========================================
           CREATE JOB
        ========================================== */

        const newJob = {

            id: Date.now().toString(),

            title: title,

            category: category,

            type: type,

            location: location,

            salary: salary || "Salary not specified",

            description: description,

            requirements: requirements,

            deadline: deadline || "Not specified",

            openings: openings || "Not specified",

            datePosted:
                new Date().toLocaleDateString(),

            applications: 0,

            status: "Active"

        };


        /* ==========================================
           GET EXISTING JOBS
        ========================================== */

        let jobs = [];

        try {

            const savedJobs =
                localStorage.getItem("jobs");

            if (savedJobs) {

                jobs = JSON.parse(savedJobs);

            }

            if (!Array.isArray(jobs)) {

                jobs = [];

            }

        } catch (error) {

            console.error(
                "Could not read saved jobs:",
                error
            );

            jobs = [];

        }


        /* ==========================================
           ADD NEW JOB
        ========================================== */

        jobs.push(newJob);


        /* ==========================================
           SAVE JOBS
        ========================================== */

        try {

            localStorage.setItem(
                "jobs",
                JSON.stringify(jobs)
            );

        } catch (error) {

            console.error(
                "Could not save job:",
                error
            );

            alert(
                "❌ The job could not be saved."
            );

            return;

        }


        /* ==========================================
           VERIFY THAT JOB WAS SAVED
        ========================================== */

        const savedAgain =
            JSON.parse(
                localStorage.getItem("jobs")
            );


        if (
            !Array.isArray(savedAgain) ||
            !savedAgain.some(
                job => job.id === newJob.id
            )
        ) {

            alert(
                "❌ Job was not saved. Please try again."
            );

            return;
        }


        /* ==========================================
           SUCCESS
        ========================================== */

        alert(
            "✅ Job posted successfully!\n\n" +
            "The job has been saved and will appear " +
            "on the applicant Jobs page."
        );


        /* Clear form */

        jobForm.reset();


        /* ==========================================
           GO TO ADMIN DASHBOARD
        ========================================== */

        window.location.href =
            "Admin-dashboard.html";

    });

}