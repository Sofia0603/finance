

export class Login{

  constructor() {
    console.log('login')
    this.formLoginElement = document.getElementById('login-form')
    this.emailElement = document.getElementById('email');
    this.passwordElement = document.getElementById('password')
    this.rememberMeElement = document.getElementById('remember-me')
    this.processButtonElement = document.getElementById('process-button')
    this.commonErrorElement = document.querySelector('.error-form')

    this.processButtonElement.addEventListener('click', this.login.bind(this));
  }


  validateForm() {
    let isValid = true;
    this.formLoginElement.classList.remove('was-validated')

    if (this.passwordElement.value === '') {
      isValid = false
    }


    if (!isValid) {
      this.formLoginElement.classList.add('was-validated')
    }

    console.log(isValid)
    return isValid;

  }



  async login() {

    if (this.validateForm()) {

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.emailElement.value,
          password: this.passwordElement.value,
          rememberMe:this.rememberMeElement.checked,
        })
      });

      const data = await response.json();
      console.log(data)

      if (data.error || (!data.tokens.accessToken || !data.tokens.refreshToken || !data.user.id || !data.user.name || !data.user.lastName)) {
        this.commonErrorElement.style.display = 'block';
        return
      }

    }
  }

}