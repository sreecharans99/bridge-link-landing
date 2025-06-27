// Initialize animations and counters
document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  // Counter animation for stats
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-count");
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100);
      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(update, 40);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  // Feature carousel slider
  const slider = document.getElementById("featureSlider");
  if (slider) {
    const originalSlides = slider.querySelectorAll("div.flex-shrink-0");
    let currentIndex = 1;

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, originalSlides[0]);

    const allSlides = slider.querySelectorAll("div.flex-shrink-0");
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    function updateScales() {
      allSlides.forEach((slide, i) => {
        const card = slide.querySelector("div.bg-gray-100");
        card.classList.toggle("scale-110", i === currentIndex);
        card.classList.toggle("scale-100", i !== currentIndex);
      });
    }

    function rotateFeatures() {
      currentIndex++;
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateScales();

      if (currentIndex === allSlides.length - 1) {
        setTimeout(() => {
          slider.style.transition = "none";
          currentIndex = 1;
          slider.style.transform = `translateX(-${currentIndex * 100}%)`;
          updateScales();
        }, 500);
      }
    }

    updateScales();
    setInterval(rotateFeatures, 3000);
  }
});

// Modal open function
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

// Modal close function + reset
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("hidden");

  if (id === 'demoModal') {
    document.getElementById("modalThankYou").classList.add("hidden");
    document.getElementById("name").value = "";
    document.getElementById("demoEmail").value = "";
  } else if (id === 'exploreModal') {
    document.getElementById("accessLinks").classList.add("hidden");
    document.getElementById("exploreName").value = "";
    document.getElementById("exploreEmail").value = "";
  } else if (id === 'helpModal') {
    document.getElementById("helpThankYou").classList.add("hidden");
    document.getElementById("helpName").value = "";
    document.getElementById("helpPhone").value = "";
    document.getElementById("helpEmail").value = "";
    document.getElementById("helpMessage").value = "";
  }
}

// Handle Explore Modal Form
function handleExploreSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("exploreName").value.trim();
  const email = document.getElementById("exploreEmail").value.trim();
  if (name && email) {
    document.getElementById("accessLinks").classList.remove("hidden");
  }
  return false;
}

// Handle Demo Modal Form
function handleDemoSubmit(event) {
  event.preventDefault();
  document.getElementById("modalThankYou").classList.remove("hidden");
  setTimeout(() => closeModal("demoModal"), 2000);
  return false;
}

// Handle Help Modal Form
function handleHelpSubmit(event) {
  event.preventDefault();
  document.getElementById("helpThankYou").classList.remove("hidden");
  setTimeout(() => closeModal("helpModal"), 2000);
  return false;
}

// Function to handle the submission of the "Sign Up for a Free Demo" form
function submitForm(event) {
  // Prevent the default form submission (which reloads the page)
  event.preventDefault();

  // Get the value entered in the email input field
  const email = document.getElementById("email").value;

  // If the email is not empty after trimming whitespace
  if (email.trim() !== "") {
    // Show the thank-you message by removing the 'hidden' class
    const message = document.getElementById("formMessage");
    message.classList.remove("hidden");

    // Hide the message again after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      message.classList.add("hidden");
    }, 5000);
  }

  // Return false to ensure the form does not try to submit again
  return false;
}
