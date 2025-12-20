import {HttpUtils} from "../../utils/http-utils";
import {changedTypeUtils} from "../../utils/changed-type-utils";

export class CommonEdit{
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    let params = new URLSearchParams(document.location.search);
    this.id = params.get('id')
    this.type = null
    this.category = null

    this.inputTypeElement = document.getElementById('common-type');
    this.inputSelectElement = document.getElementById('common-category');
    this.inputAmountElement = document.getElementById('common-amount');
    this.inputDateElement = document.getElementById('common-date');
    this.inputCommentElement = document.getElementById('common-comment');

    document.getElementById('common-success').addEventListener('click', this.editCommon.bind(this));
    this.getCommon().then()
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

        if(this.category === result[i].title){
          optionElement.setAttribute('selected', 'selected');
        }

      }
    }
  }

  async getCommon(){

    const result = await HttpUtils.request('/operations/' + this.id);

    if(!result.error){
      this.inputTypeElement.value = changedTypeUtils.translateType(result.type)
      this.inputSelectElement.value = result.category
      this.inputAmountElement.value = result.amount
      this.inputDateElement.value = result.date
      this.inputCommentElement.value = result.comment
      this.type = result.type
      this.category = result.category
      this.getCategories(this.type).then()

    }
  }

  async editCommon(){
    const selectedOption = this.inputSelectElement.options[this.inputSelectElement.selectedIndex];
    const categoryId = parseInt(selectedOption.getAttribute('data-id'));
    console.log(categoryId)

    const result = await HttpUtils.request('/operations/' + this.id, 'PUT', true, {
      type: this.type,
      amount: Number(this.inputAmountElement.value),
      date: this.inputDateElement.value,
      comment: this.inputCommentElement.value,
      category_id: categoryId,
    });
    if(!result.error){
      this.openNewRoute('/common')
    }
  }

}