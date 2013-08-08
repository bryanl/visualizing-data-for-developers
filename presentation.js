$(function () {

    window.demo = {};

    demo.notSoGoodData = {
        "January": { "high": 41, "low": 24, max: 79, min: -7},
        "February": { "high": 45, "low": 27, max: 83, min: -7},
        "March": { "high": 55, "low": 34, max: 90, min: 5},
        "April": { "high": 65, "low": 43, max: 94, min: 15},
        "May": { "high": 74, "low": 52, max: 98, min: 32},
        "June": { "high": 83, "low": 62, max: 105, min: 40},
        "July": { "high": 87, "low": 67, max: 107, min: 50},
        "August": { "high": 85, "low": 65, max: 105, min: 45},
        "September": { "high": 78, "low": 58, max: 101, min: 35},
        "October": { "high": 67, "low": 45, max: 97, min: 25},
        "November": { "high": 56, "low": 37, max: 86, min: 12},
        "December": { "high": 45, "low": 28, max: 77, min: -3}
    };

    demo.temperatureData = [
        { month: "January", "high": 41, "low": 24, max: 79, min: -7},
        { month: "February", "high": 45, "low": 27, max: 83, min: -7},
        { month: "March", "high": 55, "low": 34, max: 90, min: 5},
        { month: "April", "high": 65, "low": 43, max: 94, min: 15},
        { month: "May", "high": 74, "low": 52, max: 98, min: 32},
        { month: "June", "high": 83, "low": 62, max: 105, min: 40},
        { month: "July", "high": 87, "low": 67, max: 107, min: 50},
        { month: "August", "high": 85, "low": 65, max: 105, min: 45},
        { month: "September", "high": 78, "low": 58, max: 101, min: 35},
        { month: "October", "high": 67, "low": 45, max: 97, min: 25},
        { month: "November", "high": 56, "low": 37, max: 86, min: 12},
        { month: "December", "high": 45, "low": 28, max: 77, min: -3}
    ];

    $(".temperatureView").bind('deck.becameCurrent', function (e) {
        var body = "";
        var plot = function (index, data) {
            var row = "<td class='month'>" + data.month + "</td>";
            row += "<td class='high'>" + data.high + "</td>";
            row += "<td class='low'>" + data.low + "</td>";
            body += "<tr>" + row + "</tr>"
        };

        withTemperatures(plot);

        $(e.target).find("table tbody").html(body);
    });

    $(".canvas1").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100,
            lineLength = 0.60;

        context.lineWidth = 8;

        setTimeout(function () {
            var xLineLength = width * lineLength;
            var xLineStart = (width - xLineLength) / 2;

            context.moveTo(xLineStart, padding);
            context.lineTo(xLineStart + xLineLength, padding);
            context.stroke();
        }, 3000);


        setTimeout(function () {
            var yLineLength = height * lineLength;
            var yLineStart = (height - yLineLength) / 2;

            context.moveTo(padding, yLineStart);
            context.lineTo(padding, yLineStart + yLineLength);
            context.stroke();
        }, 6000)


    });

    $(".canvas2").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        context.lineWidth = 8;

        context.moveTo(padding, height - padding);
        context.lineTo(width - padding, height - padding);
        context.stroke();

        context.moveTo(padding, padding);
        context.lineTo(padding, height - padding);
        context.stroke();
    });

    $(".canvas3").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        context.lineWidth = 8;

        drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
        drawLine(context, padding, padding, padding, height - padding, "#000", 8);
    });

    $(".canvas4").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
        drawLine(context, padding, padding, padding, height - padding, "#000", 8);

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;


        var counter = 0;
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            context.beginPath();
            context.arc(center, y1, radius, 0, 2 * Math.PI, false);
            context.closePath();
            context.stroke();

            context.beginPath();
            context.arc(center, y2, radius, 0, 2 * Math.PI, false);
            context.closePath();
            context.stroke();

            counter++;
        };

        withTemperatures(plot);
    });

    $(".canvas5").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
        drawLine(context, padding, padding, padding, height - padding, "#000", 8);

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;

        var highColor = "#ff7f00";
        var lowColor = "#148d9f";

        var counter = 0;
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            var drawArc = function (color, x, y, radius) {
                context.fillStyle = color;
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);
                context.closePath();
                context.fill();
            };

            drawArc(highColor, center, y1, radius);
            drawArc(lowColor, center, y2, radius);

            counter++;
        };

        withTemperatures(plot);
    });

    $(".canvas6").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        drawLine(context, padding, height - padding, width - padding, height - padding, "#000", 8);
        drawLine(context, padding, padding, padding, height - padding, "#000", 8);

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;

        var highColor = "#ff7f00";
        var lowColor = "#148d9f";
        var tempColor = "#fff";
        var tempFontSize = 16;

        var counter = 0;
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            var drawArc = function (label, x, y, radius, color, fontColor, fontSize) {
                context.fillStyle = color;
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);
                context.closePath();
                context.fill();

                context.font = fontSize + 'pt Calibri';
                context.textAlign = 'center';
                context.fillStyle = fontColor;
                context.fillText(label.toString(), x, y + (fontSize / 2));
            };

            drawArc(data.high, center, y1, radius, highColor, tempColor, tempFontSize);
            drawArc(data.low, center, y2, radius, lowColor, tempColor, tempFontSize);

            counter++;
        };

        withTemperatures(plot);
    });

    $(".canvas7").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;

        var highColor = "#ff7f00";
        var lowColor = "#148d9f";
        var tempColor = "#fff";
        var tempFontSize = 16;
        var monthLabelBg = "#9f9e83";
        var monthColor = "#fff";
        var monthFontSize = 12;
        var monthFontPadding = 1;

        var counter = 0;
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            drawTempArc(context, center, y1, radius, data.high, highColor, tempFontSize, tempColor);
            drawTempArc(context, center, y2, radius, data.low, lowColor, tempFontSize, tempColor);

            context.fillStyle = monthLabelBg;
            var monthLabelX1 = counter * monthWidth + padding + monthFontPadding;
            var monthLabelY1 = padding - (2 * monthFontSize);
            var monthLabelX2 = monthWidth - monthFontPadding;
            var monthLabelY2 = 2 * monthFontSize + monthFontPadding;
            context.fillRect(monthLabelX1, monthLabelY1, monthLabelX2, monthLabelY2);

            context.font = monthFontSize + 'pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = monthColor;
            context.fillText(data.month.substring(0, 3), counter * monthWidth + ( monthWidth / 2) + padding, monthLabelY1 + 1.5 * monthFontSize);

            counter++;
        };

        withTemperatures(plot);

        var tempLabelBg = "#ded8b5";
        var tempLabelWidth = 60;
        var tempLabelColor = "#3b5b78";
        var tempLabelFontSize = 12;
        var tempLabelX = padding - tempLabelWidth;

        context.fillStyle = tempLabelBg;

        context.fillRect(tempLabelX, padding, tempLabelWidth, yAxisLength);
        for (var i = 10; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / maxTemp) - padding;

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                context.font = tempLabelFontSize + "pt Calibri";
                context.fillStyle = tempLabelColor;
                context.fillText(i + "°F", labelX, labelY)
            }
        }
    });


    $(".canvas8").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;

        var highColor = "#ff7f00";
        var lowColor = "#148d9f";
        var tempColor = "#fff";
        var tempFontSize = 16;
        var monthLabelBg = "#9f9e83";
        var monthColor = "#fff";
        var monthFontSize = 12;
        var monthFontPadding = 1;
        var tempLabelBg = "#ded8b5";
        var tempLabelWidth = 60;
        var tempLabelColor = "#3b5b78";
        var tempLabelFontSize = 12;
        context.fillStyle = "#f0eeda";
        context.fillRect(padding, padding, xAxisLength, yAxisLength);

        var tempLabelX = padding - tempLabelWidth;
        context.fillStyle = tempLabelBg;
        context.fillRect(tempLabelX, padding, tempLabelWidth, yAxisLength);

        for (var i = 10; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / maxTemp) - padding;

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                context.font = tempLabelFontSize + "pt Calibri";
                context.fillStyle = tempLabelColor;
                context.fillText(i + "°F", labelX, labelY)
            }

            if (i % 10 == 0) {
                drawLine(context, padding, labelY, padding + xAxisLength, labelY, "#bababa", .75);
            }
        }

        var counter = 0;
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            drawTempArc(context, center, y1, radius, data.high, highColor, tempFontSize, tempColor);
            drawTempArc(context, center, y2, radius, data.low, lowColor, tempFontSize, tempColor);

            context.fillStyle = monthLabelBg;
            var monthLabelX1 = counter * monthWidth + padding + monthFontPadding;
            var monthLabelY1 = padding - (2 * monthFontSize);
            var monthLabelX2 = monthWidth - monthFontPadding;
            var monthLabelY2 = 2 * monthFontSize + monthFontPadding;
            context.fillRect(monthLabelX1, monthLabelY1, monthLabelX2, monthLabelY2);

            context.font = monthFontSize + 'pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = monthColor;
            context.fillText(data.month.substring(0, 3), counter * monthWidth + ( monthWidth / 2) + padding, monthLabelY1 + 1.5 * monthFontSize);

            counter++;
        };

        withTemperatures(plot);
    });

    $(".canvas9").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            width = context.canvas.width,
            height = context.canvas.height,
            padding = 100;

        var tempPadding = 8;
        var xAxisLength = width - (2 * padding);
        var yAxisLength = height - (2 * padding);

        var maxTemp = 100;

        var highColor = "#ff7f00";
        var lowColor = "#148d9f";


        var tempColor = "#fff";
        var tempFontSize = 16;
        var monthLabelBg = "#9f9e83";
        var monthColor = "#fff";
        var monthFontSize = 12;
        var monthFontPadding = 1;
        var tempLabelBg = "#ded8b5";
        var tempLabelWidth = 60;
        var tempLabelColor = "#3b5b78";
        var tempLabelFontSize = 12;
        context.fillStyle = "#f0eeda";
        context.fillRect(padding, padding, xAxisLength, yAxisLength);

        var tempLabelX = padding - tempLabelWidth;
        context.fillStyle = tempLabelBg;
        context.fillRect(tempLabelX, padding, tempLabelWidth, yAxisLength);

        for (var i = 10; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / maxTemp) - padding;

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                context.font = tempLabelFontSize + "pt Calibri";
                context.fillStyle = tempLabelColor;
                context.fillText(i + "°F", labelX, labelY)
            }

            if (i % 10 == 0) {
                drawLine(context, padding, labelY, padding + xAxisLength, labelY, "#bababa", .75);
            }
        }

        var counter = 0;
        var tempPoints = {high: [], low: []};
        var plot = function (index, data) {
            context.lineWidth = 1;
            var monthWidth = xAxisLength / 12;
            var center = counter * monthWidth + (monthWidth / 2) + padding;
            var radius = (monthWidth / 2) - (tempPadding * 2);
            var y1 = height - (yAxisLength * data.high / maxTemp) - padding;
            var y2 = height - (yAxisLength * data.low / maxTemp) - padding;

            tempPoints.high.push({x: center, y: y1, r: radius, width: monthWidth, value: data.high,
                color: highColor, fontSize: tempFontSize, fontColor: tempColor
            });
            tempPoints.low.push({x: center, y: y2, r: radius, width: monthWidth, value: data.low,
                color: lowColor, fontSize: tempFontSize, fontColor: tempColor
            });

            context.fillStyle = monthLabelBg;
            var monthLabelX1 = counter * monthWidth + padding + monthFontPadding;
            var monthLabelY1 = padding - (2 * monthFontSize);
            var monthLabelX2 = monthWidth - monthFontPadding;
            var monthLabelY2 = 2 * monthFontSize + monthFontPadding;
            context.fillRect(monthLabelX1, monthLabelY1, monthLabelX2, monthLabelY2);

            context.font = monthFontSize + 'pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = monthColor;
            context.fillText(data.month.substring(0, 3), counter * monthWidth + ( monthWidth / 2) + padding, monthLabelY1 + 1.5 * monthFontSize);

            counter++;
        };

        withTemperatures(plot);

        linkTemps(context, tempPoints.high, highColor);
        linkTemps(context, tempPoints.low, lowColor);

        drawTemps(context, tempPoints.high);
        drawTemps(context, tempPoints.low);
    });

    $(".paper1").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            padding = 100,
            width = context.canvas.width,
            height = context.canvas.height,
            xAxisLength = width - (2 * padding),
            yAxisLength = height - (2 * padding),
            monthWidth = xAxisLength / 12,

            highColor = "#ff7f00",
            lowColor = "#148d9f",

            maxTemp = 100,
            minTemp = 10,
            tempLabelWidth = 60,

            tempLabelX = padding - tempLabelWidth;

        paper.setup(context.canvas);

        var centeredText = function (content, x, y, fontSize, color) {
            new paper.PointText({
                point: paper.view.center,
                justification: 'center',
                fontSize: fontSize,
                fillColor: color,
                content: content,
                position: new paper.Point(x, y)
            });
        };

        var grid = new paper.Rectangle(new paper.Point(padding, padding),
            new paper.Point(xAxisLength + padding, yAxisLength + padding));
        var gridPath = new paper.Path.Rectangle(grid);
        gridPath.fillColor = "#f0eeda";

        var tempLabel = new paper.Rectangle(
            new paper.Point(tempLabelX, padding),
            new paper.Point(tempLabelX + tempLabelWidth, padding + yAxisLength)
        );
        var tempLabelPath = new paper.Path.Rectangle(tempLabel);
        tempLabelPath.fillColor = "#ded8b5";

        for (var i = minTemp; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / maxTemp) - padding;

            if (i % 10 == 0) {
                var path = new paper.Path();
                path.strokeColor = "#bababa";
                path.lineWidth = .75;
                path.add(new paper.Point(padding, labelY));
                path.add(new paper.Point(padding + xAxisLength, labelY))
            }

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                centeredText(i + "°F", labelX, labelY, 12, '#3b5b78');
            }
        }

        var displayMonthLabels = function (i, data) {
            var monthFontSize = 16,
                monthFontPadding = 1,
                x1 = padding + monthWidth * i ,
                y1 = padding - 2 * monthFontSize,
                x2 = x1 + monthWidth - monthFontPadding,
                y2 = y1 + 2 * monthFontSize + monthFontPadding,
                textX = i * monthWidth + monthWidth / 2 + padding,
                textY = y1 + 1.5 * monthFontSize;

            var monthLabel = new paper.Rectangle(
                new paper.Point(x1, y1),
                new paper.Point(x2, y2)
            );
            var monthLabelPath = new paper.Path.Rectangle(monthLabel);
            monthLabelPath.fillColor = "#9f9e83";
            centeredText(data.month.substring(0, 3), textX, textY, monthFontSize, '#fff');
        };

        var lowLinkPath = new paper.Path();
        var highLinkPath = new paper.Path();

        lowLinkPath.strokeColor = lowColor;
        lowLinkPath.lineWidth = .75;
        highLinkPath.strokeColor = highColor;
        highLinkPath.lineWidth = .75;

        var linkBubbles = function (index, data) {
            var lowPosition = tempBubblePosition(index, data.low);
            var highPosition = tempBubblePosition(index, data.high);
            lowLinkPath.add(lowPosition.point);
            highLinkPath.add(highPosition.point);
        };

        var tempBubblePosition = function (index, temperature) {
            var x = index * monthWidth + (monthWidth / 2) + padding;
            var y = height - yAxisLength * temperature / maxTemp - padding;
            return {point: new paper.Point(x, y)};
        };

        var displayTempBubbles = function (index, data) {
            var tempPadding = 8,
                radius = monthWidth / 2 - tempPadding * 2,
                fontSize = 16,
                highPosition = tempBubblePosition(index, data.high),
                lowPosition = tempBubblePosition(index, data.low);

            var drawBubble = function (position, label, color) {
                var circle = new paper.Path.Circle(position.point, radius);
                circle.fillColor = color;
                centeredText(label, position.point.x, position.point.y, fontSize, '#fff');
            };

            drawBubble(highPosition, data.high, highColor);
            drawBubble(lowPosition, data.low, lowColor);
        };

        withTemperatures(displayMonthLabels);
        withTemperatures(linkBubbles);
        withTemperatures(displayTempBubbles);

        paper.view.draw();
    });

    $(".paper2").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            padding = 100,
            width = context.canvas.width,
            height = context.canvas.height,
            xAxisLength = width - (2 * padding),
            yAxisLength = height - (2 * padding),
            monthWidth = xAxisLength / 12,

            highColor = "#ff7f00",
            lowColor = "#148d9f",

            maxTemp = 140,
            minTemp = -20,
            tempLabelWidth = 60,

            tempLabelX = padding - tempLabelWidth;

        paper.setup(context.canvas);

        var centeredText = function (content, x, y, fontSize, color) {
            return new paper.PointText({
                point: paper.view.center,
                justification: 'center',
                fontSize: fontSize,
                fillColor: color,
                content: content,
                position: new paper.Point(x, y)
            });
        };

        var grid = new paper.Rectangle(new paper.Point(padding, padding),
            new paper.Point(xAxisLength + padding, yAxisLength + padding));
        var gridPath = new paper.Path.Rectangle(grid);
        gridPath.fillColor = "#f0eeda";

        var tempLabel = new paper.Rectangle(
            new paper.Point(tempLabelX, padding),
            new paper.Point(tempLabelX + tempLabelWidth, padding + yAxisLength)
        );
        var tempLabelPath = new paper.Path.Rectangle(tempLabel);
        tempLabelPath.fillColor = "#ded8b5";

        for (var i = minTemp; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / (maxTemp - minTemp)) - padding - padding;

            if (i % 10 == 0) {
                var path = new paper.Path();
                path.strokeColor = "#bababa";
                path.lineWidth = .75;
                path.add(new paper.Point(padding, labelY));
                path.add(new paper.Point(padding + xAxisLength, labelY))
            }

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                centeredText(i + "°F", labelX, labelY, 12, '#3b5b78');
            }
        }

        var displayMonthLabels = function (index, data) {
            var monthFontSize = 16,
                monthFontPadding = 1,
                x1 = padding + monthWidth * index ,
                y1 = padding - 2 * monthFontSize,
                x2 = x1 + monthWidth - monthFontPadding,
                y2 = y1 + 2 * monthFontSize + monthFontPadding,
                textX = index * monthWidth + monthWidth / 2 + padding,
                textY = y1 + 1.5 * monthFontSize;

            var monthLabel = new paper.Rectangle(
                new paper.Point(x1, y1),
                new paper.Point(x2, y2)
            );
            var monthLabelPath = new paper.Path.Rectangle(monthLabel);
            monthLabelPath.fillColor = "#9f9e83";
            centeredText(data.month.substring(0, 3), textX, textY, monthFontSize, '#fff');
        };

        var lowLinkPath = new paper.Path();
        var highLinkPath = new paper.Path();

        lowLinkPath.strokeColor = lowColor;
        lowLinkPath.lineWidth = .75;
        highLinkPath.strokeColor = highColor;
        highLinkPath.lineWidth = .75;

        var linkBubbles = function (index, data) {
            var lowPosition = tempBubblePosition(index, data.low),
                highPosition = tempBubblePosition(index, data.high),
                tempPadding = 8,
                radius = monthWidth / 2 - tempPadding * 2;

            lowLinkPath.add(new paper.Point(lowPosition.point.x, lowPosition.point.y - radius));
            highLinkPath.add(new paper.Point(highPosition.point.x, highPosition.point.y - radius));
        };

        var tempBubblePosition = function (i, temperature) {
            var x = i * monthWidth + (monthWidth / 2) + padding;

            var tempDiff = maxTemp + -minTemp;
            var value = Math.abs(temperature + -minTemp);
            var rawY = value / tempDiff;

            var y = height - padding - rawY * yAxisLength + minTemp;
            return {point: new paper.Point(x, y)};
        };

        var displayTempBubbles = function (index, data) {
            var tempPadding = 8,
                radius = monthWidth / 2 - tempPadding * 2,
                fontSize = 16,
                highPosition = tempBubblePosition(index, data.high),
                lowPosition = tempBubblePosition(index, data.low);

            var drawBubble = function (position, type, label, color) {
                var group = new paper.Group();
                var circle = new paper.Path.Circle(new paper.Point(position.point.x, position.point.y - radius), radius);
                circle.fillColor = color;
                var text = centeredText(label, position.point.x, position.point.y - radius, fontSize, '#fff');

                var otherBubble;

                group.addChild(circle);
                group.addChild(text);

                group.onMouseEnter = function () {
                    var otherType;
                    var otherColor;
                    if (type == 'high') {
                        otherType = 'max';
                        otherColor = 'red';
                    } else if (type == 'low') {
                        otherType = 'min';
                        otherColor = 'darkblue';
                    }

                    var newPosition = tempBubblePosition(index, data[otherType]);
                    otherBubble = drawBubble(newPosition, otherType, data[otherType], otherColor);
                };

                group.onMouseLeave = function () {
                    if (otherBubble != undefined) {
                        otherBubble.remove();
                        otherBubble = null;
                    }
                };

                return group;
            };

            drawBubble(highPosition, 'high', data.high, highColor);
            drawBubble(lowPosition, 'low', data.low, lowColor);
        };

        withTemperatures(displayMonthLabels);
        withTemperatures(linkBubbles);
        withTemperatures(displayTempBubbles);

        var tool = new paper.Tool();
        tool.onMouseDown = function (event) {
            console.log(event.item);
        };


        paper.view.draw();
    });

    $(".paper3").bind('deck.becameCurrent', function (e) {
        var context = initCanvas(e.target),
            padding = 100,
            width = context.canvas.width,
            height = context.canvas.height,
            xAxisLength = width - (2 * padding),
            yAxisLength = height - (2 * padding),
            monthWidth = xAxisLength / 12,

            highColor = "#ff7f00",
            lowColor = "#148d9f",

            maxTemp = 140,
            minTemp = -20,
            tempLabelWidth = 60,

            tempLabelX = padding - tempLabelWidth;

        paper.setup(context.canvas);

        var centeredText = function (content, x, y, fontSize, color) {
            return new paper.PointText({
                point: paper.view.center,
                justification: 'center',
                fontSize: fontSize,
                fillColor: color,
                content: content,
                position: new paper.Point(x, y)
            });
        };

        var grid = new paper.Rectangle(new paper.Point(padding, padding),
            new paper.Point(xAxisLength + padding, yAxisLength + padding));
        var gridPath = new paper.Path.Rectangle(grid);
        gridPath.fillColor = "#f0eeda";

        var tempLabel = new paper.Rectangle(
            new paper.Point(tempLabelX, padding),
            new paper.Point(tempLabelX + tempLabelWidth, padding + yAxisLength)
        );
        var tempLabelPath = new paper.Path.Rectangle(tempLabel);
        tempLabelPath.fillColor = "#ded8b5";

        for (var i = minTemp; i < maxTemp; i++) {
            var labelY = height - (yAxisLength * i / (maxTemp - minTemp)) - padding - padding;

            if (i % 10 == 0) {
                var path = new paper.Path();
                path.strokeColor = "#bababa";
                path.lineWidth = .75;
                path.add(new paper.Point(padding, labelY));
                path.add(new paper.Point(padding + xAxisLength, labelY))
            }

            if (i % 20 == 0) {
                var labelX = tempLabelX + tempLabelWidth / 2;
                centeredText(i + "°F", labelX, labelY, 12, '#3b5b78');
            }
        }

        var displayMonthLabels = function (index, data) {
            var monthFontSize = 16,
                monthFontPadding = 1,
                x1 = padding + monthWidth * index ,
                y1 = padding - 2 * monthFontSize,
                x2 = x1 + monthWidth - monthFontPadding,
                y2 = y1 + 2 * monthFontSize + monthFontPadding,
                textX = index * monthWidth + monthWidth / 2 + padding,
                textY = y1 + 1.5 * monthFontSize;

            var monthLabel = new paper.Rectangle(
                new paper.Point(x1, y1),
                new paper.Point(x2, y2)
            );
            var monthLabelPath = new paper.Path.Rectangle(monthLabel);
            monthLabelPath.fillColor = "#9f9e83";
            centeredText(data.month.substring(0, 3), textX, textY, monthFontSize, '#fff');
        };

        var lowLinkPath = new paper.Path();
        var highLinkPath = new paper.Path();

        lowLinkPath.strokeColor = lowColor;
        lowLinkPath.lineWidth = .75;
        highLinkPath.strokeColor = highColor;
        highLinkPath.lineWidth = .75;

        var linkBubbles = function (index, data) {
            var lowPosition = tempBubblePosition(index, data.low),
                highPosition = tempBubblePosition(index, data.high),
                tempPadding = 8,
                radius = monthWidth / 2 - tempPadding * 2;

            lowLinkPath.add(new paper.Point(lowPosition.point.x, lowPosition.point.y - radius));
            highLinkPath.add(new paper.Point(highPosition.point.x, highPosition.point.y - radius));
        };

        var tempBubblePosition = function (i, temperature) {
            var x = i * monthWidth + (monthWidth / 2) + padding;

            var tempDiff = maxTemp + -minTemp;
            var value = Math.abs(temperature + -minTemp);
            var rawY = value / tempDiff;

            var y = height - padding - rawY * yAxisLength + minTemp;
            return {point: new paper.Point(x, y)};
        };

        var displayTempBubbles = function (index, data) {
            var tempPadding = 8,
                radius = monthWidth / 2 - tempPadding * 2,
                fontSize = 16,
                highPosition = tempBubblePosition(index, data.high),
                lowPosition = tempBubblePosition(index, data.low);

            var drawBubble = function (position, type, label, color) {
                var group = new paper.Group();
                var circle = new paper.Path.Circle(new paper.Point(position.point.x, position.point.y - radius), radius);
                circle.fillColor = color;
                var text = centeredText(label, position.point.x, position.point.y - radius, fontSize, '#fff');

                var otherBubble;

                group.addChild(circle);
                group.addChild(text);

                group.onMouseEnter = function () {
                    var otherType;
                    var otherColor;
                    if (type == 'high') {
                        otherType = 'max';
                        otherColor = 'red';
                    } else if (type == 'low') {
                        otherType = 'min';
                        otherColor = 'darkblue';
                    }

                    if (otherType != undefined && otherBubble == undefined) {
                        var destination = tempBubblePosition(index, data[otherType]);

                        otherBubble = drawBubble(position, otherType, data[otherType], otherColor);
                        otherBubble.onFrame = function () {

                            if (otherBubble != undefined) {
                                var y = destination.point.y - otherBubble.position.y;
                                if (y < 0) {
                                    otherBubble.position.y -= 1;
                                } else if (y > 0) {
                                    otherBubble.position.y += 1;
                                } else {
                                    otherBubble.onFrame = undefined;
                                }
                            }
                        };

                        setTimeout(function () {
                            otherBubble.remove();
                            otherBubble = null;
                        }, 5000);


                    }
                };

                return group;
            };

            drawBubble(highPosition, 'high', data.high, highColor);
            drawBubble(lowPosition, 'low', data.low, lowColor);
        };

        withTemperatures(displayMonthLabels);
        withTemperatures(linkBubbles);
        withTemperatures(displayTempBubbles);

        var tool = new paper.Tool();
        tool.onMouseDown = function (event) {
            console.log(event.item);
        };


        paper.view.draw();
    });


    $(".temperatureViewD31").bind('deck.becameCurrent', function (e) {
        var table = $(e.target).find('table');

        d3.select(table[0]).select('tbody').remove();

        var tbody = d3.select(table[0])
            .append("tbody");

        var rows = tbody.selectAll("tr")
            .data(demo.temperatureData)
            .enter()
            .append("tr");

        rows.selectAll("td")
            .data(function (row) {
                return ['month', 'high', 'low'].map(function (column) {
                    return {column: column, value: row[column] }
                })
            })
            .enter()
            .append("td")
            .text(function (d) {
                return d.value
            });
    });


    $(".temperatureViewD32").bind('deck.becameCurrent', function (e) {
        var table = $(e.target).find('table');

        d3.select(table[0]).select('tbody').remove();

        var tbody = d3.select(table[0])
            .append("tbody");

        var rows = tbody.selectAll("tr")
            .data(demo.temperatureData)
            .enter()
            .append("tr")
            .attr("class", function (d) {
                if (d.high > 80) {
                    return 'temp-hot'
                }
                else if (d.low < 40) {
                    return 'temp-cold'
                } else {
                    return '';
                }
            });

        rows.selectAll("td")
            .data(function (row) {
                return ['month', 'high', 'low'].map(function (column) {
                    return {column: column, value: row[column] }
                })
            })
            .enter()
            .append("td")
            .text(function (d) {
                return d.value
            });
    });

    $(".d31").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width();
        var height = $(e.target).height();

        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type]};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        d3.select(e.target)
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return d.monthIndex
            })
            .attr("cy", function (d) {
                return d.temperature
            })
            .attr("r", 30)
    });

    $(".d32").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width(),
            height = $(e.target).height(),
            padding = 100;

        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type]};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        var xScale = d3.scale.linear()
            .domain([0, 11])
            .range([padding, width - padding]);

        var yScale = d3.scale.linear()
            .domain([100, 0])
            .range([padding, height - padding]);


        d3.select(e.target)
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return xScale(d.monthIndex)
            })
            .attr("cy", function (d) {
                return yScale(d.temperature)
            })
            .attr("r", 20)
    });

    $(".d33").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width(),
            height = $(e.target).height(),
            padding = 100,
            colors = {high: "#ff7f00", low: "#148d9f"};

        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type], type: type};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        var xScale = d3.scale.linear()
            .domain([0, 11])
            .range([padding, width - padding]);

        var yScale = d3.scale.linear()
            .domain([100, 0])
            .range([padding, height - padding]);


        d3.select(e.target)
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return xScale(d.monthIndex)
            })
            .attr("cy", function (d) {
                return yScale(d.temperature)
            })
            .attr("r", 20)
            .attr("fill", function (d) {
                return colors[d.type]
            })
    });

    $(".d34").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width(),
            height = $(e.target).height(),
            padding = 100,
            colors = {high: "#ff7f00", low: "#148d9f"};

        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type], type: type};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        var maxMonth = d3.max(bubbleData, function (d) {
            return d.monthIndex
        });
        var minMonth = d3.min(bubbleData, function (d) {
            return d.monthIndex
        });
        var xScale = d3.scale.linear()
            .domain([minMonth, maxMonth])
            .range([padding, width - padding]);

        var maxTemperature = d3.max(bubbleData, function (d) {
            return d.temperature
        });
        var minTemperature = d3.min(bubbleData, function (d) {
            return d.temperature
        });
        var yScale = d3.scale.linear()
            .domain([maxTemperature + 10, minTemperature - 10])
            .range([padding, height - padding]);


        d3.select(e.target)
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return xScale(d.monthIndex)
            })
            .attr("cy", function (d) {
                return yScale(d.temperature)
            })
            .attr("r", 20)
            .attr("fill", function (d) {
                return colors[d.type]
            })
    });

    $(".d35").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width(),
            height = $(e.target).height(),
            padding = 100,
            colors = {high: "#ff7f00", low: "#148d9f"},
            radius = 20;


        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type], type: type};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        var maxMonth = d3.max(bubbleData, function (d) {
            return d.monthIndex
        });
        var minMonth = d3.min(bubbleData, function (d) {
            return d.monthIndex
        });
        var xScale = d3.scale.linear()
            .domain([minMonth, maxMonth])
            .range([padding, width - padding]);

        var maxTemperature = d3.max(bubbleData, function (d) {
            return d.temperature
        });
        var minTemperature = d3.min(bubbleData, function (d) {
            return d.temperature
        });
        var yScale = d3.scale.linear()
            .domain([maxTemperature + 10, minTemperature - 10])
            .range([padding, height - padding]);

        var svg = d3.select(e.target)
            .append("svg")
            .attr('width', width)
            .attr('height', height);


        var circles = svg.selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle');


        circles
            .attr("cx", function (d) {
                return xScale(d.monthIndex)
            })
            .attr("cy", function (d) {
                return yScale(d.temperature)
            })
            .attr("r", 20)
            .attr("fill", function (d) {
                return colors[d.type]
            });

        var text = svg.selectAll("text")
            .data(bubbleData)
            .enter()
            .append('text');

        text
            .attr("x", function (d) {
                return xScale(d.monthIndex) - radius * .5
            })
            .attr("y", function (d) {
                return yScale(d.temperature) + radius * 0.25
            })
            .text(function (d) {
                return d.temperature
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "white");
    });

    $(".d36").bind('deck.becameCurrent', function (e) {
        var width = $(e.target).width(),
            height = $(e.target).height(),
            padding = 100,
            colors = {high: "#ff7f00", low: "#148d9f"},
            radius = 20,
            tempLabelWidth = 60,
            monthLabelHeight = 32;


        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var tmpBubbleData = demo.temperatureData.map(function (d) {
            var toObject = function (d, type) {
                return {monthIndex: _.indexOf(months, d.month), temperature: d[type], type: type};
            };

            return ["high", "low"].map(function (t) {
                return toObject(d, t);
            })
        });

        var bubbleData = _.flatten(tmpBubbleData);

        var maxTemperature = d3.max(bubbleData, function (d) {
            return d.temperature + 20
        });
        var minTemperature = d3.min(bubbleData, function (d) {
            return d.temperature - 20
        });

        var maxMonth = d3.max(bubbleData, function (d) {
            return d.monthIndex
        });
        var minMonth = d3.min(bubbleData, function (d) {
            return d.monthIndex
        });

        var gridXMin = minMonth,
            gridXMax = maxMonth + 2;

        var gridXScale = d3.scale.linear()
            .domain([gridXMin, gridXMax])
            .range([tempLabelWidth, width - 2 * padding]);

        var yScale = d3.scale.linear()
            .domain([maxTemperature + 10, minTemperature - 10])
            .range([0, height - 2 * padding]);

        var svg = d3.select(e.target)
            .append("svg")
            .attr('width', width - 2 * padding)
            .attr('height', height - 2 * padding)
            .style('margin-top', padding)
            .style('margin-left', padding);

        svg.append("rect")
            .attr("x", tempLabelWidth)
            .attr("y", 0)
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("fill", "#f0eeda");

        svg.append("rect")
            .attr("x", 0)
            .attr("y", monthLabelHeight)
            .attr("width", tempLabelWidth)
            .attr("height", height - monthLabelHeight - 2 * padding)
            .attr("fill", "#ded8b5");

        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width - 2 * padding)
            .attr("height", monthLabelHeight)
            .attr("fill", "#9f9e83");

        var monthText = svg.selectAll("text.monthLabel")
            .data(months)
            .enter()
            .append('text');

        monthText
            .attr("x", function (d,i) {
                return gridXScale(i + 1) - 10
            })
            .attr("y", monthLabelHeight / 2)
            .text(function(d) {
                return d.substring(0,3)
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", radius * .6 + "px")
            .attr('fill', 'white')
            .attr('class', 'monthLabel');

        var tempLabelMin = Math.floor(minTemperature / 10) * 10;
        var tempLabelMax = Math.ceil(maxTemperature / 10) * 10;
        var tempLabelRange = d3.range(tempLabelMin, tempLabelMax, 20);
        var tempLineRange = d3.range(tempLabelMin, tempLabelMax, 10);

        var tempText = svg.selectAll("text.tempLabel")
            .data(tempLabelRange)
            .enter()
            .append('text');

        tempText
            .attr("x", 20)
            .attr("y", function (d) {
                return yScale(d);
            })
            .text(function (d) {
                return d + "°F"
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", radius * .6 + "px")
            .attr('fill', '#3b5b78')
            .attr('class', 'tempLabel');


        var gridLines = svg.selectAll("line.grid")
            .data(tempLineRange)
            .enter()
            .append('line');

        gridLines
            .attr('x1', function () {
                return gridXScale(gridXMin)
            })
            .attr('y1', function (d) {
                return yScale(d)
            })
            .attr('x2', function () {
                return gridXScale(gridXMax)
            })
            .attr('y2', function (d) {
                return yScale(d)
            })
            .attr('stroke-width', 0.75)
            .attr('stroke', '#bababa');

        var circles = svg.selectAll("circle")
            .data(bubbleData)
            .enter()
            .append('circle');

        circles
            .attr("cx", function (d) {
                return gridXScale(d.monthIndex + 1)
            })
            .attr("cy", function (d) {
                return yScale(d.temperature)
            })
            .attr("r", 20)
            .attr("fill", function (d) {
                return colors[d.type]
            });

        var text = svg.selectAll("text.grid")
            .data(bubbleData)
            .enter()
            .append('text');

        text
            .attr("x", function (d) {
                return gridXScale(d.monthIndex + 1) - radius * .5
            })
            .attr("y", function (d) {
                return yScale(d.temperature) + radius * 0.25
            })
            .text(function (d) {
                return d.temperature
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", radius * .8 + "px")
            .attr("fill", "white")
            .attr('class', 'grid');
    });


    $.deck('.slide');

    function drawLine(context, fromX, fromY, toX, toY, style, width) {
        context.beginPath();
        context.strokeStyle = style;
        context.lineWidth = width;
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    }

    function drawTempArc(context, x, y, r, label, fillColor, fontSize, fontColor) {
        context.fillStyle = fillColor;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();

        context.font = fontSize + 'pt Calibri';
        context.textAlign = 'center';
        context.fillStyle = fontColor;
        context.fillText(label, x, y + (fontSize / 2));
    }

    function linkTemps(context, points, style) {
        context.beginPath();
        context.strokeStyle = style;
        for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
            var coordinates = points[pointIndex];

            if (pointIndex == 0) {
                context.moveTo(coordinates.x, coordinates.y)
            } else {
                context.lineTo(coordinates.x, coordinates.y)
            }
        }
        context.stroke();
    }

    function drawTemps(context, points) {
        for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
            var point = points[pointIndex];

            drawTempArc(context, point.x, point.y, point.r, point.value, point.color, point.fontSize, point.fontColor);
        }
    }

    function initCanvas(element) {
        var width = $(element).width();
        var height = $(element).height();

        var canvas = $(element).find('canvas')[0];
        var context = canvas.getContext("2d");

        context.canvas.width = width;
        context.canvas.height = height;

        context.clearRect(0, 0, width, height);

        return context;
    }


    function withTemperatures(doThis) {
        var previousData;
        $.each(demo.temperatureData, function (index, data) {
            doThis(index, data, previousData);
            previousData = data;
        });
    }

})
;