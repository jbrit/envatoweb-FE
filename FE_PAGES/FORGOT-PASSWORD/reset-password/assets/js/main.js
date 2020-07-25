const togglePassword1 = document.querySelector('#togglePassword1')
const togglePassword2 = document.querySelector('#togglePassword2')
const password = document.querySelector('#password')
const confirm = document.querySelector('#confirm')
togglePassword1.addEventListener('click', function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password'
  password.setAttribute('type', type)
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash')
})
togglePassword2.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = confirm.getAttribute('type') === 'password' ? 'text' : 'password'
  confirm.setAttribute('type', type)
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash')
})
