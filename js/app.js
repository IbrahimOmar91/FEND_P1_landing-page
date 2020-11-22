/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByTagName("section");
const nav = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function insertNavLink(name, id) {
    const htmlText = `<li><a href="#${id}" class="menu__link">${name}</a></li>`;
    nav.insertAdjacentHTML("beforeend", htmlText);
}

function isTopSectionInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <=
        0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
  function getElementOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(sections) {
    for (const section of sections) {
        let navLinkName = section.getAttribute("data-nav");
        let sectionId = section.getAttribute("id");
        insertNavLink(navLinkName, sectionId);
    }
}

// Add class 'active' to section when near top of viewport
function setSectionIntoViewActive(sections) {
    for (const section of sections) {
        const activeLink = document.querySelector(
            `a[href="#${section.getAttribute("id")}"]`
        );
        if (isTopSectionInViewport(section)) {
            section.classList.add("active");
            activeLink.classList.add("menu__link--active");
        } else {
            // if it is not, remove active styles
            section.classList.remove("active");
            activeLink.classList.remove("menu__link--active");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function smoothScroll(el) {
    window.scrollTo({
        top: getElementOffset(el).top - nav.offsetHeight,
        left: getElementOffset(el).left,
        behavior: "smooth"
    });
}

function createBtnUp() {
    const htmlTextToAdd = `<a href="#" class="bottom__link hide">To top</a>`;
    document.body.insertAdjacentHTML("afterbegin", htmlTextToAdd);
}

function showBtnUp() {
    const btn = document.querySelector(".bottom__link");
    if (window.pageYOffset <= 0.6 * window.innerHeight) {
        btn.classList.add("hide");
    } else {
        btn.classList.remove("hide");
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        });
    }
}

function hideNav(delay) {
    var timer;
    timer && clearTimeout(timer);
    nav.classList.add("hide");
    timer = setTimeout(function () {
        nav.classList.remove("hide");
    }, delay);
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener("DOMContentLoaded", function () {
    // Build menu
    buildNav(sections);
    createBtnUp();

    nav.addEventListener("click", function (e) {
        if (e.target.nodeName === "A") {
            e.preventDefault();
            const activeSection = document.querySelector(
                `section[id = ${e.target.getAttribute("href").slice(1)}]`
            );
            // Scroll to section on link click
            smoothScroll(activeSection);
        }
    });

    setTimeout(
        window.addEventListener("scroll", function () {
            setSectionIntoViewActive(sections);
            hideNav(1000);
            showBtnUp();
        }),
        500
    );
});