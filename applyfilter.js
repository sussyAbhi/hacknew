function applyFilterToAllElements(element, filter) {
  element.style.filter = filter;
  for (let i = 0; i < element.children.length; i++) {
    applyFilterToAllElements(element.children[i], filter);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "adjustColors") {
    let brightnessValue = '100%';  // Default value (no change)

    if (request.colorBlindnessType === 'deuteranopia') {
      brightnessValue = '120%';  // Increase brightness
    }
    // Add similar blocks for the other types of color blindness

    applyFilterToAllElements(document.body, `brightness(${brightnessValue})`);
  }
});


let currentFilter = '';

function applyFilterToAllElements(element, filter) {
  element.style.filter = filter;
  for (let i = 0; i < element.children.length; i++) {
    applyFilterToAllElements(element.children[i], filter);
  }
}

function applyFilterToPage(filter) {
  applyFilterToAllElements(document.body, filter);
  currentFilter = filter;

  // Start observing the document with the configured mutation observer.
  observer.observe(document, {childList: true, subtree: true});
}

// Create a mutation observer to monitor the DOM for changes
let observer = new MutationObserver(function(mutations, observer) {
  // Re-apply the filter when the DOM changes
  applyFilterToAllElements(document.body, currentFilter);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "adjustColors") {
    let brightnessValue = '100%';  // Default value (no change)

    if (request.colorBlindnessType === 'deuteranopia') {
      brightnessValue = '120%';  // Increase brightness
    }
    // Add similar blocks for the other types of color blindness

    applyFilterToPage(`brightness(${brightnessValue})`);
  }
});
