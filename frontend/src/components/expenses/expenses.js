import {HttpUtils as httpUtils, HttpUtils} from "../../utils/http-utils";

export class Expenses {
  constructor(openNewRoute){

    this.openNewRoute = openNewRoute;
    this.getExpenses().then()

  }



  async getExpenses(){
    const result = await HttpUtils.request('/categories/expense', )


    if(result.redirect){
      return this.openNewRoute(result.redirect);
    }

    this.showExpense(result);
  }


  showExpense(expense){
    // debugger
    const expensesList = document.getElementById('expenses-list');
    console.log(expense)

    for (let i = 0; i < expense.length; i++){

      const expenseItem = document.createElement('li');

      expenseItem.classList.add(
        'common-card',
        'd-flex',
        'justify-content-center',
        'flex-column',
        'align-content-center',
        'p-3'
      );

      expenseItem.innerHTML = `
        <div class="common-card-title fs-4 mb-2">${expense[i].title}</div>
        <div class="d-flex gap-2">
           <a href="/expenses-edit?id=${expense[i].id}" class="btn btn-success">Редактировать</a>
           <button class="btn btn-secondary" data-bs-toggle="modal" id="expense-modal-wrapper" data-bs-target="#deleteExpensesModal" data-expense-id="${expense[i].id}">Удалить</button>
        </div>
      `

      expensesList.prepend(expenseItem);

      this.expensesDeleteButton = document.getElementById('expense-modal-wrapper');
      this.expensesDeleteButton.addEventListener('click', (e) =>{
        this.openExpenseDeleteModal(e)
      });

    }
  }

  openExpenseDeleteModal(handler){
    if( handler ){
      const btn = handler.target;
      const expenseId = btn.getAttribute('data-expense-id');

      console.log(btn);
      console.log(expenseId);

      document.getElementById('expense-delete').addEventListener('click', ()=>{
        this.incomeDelete(expenseId).then()
      })

    }
  }

  async incomeDelete(expenseId){
    const result = await httpUtils.request(`/categories/expense/${expenseId}`, 'DELETE', )
    if(!result.error){
      window.location.reload()

    }

  }

}