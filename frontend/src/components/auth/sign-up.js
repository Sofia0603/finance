import {HttpUtils} from "../../utils/http-utils";

export class SignUp{

  constructor() {
    console.log('sign-up')

    this.formLoginElement = document.getElementById('signup-form')
    this.nameElement = document.getElementById('name');
    this.lastNameElement = document.getElementById('last-name');
    this.emailElement = document.getElementById('email');
    this.passwordElement = document.getElementById('password')
    this.passwordRepeatElement = document.getElementById('repeat-password')

    this.processButtonElement = document.getElementById('process-button')
    this.commonErrorElement = document.querySelector('.error-form')

    this.processButtonElement.addEventListener('click', this.signup.bind(this));
  }


  validateForm() {
    let isValid = true;
    this.formLoginElement.classList.remove('was-validated')

    if ( this.nameElement.value === '' || this.emailElement.value === '' || this.lastNameElement.value === '' ) {
      isValid = false
    }

    if (this.passwordElement.value === '' || this.passwordRepeatElement.value === '' ){
      isValid = false
    } else if (this.passwordElement.value !== this.passwordRepeatElement.value){
      this.commonErrorElement.innerText = 'Пароли не совпадают'
      this.commonErrorElement.style.display = 'block';
      isValid = false
    }

    if (!isValid) {
      this.formLoginElement.classList.add('was-validated')
    }

    console.log(isValid)
    return isValid;

  }

  async signup() {

    if (this.validateForm()) {

      const data = await HttpUtils.request('/signup', 'POST', false,{
        name: this.nameElement.value,
        lastName: this.lastNameElement.value,
        email: this.emailElement.value,
        password: this.passwordElement.value,
        passwordRepeat: this.passwordRepeatElement.value
      })

      console.log(data)

      if (data.error || (!data.user.id || !data.user.email || !data.user.name || !data.user.lastName)) {
        this.commonErrorElement.style.display = 'block';
        this.commonErrorElement.innerText = data.message;

        return
      }

      alert ('Успешно зарегестрировались')

    }
  }

}