import {HttpUtils} from "../../utils/http-utils";
import {changedTypeUtils} from "../../utils/changed-type-utils";

export class CommonPage{
  constructor() {

    this.changedPeriod()

  }



  changedPeriod(){
    let tabs = document.querySelectorAll(".dashboard-tab .nav-link");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event)=>{

        tabs.forEach(item => item.classList.remove("active"));

        tab.classList.add("active");

        let period = tab.dataset.period;
        this.getCommon(period).then()

      })
    })
  }


  async getCommon(period){

    const result = await HttpUtils.request('/operations?period=' + period )
    console.log(result)
    this.showTable(result)

  }


  showTable(result){
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    for(let i = 0; i < result.length; i++){
      const trElement = document.createElement('tr')
      trElement.insertCell().innerText = i + 1;
      trElement.insertCell().innerHTML = changedTypeUtils.changedType(result[i].type);
      trElement.insertCell().innerText = result[i].category;
      trElement.insertCell().innerText = result[i].amount + '$';
      trElement.insertCell().innerText = new Date(result[i].date).toLocaleDateString();
      trElement.insertCell().innerText = result[i].comment;
      trElement.insertCell().innerHTML =
    '  <div class="common-action d-flex align-items-center gap-2 justify-content-end">\n' +
  '       <button type="button"  data-item-id="'+ result[i].id + '" class="btn delete-btn" data-bs-toggle="modal" data-bs-target="#common-delete-modal">\n' +
  '           <i class="bi bi-trash" style="color: #000;"></i>\n' +
  '        </button>\n' +
  '        <a class="btn" href="/common-edit">\n' +
  '             <i class="bi bi-pencil" style="color: #000;"></i>\n' +
  '         </a>\n' +
'       </div>';


      tableBody.appendChild(trElement);
    }
  }

  openCommonDeleteModal(handler){
    if( handler ){
      const btn = handler.target;
      const expenseId = btn.getAttribute('data-item-id');

      console.log(btn);

      document.getElementById('delete-btn').addEventListener('click', ()=>{
        this.deleteCommon(expenseId).then()
      })

    }
  }

  deleteCommon(period){

  }

}