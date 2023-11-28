function toggleProfileMenu() {
  const dropdownBtn = document.getElementById("dropdownBtn");
  const profileMenu = document.querySelector(".dropdown__menu");
  // const dropdownContent = document.querySelector(".dropdown__content");
  const allMenuItems = profileMenu.querySelectorAll('[role="menuitem"]');

  function openProfileMenu() {
    dropdownBtn.setAttribute("aria-expanded", "true");

    if (allMenuItems.length > 0) {
      allMenuItems[0].focus();
    }

    profileMenu.addEventListener("keydown", handleMenuEcapeKeyPress);

    allMenuItems.forEach((item, itemIndex) => {
      item.addEventListener("keyup", (event) => {
        handleMenuItemArrowKeyPress(event, itemIndex);
      });
    });
  }

  function handleMenuItemArrowKeyPress(event, itemIndex) {
    const isLastMenuItem = itemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = itemIndex === 0;
    const nextMenuItem = allMenuItems[itemIndex + 1];
    const previousMenuItem = allMenuItems[itemIndex - 1];
    console.log(previousMenuItem, nextMenuItem);
    console.log(allMenuItems, itemIndex);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastMenuItem) {
        allMenuItems[0].focus();
      } else {
        nextMenuItem.focus();
      }
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      if (isFirstMenuItem) {
        allMenuItems[allMenuItems.length - 1].focus(); // Focus on the last menu item
      } else {
        previousMenuItem?.focus();
      }
    }
  }
  function closeProfileMenu() {
    dropdownBtn.setAttribute("aria-expanded", "false");
    dropdownBtn.focus();
  }

  function handleToggleMenu() {
    const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";
    profileMenu.classList.toggle("active");

    if (isExpanded) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  }

  function handleMenuEcapeKeyPress(event) {
    if (event.key === "Escape") handleToggleMenu();
  }

  // Toggle the "active" class to show/hide the dropdown
  dropdownBtn.addEventListener("click", handleToggleMenu);
}

const toggleNotificationMenu = () => {
  const notificationBell = document.getElementById("notificationBell");
  const notificationMenu = document.querySelector(".notification-menu");

  notificationBell.addEventListener("click", function () {
    const isExpanded =
      notificationBell.getAttribute("aria-expanded") === "true";
    notificationMenu.classList.toggle("active");

    if (isExpanded) notificationBell.setAttribute("aria-expanded", "false");
    else notificationBell.setAttribute("aria-expanded", "true");
  });
};

const closeCallout = () => {
  const planSection = document.querySelector(".plan");
  const closeBtn = document.querySelector("#close-btn");

  closeBtn.addEventListener("click", function () {
    planSection.style.display = "none";
  });
};

const setupAccordion = () => {
  // Card Accordion variables
  const accordionBtn = document.getElementById("accordion-btn");
  const cardContent = document.querySelector(".card__content");
  const icon = accordionBtn.querySelector("img");

  // Check to see if accordion is open
  const isAccordionOpen = localStorage.getItem("isAccordionOpen") === "true";

  if (isAccordionOpen)
    cardContent.style.maxHeight = `${cardContent.scrollHeight}rem`;

  // Toggle Accordion
  const toggleAccordion = () => {
    cardContent.style.maxHeight =
      cardContent.style.maxHeight === "0rem"
        ? `${cardContent.scrollHeight}rem`
        : "0rem";

    icon.src =
      cardContent.style.maxHeight === "0px"
        ? "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg"
        : "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg";

    // Update the accordion state in local storage
    localStorage.setItem(
      "isAccordionOpen",
      cardContent.style.maxHeight !== "0rem"
    );
  };

  const handleAccordionKeyPress = (event) => {
    if (event.key === "Escape" && cardContent.style.maxHeight !== "0rem") {
      toggleAccordion();
    }
  };
  accordionBtn.addEventListener("click", toggleAccordion);
  accordionBtn.addEventListener("keydown", handleAccordionKeyPress);

  if (!isAccordionOpen) toggleAccordion();
};

// /** Setup step buttons mouseenter and mouseleave */
// const hoverStepBtn = () => {
//   // Get all elements with the class "check-btn" inside the onboarding steps
//   const checkButtons = document.querySelectorAll(
//     ".onboarding__step .check-btn"
//   );

//   // Iterate over each check button and add event listeners
//   checkButtons.forEach((checkButton) => {
//     const dashedSvg = checkButton.querySelector(".circle-dashed");
//     const solidSvg = checkButton.querySelector(".circle-solid");

//     checkButton.addEventListener("mouseenter", () => {
//       dashedSvg.style.display = "none";
//       solidSvg.style.display = "inline-block";
//     });

//     checkButton.addEventListener("mouseleave", () => {
//       dashedSvg.style.display = "inline-block";
//       solidSvg.style.display = "none";
//     });
//   });
// };

// Setup onboarding step Accordion
const setupStepAccordion = () => {
  const onboardingSteps = document.querySelectorAll(".onboarding__step");

  onboardingSteps[0].classList.add("expanded");

  const toggeleStepAccordion = () => {
    onboardingSteps.forEach((step, index) => {
      const stepText = step.querySelector("span");
      // const stepCheckbox = step.querySelector(".check-btn");

      stepText.addEventListener("click", () => {
        step.classList.add("expanded");

        onboardingSteps.forEach((otherStep) => {
          if (otherStep !== step && otherStep.classList.contains("expanded")) {
            otherStep.classList.remove("expanded");
          }
        });
      });
    });
  };

  toggeleStepAccordion();
};

// const setStepCheckBtn = () => {
//   const onboardingSteps = document.querySelectorAll(".onboarding__step");
//   const checkButtons = document.querySelectorAll(
//     ".onboarding__step .check-btn"
//   );
//   const progressMeter = document.querySelector(".progress-meter");
//   const progressLabel = document.querySelector(".progress-container .label");
//   const progressContainer = document.querySelector(".progress-container");

//   let completedSteps = 0;

//   onboardingSteps[0].classList.add("expanded");

//   checkButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       const currentStep = button.closest(".onboarding__step");
//       button.classList.toggle("show");
//       button.classList.toggle("active");

//       completedSteps += button.classList.contains("active") ? 1 : -1;

//       const progressWidth = (completedSteps / onboardingSteps.length) * 100;
//       progressMeter.style.width = `${progressWidth}%`;

//       // Update the progress label
//       progressLabel.textContent = `${completedSteps} / ${onboardingSteps.length} completed`;

//       // Manually expand the next incomplete step
//       for (let i = index + 1; i < onboardingSteps.length; i++) {
//         const nextStep = onboardingSteps[i];
//         const nextButton = nextStep.querySelector(".check-btn");

//         if (!nextButton.classList.contains("active")) {
//           // Expand the next incomplete step and collapse the current step
//           onboardingSteps.forEach((step) => step.classList.remove("expanded"));
//           nextStep.classList.add("expanded");
//           break;
//         }
//       }

//       // Check if all steps are completed
//       if (completedSteps === onboardingSteps.length) {
//         // Update UI when all steps are completed
//         progressContainer.innerHTML = `
//           <span class="label">Done</span>
//           <div class="mark-icon">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//               <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#303030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>
//           </div>
//         `;
//       } else {
//         progressContainer.innerHTML = `
//           <span class="label">${completedSteps} / ${onboardingSteps.length} completed</span>
//           <div class="progress-bar">
//             <span class="progress-meter" style="width: ${progressWidth}%"></span>
//           </div>
//         `;
//       }
//     });
//   });
// };

const setStepCheckBtn = () => {
  const onboardingSteps = document.querySelectorAll(".onboarding__step");
  const checkButtons = document.querySelectorAll(
    ".onboarding__step .check-btn"
  );
  const progressMeter = document.querySelector(".progress-meter");
  const progressLabel = document.querySelector(".progress-container .label");
  const progressContainer = document.querySelector(".progress-container");

  // Retrieve completed steps and progress from localStorage
  let completedSteps = parseInt(localStorage.getItem("completedSteps")) || 0;

  // Initialize the onboarding steps based on the completed steps
  onboardingSteps.forEach((step, index) => {
    if (index < completedSteps) {
      step.classList.add("expanded");
      step.querySelector(".check-btn").classList.add("active", "show");
    }
  });

  // Update the initial progress
  updateProgress();

  checkButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle("show");
      button.classList.toggle("active");

      completedSteps += button.classList.contains("active") ? 1 : -1;

      // Store completed steps in localStorage
      localStorage.setItem("completedSteps", completedSteps);

      updateProgress();

      // Manually expand the next incomplete step
      for (let i = index + 1; i < onboardingSteps.length; i++) {
        const nextStep = onboardingSteps[i];
        const nextButton = nextStep.querySelector(".check-btn");

        if (!nextButton.classList.contains("active")) {
          // Expand the next incomplete step and collapse the current step
          onboardingSteps.forEach((step) => step.classList.remove("expanded"));
          nextStep.classList.add("expanded");
          break;
        }
      }

      // Check if all steps are completed
      if (completedSteps === onboardingSteps.length) {
        // Update UI when all steps are completed
        progressContainer.innerHTML = `
          <span class="label">Done</span>
          <div class="mark-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#303030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        `;
      }
    });
  });

  function updateProgress() {
    const progressWidth = (completedSteps / onboardingSteps.length) * 100;
    progressMeter.style.width = `${progressWidth}%`;

    // Update the progress label
    progressLabel.textContent = `${completedSteps} / ${onboardingSteps.length} completed`;

    // Update the progress container
    progressContainer.innerHTML = `
      <span class="label">${completedSteps} / ${onboardingSteps.length} completed</span>
      <div class="progress-bar">
        <span class="progress-meter" style="width: ${progressWidth}%"></span>
      </div>
    `;
  }
};

// This function activate and focus the searchbar for keyboaard user
const handleSearchKeypress = () => {
  document.addEventListener("keydown", (event) => {
    const searchBar = document.getElementById("search-input");

    if (
      (event.key === "Enter" || event.key === " " || event.key === "Tab") &&
      document.activeElement !== searchBar
    ) {
      searchBar.focus();
    }

    if (event.key === "Escape" && document.activeElement === searchBar)
      searchBar.blur();
    event.preventDefault();
  });
};

document.addEventListener("DOMContentLoaded", function () {
  handleSearchKeypress();
  toggleProfileMenu();
  toggleNotificationMenu();
  closeCallout();
  setupAccordion();
  setupStepAccordion();
  setStepCheckBtn();
  // hoverStepBtn();
});
