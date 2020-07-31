Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';

// Config for doughnut chart
const ctx = document.getElementById('doughnut-chart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['impressed', 'not impressed'],
    datasets: [{
        data: [64, 36],
        backgroundColor: [
          '#F58B11',
          '#F0F7FF'
        ]
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    elements: {
      center: {
        text: '64%',
        color: '#362F74', 
        fontStyle: 'Source Sans Pro',
        sidePadding: 20, 
        minFontSize: 32, 
        lineHeight: 40 
      }
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
        	var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
          return percentage + "%";
        }
      }
    }
  }
});




// Chart plugin config to make text stay in middle of pie chart (designers sha)
Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      var ctx = chart.chart.ctx;

      // Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var maxFontSize = centerConfig.maxFontSize || 75;
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      // Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      var minFontSize = centerConfig.minFontSize;
      var lineHeight = centerConfig.lineHeight || 25;
      var wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(' ');
      var line = '';
      var lines = [];

      // Break words up into multiple lines if necessary
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (var n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      //Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  }
});

// config for chart js bar chart
const barCtx = document.getElementById('bar-chart').getContext('2d');
barCtx.height = 180;

var myBarChart = new Chart(barCtx, {
  type: 'horizontalBar',
  data: {
    labels: ['United States', 'United Kingdom', 'Canada', 'Nigeria'],

    datasets: [{
      data: [50, 30, 18, 2],
      backgroundColor: [
        '#362F74',
        'rgba(54, 47, 116, 0.8)',
        'rgba(54, 47, 116, 0.6)',
        'rgba(54, 47, 116, 0.4)'
      ],
    }]
  },
  animation: {
    duration: 1,
    onComplete: function () {
      // render the value of the chart above the bar
      var ctx = this.chart.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
      ctx.fillStyle = this.chart.config.options.defaultFontColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      this.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
              ctx.fillText(dataset.data[i], model.x, model.y - 5);
          }
      });
    }
  },
  options: {
    drawBorder: false,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
        	var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
          return percentage + "%";
        }
      }
    },
    scales: {
      yAxes: [{
        maxBarThickness: 60,
        gridLines: {
          display: false,
          drawBorder: false
       },
       beginAtZero: true
      }],
      xAxes: [
        {
          ticks: {
            display: false,
            min: 0,
            max: 100,// Your absolute max value
            callback: function (value) {
              return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
            },
          },
          gridLines: {
            display: false,
            drawBorder: false
         }
        },
      ],
    }
  }
});



// Config for c3 line chart
var lineChart = c3.generate({
  bindto: '#line-chart',
  data: {
    columns: [
      ['Page Visits', 50000, 65000, 61000, 68500, 72000, 75000, 80000],
      ['Ads Clicks', 53000, 60000, 53000, 61000, 74000, 80000, 76000]
    ]
  },
  legend: {
    show: true,
    position: 'inset',
    inset: {
      anchor: 'top-left',
      x: 20,
      y: 10,
      step: 1
    }
  },
  padding: {
    right: 26,
    down: 400,
  },
  axis: {
    x: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
      }
  }
});