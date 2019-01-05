var statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Iowa", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var statesAbbrev = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]




$( "#states1" ).autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(statesList, request.term);
        response(results.slice(0, 5));
    },
    select: function (event, ui) {
        // mapStates(event,ui,1);
        handleStates(event,ui,1);
        mapCountry(event, ui,1);
    }
});

$( "#states2" ).autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(statesList, request.term);
        response(results.slice(0, 5));
    },
    select: function (event, ui) {
        // mapStates(event,ui,2);
        mapCountry(event, ui,2);
        handleStates(event,ui,2);
    }
});

// var svgnew1 = d3.select("#content").append("svg").attr("id", "state1svg");
// var svgnew2 = d3.select("#content").append("svg").attr("id", "state2svg");





function handleStates(event, ui,num) {

    var states1 = $('#states1').val();

    if (states1.length > 3) {
        var states2 = ui.item.value;
        var s1 = statesAbbrev.filter(function(d){ return d.name == states1;})[0].abbreviation;
        var s2 = statesAbbrev.filter(function(d){ return d.name == states2;})[0].abbreviation;

        var data1 = stateHospitalData[s1];
        var data2 = stateHospitalData[s2];

        makeStackedGraph(data1,data2);

        $(".stateData").css("visibility","visible")
        $(".hospital-report-card").css("visibility","visible")
        $("#state1name").text(states1);
        $("#state2name").text(states2);

        $("#time1").text(data1["Heart_Attack_Transfer_Time"]);
        $("#time2").text(data1["Emergency_Department_Waiting"]);
        $("#time3").text(data1["Heart_Attack_or_Chest_Pain_Time"]);
        $("#spending1").text(data1["Spending"][year]);
        $("#population1").text(data1["Population"][year]);

        $("#time21").text(data2["Heart_Attack_Transfer_Time"]);
        $("#time22").text(data2["Emergency_Department_Waiting"]);
        $("#time23").text(data2["Heart_Attack_or_Chest_Pain_Time"]);
        $("#spending2").text(data2["Spending"][year]);
        $("#population2").text(data2["Population"][year]);
    }
}

// function mapStates(event,ui,num){
//     // svgnew.empty();
//     var currentMax = Math.max.apply(Math,getValues(maps[year]));
//     var currentMin = Math.min.apply(Math,getValues(maps[year]));
//
//     d3.json("https://d3js.org/us-10m.v1.json", function(us){
//         var states1 = $('#states1').val();
//         if (states1.length > 3) {
//             var states2 = ui.item.value;
//             var statePrefix1 = stateNameToId[states1];
//             var statePrefix2 = stateNameToId[states2];
//
//             if (statePrefix1.length == 1){
//                 statePrefix1 = "0" + statePrefix1;
//             }
//
//             if (statePrefix2.length == 1){
//                 statePrefix2 = "0" + statePrefix2;
//             }
//             // console.log("PREFIXES ",statePrefix1, statePrefix2);
//
//             var state1counties = topojson.feature(us, us.objects.counties).features.filter(function(d){ return d["id"].substr(0,2) == statePrefix1;});
//             var state1states = topojson.feature(us, us.objects.states).features.filter(function(d){return d["id"]==statePrefix1;});
//             var state2counties = topojson.feature(us, us.objects.counties).features.filter(function(d){ return d["id"].substr(0,2) == statePrefix2;});
//             var state2states = topojson.feature(us, us.objects.states).features.filter(function(d){return d["id"]==statePrefix2;});
//
//             // console.log("COUNTIES2",state2counties);
//             // console.log("STATES2",state2states);
//
//             svgnew1.append("g")
//                 .attr("class", "counties")
//                 .selectAll("path")
//                 .data(state1counties)
//                 .enter().append("path")
//                 .attr("fill", "black")
//                 .attr("fill", function(d) { return colorCountiesById(0, d.id, currentMax, currentMin) })
//                 .attr("d", path)
//                 .attr("id", function(d) { return "compare1"+d.id; }, true)
//                 .attr("class", "county")
//             .append("title", function(d) { return d.id})
//             .text(function(d) { return d.id; });
//
//             svgnew1.append("g")
//                 .attr("class", "states")
//                 .selectAll("path")
//                 .data(state1states)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("id", function(d) { return "compare1"+d.id; }, true)
//                 .attr("class", "state");
//
//             svgnew2.append("g")
//                 .attr("class", "counties")
//                 .selectAll("path")
//                 .data(state2counties)
//                 .enter().append("path")
//                 .attr("fill", "black")
//                 .attr("fill", function(d) { return colorCountiesById(0, d.id, currentMax, currentMin) })
//                 .attr("d", path)
//                 .attr("id", function(d) { return "compare2"+d.id; }, true)
//                 .attr("class", "county")
//                 .append("title", function(d) { return d.id})
//                 .text(function(d) { return d.id; });
//
//             svgnew2.append("g")
//                 .attr("class", "states")
//                 .selectAll("path")
//                 .data(state2states)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("id", function(d) { return "compare2"+d.id; }, true)
//                 .attr("class", "state");
//
//             d3.selectAll(".county").on('mouseover', handleCountyMouseOver);
//             d3.selectAll(".county").on('mouseout', handleCountyMouseOut);
//
//             var state1bbox = document.getElementById("state1svg").getBBox();
//             var x = -state1bbox.x/2;
//             var y = -state1bbox.y/2;
//             svgnew1.attr("transform",
//                 "translate(" + x + "," + y + ")")
//
//             var state2bbox = document.getElementById("state2svg").getBBox();
//             // console.log(state2bbox);
//             x = 0 - state2bbox.x;
//             y = 0 - state2bbox.y;
//             svgnew2.attr("transform",
//                 "translate(" + x + "," + y + ")")
//
//         }
//     })
// };

function colorSelectiveStates(stateId,currentMin,currentMax){
    if (stateId.substring(0,2) == state1Final || stateId.substring(0,2) == state2Final){
        var num = maps[year][parseInt(stateId, 10)];
        var mult = year < 6 ? 1.3 : 1.3;
        console.log(num,mult,year);
        return colorCountyByNumber(num, 0.4, mult);
    }
    return "#c9c9c9";
    // return stateId.substring(0,2) == state1Final || stateId.substring(0,2) == state2Final ? colorCountiesById(year,stateId,currentMax,currentMin) : "#e9e9e9";
}

var state1Final;
var state2Final;

function mapCountry(event,ui,statesnum){
    var currentMax = Math.max.apply(Math,getValues(maps[year]));
    var currentMin = Math.min.apply(Math,getValues(maps[year]));
    // console.log(currentMax,currentMin);

    d3.json("https://d3js.org/us-10m.v1.json", function(us) {
        var states1 = $('#states1').val();
        // console.log(statesnum,states1.length);
        if (states1.length > 3 && statesnum==2) {
            var states2 = ui.item.value;
            var statePrefix1 = stateNameToId[states1];
            var statePrefix2 = stateNameToId[states2];

            if (statePrefix1.length == 1) {
                statePrefix1 = "0" + statePrefix1;
            }

            if (statePrefix2.length == 1) {
                statePrefix2 = "0" + statePrefix2;
            }

            state1Final = statePrefix1;
            state2Final = statePrefix2;

            var svgnew1 = d3.select("#compare-middle").append("svg").attr("height",600).attr("width",600).attr("id","#svgnew1");

            svgnew1.append("g")
                .attr("class", "counties2")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("fill", "#efefef")
                .attr("transform","scale(0.48, 0.48),translate(0,60)")
                .attr("fill", function(d) { return colorSelectiveStates(d.id, statePrefix1, statePrefix2, currentMax, currentMin) })
                .attr("d", path)
                .attr("id", function(d) { return "compare1"+d.id; }, true)
                .attr("class", "county2")
                .append("title", function(d) { return d.id})
                .text(function(d) { return d.id; });


            svgnew1.append("g")
                .attr("class", "states2")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("id", function(d) { return "compare1"+d.id; }, true)
                .attr("class", "state2")
                .attr("transform","scale(0.48, 0.48),translate(0,60)");

            d3.selectAll(".county2").on('mouseover', handleCountyMouseOver2);
            d3.selectAll(".county2").on('mouseout', handleCountyMouseOut2);
        }
    });
}


d3.select("#compare-middle").append("div").attr("id","county-name").attr("class","countyname2");


// Create Event Handlers for mouse
function handleCountyMouseOver2(d, i) {  // Add interactivity
    var id = this.id.toString().substring(8, this.id.length);

    var stateId = this.id.toString().substring(2, this.id.length - 3).replace(/^[0]+/g,"");
    var county = countyIdToName[id.replace(/^[0]+/g,"")];

    d3.select(this).attr("stroke", "white").attr("strokewidth", 15);
    $("#county-name").text(county);
}

function handleCountyMouseOut2(d, i) {  // Add interactivity
    d3.select(this).attr("stroke", "none");
}


stateHospitalData = {};

d3.csv("data/TimelyandEffectiveCare-State.csv", function(d){
    d.forEach(function(row){
        stateHospitalData[row.State] = {};
        stateHospitalData[row.State]["Heart Attack Transfer Time".split(" ").join("_")] = row["Heart Attack Transfer Time"];
        stateHospitalData[row.State]["Emergency Department Waiting".split(" ").join("_")] = row["Emergency Department Waiting"];
        stateHospitalData[row.State]["Heart Attack or Chest Pain Time".split(" ").join("_")] = row["Heart Attack or Chest Pain Time"];
    });
})

d3.csv("data/Payment-State.csv", function(d) {
    d.forEach(function(row){
        stateHospitalData[row.State][row["Measure Name"].split(" ").join("_")] = [row["Number less than national payment"], row["Number same as national payment"], row["Number greater than national payment"]];
    });
})

d3.csv("data/returns.csv", function(d){
    d.forEach(function(row){
        stateHospitalData[row.State]["ami_worse"] = row["ami_worse"];
        stateHospitalData[row.State]["ami_same"] = row["ami_same"];
        stateHospitalData[row.State]["ami_better"] = row["ami_better"];
        stateHospitalData[row.State]["heart_failure_worse"] = row["heart_failure_worse"];
        stateHospitalData[row.State]["heart_failure_same"] = row["heart_failure_same"];
        stateHospitalData[row.State]["heart_failure_better"] = row["heart_failure_better"];
        stateHospitalData[row.State]["pneumonia_worse"] = row["pneumonia_worse"];
        stateHospitalData[row.State]["pneumonia_same"] = row["pneumonia_same"];
        stateHospitalData[row.State]["pneumonia_better"] = row["pneumonia_better"];
        stateHospitalData[row.State]["readmission_worse"] = row["readmission_worse"];
        stateHospitalData[row.State]["readmission_same"] = row["readmission_same"];
        stateHospitalData[row.State]["readmission_better"] = row["readmission_better"];
        stateHospitalData[row.State]["readmission_heart_attack_worse"] = row["readmission_heart_attack_worse"];
        stateHospitalData[row.State]["readmission_heart_attack_same"] = row["readmission_heart_attack_same"];
        stateHospitalData[row.State]["readmission_heart_attack_better"] = row["readmission_heart_attack_better"];
        stateHospitalData[row.State]["readmission_heart_failure_worse"] = row["readmission_heart_failure_worse"];
        stateHospitalData[row.State]["readmission_heart_failure_same"] = row["readmission_heart_failure_same"];
        stateHospitalData[row.State]["readmission_heart_failure_better"] = row["readmission_heart_failure_better"];
    });
});


d3.csv("data/HospitalExpenses.csv", function(d){
    d.forEach(function(row){
        if (row.State in stateHospitalData){
            stateHospitalData[row.State]["Spending"] = [row.y1998, row.y1999, row.y2000, row.y2001, row.y2002, row.y2003, row.y2004, row.y2005, row.y2006, row.y2007];
        }
    });
})

d3.csv("data/statepopulationsall.csv", function(d){
    d.forEach(function(row){
        if (row.State in stateHospitalData) {
            stateHospitalData[row.State]["Population"] = ["n/a", row.y1999, row.y2000, row.y2001, row.y2002, row.y2003, row.y2004, row.y2005, row.y2006, row.y2007];
        }
    });
})


var properties = ["ami", "pneumonia", "heart_failure", "readmission", "readmission_heart_attack", "readmission_heart_failure"];
var propertiesMap = {"ami":0,"pneumonia":1,"heart_failure":2,"readmission":3,"readmission_heart_attack":4, "readmission_heart_failure":5};
var propertiesNice = ["Acute Myocardial Infarction","Pneumonia", "Heart Failure", "Returns(General)", "Heart Attack Returns","Heart Failure Returns"]

function makeStackedGraph(data1, data2){
    var data1Reformatted = [];
    var data2Reformatted = [];

    data1Reformatted.push(['Type of Care', 'Worse', 'Same', 'Better', { role: 'annotation' } ]);
    data2Reformatted.push(['Type of Care', 'Worse', 'Same', 'Better', { role: 'annotation' } ]);

    var options_stacked = {
        title: "State Hospitals vs. National Averages",
        isStacked: true,
        height: 300,
        legend: {position: 'top', maxLines: 3},
        hAxis: {minValue: 0,
                textStyle: {    fontName: 'Helvetica',
                                fontSize: '10' },
                maxValue: 100},
        backgroundColor: { fill:'transparent' },
        series: {
            0:{color:'rgb(224, 121, 150)'},
            1:{color:'rgb(204,221,236)'},
            2:{color:'rgb(140,116,181)'},
        }
    };

    properties.map(function(d){
        map = [propertiesNice[propertiesMap[d]], parseInt(data1[d+"_worse"]), parseInt(data1[d+"_same"]), parseInt(data1[d+"_better"]),''];
        data1Reformatted.push(map);

        map2 = [propertiesNice[propertiesMap[d]], parseInt(data2[d+"_worse"]), parseInt(data2[d+"_same"]), parseInt(data2[d+"_better"]),''];
        data2Reformatted.push(map2);
    })

    var data1Goog = google.visualization.arrayToDataTable(data1Reformatted);
    var data2Goog = google.visualization.arrayToDataTable(data2Reformatted);

    var chart = new google.visualization.BarChart(document.getElementById('stack1'));
    chart.draw(data1Goog, options_stacked);
    var chart2 = new google.visualization.BarChart(document.getElementById('stack2'));
    chart2.draw(data2Goog, options_stacked);

}


