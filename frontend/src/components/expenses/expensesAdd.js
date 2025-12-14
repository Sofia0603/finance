import {HttpUtils} from "../../utils/http-utils";

export  class ExpensesAdd{
  constructor(openNewRoute){

    this.openNewRoute = openNewRoute;

    this.formIncomeElement = document.getElementById('expenses-add-form')
    this.nameInputElement = document.getElementById('expenses-name')

    document.getElementById('expenses-add').addEventListener('click', this.createExpense.bind(this))

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


  async createExpense(){

    if(this.validateField()){

      const data = {
        title: this.nameInputElement.value,
      }

      const result = await HttpUtils.request('/categories/expense', 'POST',  true,  data )

      if(!result.error){
        this.openNewRoute('/expenses')
      }

    }

  }
}

