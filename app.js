// Your javascript goes here
const userSelect = document.querySelector('#user-select');
const dropdown = document.querySelector('#dropdown');


const showDropdown = () => {
  let delayDuration = 100;
  setTimeout(() => {
    dropdown.hidden ? (dropdown.hidden = false) : (dropdown.hidden = true);
  }, delayDuration);
};
userSelect.addEventListener('click', showDropdown);
