// $(function() {
//
//   rome(input_from, {
//     dateValidator: rome.val.beforeEq(input_to),
//     time: false
//   });
//
//   rome(input_to, {
//     dateValidator: rome.val.afterEq(input_from),
//     time: false
//   });
//
//
// });

var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
var pieChartCanvas2 = $('#pieChart2').get(0).getContext('2d')

var pieData= {
  labels: [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
  ],
  datasets: [
    {
      data: [700,500,400,600,300],
      backgroundColor : ['#f56954', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'],
    }
  ]
};

var pieOptions     = {
  maintainAspectRatio : false,
  responsive : true,
}

new Chart(pieChartCanvas, {
  type: 'pie',
  data: pieData,
  options: pieOptions
})
new Chart(pieChartCanvas2, {
  type: 'pie',
  data: pieData,
  options: pieOptions
})
