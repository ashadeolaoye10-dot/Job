/* ==========================================
   SIDEBAR TOGGLE
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

if(menuToggle && sidebar){

    menuToggle.addEventListener("click", ()=>{

        sidebar.classList.toggle("active");

    });

}

/* ==========================================
   ACTIVE MENU
========================================== */

const menuLinks = document.querySelectorAll(".sidebar-menu li");

menuLinks.forEach(link=>{

    link.addEventListener("click", ()=>{

        menuLinks.forEach(item=>{

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});