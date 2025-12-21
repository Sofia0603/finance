import {HttpUtils} from "../../utils/http-utils";
import config from "../../config/config";

export class Dashboard {
  constructor() {
    this.changedPeriod()

    this.getOperations().then()

  }


  async getOperations(period = 'all'){
    const result = await HttpUtils.request('/operations?period=' + period, 'GET')
    if(!result.error){
      this.showDashboard(result)
    }
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

        this.getOperations(period).then()

      })
    })
  }


  showDashboard(data) {
    const pieChartCanvas = $('#pieChart').get(0).getContext('2d');
    const pieChartCanvas2 = $('#pieChart2').get(0).getContext('2d');

    const expenseTotals = {};
    const incomeTotals = {};

    data.forEach(item => {
      if (item.type === config.types.expense) {
        if (!expenseTotals[item.category]) expenseTotals[item.category] = 0;
        expenseTotals[item.category] += item.amount;
      } else if (item.type === config.types.income) {
        if (!incomeTotals[item.category]) incomeTotals[item.category] = 0;
        incomeTotals[item.category] += item.amount;
      }
    });

    const colors = ['#f56954', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD', '#6f42c1', '#adb5bd'];

    let incomeData = {
      labels: Object.keys(incomeTotals),
      datasets: [{
        data: Object.values(incomeTotals),
        backgroundColor: colors,
      }]
    };

    let expenseData = {
      labels: Object.keys(expenseTotals),
      datasets: [{
        data: Object.values(expenseTotals),
        backgroundColor: colors,
      }]
    };

    const pieOptions = {
      maintainAspectRatio: false,
      responsive: true,
    };

    new Chart(pieChartCanvas, {
      type: 'pie',
      data: incomeData,
      options: pieOptions
    });

    new Chart(pieChartCanvas2, {
      type: 'pie',
      data: expenseData,
      options: pieOptions
    });
  }
}