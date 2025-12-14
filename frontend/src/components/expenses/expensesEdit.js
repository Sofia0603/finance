import {HttpUtils} from "../../utils/http-utils";

export class ExpensesEdit {

  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const urlParams = new URLSearchParams(window.location.search);
    const expenseId = urlParams.get('id');

    if(!expenseId) {
      this.openNewRoute('/expenses');
    }

    document.getElementById('expenses-cancel').addEventListener('click', (event)=>{
      this.openNewRoute('/expenses')
    });

    document.getElementById('expenses-edit').addEventListener('click', (event)=>{
      this.editTitleExpense(expenseId).then()
    })

    this.inputTitleElement = null

    this.getExpense(expenseId).then()

  }


  async getExpense(id){

    const result = await HttpUtils.request('/categories/expense/' + id, 'GET', true)

    this.showTitle(result)

  }

  showTitle(result){

    this.inputTitleElement = document.getElementById('expenses-name');

    if( this.inputTitleElement){
      this.inputTitleElement.value = result.title;
    }

  }

  async editTitleExpense(expenseId){
    const form = document.getElementById('expenses-edit-form');

    if(this.inputTitleElement.value) {

      const result = await HttpUtils.request('/categories/expense/' + expenseId , 'PUT', true, {
        title: this.inputTitleElement.value,
      })

      if (result.error) {
        return alert ('Возникла ошибка при запросе заказа. Обратитесь в поддержку')
      }

      this.openNewRoute('/expenses')

    } else {
      form.classList.add('was-validated')

    }




  }

}