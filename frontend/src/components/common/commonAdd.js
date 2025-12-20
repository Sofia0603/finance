import {HttpUtils} from "../../utils/http-utils";
import {changedTypeUtils} from "../../utils/changed-type-utils";

export class CommonAdd{
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    this.formCommonElement = document.getElementById('common-add-form')

    let params = new URLSearchParams(document.location.search);
    this.getType = params.get('type')
    this.type = changedTypeUtils.translateType(this.getType)

    this.inputTypeElement = document.getElementById('common-type');
    this.inputSelectElement = document.getElementById('common-category');
    this.inputAmountElement = document.getElementById('common-amount');
    this.inputDateElement = document.getElementById('common-date');
    this.inputCommentElement = document.getElementById('common-comment');

    this.inputTypeElement.value = this.type;


    document.getElementById('common-success').addEventListener('click', this.createCommon.bind(this));
    this.getCategories(this.getType).then()

  }

  async getCategories(type){
    const result = await HttpUtils.request(`/categories/` + type, 'GET');
    if(!result.error){

      for (let i = 0; i < result.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.innerText = result[i].title;
        optionElement.setAttribute("value", result[i].title);
        optionElement.setAttribute("data-id", result[i].id);
        this.inputSelectElement.appendChild(optionElement);

      }
    }
  }


  validateField(){
    this.formCommonElement.classList.remove('was-validated')
    let isValid = true;

    if (this.inputSelectElement.value === '' || this.inputTypeElement.value === '' || this.inputAmountElement.value === '' || this.inputDateElement.value === '' || this.inputCommentElement.value === '') {
      isValid = false
    }

    if (!isValid) {
      this.formCommonElement.classList.add('was-validated')
    }
    return isValid;

  }


  async createCommon(){

    const selectedOption = this.inputSelectElement.options[this.inputSelectElement.selectedIndex];
    const categoryId = parseInt(selectedOption.getAttribute('data-id'));
    console.log(categoryId)

    if(this.validateField()){

      const data = {
        type: this.getType,
        amount: Number(this.inputAmountElement.value),
        date: this.inputDateElement.value,
        comment: this.inputCommentElement.value,
        category_id: categoryId,
      }

      const result = await HttpUtils.request('/operations', 'POST',  true,  data )

      if(!result.error){
        this.openNewRoute('/common')
      } else {
        alert(result.message)

      }
    }
  }
}