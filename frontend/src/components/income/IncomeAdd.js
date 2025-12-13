import {HttpUtils} from "../../utils/http-utils";

export  class IncomeAdd{
  constructor(openNewRoute){

    this.openNewRoute = openNewRoute;

    this.formIncomeElement = document.getElementById('income-add-form')
    this.nameInputElement = document.getElementById('income-name')

    document.getElementById('income-create').addEventListener('click', this.createIncome.bind(this))
    document.getElementById('income-cancel').addEventListener('click', () => {
      this.openNewRoute('/income')
    })


  }

  validateField(){

    this.formIncomeElement.classList.remove('was-validated')
    let isValid = true;

    if (this.nameInputElement.value === '') {
      isValid = false
    }

    if (!isValid) {
      this.formIncomeElement.classList.add('was-validated')
    }
    return isValid;
  }


  async createIncome(){

    if(this.validateField()){

      const data = {
        title: this.nameInputElement.value,
      }

      const result = await HttpUtils.request('/categories/income', 'POST',  true,  data )

      if(!result.error){
        this.openNewRoute('/income')
      }

    }

  }
}

