// Your javascript goes here
const userSelect = document.querySelector('#user-select');
const dropdown = document.querySelector('#dropdown');
const showAlert = document.querySelector('#showAlertBtn');
const alertDropdown = document.querySelector('#alertDropdown')

let delayDuration = 100;
const showDropdown = () => {
  setTimeout(() => {
    dropdown.hidden ? (dropdown.hidden = false) : (dropdown.hidden = true);

  }, delayDuration);
};
const showAlertDropdown = () => {
  setTimeout(() => {
    alertDropdown.hidden ? (alertDropdown.hidden = false) : (alertDropdown.hidden = true);
  }, delayDuration )
  
}
userSelect.addEventListener('click', showDropdown);
showAlert.addEventListener('click', showAlertDropdown);
