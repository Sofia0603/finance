import {HttpUtils as httpUtils, HttpUtils} from "../../utils/http-utils";

export class Income {
  constructor(openNewRoute){

    this.openNewRoute = openNewRoute;
    this.getIncomes().then()

  }



  async getIncomes(){
    const result = await HttpUtils.request('/categories/income', )



    if(result.redirect){
      return this.openNewRoute(result.redirect);
    }

    // if (result.error || !result.response || (result.response && ( result.response.error))) {
    //   return alert ('Возникла ошибка при запросе категорий. Обратитесь в поддержку')
    // }

    this.showIncome(result);
  }


  showIncome(incomes){
    console.log(incomes)

    const incomeList = document.getElementById('income-list');

    for (let i = 0; i < incomes.length; i++){
      const income = document.createElement('li');

      income.classList.add(
        'common-card',
        'd-flex',
        'justify-content-center',
        'flex-column',
        'align-content-center',
        'p-3'
      );

      income.innerHTML = `
        <div class="common-card-title fs-4 mb-2">${incomes[i].title}</div>
        <div class="d-flex gap-2">
           <a href="/income-edit?id=${incomes[i].id}" class="btn btn-success">Редактировать</a>
           <button class="btn btn-secondary" data-bs-toggle="modal" id="income-modal-wrapper" data-bs-target="#deleteIncomeModal" data-income-id="${incomes[i].id}">Удалить</button>
        </div>
      `

      incomeList.prepend(income);

      this.incomeDeleteButton = document.getElementById('income-modal-wrapper');
      this.incomeDeleteButton.addEventListener('click', (e) =>{
        this.openIncomeDeleteModal(e)
      });

    }
  }

   openIncomeDeleteModal(handler){
    if( handler ){
      const btn = handler.target;
      const incomeId = btn.getAttribute('data-income-id');

      console.log(btn);
      console.log(incomeId);

      document.getElementById('income-delete').addEventListener('click', ()=>{
        this.incomeDelete(incomeId).then()
      })

    }
  }

   async incomeDelete(incomeId){
    debugger
    const result = await httpUtils.request(`/categories/income/${incomeId}`, 'DELETE', )
    const modal = document.querySelector('.modal')
    const body = document.querySelector('body')
    if(!result.error){
      modal.classList.remove('show')
      modal.style.display = 'none'
      modal.setAttribute('aria-hidden', 'true')
      body.classList.remove('modal-open')

    }

  }

}