// Your javascript goes here
const userSelect = document.querySelector('#user-select');
const dropdown = document.querySelector('#dropdown');
const showAlert = document.querySelector('#showAlertBtn');
const alertDropdown = document.querySelector('#alertDropdown');

let delayDuration = 100;

const showDropdown = () => {
  setTimeout(() => {
    if (alertDropdown.classList.contains('flex')) {
      alertDropdown.classList.toggle(
        alertDropdown.classList.contains('flex') ? 'flex' : 'hide'
      );
    }
    dropdown.classList.toggle(
      dropdown.classList.contains('hide') ? 'block' : 'hide'
    );
  }, delayDuration);
};
const showAlertDropdown = () => {
  setTimeout(() => {
    if (dropdown.classList.contains('block')) {
      dropdown.classList.toggle(
        dropdown.classList.contains('block') ? 'block' : 'hide'
      );
    }
    alertDropdown.classList.toggle(
      alertDropdown.classList.contains('hide') ? 'flex' : 'hide'
    );
  }, delayDuration);
};
userSelect.addEventListener('click', showDropdown);
showAlert.addEventListener('click', showAlertDropdown);
