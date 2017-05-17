//SETUP VARIABLES
var matureSpread;

// Liquid fill guage to show % of days that plant was watered
var configWater = liquidFillGaugeDefaultSettings();
configWater.circleThickness = 0.1;
configWater.circleFillGap = 0.2;
configWater.textVertPosition = 0.8;
configWater.waveAnimateTime = 2000;
configWater.waveHeight = 0.2;
configWater.waveCount = 1;

// Liquid fill guage to show % of days that plant was in correct sun
var configSun = liquidFillGaugeDefaultSettings();
configSun.circleColor = "#FFCC00";
configSun.textColor = "#997A00";
configSun.waveTextColor = "#FFEB99";
configSun.waveColor = "#FFD633";
configSun.circleThickness = 0.1;
configSun.circleFillGap = 0.2;
configSun.textVertPosition = 0.8;
//configSun.displayPercent = false;
configSun.waveAnimateTime = 2000;
configSun.waveHeight = 0.2;
configSun.waveCount = 1;

// Data for line graph test
var lineData = [{
    x: 1,
    y: 5
}, {
    x: 20,
    y: 20
}, {
    x: 40,
    y: 10
}, {
    x: 60,
    y: 40
}, {
    x: 80,
    y: 5
}, {
    x: 100,
    y: 60
}];


//FUNCTIONS


//MAIN PROCESSES
$(document).ready(function() {
    // D3 chart test - basic bar graph
    $.get("/api/plants", function(data) {
        /*console.log(data);

        matureSpread = data.mature_sprd_val;
        console.log(matureSpread);
        var dataTest = [4, 8, 15, 16, 23, 42];

        var x = d3.scale.linear()
            .domain([0, d3.max(dataTest)])
            .range([0, 420]);

        d3.select("#spreadChart")
            .selectAll("div")
                .data(dataTest)
            .enter().append("div")
                .style("width", function(d) { return x(d) + "px"; })
                .text(function(d) { return d; 
        });*/

        /*var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 1000]),
    randomX = d3.randomNormal(0.3),
    randomY = d3.randomNormal(0);

render();

canvas.onclick = render;

function render() {
  var x0 = width / 20,
      y0 = height / 2,
      mainWalk = randomWalk(x0, y0, 1000);

  context.clearRect(0, 0, width, height);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth = 1.5;
  context.strokeStyle = "black";
  renderWalk(mainWalk);

  context.globalCompositeOperation = "multiply";
  context.lineWidth = 1;
  for (var i = 0; i < mainWalk.length; i += 2) {
    var branchStart = mainWalk[i],
        x0 = branchStart[0],
        y0 = branchStart[1];
    for (var j = 0; j < 1; ++j) {
      context.strokeStyle = color(i + (Math.random() - 0.5) * 50);
      var x1 = x0, y1 = y0;
      for (var k = 0, m = 20; k < m; ++k) {
        context.globalAlpha = (m - k - 1) / m;
        var pieceWalk = randomWalk(x1, y1, 10),
            pieceEnd = pieceWalk[pieceWalk.length - 1];
        renderWalk(pieceWalk);
        x1 = pieceEnd[0];
        y1 = pieceEnd[1];
      }
      context.globalAlpha = 1;
    }
  }
}

function renderWalk(walk) {
  var i, n = walk.length;
  context.beginPath();
  context.moveTo(walk[0][0], walk[0][1]);
  for (i = 1; i < n; ++i) {
    context.lineTo(walk[i][0], walk[i][1]);
  }
  context.stroke();
}

function randomWalk(x0, y0, n) {
  var points = new Array(n), i;
  points[0] = [x0, y0];
  for (i = 1; i < n; ++i) {
    points[i] = [
      x0 += randomX() * 2,
      y0 += randomY() * 2
    ];
  }
  return points;
};

        var canvas = d3.select('#canvas');

        var circles = canvas
            .selectAll('circle')
            .data(data);

        circles
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
            .attr('fill', function(d) {
                return d.c;
            })
            .attr('r', function(d) {
                return d.r;
            });*/
    });

    // Chart.js test
    var ctx = $("#heightChart");

    // NOTE: Dummy data for testing - will pull from user-inputted plant data stored in db
    var labelArr = ["May", "June", "July", "Aug.", "Sep.", "Oct"];
    var countArr1 = [5, 3, 6, 6.5, 8, 6];
    var trimmedArr = [, .5, , , , .5];

    var benchmark = [];

    $.get("/api/plants", function(data) {
        console.log(data);

        /*for (var i = 0; i < data.length; i++) {
          labelArr.push(data.plant_name);
          countArr.push(data.mature_sprd_val);
        };*/

        if (typeof data.mature_sprd_val === "number") {
            for (var i = 0; i < labelArr.length; i++) {
                benchmark.push(data.mature_sprd_val);
            };
        }
        else {
            for (var i = 0; i < labelArr.length; i++) {
                benchmark.push(0);
            };
        };
        

        console.log(benchmark);
        console.log(labelArr);
        console.log(countArr1);

        // Creating line chart
        var heightChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labelArr,
                datasets: [{
                    label: "Plant 1",
                    data: countArr1,
                    fill: true,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    borderColor: "rgba(75, 192, 192, 1)",
                    //pointRadius: 4,
                    pointBackgroundColor: "rgba(75, 192, 192, 1)",
                    //pointHoverRadius: 6,
                    pointHoverBorderColor: "rgba(102, 0, 255, 1)",
                    pointHoverBackgroundColor: "rgba(102, 0, 255, 1)"
                }, {
                    label: "Mature Height",
                    data: benchmark,
                    fill: false,
                    borderWidth: 2,
                    borderColor: "rgba(153, 102, 255, 1)",
                    pointRadius: 0,
                    pointHoverRadius: 0
                }, {
                    label: "Plant trimmed!",
                    data: trimmedArr,
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                    borderColor: "rgba(255, 99, 132, 1)",
                    pointStyle: "crossRot",
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(255, 99, 132, 1)",
                    pointHoverRadius: 6
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Plant Height Over Time"
                },
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false,
                            zeroLineColor: "rgba(0, 0, 0, 0.25)"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false,
                            zeroLineColor: "rgba(0, 0, 0, 0.25)"
                        }
                    }]
                }
            }
        });
    });

    // Calling the loadLiquidFillGuage function to display the water data
    var gaugeWater = loadLiquidFillGauge("fillgaugeWater", 65, configWater);

    // Calling the loadLiquidFillGuage function to display the sunlight data
    var gaugeSun = loadLiquidFillGauge("fillgaugeSun", 55, configSun);
});
