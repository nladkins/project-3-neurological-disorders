url = "/json"

function filtering(country) {
  d3.json(url).then(function(data) {

    // function selectCountry(row) {
    //   return row.entity == country;
    // }

    function selectADHD(row) {
        return ((row.diagnosis == 'ADHD') && (row.entity == country));
    }
    let adhdData = data.filter(selectADHD)

    console.log(adhdData)

    var ctx = adhdChart.getContext('2d');
    var xValues = adhdData.map(function(data) {
        return data.year
    });
    var yValues = adhdData.map(function(data) {
        return data.prevalence_in_females
    });
    console.log(xValues)
    console.log(yValues)
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
      }
    });
  });
};

// Need a function to identify the event that changed
function optionChanged(country) {
  filtering(country);
}

function init() {
  // select the drop down portion of the html document
  var dropdown = d3.select("#selDataset");

// read the json data again pulling in the names for the drop down menu items
  d3.json(url).then((data)=> {
    console.log(data)
    
    var duplicateArray = []
  // get the name data for the drop down items
    data.forEach(function(row) {
      duplicateArray.push(row.entity)
    });

    var uniqueArray = duplicateArray.filter(function(elem, pos) {
      return duplicateArray.indexOf(elem) == pos;
    });

    uniqueArray.forEach(function(name) {
      dropdown.append("option").text(name).property("value");
    })

  // using the name info to call out the function for the demographic info
    // filtering(data.entity[0]);
      
  });

}
  // initialize
  init();


//    new Chart(document.getElementById("adhdChart"), {
//        type: 'bar',
//        data: {
//            datasets: [{
//              label: "Year",
//              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//              data: adhdData.year
//            }, {
//              label: "Prevalence in Females(%)",
//              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//              data: adhdData.prevalence_in_females}
////            }, {
////              label: "Prevalence in Males(%)",
////              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
////              data: adhdData.prevalence_in_males
////            }
//          ]
//        },
//        options: {
//          legend: { display: false },
//        }
//    })
//});

//d3.json(url).then(function(data) {
//
//    function selectAsperger(row) {
//        return row.diagnosis == 'Asperger';
//    }
//    let aspergerData = data.filter(selectAsperger)
//
//    console.log(aspergerData)
//});
//
//d3.json(url).then(function(data) {
//
//    function selectAutism(row) {
//        return row.diagnosis == 'Autism';
//    }
//    let autismData = data.filter(selectAutism)
//
//    console.log(autismData)
//});
//
//d3.json(url).then(function(data) {
//
//    function selectIDD(row) {
//        return row.diagnosis == 'IDD';
//    }
//    let iddData = data.filter(selectIDD)
//
//    console.log(iddData)
//});

//d3.json(url).then(makeChart);
//function makeChart(data) {
//      var country = data.map(function(d) {return d.country;});
//      var value = data.map(function(d) {return d.code})};

