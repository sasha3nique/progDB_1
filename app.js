function render(mainColor, textColor) {
let darkgrey = mainColor;
let secondColor = textColor;

let json_all_years = [];
let promise = new Promise(function(resolve, reject) {
  resolve(json_all_years);
  console.log('1');
});

promise
  .then(
    result => {   
  google.charts.load('current', {packages: ['corechart', 'bar', 'geochart'],  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
  google.charts.setOnLoadCallback(drawLine);
  google.charts.setOnLoadCallback(drawRegionsMap);
  
  console.log(json_all_years.length);
  let dict = new Object();

  dict = {
    0: 'UA-71', //
    1: 'UA-74',
    2: 'UA-77',
    3: 'UA-43',
    4: 'UA-12',
    5: 'UA-14',
    6: 'UA-26',
    7: 'UA-63',
    8: 'UA-65',
    9: 'UA-68',
    10: 'UA-32',
    11: 'UA-30',
    12: 'UA-35',
    13: 'UA-09',
    14: 'UA-46',
    15: 'UA-48',
    16: 'UA-51',
    17: 'UA-53',
    18: 'UA-56',
    19: 'UA-40',
    20: 'UA-59',
    21: 'UA-61',
    22: 'UA-21',
    23: 'UA-05',
    24: 'UA-07',
    25: 'UA-23',
    26: 'UA-18'

  };

function drawRegionsMap(arr=[]) {
  console.log(arr.length);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'code');
  data.addColumn('number', 'Середнє VHI');
  //console.log(json_all_years[0]);
  for (let i = 0; i < arr.length; i++) {
    data.addRow([dict[i], +(arr[i])]);
  }

  //data.addRow(['UA-48', 200]);
      

        var options = {
          region: 'UA',
          resolution: 'provinces',
          colors: ['#ffadad', '#ffd6a5', '#fdffb6','#caffbf', '#caffbf', '#caffbf', '#548C2F'],
          height: 600,
          width: 1200,
          'chartArea': {'width': '100%', 'height': '85%'},
          colorAxis: {minValue: 0, position: 'top', maxValue: 100},
          backgroundColor: {'stroke': 'black', 'strokeWidth': 0},
          displayMode: 'regions',
          datalessRegionColor: 'white',
  
      };

        var chart = new google.visualization.GeoChart(document.getElementById('chart-box-map'));

        chart.draw(data, options);
      
    }

    //drawRegionsMap(json_all_years);

//TODO drawLine
function drawLine(args=[0], tick_array, extra=false, startyear=2000, finalyear = 2001, region = "?", exp=false, diapazon=true, trends=true, shadows=false) {
  var data = new google.visualization.DataTable();
  //table = args;
  data.addColumn('number', 'x');
  data.addColumn('number', 'Середнє VHI');
  data.addColumn({type: 'string', role: 'tooltip'});
  data.addColumn('number', 'Катастрофічна засуха');
  data.addColumn('number', 'Засуха');
  data.addColumn('number', 'Нормально');
  data.addColumn('number', 'Шикарно');
  let prevData = [];
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
      
      function renderGraph(dp, shd) {
        if (dp) {
          data.addRow([i, args[i], `${((i%52) + 1).toString()} тиждень, ${startyear -1 +Math.ceil(i/52)} рік\nСереднє VHI: ${args[i]}`, 15, 20, 25, 40]);

        } else {
          data.addRow([i, args[i], `${((i%52) + 1).toString()} тиждень, ${startyear -1 +Math.ceil(i/52)} рік\nСереднє VHI: ${args[i]}`, 0, 0, 0, 0]);
        }
      }

      renderGraph(diapazon, shadows)
  }
  let title = `${region} обл., ${startyear} - ${finalyear} р.`;
  let trendsOption = {type: 'exponential', color: 'purple', opacity: .0, enableInteractivity: false}
  if (trends) {
    trendsOption = {type: 'exponential', color: 'purple', opacity: .4, enableInteractivity: false}
  }
  var options = {
    title: title,
    backgroundColor: {'stroke': 'black', 'strokeWidth': 0},
    height: 600,
    width: 1200,
    legend: {
      position: 'none',
      maxLines: 10
    },
    'chartArea': {'width': '90%', 'height': '85%', 
        'backgroundColor': {
          'fill': darkgrey,
          'opacity': 100
        }},
        isStacked: true,
        hAxis: {
        ticks: tick_array,
        gridlines: {
          color: `#808080`
        }
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
                enableInteractivity: false,
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
    0: trendsOption
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
    maxZoomIn: 12.0
}

}
  var chart = new google.visualization.LineChart(document.getElementById('line_div'));
  chart.draw(data, options);
  if (exp) {
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
  
  //reqURL(url, year, year2);
  reqURL_mean(url_mean, year, year2);
}

document.getElementById('createMap').onclick = function() {
  let year = +(document.getElementById('yearMapSelect').value);
  let week = +(document.getElementById('weekSelect').value);
  let url_map = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/DataVHI_Mean/all.json`;
  reqUrl_mean_map(url_map, year, week);
}

document.getElementById('createMapSlide').onclick = function() {
  let year = +(document.getElementById('yearMapSelect').value);
  let url_map = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/DataVHI_Mean/all.json`;
  let time = +(document.getElementById('interval').value)*1000;
  let week1 = +(document.getElementById('weekSelectMap1').value);
  let week2 = +(document.getElementById('weekSelectMap2').value);
  let iter = 0;
  for (let i = week1; i <= week2; i++) {
    setTimeout(function() {
      reqUrl_mean_map(url_map, year, i);
      document.getElementById('slide-text').innerHTML = `Тиждень: ${i}, рік: ${year}`;
    }, time*iter);
    iter+=1;
  }
}

// document.getElementById('createGraphOptions').onclick = function() {
//   let region = document.getElementById('regionSelect').value;
//   let year = +(document.getElementById('yearSelect').value);
//   let year2 = +(document.getElementById('year2Select').value);
//   let url = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/${region}.json`;
//   let url_mean = `https://raw.githubusercontent.com/sasha3nique/json_nubip/master/DataVHI_Mean/${region}.json`;
  
//   //reqURL(url, year, year2);
//   reqURL_mean(url_mean, year, year2);
// }
//!map
function reqUrl_mean_map(url, year, week) {
  let requestURL = url;

  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
  data = request.response;
  handleJson_map(data, year, week);
}
}

function handleJson_map(js, year, week) {
  console.log(js);
  let arr = [];
  for (let i = 0; i < 27; i++ ) {
    arr.push(js[`${i + 1}`][`${year}`][week - 1][week][4]);
  }
  //console.log(js[`1`]);
  drawRegionsMap(arr);
}

//!map
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
    //console.log(year, year2);
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
    let reg = document.getElementById('regionSelect').options[selectedIndex].text; 

    let exp = document.getElementById('extremum').checked;
    let diapazon = document.getElementById('diapazon').checked;
    let trends = document.getElementById('trends').checked;

    drawLine(arr, tick_array, true, year, year2, reg, exp, diapazon, trends);
    //drawVisualization(arr, tick_array, year, year2, selectedText);

    //analys
    let el_anal = document.getElementById('analys-results');

    //console.log(tick_array);
    let arr_bad_years = [];
    let arr_worst_years = [];

    for (let i = year; i <= year2; i++) {
      for (let j = 0; j < 52; j++) {
        if (js[`${i}`][j][j+1][4] < 35.0 && js[`${i}`][j][j+1][4] > 15.0) {
          arr_bad_years.push(i);
          //arr_bad_years.push(js[`${i}`][j][j+1][4]);
          continue;
        }
        if (js[`${i}`][j][j+1][4] < 15.0) {
          arr_worst_years.push(i);
          //arr_bad_years.push(js[`${i}`][j][j+1][4]);
          continue;
        }
      }
    }
    arr_bad_years = Array.from(new Set(arr_bad_years));
    arr_worst_years = Array.from(new Set(arr_worst_years));

    let output = `<h4>Посушливі роки:</h4><div><p>Роки з посухою: ${arr_bad_years.join(', ')}</p></div>
                  <div><p>Роки з екстримальною посухою: ${arr_worst_years.join(', ')}</p></div>`;
    document.getElementById('analysData').onclick = function() {
      el_anal.innerHTML = output;
    }

  }
}
// то всо далі ненада
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

},
error => {
  alert('rej' +  error);
}
);



}

render('#192734', '#FFF');

function switchToDarkMode() {
  document.getElementById('container').style.backgroundColor = '#192734';
  document.getElementById('container').style.color = '#FFF';
  render('#192734', '#FFF');

}

function switchToLightMode() {
  document.getElementById('container').style.backgroundColor = '#FFF';
  document.getElementById('container').style.color = '#192734';
  render('#FFF', '#192734');
}


switchToLightMode();

