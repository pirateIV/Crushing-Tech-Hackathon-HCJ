(function App() {
  const toggleMenuBtn = document.getElementById('profile-menu');
  const expandCollapseAccordion = document.getElementById('toggleSetup');
  const accordion = document.getElementById('accordion');
  const profileMenu = document.getElementById('dropdown-menu');


  const menuItems = profileMenu.querySelectorAll('[role="menuitem"]');

  // let currentIndex = 0;

  function openProfileMenu() {
    toggleMenuBtn.ariaExpanded = 'true';
    menuItems.item(0).focus();
  }

  function closeProfileMenu() {
    toggleMenuBtn.ariaExpanded = 'false';
  }

  function handleMenuItemsFocus(e) {
    currentIndex = Array.from(menuItems).indexOf(e.target);
    menuItems.item(currentIndex).focus();
  }

  // let firstItem = menuItemsIndex === 0
  // let nextItem = menuItems[menuItemIndex + 1]

  function handleKeyEvents(e) {
    if (e.key === 'Escape') {
      toggleMenu();
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    }
  }

  function toggleMenu() {
    profileMenu.hidden = !profileMenu.hidden;
    const modalExpanded =
      toggleMenuBtn.attributes['aria-expanded'].value === true;

    profileMenu.addEventListener('keyup', function (e) {
      handleKeyEvents(e);
      // handleMenuItemsFocus(e)
    });
    menuItems.forEach(item => {
      item.addEventListener('focus', handleMenuItemsFocus);
    });

    modalExpanded ? closeProfileMenu : openProfileMenu();
  }

  function handleSetupKeyPress(e) {
    if (e.key === 'Enter') {
      toggleSetup();
    }
  }

  function toggleSetup() {
    let isVisible = getComputedStyle(accordion).display;

    if (isVisible === 'flex') {
      accordion.style.display = 'none';
      expandCollapseAccordion.ariaExpanded = false
    } else {
      accordion.style.display = 'flex';
      expandCollapseAccordion.ariaExpanded = true
    }
  }

  expandCollapseAccordion.addEventListener('keypress', e => {
    handleSetupKeyPress(e)
  });
  expandCollapseAccordion.addEventListener('click', toggleSetup);
  toggleMenuBtn.addEventListener('click', toggleMenu);
})();
