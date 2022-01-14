

var $element = document.getElementById("myChart"),
    $btn = document.getElementById("showYear");
    
//create a drawing context on the canvas
var ctx = $element.getContext("2d");

//declare variables
var myChart;
var data = {},
  processedData = {},
  orderClosingByMonth = {};
var labels = [];

//using jQuery ajax method get data from the external file. ( while using react you will do it differently)
var jsonData = $.ajax({
  url: 'data.json',
  dataType: 'json',
}).done(function(results) {
  //get values that only needed
  processedData = processData(results);
  data = {
    labels: processedData.labels,
    datasets: [{
      label: "MSFT Stock - 2018",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: processedData.data
    }]
  };

  myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      "scales": {
        "yAxes": [{
          "ticks": {
            "beginAtZero": true
          }
        }]
      }
    }
  });
});

var processData = function(jsonData) {

  var jsonVal = jsonData["Time Series (Daily)"]

  var dataSet = [];

  var date;
  var locale = "en-us";
  var months = Object.keys(jsonVal).map(function(item) {
    date = new Date(item);

    return date.toLocaleDateString(locale, {
      month: "long"
    });
  }).filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });

  function sortByMonth(arr) {
    var exactMonths = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    arr.sort(function(a, b) {
      return exactMonths.indexOf(a) - exactMonths.indexOf(b);
    });
    return arr;
  };

  labels = sortByMonth(months);

  for (var i = 0, total = labels.length; i < total; i++) {
    orderClosingByMonth[labels[i]] = {
      close: 0,
      allValue: [],
      allKey: []
    }
  }

  var thisMonth;
  Object.keys(jsonVal).filter(function(item) {
    date = new Date(item + " 00:00:00");
    thisMonth = date.toLocaleDateString(locale, {
      month: "long"
    });

    if (orderClosingByMonth[thisMonth]["close"] < jsonVal[item]["4. close"]) {
      orderClosingByMonth[thisMonth]["close"] = jsonVal[item]["4. close"];
    }

    orderClosingByMonth[thisMonth]["allKey"].push(item);
    orderClosingByMonth[thisMonth]["allValue"].push(parseFloat(jsonVal[item]["4. close"]));

    return 0;
  });

  for (var i in orderClosingByMonth) {
    dataSet.push(orderClosingByMonth[i].close);
  }
  ///debugger;
  
  return {
    labels: labels,
    data: dataSet
  }
};

$element.onclick = function(event) {
  var activePoints = myChart.getElementsAtEvent(event);

  if (activePoints.length > 0) {
    //get the internal index of slice on the chart
    var clickedElementindex = activePoints[0]["_index"];

    //get specific label by index 
    var label = myChart.data.labels[clickedElementindex];

    //get value by index      
    var value = myChart.data.datasets[0].data[clickedElementindex];

    
    /* update chart data */
    if(labels.indexOf(label) != -1) {
      myChart.data.labels = orderClosingByMonth[label].allKey.reverse();
      myChart.data.datasets[0].data = orderClosingByMonth[label].allValue.reverse();
      myChart.update();  
      $btn.classList.remove("hide");
    }
    
  }
};
$btn.onclick = function(event) {
  myChart.data.labels = processedData.labels;
  myChart.data.datasets[0].data = processedData.data;
  myChart.update();  
  $btn.classList.add("hide");
}