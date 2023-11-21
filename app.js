// Your javascript goes here
const userSelect = document.querySelector('#user-select');
const dropdown = document.querySelector('#dropdown');
const showAlert = document.querySelector('#alertsBtn')

const showDropdown = () => {
  let delayDuration = 100;
  setTimeout(() => {
    dropdown.hidden ? (dropdown.hidden = false) : (dropdown.hidden = true);
    showAlert.hidden ? (showAlert.hidden = false) : (showAlert.hidden = true)
  }, delayDuration);
};
userSelect.addEventListener('click', showDropdown);
userSelect.addEventListener('keydown', (e) => {
  if(e.target.key === 'Enter') {
    showDropdown()
  }
})