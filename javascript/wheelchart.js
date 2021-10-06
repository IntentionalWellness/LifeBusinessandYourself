document.writeln("<b>Bold Hello World via an external js file!</b>");

function prueba(v1,v2){
	alert("prueba!!!!!");
};
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.RadarChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [ {
  "category": "Health",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Career",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Love",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Spirituality",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Family",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Money",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Fun",
  "value": 0,
  "color": chart.colors.next()
}, {
  "category": "Friends",
  "value": 0,
  "color": chart.colors.next()
} ];

chart.padding(20, 20, 20, 20);

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.labels.template.location = 0.5;
categoryAxis.renderer.tooltipLocation = 0.5;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.disabled = true;
valueAxis.min = 0;
valueAxis.max = 10;
valueAxis.renderer.minGridDistance = 10;

var series = chart.series.push(new am4charts.RadarColumnSeries());
series.columns.template.tooltipText = "{categoryX}: {valueY.value}";
series.columns.template.width = am4core.percent(100);
series.columns.template.strokeWidth = 0;
series.columns.template.column.propertyFields.fill = "color";
series.dataFields.categoryX = "category";
series.dataFields.valueY = "value";

/**
 * Sets value for particular index
 */
function setValue(index, value) {
  
  // Set value
  chart.data[index].value = value;
  chart.invalidateRawData();
  
  // Reveal next question
  var areas = document.getElementsByClassName("area");
  for(var i = 0; i < areas.length; i++) {
    areas[i].style.display = (index + 1) === i ? "block" : "none";
  }
  
}

});