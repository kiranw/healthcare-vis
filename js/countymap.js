
var year = 0;

var svg = d3.select("svg");



totalEnrollmentsDataPath = "data/totalenrollments.csv";
var y1998 = {};
var y1999 = {};
var y2000 = {};
var y2001 = {};
var y2002 = {};
var y2003 = {};
var y2004 = {};
var y2005 = {};
var y2006 = {};
var y2007 = {};
var maps = [y1998, y1999, y2000, y2001, y2002, y2003, y2004, y2005, y2006, y2007];
var stateIdToName = {};
var countyIdToName = {};
var stateMortality = {};
var stateNameToId = {};

for (var i = 1999; i < 2007; i++){
    var path = "data/" + i + "mortality.csv";
    d3.csv(path, function(e) {
        e.forEach(function(d) {
            if (d.Area != "")
            {
                dList  = [
                    d["4-Jan"],
                    d["14-May"],
                    d["15-24"],
                    d["25-34"],
                    d["35-44"],
                    d["45-54"],
                    d["55-64"],
                    d["65-74"],
                    d["75-84"],
                    d["85+"],
                    d["ALL"]];
                if (d.Area in stateMortality){
                    stateMortality[d.Area].push(dList);
                }
                else stateMortality[d.Area] = [dList];
            }
        })
    })
}

var statePopulations = {}

d3.csv("data/statePopulations.csv", function(d){
    d.forEach(function(data){
        statePopulations[data.Area] = parseInt(data.Population.split(",").join(""));
    })
})


// Returns an array of values of a dictionary
function getValues(dictionary)
{
    return Object.keys(dictionary).map(function(key){
        return dictionary[key];
    });
}

// Return d3 rgb interpolated
function colorCountiesById(yr, id, max, min)
{
    year = yr;
    var num = maps[yr][parseInt(id, 10)]
    var mult = year < 6 ? 1.7 : 1;
    return colorCountyByNumber(num, max, mult);
}

// Return d3 rbg interpolated
function colorCountyByNumber(num, max, mult)
{
    return d3.interpolateBuPu(num/max * mult);
}

function colorRange(){
    var range2 = [];
    for (var i=0; i<11; i++){
        range2.push(d3.rgb(colorCountyByNumber(i/30, 1, 0)));
    }
    return range2;
}



// ===================================================================
//                l e g e n d   c o l o r   k e y
// ===================================================================

var w = 300, h = 50;
var t = 30;

var key = d3.select("#legend1")
    .append("svg")
    .attr("width", w)
    .attr("height", 50);

var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb(247,252,253))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "12.5%")
    .attr("stop-color", d3.rgb(228,238,245))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "25%")
    .attr("stop-color", d3.rgb(204,221,236))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "30.5%")
    .attr("stop-color", d3.rgb(178,202,225))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "39%")
    .attr("stop-color", d3.rgb(156,179,213))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", d3.rgb(143,149,198))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "62.5%")
    .attr("stop-color", d3.rgb(140,116,181))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "75%")
    .attr("stop-color", d3.rgb(137,82,165))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "87.5%")
    .attr("stop-color", d3.rgb(133,45,143))
    .attr("stop-opacity", 1);
legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb(115,15,113))
    // .attr("stop-color", "black")
    .attr("stop-opacity", 1);


key.append("rect")
    .attr("width", w)
    .attr("height", 10)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(0,20)");

var y = d3.scaleLinear()
    .range([w, 0])
    .domain([95, 5]);

var yAxis = d3.axisBottom()
    .scale(y)
    .ticks(9);

key.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,30)")
    .call(yAxis)
    .append("text")
    .attr("transform", "translate(50,60)")
    .attr("y", 0)
    .attr("dy", ".91em")
    .style("text-anchor", "end")
    .text("Medicare");



// ===================================================================
//                 g e n e r a t e   m a p
// ===================================================================

// // set projection
// var projection = d3.geoAlbersUsa()
//     .translate([960/2, 500/2])    // translate to center of screen
//     .scale(1000);          // scale things down so see entire US

var path = d3.geoPath();


var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([500, 860]);

var color = d3.scaleLinear()
    .domain([0,11])
    .interpolate(d3.interpolateBuPu)
    .range(colorRange());

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.csv, totalEnrollmentsDataPath, function(d) {
        y1998[d.id] = d.norm1;
        y1999[d.id] = d.norm2;
        y1999[d.id] = d.norm2;
        y2000[d.id] = d.norm3;
        y2001[d.id] = d.norm4;
        y2002[d.id] = d.norm5;
        y2003[d.id] = d.norm6;
        y2004[d.id] = d.norm7;
        y2005[d.id] = d.norm8;
        y2006[d.id] = d.norm9;
        y2007[d.id] = d.norm10;
        stateIdToName[d.id.toString().substring(0, d.id.length - 3)] = d.statename;
        stateNameToId[d.statename] = d.id.toString().substring(0, d.id.length - 3);
        countyIdToName[d.id] = d.name;
    })
    .await(ready);

function ready(error, us) {
    if (error) throw error;

    var currentMax = Math.max.apply(Math,getValues(maps[year]));
    var currentMin = Math.min.apply(Math,getValues(maps[year]));

    if (year < maps.length)
    {
        // d3.csv("data/hospitals.csv", function(data){
        //     locations = data.map(function(d) { return d.Location.includes("(") ? d.Location.split("(")[1] : "n/a"; })
        //         .filter(function(d) { return d!== "n/a" && d.includes(")") && d.includes(","); })
        //         .map(function(location) { return location.substr(1,location.length-2).replace(/\s/g, '').split(","); })
        //         .filter(function(loc){ return !isNaN(loc[0]) && !isNaN(loc[1]); })
        //         .map(function(loc) { return [parseFloat(loc[1]), parseFloat(loc[0])]});
        //     console.log(locations);
        //     projections = locations.map(function(d) { return projection(d);});
        //     console.log(projections);
        //     svg.selectAll("circles")
        //         .data(locations)
        //         .enter()
        //         .append("circle")
        //         .attr("cx", function(d) { return projection(d)[0]; })
        //         .attr("cy", function(d) { return projection(d)[1]; })
        //         .attr("r", 3)
        //         .attr("fill", "red");
        // })

        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("transform",
                "translate(" + 0 + "," + -20 + ")")
            .attr("fill", function(d) { return colorCountiesById(0, d.id, currentMax, currentMin) })
            .attr("d", path)
            .attr("id", function(d) { return "id"+d.id; }, true)
            .attr("class", "county")
            .append("title", function(d) { return d.id})
            .text(function(d) { return d.id; });

        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("transform",
                "translate(" + 0 + "," + -20 + ")")
            .attr("d", path)
            .attr("id", function(d) { return "id"+d.id; }, true)
            .attr("class", "state");

        d3.selectAll(".county").on('mouseover', handleCountyMouseOver);
        d3.selectAll(".county").on('mouseout', handleCountyMouseOut);



    }
    year++;
}

// Create Event Handlers for mouse
function handleCountyMouseOver(d, i) {  // Add interactivity
    var id = this.id.toString().substring(2, this.id.length);
    var stateId = this.id.toString().substring(2, this.id.length - 3).replace(/^[0]+/g,"");
    d3.select(this).attr("stroke", "white").attr("strokewidth", 15);
    var state = stateIdToName[stateId];
    var county = countyIdToName[id.replace(/^[0]+/g,"")];
    $("#state-name").text(state);
    $("#county-name").text("("+county+")");

    var rank = $("#mort"+state.replace(" ","_")).attr("name");
    var val = $("#mort"+state.replace(" ","_")).attr("value");
    $('.stateMortalityBar').css({ fill: "rgb(204,221,236)" });
    d3.select("#mort" + state.replace(" ","_")).style("fill", "rgb(77,219,255)");
    $("#mstate").html(state);
    $("#mrank").html(rank);
    $("#mmort").html(val);
}

function handleCountyMouseOut(d, i) {  // Add interactivity
    d3.select(this).attr("stroke", "none");
}

function setYear(yr){
    year = yr;
    var currentMax = Math.max.apply(Math,getValues(maps[year]));
    var currentMin = Math.min.apply(Math,getValues(maps[year]));
    d3.selectAll(".county").attr("fill", function(d){return colorCountiesById(yr, d.id, currentMax, currentMin)});
    d3.selectAll(".county2").attr("fill", function(d){return colorSelectiveStates(d.id, currentMax, currentMin)});
    $(".year").css("color", "black");
    $("#yr"+year).css("color", "#5bc0de");
    plotMortalityData();
    d3.selectAll(".stateMortalityBar").on('mouseover', handleStateMortalityMouseOver);

    if (typeof state1Final !== 'undefined' && typeof state2Final !== 'undefined')
    {
        console.log(stateIdToName);
        console.log(stateIdToName[state1Final.replace(/^0+/, '')]);
        console.log(stateIdToName[state2Final.replace(/^0+/, '')]);
        var state1 = statesAbbrev.filter(function(d){return d["name"] == stateIdToName[state1Final.replace(/^0+/, '')]})[0]["abbreviation"];
        var state2 = statesAbbrev.filter(function(d){return d["name"] == stateIdToName[state2Final.replace(/^0+/, '')]})[0]["abbreviation"];
        console.log(state1);
        console.log(state2);
        var data1 = stateHospitalData[state1];
        var data2 = stateHospitalData[state2];

        console.log(data1["Spending"]);
        $("#spending1").text("$" + data1["Spending"][year]);
        $("#population1").text(parseInt(data1["Population"][year]).toLocaleString(
            'en-us',
            { minimumFractionDigits: 0 }
        ))
        $("#spending2").text("$" + data2["Spending"][year]);
        $("#population2").text(parseInt(data2["Population"][year]).toLocaleString(
            'en-us',
            { minimumFractionDigits: 0 }
        ))
    }
}

function playYears(){
    year = 0;
    var interval = setInterval(function(){
        if(year === 9){
            clearInterval(interval);
        }
        setYear(year);
        year += 1;
    }, 1000);
}



function plotMortalityData() {

    $("#barchart1").empty();

    var barchart1 = d3.select("#barchart1").append("svg").attr("height", 100).attr("width", 400);

    var yr = year;
    if (year == 0){
        yr = 1;
    }
    if (year == 9){
        yr = 8;
    }
    var path = "data/" + (yr + 1998) + "mortality.csv";
    d3.csv(path, function(e) {
        var data = {};
        e.forEach(function(d) {
            if (d.Area != "" && d.Area != "United States" && d.Area != "D.C.")
            {
                var pop = parseFloat(statePopulations[d.Area]);
                data[d.Area] = (parseFloat(d["ALL"].split(",").join(""))/pop).toFixed(3);
            }
        });

        var sortedKeys = Object.keys(data).sort(function(a,b){return data[a] - data[b]});

        var rankedData = [];

        for(var i=0; i < sortedKeys.length; i++){
            rankedData.push([sortedKeys[i],i+1,data[sortedKeys[i]]])
        };

        rankedData.filter(function(d) { return !isNaN(d[0]) && !isNaN(d[1]) && !isNaN(d[2])});

        barchart1.selectAll("g")
            .data(rankedData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .style("width", "5px")
            .attr("x", function(d){return parseInt(d[1])*6-5;})
            .attr("y", function(d){return 100-parseFloat(d[2]*10000)})
            .attr("width", 2)
            .attr("height", function(d){
                console.log(d[2]);
                return parseFloat(d[2]*10000);
            })
            .attr("class", "stateMortalityBar")
            .attr("id", function(d) { return "mort" + d[0].replace(" ","_")})
            .attr("name", function(d) { return d[1]})
            .attr("value", function(d) { return d[2]});

        d3.selectAll(".stateMortalityBar").on('mouseover', handleStateMortalityMouseOver);
    });
}

plotMortalityData();

function handleStateMortalityMouseOver(d,i){
    $('.stateMortalityBar').css({ fill: "rgb(204,221,236)" });
    d3.select("#mort" + d[0].replace(" ","_")).style("fill", "rgb(77,219,255)");
    $("#mstate").html(d[0]);
    $("#mrank").html(d[1]);
    $("#mmort").html(d[2]);
    $("#state-name").html(d[0])
    $("#county-name").html("");
}
