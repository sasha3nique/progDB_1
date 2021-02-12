function render(mainColor, textColor) {
let darkgrey = mainColor;
let secondColor = textColor;

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);
google.charts.setOnLoadCallback(drawPie);
function drawPie(args=[1, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {

  var data = new google.visualization.DataTable();

  var ind1 = 0;
  for (let i = 0; i < 4; i++) {
    ind1 += args[i];
  }
  var ind2 = 0;
  for (let i = 4; i < 8; i++) {
    ind2 += args[i];
  }
  var ind3 = 0;
  for (let i = 8; i < 13; i++) {
    ind3 += args[i];
  }
  var ind4 = 0;
  for (let i = 13; i < args.length; i++) {
    ind4 += args[i];
  }

  var data = google.visualization.arrayToDataTable([
    ['VHI', '%'],
    ['Велика засуха', ind1],
    ['Середня засуха', ind2],
    ['Нормальний', ind3],
    ['Хороший', ind4]]);

  // Set options for Sarah's pie chart.
  var options = {
  'chartArea': {'width': '90%', 'height': '90%', 'backgroundColor': {
    'fill': darkgrey,
    'opacity': 100
  }},
  legend: 'none', title: '', colors: ['#f8961e','#f9c74f','#90be6d','#43aa8b', ],
  'backgroundColor': {
    'fill': darkgrey,
    'opacity': 100
  },
  animation: {
    duration: 300,
    easing: 'ease',
    startup: true
}
};

  // Instantiate and draw the chart for Sarah's pizza.
  var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  chart.draw(data, options);
}

function drawBasic(args=[0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
      var data = google.visualization.arrayToDataTable([
        ['VHI', '%', { role: 'style' }],
        ['0', args[0], '#f8961e'],
        ['5', args[1], '#f8961e'],
        ['10', args[2], '#f8961e'],
        ['15', args[3], '#f8961e'],
        ['20', args[4], '#f9c74f'],
        ['25', args[5], '#f9c74f'],
        ['30', args[6], '#f9c74f'],
        ['35', args[7], '#f9c74f'],
        ['40', args[8],'#90be6d'],
        ['45', args[9],'#90be6d'],
        ['50', args[10],'#90be6d'],
        ['55', args[11],'#90be6d'],
        ['60', args[12],'#90be6d'],
        ['65', args[13], '#43aa8b'],
        ['70', args[14], '#43aa8b'],
        ['75', args[15], '#43aa8b'],
        ['80', args[16], '#43aa8b'],
        ['85', args[17], '#43aa8b'],
        ['90', args[18], '#43aa8b'],
        ['95', args[19], '#43aa8b'],
        ['100', args[20], '#43aa8b']
      ]);
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
      color: 'white'
      };
      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));
      chart.draw(data, options);
}


// json
document.getElementById('createGraph').onclick = function() {
  let region = document.getElementById('regionSelect').value;
  let year = +(document.getElementById('yearSelect').value);
  let week = +(document.getElementById('weekSelect').value);
  let url = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/${region}.json`;
  reqURL(url, region, year, week);
}

function reqURL(url, region, year, week) {
let requestURL = url;

let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  data = request.response;
  handleJson(data);
}

let arr = [];

function handleJson(js) {
  console.log(js[`${year}`][week-1][`${week}`]);
  let arr = js[`${year}`][week-1][`${week}`];
  
  arr = arr.map(function(val, index, arr) {
    return val*1;
  })

  console.log(arr);
  drawBasic(arr);
  drawPie(arr);
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