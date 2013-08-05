$(function() {

  $(".temperatureView").bind('deck.becameCurrent', function(e, direction) {
    var body = ""
    $.each(demo.temperatureData, function(month, value) {
      row = "<td class='month'>" + month + "</td>"
      row += "<td class='high'>" + value["high"] + "</td>"
      row += "<td class='low'>" + value["low"] + "</td>"
      body += "<tr>" + row + "</tr>"
    })
    $(e.target).find("table tbody").html(body);
  });

  $(".canvas1").bind('deck.becameCurrent', function(e, direction) {
    var width = $(e.target).width();
    var height = $(e.target).height();
    var padding = 100;
    var lineLength = 0.60;

    var canvas = $(e.target).find('canvas')[0];
    var context = canvas.getContext("2d");

    context.canvas.width = width;
    context.canvas.height = height;

    context.clearRect ( 0, 0, width , height);
    context.lineWidth = 8;

    setTimeout(function(){
      var xLineLength = width * lineLength;
      var xLineStart = (width - xLineLength) / 2; 

      context.moveTo(xLineStart, padding);
      context.lineTo(xLineStart + xLineLength, padding);
      context.stroke();
    }, 3000);


    setTimeout(function(){
      var yLineLength = height * lineLength;
      var yLineStart = (height - yLineLength) / 2;

      context.moveTo(padding, yLineStart);
      context.lineTo(padding, yLineStart + yLineLength);
      context.stroke();
    }, 6000)


  });

 $(".canvas2").bind('deck.becameCurrent', function(e, direction) {
    var width = $(e.target).width();
    var height = $(e.target).height();
    var padding = 100;
    var lineLength = 0.60;

    var canvas = $(e.target).find('canvas')[0];
    var context = canvas.getContext("2d");

    context.canvas.width = width;
    context.canvas.height = height;

    context.clearRect ( 0, 0, width , height);
    context.lineWidth = 8;

    var xAxisLength = width - (padding * 2);
    context.moveTo(padding, height - padding);
    context.lineTo(width - padding, height - padding)
    context.stroke();

    var yAxisLength = height - (padding * 2);
    context.moveTo(padding, padding);
    context.lineTo(padding, height - padding);
    context.stroke();
  });

  $(".canvas3").bind('deck.becameCurrent', function(e, direction) {
    var width = $(e.target).width();
    var height = $(e.target).height();
    var padding = 100;
    var lineLength = 0.60;

    var canvas = $(e.target).find('canvas')[0];
    var context = canvas.getContext("2d");

    context.canvas.width = width;
    context.canvas.height = height;

    context.clearRect ( 0, 0, width , height);
    context.lineWidth = 8;

    drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
    drawLine(context, padding, padding, padding, height - padding, "#000", 8);
  });

  $(".canvas4").bind('deck.becameCurrent', function(e, direction) {
    var width = $(e.target).width();
    var height = $(e.target).height();
    var padding = 100;
    var lineLength = 0.60;

    var canvas = $(e.target).find('canvas')[0];
    var context = canvas.getContext("2d");

    context.canvas.width = width;
    context.canvas.height = height;

    context.clearRect ( 0, 0, width , height);
    
    drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
    drawLine(context, padding, padding, padding, height - padding, "#000", 8);

    var tempPadding = 8;
    var xAxisLength = width - (2 * padding);
    var yAxisLength = height - (2 * padding);

    var maxTemp = 100;
    var minTemp = 0;

    var counter = 0;
    $.each(demo.temperatureData, function(month, value) {
      context.lineWidth = 1;
      var monthWidth = xAxisLength / 12;
      var center = counter * monthWidth + (monthWidth / 2) + padding
      var radius = (monthWidth / 2) - (tempPadding * 2)
      var y1 = height - (yAxisLength * value.high / maxTemp) - padding;
      var y2 = height - (yAxisLength * value.low / maxTemp) - padding;

      context.beginPath();
      context.arc(center,y1, radius, 0, 2*Math.PI);
      context.stroke();

      context.beginPath();
      context.arc(center,y2, radius, 0, 2*Math.PI);
      context.stroke();

      counter++;
    });

  });

  $.deck('.slide');  

  function drawLine(context, fromX, fromY, toX, toY, style, width) {
    context.lineWidth = width;
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY)
    context.stroke();
  }
});