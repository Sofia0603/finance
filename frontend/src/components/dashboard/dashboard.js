import {HttpUtils} from "../../utils/http-utils";

export class Dashboard {
  constructor() {


      this.getIncome().then()
  }

  async getIncome(){
    const result = HttpUtils.request('/categories/income', 'GET')
    console.log(result)

    this.showDashboard(result)
  }

  showDashboard(incomes) {
    let pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    let pieChartCanvas2 = $('#pieChart2').get(0).getContext('2d')

    let incomeData= {
      labels: incomes.map((item) => {
        return {
          title
        }
      }),
      datasets: [
        {
          data: [700,500,400,600,300],
          backgroundColor : ['#f56954', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'],
        }
      ]
    };


    let pieOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }

    new Chart(pieChartCanvas, {
      type: 'pie',
      data: incomeData,
      options: pieOptions
    })
    new Chart(pieChartCanvas2, {
      type: 'pie',
      data: incomeData,
      options: pieOptions
    })
  }

}