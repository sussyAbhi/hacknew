chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "adjustColors") {
    let brightnessValue = '100%';  // Default value (no change)

    if (request.colorBlindnessType === 'deuteranopia') {
      brightnessValue = '120%';  // Increase brightness
    }
    // Add similar blocks for the other types of color blindness

    document.body.style.filter = `brightness(${brightnessValue})`;
  }
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Don't submit the form normally

  var quizResults = {
    deuteranopia: document.querySelector('input[name="deuteranopia"]:checked').value,
    // Add similar lines for the other types of color blindness
  };

  console.log(quizResults);

  // Find out the type of color blindness based on the quiz results
  var colorBlindnessType = null;
  for (var key in quizResults) {
    if (quizResults[key] === 'no') {
      colorBlindnessType = key;
      break;
    }
  }

  if (colorBlindnessType) {
    // Send a message to the content script to adjust the colors
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "adjustColors", colorBlindnessType: colorBlindnessType});
    });
  }
});
