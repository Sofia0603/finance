import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";


export class Login{

  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    if(AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
      return this.openNewRoute('/')
    }

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
      const data = await HttpUtils.request('/login', 'POST', false,{
        email: this.emailElement.value,
        password: this.passwordElement.value,
        rememberMe: this.rememberMeElement.checked
      })

      console.log(data)

      if (data.error || (!data.tokens.accessToken || !data.tokens.refreshToken || !data.user.id || !data.user.name || !data.user.lastName)) {
        if(data.message ) {

          if(data.message === "Invalid email or password"){
            this.commonErrorElement.innerText = "Неверный логин или пароль";
            this.commonErrorElement.style.display = 'block';
          } else {
            this.commonErrorElement.innerText = data.message;
            this.commonErrorElement.style.display = 'block';
          }

        }


        return
      }


      AuthUtils.setAuthInfo(data.tokens.accessToken, data.tokens.refreshToken, {id: data.user.id, name: data.user.name, lastName: data.user.lastName})

      this.openNewRoute('/')
    }
  }

}