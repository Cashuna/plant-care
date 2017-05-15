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
    /*$.get("/api/plants", function(data) {
    	console.log(data);

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
	    });
	});*/

// Chart.js test
    var ctx = $("#heightChart");

    // NOTE: Dummy data for testing - will pull from user-inputted plant data stored in db
    var labelArr = ["May", "June", "July"];
    var countArr1 = [12, 18, 24];
    var countArr2 = [28, 28, 28];
    var trimmedArr = [ , 25, ];

    $.get("/api/plants", function(data) {
    	console.log(data);
      
      /*for (var i = 0; i < data.length; i++) {
        labelArr.push(data.plant_name);
        countArr.push(data.mature_sprd_val);
      };*/
      
      console.log(labelArr);
      console.log(countArr1);

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
 			pointRadius: 4,
 			pointBackgroundColor: "rgba(75, 192, 192, 1)",
 			pointHoverRadius: 6,
 			pointHoverBorderColor: "rgba(102, 0, 255, 1)",
 			pointHoverBackgroundColor: "rgba(102, 0, 255, 1)"
        }, {
          	label: "Mature Height",
          	data: countArr2,
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
	var gaugeWater = loadLiquidFillGauge("fillgaugeWater", 65 , configWater);

	// Calling the loadLiquidFillGuage function to display the sunlight data
	var gaugeSun = loadLiquidFillGauge("fillgaugeSun", 55 , configSun);
});