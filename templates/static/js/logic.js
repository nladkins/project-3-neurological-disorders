// Store our API endpoint as queryUrl.
var queryUrl = "http://127.0.0.1:5000/disorders";

// Perform a GET request to the query URL
d3.json(queryUrl).then(console.log)

// url = 
// d3.json(url).then(makeChart);
// function makeChart(data) {
//   var country = data.map(function(d) {return d.year;});
//   var prevalence_male = data.map(function(d) {return d.prevalence_in_females;});
//   var prevalence_female = data.map(function(d) {return d.prevalence_in_males;});