function render(mainColor, textColor) {
let darkgrey = mainColor;
let secondColor = textColor;

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawVisualization);
//google.charts.setOnLoadCallback(drawBasic);
//google.charts.setOnLoadCallback(drawPie);
// function drawPie(args=[1, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {

//   var data = new google.visualization.DataTable();

//   var ind1 = 0;
//   for (let i = 0; i < 4; i++) {
//     ind1 += args[i];
//   }
//   var ind2 = 0;
//   for (let i = 4; i < 8; i++) {
//     ind2 += args[i];
//   }
//   var ind3 = 0;
//   for (let i = 8; i < 13; i++) {
//     ind3 += args[i];
//   }
//   var ind4 = 0;
//   for (let i = 13; i < args.length; i++) {
//     ind4 += args[i];
//   }

//   var data = google.visualization.arrayToDataTable([
//     ['VHI', '%'],
//     ['Велика засуха', ind1],
//     ['Середня засуха', ind2],
//     ['Нормальний', ind3],
//     ['Хороший', ind4]]);

//   // Set options for Sarah's pie chart.
//   var options = {
//   'chartArea': {'width': '90%', 'height': '90%', 'backgroundColor': {
//     'fill': darkgrey,
//     'opacity': 100
//   }},
//   legend: 'none', title: '', colors: ['#f8961e','#f9c74f','#90be6d','#43aa8b', ],
//   'backgroundColor': {
//     'fill': darkgrey,
//     'opacity': 100
//   },
//   animation: {
//     duration: 300,
//     easing: 'ease',
//     startup: true
// }
// };

//   // Instantiate and draw the chart for Sarah's pizza.
//   var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
//   chart.draw(data, options);
// }

//* Отримуємо на вхід масив значень за тиждень
function drawVisualization(args=[[0,0,0,0,0]]) {

      let elem = [];
      let table = [];
      table.push(['Рік', '<20', '20-40', '40-65', '>65', 'Average']); 
      for (let i = 0; i < args.length; i++){
        elem = [args[i][0], args[i][1], args[i][2], args[i][3], args[i][4], (args[i][2]+args[i][3])/2];
        table.push(elem);
      }

      var data = google.visualization.arrayToDataTable(table);

      var options = {
        title: '',
        hAxis: {
          title: 'VHI',
          textStyle:{color: secondColor}
        },
        vAxis: {
          title: '% від загальної площі області',
          textStyle:{color: secondColor}
        },
        height: 600,
        width: 1000,
        'chartArea': {'width': '80%', 'height': '80%', 
        'backgroundColor': {
          'fill': darkgrey,
          'opacity': 100
        }},
        allowCollapse: true,
        legend: 'none',
        animation: {
          duration: 300,
          easing: 'ease',
          startup: true
      },
      'backgroundColor': {
        'fill': darkgrey,
        'opacity': 100
      },
      seriesType: 'bars',
      series: {4: {type: 'line'}},
      colors:['#f8961e','#f9c74f','#90be6d','#43aa8b', 'red']
      };
      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));
      chart.draw(data, options);
}


// json
document.getElementById('createGraph').onclick = function() {
  let region = document.getElementById('regionSelect').value;
  let year = +(document.getElementById('yearSelect').value);
  let year2 = +(document.getElementById('year2Select').value);
  let url = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/${region}.json`;
  reqURL(url, year, year2);
}

function reqURL(url, year, year2) {
let requestURL = url;
let finalArray = [];
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  data = request.response;
  handleJson(data, year, year2);
}

let arr = [];


function handleJson(js, year, year2) {
  

if (year <= year2) {
  for (let iter = year; iter < year2+1; iter++) {

  console.log(js);

  const WEEK_NUMBER = 52;
  let arrYear = [];

  for (let i = 0; i < 21; i++) {
    let avg = 0;
    for (let j = 0; j < WEEK_NUMBER; j++) {
      avg+=+(js[`${iter}`][j][`${j+1}`][i]); //сума i стовпця
    }
    avg = Math.ceil((avg/WEEK_NUMBER)*100)/100; // до сотих
    console.log(avg);
    arrYear.push(avg);
  }

  console.log(arrYear);

  //! 1-4, 5-8, 9-13, rest
  let awfulVHI = Math.ceil(arrYear.slice(0, 3).reduce(function(acc, val) {
    return acc + val;
  })*100)/100; // сума всіх vhi одного типу
  let badVHI = Math.ceil(arrYear.slice(4, 7).reduce(function(acc, val) {
    return acc + val;
  })*100)/100;
  let goodVHI = Math.ceil(arrYear.slice(8, 12).reduce(function(acc, val) {
    return acc + val;
  })*100)/100;
  let exVHI = Math.ceil(arrYear.slice(13).reduce(function(acc, val) { //ex - excellent
    return acc + val;
  })*100)/100;

  console.log(badVHI);

  let rawArray = [`${iter}`,awfulVHI, badVHI, goodVHI, exVHI]; 
  finalArray.push(rawArray);

  console.log(finalArray);
}



drawVisualization(finalArray);

} else alert('Неправильно введений діапазон років!');
}

}

}

render('#192734', '#FFF');

function switchToDarkMode() {
  document.getElementById('container').style.backgroundColor = '#192734';
  document.getElementById('container').style.color = '#FFF';
  render('#192734', '#FFF');
  drkBtn = document.getElementById('darkModeButton');
  drkBtn.onclick = function() {
    switchToLightMode();
}
drkBtn.style.backgroundColor = '#f9c74f';
}

function switchToLightMode() {
  document.getElementById('container').style.backgroundColor = '#FFF';
  document.getElementById('container').style.color = '#192734';
  render('#FFF', '#192734');
  drkBtn = document.getElementById('darkModeButton');
  drkBtn.onclick = function() {
    switchToDarkMode();
}
drkBtn.style.backgroundColor = '#FFF';
}

drkBtn = document.getElementById('darkModeButton');
drkBtn.onclick = function() {
  switchToLightMode();
}

switchToLightMode();