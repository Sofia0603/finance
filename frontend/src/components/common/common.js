import {HttpUtils} from "../../utils/http-utils";
import {changedTypeUtils} from "../../utils/changed-type-utils";

export class CommonPage{
  constructor() {

    this.changedPeriod()
    this.deleteBtnElemets = null;
    this.getCommon().then()
  }



  changedPeriod(){
    let tabs = document.querySelectorAll(".dashboard-tab .nav-link");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event)=>{

        tabs.forEach(item => item.classList.remove("active"));

        let period = tab.dataset.period;

        if(tab.dataset.period === 'interval'){

            let inputFrom = document.getElementById('input-from').value;
            let inputTo = document.getElementById('input-to').value;

            if(!inputFrom && !inputTo){
              alert("Заполните поля дат");
              return
            }

            period = 'interval&dateFrom='+inputFrom +'&dateTo='+ inputTo +'';
        }
        tab.classList.add("active");

        this.getCommon(period).then()

      })
    })
  }


  async getCommon(period = 'all'){

    const result = await HttpUtils.request('/operations?period=' + period )

    if(result.error){
      return
    }

    this.showTable(result)

    this.deleteBtnElemets = document.querySelectorAll('.delete-btn')
    console.log(this.deleteBtnElemets)
    this.deleteBtnElemets.forEach(item => {
      item.addEventListener("click", (event)=>{
        let btn = event.target;
        let id = btn.getAttribute("data-item-id")

        this.openCommonModal(id)
      })

    });

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
  '        <a class="btn" href="/common-edit?id=' + result[i].id +'">\n' +
  '             <i class="bi bi-pencil" style="color: #000;"></i>\n' +
  '         </a>\n' +
'       </div>';


      tableBody.appendChild(trElement);
    }
  }


  openCommonModal(id){
    document.getElementById('common-delete').addEventListener('click', (event)=>{
      this.deleteCommon(id).then()
    })
  }

  async deleteCommon(id){
    const result = await HttpUtils.request('/operations/' + id, 'DELETE')
    if(!result.error){
      window.location.reload()
    }
  }
}