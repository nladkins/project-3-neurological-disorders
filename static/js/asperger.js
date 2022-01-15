url = "/json"
 

function filtering(country) {
  d3.json(url).then(function(data) {

    // function selectCountry(row) {
    //   return row.entity == country;
    // }

    function selectAsperger(row) {
        return ((row.diagnosis == 'Asperger') && (row.entity == country));
    }
    let aspergerData = data.filter(selectAsperger)

    console.log(aspergerData)

    var ctx = aspergersChart.getContext('2d');
    
    var xValues = aspergerData.map(function(data) {
        return data.year
    });
    var yValues = aspergerData.map(function(data) {
        return data.prevalence_in_females
    });
    console.log(xValues)
    console.log(yValues)
    
    if (window.myAspergerChart) window.myAspergerChart.destroy();
    
    // Example from the docs
    window.myAspergerChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          data: yValues
        }]
      }, 
      options: {
        legend: {display: false},
      },
      
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