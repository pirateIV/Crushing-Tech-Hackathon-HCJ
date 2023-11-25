(function app() {
  const toggleMenuBtn = document.getElementById('profile-menu');
  const expandNotifications = document.getElementById('showAlertBtn');

  const accordion = document.getElementById('accordion');
  const expandCollapseAccordion = document.getElementById('toggleSetup');
  const notificationsMenu = document.getElementById('alertDropdown');

  const profileMenu = document.getElementById('dropdown-menu');

  const menuItems = Array.from(
    profileMenu.querySelectorAll('[role="menuitem"]')
  );
  const accordionItems = accordion.querySelectorAll('.accordion-item');
  const plan = document.querySelector('.plan');
  const setup = document.querySelector('.setup-guide');
  const cancelPlan = plan.querySelector('.plan-content-right .cancel-btn');

  const checkStepsBtns = Array.from(
    document.querySelectorAll('[role="checkbox"]')
  );
  const progress = document.querySelector('.progress-bar');
  let completedStep = document.querySelector('.completed-step');

  let steps = 0;
  let maxSteps = 5;

  const icons = `
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"></circle>
    </svg>
    |
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"></circle>
    </svg>
    |
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#D9D9D9" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"></circle>
    </svg>
    |
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.0004 12C22.0004 13.9778 21.4139 15.9112 20.3151 17.5557C19.2162 19.2002 17.6545 20.4819 15.8272 21.2388C13.9999 21.9957 11.9893 22.1937 10.0495 21.8079C8.10965 21.422 6.32782 20.4696 4.9293 19.0711C3.53077 17.6725 2.57837 15.8907 2.19251 13.9509C1.80666 12.0111 2.00469 10.0004 2.76157 8.17317C3.51845 6.3459 4.80017 4.78412 6.44466 3.6853C8.08916 2.58649 10.0226 2 12.0004 2" stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    |
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9996 2C13.9774 2 15.9108 2.58649 17.5553 3.6853C19.1998 4.78412 20.4816 6.3459 21.2384 8.17316C21.9953 10.0004 22.1933 12.0111 21.8075 13.9509C21.4216 15.8907 20.4692 17.6725 19.0707 19.0711C17.6722 20.4696 15.8903 21.422 13.9505 21.8079C12.0107 22.1937 10.0001 21.9957 8.1728 21.2388C6.34554 20.4819 4.78375 19.2002 3.68494 17.5557C2.58612 15.9112 1.99963 13.9778 1.99963 12" stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    |
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse opacity="0.6" cx="7.00008" cy="7.00004" rx="7.00008" ry="7.00004" transform="matrix(0.526082 -0.850434 0.850437 0.526077 0.364136 12.2701)" fill="#1C181D" stroke="#1C181D" stroke-width="1.45835" stroke-linecap="round" stroke-linejoin="round"/>
      <g opacity="0.6">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77574 5.89535C10.0109 5.83993 10.2465 5.98566 10.3019 6.22085L11.5318 11.4402C11.5872 11.6754 11.4415 11.9109 11.2063 11.9663L8.59662 12.5813C8.36143 12.6367 8.12585 12.491 8.07043 12.2558C8.01501 12.0206 8.16074 11.785 8.39593 11.7296L10.5798 11.215L9.45024 6.42154C9.39483 6.18635 9.54056 5.95077 9.77574 5.89535Z" fill="white"/>
      </g>
    </svg>
    |
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#303030"></circle>
      <path d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z" fill="#fff"></path>
    </svg>
  `;
  let iconsIndex = icons.split('|');
  let lastIcon = iconsIndex.length - 1;
  checkStepsBtns.forEach(button => {
    let current = 0;

    button.addEventListener('click', () => {
      const isChecked = button.getAttribute('checked') === 'true';
      button.setAttribute('checked', !isChecked);
      steps += isChecked ? -1 : 1;

      completedStep.textContent = steps;
      // delay progress becos of loading
      setTimeout(() => {
        progress.style.width = (steps / maxSteps) * 100 + '%';
      }, 150);

      if (current === 0 && !isChecked) {
        const iconsInterval = setInterval(() => {
          current++;
          button.innerHTML = iconsIndex[current];

          if (current === lastIcon - 3 || current === lastIcon - 2) {
            button.firstElementChild.classList.add('rotate');
          } else {
            button.firstElementChild.classList.remove('rotate');
            button.innerHTML = iconsIndex[current];
          }
          if (current >= lastIcon) {
            clearInterval(iconsInterval);
            button.innerHTML = iconsIndex[lastIcon];
          }
        }, 200);
      }
    });

    button.addEventListener('click', () => {
      const isCheckedFalse = button.getAttribute('checked') === 'false';
      if (isCheckedFalse) {
        current = 0;
        button.innerHTML = iconsIndex[0];
      }
    });
    button.addEventListener('mouseover', () => {
      if (button.innerHTML === iconsIndex[0]) {
        button.innerHTML = iconsIndex[1];
      }
    });
    button.addEventListener('mouseleave', () => {
      if (button.innerHTML === iconsIndex[1]) {
        button.innerHTML = iconsIndex[0];
      }
    });
    button.innerHTML = iconsIndex[current];
  });

  function openProfileMenu() {
    toggleMenuBtn.setAttribute('aria-expanded', 'true');
    // menuItems.item(0).focus();
    menuItems.forEach((menuitem, i) => {
      menuItems[0].focus()
    })

    // menuItems.forEach((menuitem, i) => {
    //   menuitem.addEventListener('keyup', e => {
    //     handleProfileKeyEvents(e, i);
    //   });
    // });

    profileMenu.addEventListener('keyup', handleProfileEscKey);
  }

  // function handleProfileKeyEvents(e, menuIndex) {
  //   let isFirstMenuItem = menuIndex === 0;
  //   let isLastItem = menuIndex === menuItems.length - 1;
  //   let nextMenuItem = menuItems.item(menuIndex + 1);
  //   let prevMenuItem = menuItems.item(menuIndex - 1);

  //   if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
  //     if (isLastItem) {
  //       menuItems.item(0).focus();
  //       return;
  //     }
  //     nextMenuItem.focus();
  //   }
  //   if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
  //     if (isFirstMenuItem) {
  //       menuItems.item(menuItems.length - 1).focus();
  //       return;
  //     }
  //     prevMenuItem.focus();
  //   }

  //   e.preventDefault()
  // }

  function closeProfileMenu() {
    toggleMenuBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleProfileMenu() {
    profileMenu.hidden = !profileMenu.hidden;

    const modalExpanded =
      toggleMenuBtn.getAttribute('aria-expanded') === 'true';

    modalExpanded ? closeProfileMenu() : openProfileMenu();

    notificationsMenu.hidden = true;
  }

  function toggleNotifications() {
    notificationsMenu.hidden = !notificationsMenu.hidden;

    profileMenu.hidden = true;
  }

  function handleSetupKeyPress(e) {
    if (e.key === 'Enter') {
      toggleSetup();
    }
  }

  function handleProfileEscKey(e) {
    if (e.key === 'Escape') {
      toggleProfileMenu();
    }
  }

  let currentFocused = 0;

  function handleCheckboxes() {
    checkStepsBtns.forEach((btn, index) => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          currentFocused = (currentFocused + 1) % checkStepsBtns.length;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          currentFocused =
            (currentFocused - 1 + checkStepsBtns.length) %
            checkStepsBtns.length;
        }
        checkStepsBtns[currentFocused].focus();
      });
    });
  }

  let currentMenuFocused = 0;

  function handleProfileMenuItem(){
    menuItems.forEach(menuitem => {
      menuitem.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
          e.preventDefault()
          currentMenuFocused = currentFocused + 1 % menuItems.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault()
          currentMenuFocused = currentFocused - 1 + menuItems.length % menuItems.length
        }
      })
    })
  }

  handleCheckboxes();
  handleProfileMenuItem()
  function toggleSetup() {
    let isVisible = getComputedStyle(accordion).display;

    if (isVisible === 'flex') {
      accordion.style.display = 'none';
      expandCollapseAccordion.ariaExpanded = false;
      expandCollapseAccordion.firstElementChild.style.transform = `rotate(${180}deg)`;
    } else {
      accordion.style.display = 'flex';
      expandCollapseAccordion.ariaExpanded = true;
      expandCollapseAccordion.firstElementChild.style.transform = `rotate(-${180}deg)`;
    }
  }

  expandCollapseAccordion.addEventListener('keypress', e => {
    handleSetupKeyPress(e);
  });

  function toggleAccordionItem(sectionId, item) {
    accordionItems.forEach(item => {
      item.classList.remove('open');
      item.setAttribute('aria-expanded', false);
    });

    if (!sectionId.classList.contains('open')) {
      item.classList.add('open');
      item.setAttribute('aria-expanded', true);
    }
  }

  accordionItems.forEach((item, i) => {
    item.setAttribute('id', `section${i + 1}`);
    const sectionId = document.getElementById(item.id);
    item.firstChild.addEventListener('focus', e => {
      if (!sectionId.classList.contains('open')) {
        item.setAttribute('tabindex', '-1');
      }
    });
    item.firstElementChild.addEventListener('click', () => {
      toggleAccordionItem(sectionId, item);
    });
    checkStepsBtns.forEach((button, i) => {
      button.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          toggleAccordionItem(sectionId, item);
        }
      });
    });
  });
  cancelPlan.addEventListener('click', () => {
    setup.classList.add('transform');
    plan.hidden = true;
  });

  expandNotifications.addEventListener('click', toggleNotifications);
  expandCollapseAccordion.addEventListener('click', () => {
    toggleSetup();
  });
  toggleMenuBtn.addEventListener('click', toggleProfileMenu);
})();
