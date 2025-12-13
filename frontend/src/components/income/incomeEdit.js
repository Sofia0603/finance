import {HttpUtils} from "../../utils/http-utils";

export class IncomeEdit {

  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const urlParams = new URLSearchParams(window.location.search);
    const incomeId = urlParams.get('id');
    console.log(incomeId);

    if(!incomeId) {
      this.openNewRoute('/income');
    }

    this.getIncome(incomeId).then()

  }


  async getIncome(id){

    const result = await HttpUtils.request('/categories/income/' + id, 'GET', true)

    console.log(result);

  }

}