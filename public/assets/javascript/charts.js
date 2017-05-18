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

// Chart.js canvas
var ctxH = $("#heightChart");
var ctxS = $("#spreadChart");
var ctxPH = $("#phChart");
var ctxT = $("#tempChart");

// Chart title
var titleS = "Spread";
var titleH = "Height";
var titlePH = "pH";
var titleT = "Temperature";

// NOTE: Dummy data for testing - will pull from user-inputted plant data stored in db
var labelArr = ["May", "June", "July", "Aug.", "Sep."];

// Declaring variables for use later to store data for user's plant
var trimmedArr = [];

var benchmarkSprd = [];
var benchmarkHt = [];
var recPHmin = [];
var recPHmax = [];
var recTmin = [];
var recTmax = [];

var sprdArr = [];
var htArr = [];
var phArr = [];
var tempArr = [];


// FUNCTIONS
// Generic function for plotting benchmark
var benchmarkFn = function(benchmark, average) {
    if (typeof average === "number") {
        for (var i = 0; i < htArr.length; i++) {
            benchmark.push(average);
        };
    } else {
        for (var i = 0; i < htArr.length; i++) {
            benchmark.push(0);
        };
    };
};

// Function for plotting if the user trimmed their plant that day in order to provider context
var userPlantTrim = function(data) {
    for (var i = 0; i < data.length; i++) {
        var plantVar;
        if (data[i].plantTrimmed === true) {
            plantVar = 1;
        } else {
            plantVar = null;
        }
        trimmedArr.push(plantVar);
    };   
    console.log("Trimmed: " + trimmedArr);
};

var userPlantData = function(data) {
    ///Do we need to validate data type here, or that's done in db / in form??
    for (var i = 0; i < data.length; i++) {
        var plantSprd = data[i].plantSpread;
        sprdArr.push(plantSprd);
    
        var plantH = data[i].plantHeight;
        htArr.push(plantH);
   
        var pH = data[i].soilPh;
        phArr.push(pH);

        var temp = data[i].temp;
        tempArr.push(temp);
    }
};

// Creating a reusable instance of the chart.js prototype that includes the trimmed data (**is that right vocab?)
// *** Move to new file and export??
var lineChartTrim = function(ctx, chartTag, userPlantArr, plant, benchmark, title) {
    // Defining the Chart.js line graph
    var chartTag = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArr,
            datasets: [{
                label: "Your " + plant,
                data: userPlantArr,
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
                label: "Mature " + title,
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
                text: plant + " " + title + " Over Time"
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
};

// Creating a reusable instance of the chart.js prototype that does not include the trimmed data (**is that right?)
// *** Move to new file and export??
var lineChartNoTrim = function(ctx, chartTag, userPlantArr, plant, recMin, recMax, title) {
    // Defining the Chart.js line graph
    var chartTag = new Chart(ctx, {
        type: "line",
        data: {
            labels: labelArr,
            datasets: [{
                label: "Your " + plant,
                data: userPlantArr,
                fill: false,
                borderWidth: 2,
                borderColor: "rgba(75, 192, 192, 1)",
                //pointRadius: 4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                //pointHoverRadius: 6,
                pointHoverBorderColor: "rgba(102, 0, 255, 1)",
                pointHoverBackgroundColor: "rgba(102, 0, 255, 1)"
            }, {
                label: "Min. temp.",
                data: recMin,
                fill: true,
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderWidth: 2,
                borderColor: "rgba(153, 102, 255, 1)",
                pointRadius: 0,
                pointHoverRadius: 0
            }, {
                label: "Max. temp.",
                data: recMax,
                fill: true,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderWidth: 2,
                borderColor: "rgba(153, 102, 255, 1)",
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            title: {
                display: true,
                text: "Environment: " + title + " Over Time"
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
};



// MAIN PROCESSES
$(document).ready(function() {
    // Calling the loadLiquidFillGuage function to display the water data
    var gaugeWater = loadLiquidFillGauge("fillgaugeWater", 65, configWater);

    // Calling the loadLiquidFillGuage function to display the sunlight data
    var gaugeSun = loadLiquidFillGauge("fillgaugeSun", 55, configSun);

    // Getting the user's plant data & data on the identified plant from the Plants table
    $.get("/api/user/plant", function(data) {
        // Calling the functions to pull the specified plant's spread, height, & trim data 
        userPlantData(data);
        userPlantTrim(data);

        $.get("/api/plants", function(data) {
            console.log(data);
            // Calling the functions to create the benchmark & other lines for the plant spread line graph
            benchmarkFn(benchmarkSprd, data.mature_sprd_val);
            lineChartTrim(ctxS, spreadChart, sprdArr, data.plant_name, benchmarkSprd, titleS);
        
            // Calling the function to create the benchmark & other lines for the plant height line graph
            benchmarkFn(benchmarkHt, data.mature_ht_val);
            lineChartTrim(ctxH, heightChart, htArr, data.plant_name, benchmarkHt, titleH);

            // Calling the function to create the benchmark & other lines for the soil pH line graph
            benchmarkFn(recPHmin, data.soil_acidity_min);
            benchmarkFn(recPHmax, data.soil_acidity_max);
            lineChartNoTrim(ctxPH, phChart, phArr, data.plant_name, recPHmin, recPHmax, titlePH);

            // Calling the function to create the benchmark & other lines for the temp. line graph
            benchmarkFn(recTmin, data.tempF_grow_min);
            benchmarkFn(recTmax, data.tempF_grow_max);
            lineChartNoTrim(ctxT, tempChart, tempArr, data.plant_name, recTmin, recTmax, titleT);
        });
    });
});
