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
    var zValues = adhdData.map(function(data) {
        return data.prevalence_in_males
    });
    console.log(xValues)
    console.log(yValues)
    
    if (window.myADHDChart) window.myADHDChart.destroy();
    
    // Example from the docs
    window.myADHDChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          label: 'Female Prevalence',
          data: yValues, 
          backgroundColor: ["red"]
          },
          {
            label: 'Male Prevalence',
            data: zValues, 
            backgroundColor: ["blue"]          
          }
      ]}, 
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