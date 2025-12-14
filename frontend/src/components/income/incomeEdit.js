import {HttpUtils} from "../../utils/http-utils";

export class IncomeEdit {

  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const urlParams = new URLSearchParams(window.location.search);
    const incomeId = urlParams.get('id');

    if(!incomeId) {
      this.openNewRoute('/income');
    }

    document.getElementById('income-cancel').addEventListener('click', (event)=>{
      this.openNewRoute('/income')
    });

    document.getElementById('income-edit').addEventListener('click', (event)=>{
      this.editTitleIncome(incomeId).then()
    })

    this.inputTitleElement = null

    this.getIncome(incomeId).then()

  }


  async getIncome(id){

    const result = await HttpUtils.request('/categories/income/' + id, 'GET', true)

    this.showTitle(result)

  }

  showTitle(result){

    this.inputTitleElement = document.getElementById('income-name');

    if( this.inputTitleElement){
      this.inputTitleElement.value = result.title;
    }

  }

  async editTitleIncome(incomeId){
    const form = document.getElementById('income-edit-form');

    if(this.inputTitleElement.value) {

      const result = await HttpUtils.request('/categories/income/' + incomeId , 'PUT', true, {
        title: this.inputTitleElement.value,
      })

      if (result.error) {
        return alert ('Возникла ошибка при запросе заказа. Обратитесь в поддержку')
      }

      this.openNewRoute('/income')

    } else {
      form.classList.add('was-validated')

    }




  }

}