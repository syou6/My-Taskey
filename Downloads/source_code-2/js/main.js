// Loading screen animation
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  document.body.appendChild(cursorFollower);
  
  // Add clickable class to interactive elements
  const clickableElements = document.querySelectorAll('a, button, .btn, .mode-switch, .menu-toggle');
  clickableElements.forEach(el => {
    el.classList.add('clickable');
  });
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Delayed follower effect
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 100);
  });

  // Hide cursor when leaving the window
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '0.7';
    cursorFollower.style.opacity = '0.3';
  });
  
  // Add data-text attributes to navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.setAttribute('data-text', link.textContent);
  });
  
  // Particles.js initialization
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#e82127"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#39a7ff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
  
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Hide loading screen after 2.5 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
    
    // Start animations for the hero section
    document.body.classList.add('loaded');
  }, 2500);
  
  // Initialize the reveal animations for sections
  initRevealAnimations();
  
  // Initialize the mode switch functionality
  initModeSwitch();
  
  // Initialize the mobile menu
  initMobileMenu();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize vehicle model rotation
  initVehicleModelRotation();
});

// Function to handle reveal animations on scroll
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-rotate, .fade-in');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Function to handle light/dark mode switching
function initModeSwitch() {
  const modeSwitch = document.querySelector('.mode-switch');
  const modeSwitchIcon = modeSwitch.querySelector('i');
  
  modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      modeSwitchIcon.className = 'fas fa-moon';
    } else {
      modeSwitchIcon.className = 'fas fa-sun';
    }
  });
}

// Function to handle mobile menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Function to handle header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Function to handle vehicle model rotation
function initVehicleModelRotation() {
  const vehicleModels = document.querySelectorAll('.vehicle-model-inner');
  
  vehicleModels.forEach(model => {
    model.addEventListener('mousemove', (e) => {
      const rect = model.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const rotateY = (x / rect.width - 0.5) * 30;
      
      model.style.transform = `rotateY(${rotateY}deg)`;
    });
    
    model.addEventListener('mouseleave', () => {
      model.style.transform = 'rotateY(0deg)';
    });
  });
}

// Parallax effect for vehicle and charging sections
window.addEventListener('scroll', () => {
  const vehicleBackgrounds = document.querySelectorAll('.vehicle-background');
  const chargingBackground = document.querySelector('.charging-background');
  
  vehicleBackgrounds.forEach(bg => {
    const scrollPosition = window.pageYOffset;
    const parentSection = bg.parentElement;
    const parentOffset = parentSection.offsetTop;
    const distance = scrollPosition - parentOffset;
    
    if (distance > -window.innerHeight && distance < window.innerHeight) {
      bg.style.transform = `translateY(${distance * 0.15}px)`;
    }
  });
  
  if (chargingBackground) {
    const scrollPosition = window.pageYOffset;
    const parentSection = chargingBackground.parentElement;
    const parentOffset = parentSection.offsetTop;
    const distance = scrollPosition - parentOffset;
    
    if (distance > -window.innerHeight && distance < window.innerHeight) {
      chargingBackground.style.transform = `scale(${1.1 - Math.abs(distance) * 0.0002})`;
    }
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add 3D effect to cards on mouse move
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.spec, .energy-product, .charging-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Only apply effect if mouse is over the card
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateY = (x - centerX) / 10;
      const rotateX = (centerY - y) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    } else {
      // Reset when mouse is not over the card
      card.style.transform = '';
    }
  });
});