
let exmplArgs = [0, 0.67, 3.63, 9.55, 15.68,  11.95, 9.42, 6.26, 4.66, 2.4, 0.58, 0.13, 0.36, 0.13, 0.36, 0.13, 0.1, 0, 0, 0, 0]

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic(args=[0, 0.67, 3.63, 9.55, 15.68,  11.95, 9.42, 6.26, 4.66, 2.4, 0.58, 0.13, 0.36, 0.13, 0.36, 0.13, 0.1, 0, 0, 0, 0]) {
      var data = google.visualization.arrayToDataTable([
        ['VHI', '%', { role: 'style' }],
        ['0', args[0], '#52b788'],
        ['5', args[1], '#52b788'],
        ['10', args[2], '#52b788'],
        ['15', args[3], '#52b788'],
        ['20', args[4], '#40916c'],
        ['25', args[5], '#40916c'],
        ['30', args[6], '#40916c'],
        ['35', args[7], '#40916c'],
        ['40', args[8],'#2d6a4f'],
        ['45', args[9],'#2d6a4f'],
        ['50', args[10],'#2d6a4f'],
        ['55', args[11],'#2d6a4f'],
        ['60', args[12],'#2d6a4f'],
        ['65', args[13], '#1b4332'],
        ['70', args[14], '#1b4332'],
        ['75', args[15], '#1b4332'],
        ['80', args[16], '#1b4332'],
        ['85', args[17], '#1b4332'],
        ['90', args[18], '#1b4332'],
        ['95', args[19], '#1b4332'],
        ['100', args[20], '#1b4332']
      ]);
      var options = {
        title: '',
        hAxis: {
          title: 'VHI'
        },
        vAxis: {
          title: '% від загальної площі області'
        },
        height: 600,
        'chartArea': {'width': '80%', 'height': '80%'},
        allowCollapse: true,
        legend: 'none'
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

}

}



