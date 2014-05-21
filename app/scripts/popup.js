'use strict';

$(document).ready(function() {
  var title;
  var url;

  $("#emptyPageWarning").hide();

  if(!localStorage.settings) {    
    window.location.href = "settings.html";
  }

  chrome.tabs.getSelected(null,function(tab) {
    title = tab.title;
    url   = tab.url;
  });

  function settings() {
    return JSON.parse(localStorage.settings);
  };

  function requestPayload() {
    var payload = {
      "channel": settings().channel, 
      "username": "Post2Slack", 
      "text": "Interesting Link: " + title + " | <" + url + ">", 
      "icon_emoji": ":rocket:"
    };
    return "payload=" + JSON.stringify(payload);
  };

  $("#sendBtn").click(function() {  
    if (url != "chrome://newtab/") {
      $.post(settings().url, requestPayload());
    } else {
      $("#emptyPageWarning").fadeOut();
    }
  });
});



