'use strict';

$(document).ready(function() {
  
  console.log("settings");
  $("#infoFill").hide();
  var settings = JSON.parse(localStorage.settings);

  if (settings) {
    $("input[name='webhook_url']").val(settings.url);
    $("input[name='channel']").val(settings.channel);
  } else {
    
  }

  $("form").submit(function(event) {    
    var serializedSettings = $(this).serializeArray();
    var settings = { "url": serializedSettings[0].value, "channel": serializedSettings[1].value}
    localStorage.settings = JSON.stringify(settings);
    console.log("Settings saved: " + JSON.stringify(settings));
    window.location = "popup.html"
    return false;
  });

  $("#testSettingsBtn").click(function() {
    var serializedSettings = $(this).serializeArray();
    if (serializedSettings.length == 2) {
      var url = serializedSettings[0].value;
      var channel = serializedSettings[1].value;
      $.post(utl, {
        "channel": channel,
        "username": "Post2Slack", 
        "text": "Hello from Post2Slack", 
        "icon_emoji": ":ghost:"
      });
    } else {
      $("#infoFill").fadeIn("slow");
    }
  });

  $("input[name='channel']").focusout(function() {
    if ((/^#/).test( $(this).val() )) {
      $(this).closest(".form-group").addClass("has-success");
    } else {
      $(this).closest(".form-group").addClass("has-error");
    }
  });
});

