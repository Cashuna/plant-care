//SETUP VARIABLES
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
configSun.textColor = "rgba(255, 255, 255, 0)";
configSun.waveTextColor = "rgba(255, 255, 255, 0)";
configSun.waveColor = "#FFD633";
configSun.circleThickness = 0.1;
configSun.circleFillGap = 0.2;
configSun.textVertPosition = 0.8;
configSun.displayPercent = false;
configSun.waveHeight = 0.02;
configSun.waveCount = 1;

// Chart.js canvas
var ctxH = $("#heightChart");
var ctxS = $("#spreadChart");
var ctxSun = $("#sunChart");
var ctxT = $("#tempChart");

// Chart title
var titleS = "Spread";
var titleH = "Height";
var titleSun = "Sun";
var titleT = "Temperature";

// Chart label
var labelS = "Mature Spread";
var labelH = "Mature Height";
var labelSun = "Rec. Sun";
var labelT = "Rec. Temp";
var labelTr = "Plant trimmed!";
var labelW = "Plant watered!";

// Declaring variables for use later to store data for user's plant
var timeArr = [];

var trimmedArr = [];
var wateredArr = [];

var benchmarkSprd = [];
var benchmarkHt = [];
var benchmarkSun = [];
var recTmin = [];
var recTmax = [];

var sprdArr = [];
var htArr = [];
var tempArr = [];
var sunArr = [];

var matureHt;
var matureSprd;

// Arrays to convert sun amount (text) from the db to number for display
var sunTxt = ["Full Sun", "Full Sun / Partial Sun", "Partial Sun", "Partial Sun / Dappled Sun", "Dappled Sun / Partial Sun", "Indoor / Dappled Sun", "Partial Sun / Indoor", "Indoor", "Full Shade / Indoor"];
var sunVal = [100, 85, 65, 50, 50, 25, 25, 0];
var sunRec;

// Arrays to convert water amount (text) from the db to number for display
var waterTxt = ["Very High", "High", "Medium", "Low", "Very Low"];
var waterVal = [100, 85, 50, 25, 15];
var waterRec;


// FUNCTIONS
// Function to convert sequelize timestamp to day
var formatDate = function(data) {
    for (var i = 0; i < data.length; i++) {
        var addTime = data[i].createdAt;
        timeArr.push(moment(addTime).format("MM/DD/YY"));
    };
    console.log(timeArr);
};

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

// Function for plotting if the user trimmed their plant that day in order to provide context
var userPlantTrim = function(data) {
    for (var i = 0; i < data.length; i++) {
        var plantVar;
        if (data[i].plantTrimmed === "yes" | data[i].plantTrimmed === "Yes") {
            plantVar = 1;
        } else {
            plantVar = null;
        }
        trimmedArr.push(plantVar);
    };   
    console.log("Trimmed: " + trimmedArr);
};

// Function for plotting if the user watered their plant that day in order to provide context
var userPlantWater = function(data) {
    for (var i = 0; i < data.length; i++) {
        var dailyWater;
        if (data[i].plantWatered === "yes" | data[i].plantWatered === "Yes") {
            dailyWater = 25;
        } else {
            dailyWater = null;
        }
        wateredArr.push(dailyWater);
    };   
    console.log("Watered: " + wateredArr);
};

// Functions for converting measurements in the Plants table to inches, if they are in feet
var convertHt = function(data) {
    if (data.mature_ht_unit === "feet") {
        matureHt = data.mature_ht_val * 12;
    }
    else {
        matureHt = data.mature_ht_val;
    }
    console.log("ht: " + matureHt);
};

var convertSprd = function(data) {
    if (data.mature_sprd_unit === "feet") {
        matureSprd = data.mature_sprd_val * 12;
    }
    else {
        matureSprd = data.mature_sprd_val;
    }
    console.log("sp: " + matureSprd);
};

// Functions for pulling additional plant care information
var userPlantData = function(data) {
    for (var i = 0; i < data.length; i++) {
        var plantSprd = data[i].plantSpread;
        sprdArr.push(plantSprd);
    
        var plantH = data[i].plantHeight;
        htArr.push(plantH);

        var temp = data[i].temp;
        tempArr.push(temp);

        //var userWater = data[i].plantWatered;
        //waterArr.push(userWater);

        var userSun = data[i].plantSunlight;
        sunArr.push(userSun);
    };
};

var waterRec = function(water) {
    waterRec = waterVal[waterTxt.indexOf(water)];
    console.log("Water rec: " + waterRec);
};

var sunRec = function(sun) {
    sunRec = sunVal[sunTxt.indexOf(sun)];
    console.log("Sun rec: " + sunRec);
};

// Creating a reusable instance of the chart.js prototype that includes the trimmed data
var lineChartTrim = function(ctx, chartTag, userPlantArr, lineLabel, plant, benchmark, labelTr, arr, title) {
    // Defining the Chart.js line graph
    var chartTag = new Chart(ctx, {
        type: "line",
        data: {
            labels: timeArr,
            datasets: [{
                label: "Your " + plant,
                data: userPlantArr,
                fill: true,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                borderColor: "rgba(75, 192, 192, 1)",
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            }, {
                label: lineLabel,
                data: benchmark,
                fill: false,
                borderWidth: 2,
                borderColor: "rgba(153, 102, 255, 1)",
                pointRadius: 0,
                pointHoverRadius: 0
            }, {
                label: labelTr,
                data: arr,
                fill: false,
                borderWidth: 2,
                borderColor: "rgba(255, 99, 132, 1)",
                pointStyle: "crossRot",
                pointRadius: 4,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointHoverRadius: 6,
                showLine: false
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

// Creating a reusable instance of the chart.js prototype that does not include the trimmed data
var lineChartNoTrim = function(ctx, chartTag, userPlantArr, plant, recMin, recMax, title) {
    // Defining the Chart.js line graph
    var chartTag = new Chart(ctx, {
        type: "line",
        data: {
            labels: timeArr,
            datasets: [{
                label: "Your " + plant,
                data: userPlantArr,
                fill: false,
                borderWidth: 2,
                borderColor: "rgba(75, 192, 192, 1)",
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            }, {
                label: "Min. temp.",
                data: recMin,
                fill: true,
                backgroundColor: "rgba(224, 232, 255, 1)",
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
    $.ajaxSetup({
        headers: { 'Authorization': 'Bearer ' + Cookies.get('userToken') }
    });
    // Getting the user's plant data & data on the identified plant from the Plants table
    $.get("/api/user/plant", function(data) {
        // Calling the functions to pull the specified plant's spread, height, & trim data 
        userPlantData(data);
        userPlantTrim(data);
        userPlantWater(data);

        formatDate(data);

        var userplant = data[0].plantName;
        userplant = userplant.toLowerCase();

        $.get("/api/" + userplant, function(data) {
            console.log(data);

            // Calling the function to convert feet to inches
            convertHt(data);
            convertSprd(data);
            // Calling the function to pull the recommended sun amount
            sunRec(data.sun_req);
            // Calling the function to pull the recommended sun amount
            waterRec(data.water_req);
            
            // Calling the functions to create the benchmark & other lines for the plant spread line graph
            benchmarkFn(benchmarkSprd, matureSprd);
            lineChartTrim(ctxS, spreadChart, sprdArr, labelS, data.plant_name, benchmarkSprd, labelTr, trimmedArr, titleS);
        
            // Calling the function to create the benchmark & other lines for the plant height line graph
            benchmarkFn(benchmarkHt, matureHt);
            lineChartTrim(ctxH, heightChart, htArr, labelH, data.plant_name, benchmarkHt, labelTr, trimmedArr, titleH);

            // Calling the function to create the lines for the sun line graph
            benchmarkFn(benchmarkSun, sunRec);
            lineChartTrim(ctxSun, sunChart, sunArr, labelSun, data.plant_name, benchmarkSun, labelW, wateredArr, titleSun);

            // Calling the function to create the benchmark & other lines for the temp. line graph
            benchmarkFn(recTmin, data.tempF_grow_min);
            benchmarkFn(recTmax, data.tempF_grow_max);
            lineChartNoTrim(ctxT, tempChart, tempArr, data.plant_name, recTmin, recTmax, titleT);

            // Calling the loadLiquidFillGuage function to display the water data
            $("#guageH1").text("Recommended Water: " + data.water_req);
            var gaugeWater = loadLiquidFillGauge("fillgaugeWater", waterRec, configWater);

            // Calling the loadLiquidFillGuage function to display the sunlight data
            $("#guageH2").text("Recommended Sun: " + data.sun_req);
            var gaugeSun = loadLiquidFillGauge("fillgaugeSun", sunRec, configSun);
        });
    });
});
