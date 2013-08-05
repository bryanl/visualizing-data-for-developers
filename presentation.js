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

  $.deck('.slide');  


});