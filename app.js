function render(mainColor, textColor) {
let darkgrey = mainColor;
let secondColor = textColor;

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawVisualization);
google.charts.setOnLoadCallback(drawLine);
function drawVisualization(args=[0], tick_array, startyear = 2000, finalyear = 2001, region = "Noviy Booh") {
  let table = [];
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'x');
  data.addColumn('number', 'y');
  data.addColumn({type: 'string', role: 'tooltip'});
  for (var i = 0; i < args.length; i++) {
    data.addRow([i, args[i], `${((i%52) + 1).toString()} тиждень, ${startyear -1 +Math.ceil(i/52)} рік\nСереднє VHI: ${args[i]}`]);
  }
  let title = `${region} обл., ${startyear} - ${finalyear} р.`;
  var options = {
    title: title,
    height: 600,
    width: 1200,
    'chartArea': {'width': '80%', 'height': '85%', 
        'backgroundColor': {
          'fill': darkgrey,
          'opacity': 100
        }},
        isStacked: true,
        hAxis: {
        ticks: tick_array
        },
        vAxis: {
            minValue: 0,
            maxValue: 100,
        },      
          seriesType: 'bars',
          series: {54: {type: 'bar'}},
  bar: {groupWidth: '100%'},
  isStacked:true,
  allowCollapse: true,
  legend: 'none',
  animation:{
    duration: 1000,
    easing: 'linear',
    startup: false
  },
  curveType: 'function',
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    maxZoomIn: 4.0
}

}
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);

}


//TODO drawLine
function drawLine(args=[0], tick_array, extra=false, startyear=2000, finalyear = 2001, region = "Noviy Booh") {
  console.log(tick_array);
  var data = new google.visualization.DataTable();
  //table = args;
  data.addColumn('number', 'x');
  data.addColumn('number', 'Середнє VHI');
  data.addColumn({type: 'string', role: 'tooltip'});
  data.addColumn('number', 'Катастрофічна засуха');
  data.addColumn('number', 'Засуха');
  data.addColumn('number', 'Нормально');
  data.addColumn('number', 'Шикарно');
  
  let max = 0, max_i = 0, min = 100, min_i = 0;
  for (var i = 0; i < args.length; i++) {
      if (args[i] > max) {
        max = args[i];
        max_i = i;
      }
      if (args[i] < min) {
        min = args[i];
        min_i = i;
      }
      //`${((i%52) + 1).toString()} тиждень, ${startyear -1 +Math.ceil(i/52)} рік`
      data.addRow([i, args[i], `${((i%52) + 1).toString()} тиждень, ${startyear -1 +Math.ceil(i/52)} рік\nСереднє VHI: ${args[i]}`, 15, 20, 25, 40]);
  }
  console.log(tick_array);
  let title = `${region} обл., ${startyear} - ${finalyear} р.`;
  var options = {
    title: title,
    height: 600,
    width: 1200,
    legend: {
      position: 'none',
      maxLines: 10
    },
    'chartArea': {'width': '80%', 'height': '85%', 
        'backgroundColor': {
          'fill': darkgrey,
          'opacity': 100
        }},
        isStacked: true,
        hAxis: {
        ticks: tick_array
        },
        vAxis: {
            minValue: 0,
            maxValue: 100,
        },
        series: {
            0: {
                type: 'line'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: true,
                enableInteractivity: false
            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false
            },
            4: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: 'lime'
            }
  },
  animation:{
    duration: 1000,
    easing: 'linear',
    startup: false
  },
  trendlines: {
    0: {type: 'exponential', color: 'purple', opacity: .4, enableInteractivity: false}
  },
  crosshair: {
    color: 'black',
    opacity: '.0',
    trigger: 'selection'
  },
  curveType: 'function',
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    maxZoomIn: 4.0
}

}
  var chart = new google.visualization.LineChart(document.getElementById('line_div'));
  chart.draw(data, options);
  if (extra == true) {
    chart.setSelection([{row: max_i, column: 1}, {row: min_i, column: 1}]);
  }
}

// json
document.getElementById('createGraph').onclick = function() {
  let region = document.getElementById('regionSelect').value;
  let year = +(document.getElementById('yearSelect').value);
  let year2 = +(document.getElementById('year2Select').value);
  let url = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/${region}.json`;
  let url_mean = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/DataVHI_Mean/${region}.json`;
  reqURL(url, year, year2);
  reqURL_mean(url_mean, year, year2);
}

function reqURL_mean(url, year, year2) {
  let requestURL = url;

  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
  data = request.response;
  handleJson(data, year, year2);
}

  function handleJson(js, year, year2) {
    console.log(year, year2);
    let arr = [];
    let tick_array = [];
    for (let i = year; i <= year2; i++) {
      for (let j = 0; j < 52; j++) {
        //tick_array.push({v: `${j*4}`, f: `${i}`});
        let val = Math.round(js[`${i}`][j][j+1][4] * 100) / 100;
        if (js[`${i}`][j][j+1][4] == -1.0) {
          arr.push(50);
        } else {
          arr.push(val);
        }
      }
    }
    for (let i = 0; i < year2 - year; i++) {
      tick_array.push({v: `${52+52*i}`, f: `${year + i + 1}`});
    }
    let selectedIndex = document.getElementById('regionSelect').selectedIndex;
    let selectedText = document.getElementById('regionSelect').options[selectedIndex].text; 
    drawLine(arr, tick_array, true, year, year2, selectedText);
    drawVisualization(arr, tick_array, year, year2, selectedText);
  }
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

  //console.log(js);

  const WEEK_NUMBER = 52;
  let arrYear = [];

  for (let i = 0; i < 21; i++) {
    let avg = 0;
    for (let j = 0; j < WEEK_NUMBER; j++) {
      avg+=+(js[`${iter}`][j][`${j+1}`][i]); //сума i стовпця
    }
    avg = Math.ceil((avg/WEEK_NUMBER)*100)/100; // до сотих
    //console.log(avg);
    arrYear.push(avg);
  }

  //console.log(arrYear);

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

  //console.log(badVHI);

  let rawArray = [`${iter}`,awfulVHI, badVHI, goodVHI, exVHI]; 
  finalArray.push(rawArray);

  //(finalArray);
}



drawVisualization(finalArray);
let el = document.getElementById('analys');
if (finalArray.length < 2) {
  el.innerHTML = `<h3>Аналіз:</h3>
  <span> Недостатньо даних для аналіза (потрібно вибрати більше 1 року)</span>`;
} else {
let wS40, ws40_val = 100, fS40, fS40_val=0, wS, wS_val=0, fS, fS_val=0;
for (let i = 0; i < finalArray.length; i++) {
  if ((finalArray[i][3]/2.5+finalArray[i][4]/1.5) < ws40_val) {
    ws40_val = (finalArray[i][3]/2.5+finalArray[i][4]/1.5);
    wS40 = finalArray[i][0];
  }
  if ((finalArray[i][3]/2.5+finalArray[i][4]/1.5) > fS40_val) {
    fS40_val = (finalArray[i][3]/2.5+finalArray[i][4]/1.5);
    fS40 = finalArray[i][0];
  }
  if ((finalArray[i][1]+finalArray[i][2]) > wS_val) {
    wS_val = (finalArray[i][1]+finalArray[i][2]);
    wS = finalArray[i][0];
  }
  if ((finalArray[i][3]+finalArray[i][4]) > fS_val) {
    fS_val = (finalArray[i][3]+finalArray[i][4]);
    fS = finalArray[i][0];
  }
}

el.innerHTML = `
<h3>Аналіз:</h3>
<span>Рік з найгіршим середнім VHI>40: <b><span>${wS40}</span></b></span><br>
<span>Рік з найкращим середнім VHI>40: <b><span>${fS40}</span></b></span><br>
<br>
<span>Рік з найгіршим VHI: <b><span>${wS}</b>, % площі з VHI<40: <b>${wS_val.toFixed(1)}%</b></span></span><br>
<span>Рік з найкращим VHI: <b><span>${fS}</b>, % площі з VHI>40: <b>${fS_val.toFixed(1)}%</b></span></span><br>
`;
}


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