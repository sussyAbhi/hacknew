var colorPairs = [
    {colors: ['red', 'yellow'], type: 'red-yellow'},
    {colors: ['blue', 'green'], type: 'blue-green'},
    {colors: ['purple', 'red'], type: 'purple-red'},
    {colors: ['yellow', 'pink'], type: 'yellow-pink'},
    {colors: ['red', 'green'], type: 'red-green'}
];
var currentIndex = 0;
var results = {};

function submitAnswer(isSame) {
    var colorPair = colorPairs[currentIndex];
    if (isSame && colorPair.colors[0] !== colorPair.colors[1]) {
        results[colorPair.type] = (results[colorPair.type] || 0) + 1;
    }
    currentIndex++;
    if (currentIndex < colorPairs.length) {
        loadColorPair();
    } else {
        displayResults();
    }
}

function loadColorPair() {
    var colorPair = colorPairs[currentIndex];
    var colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes[0].style.background = colorPair.colors[0];
    colorBoxes[1].style.background = colorPair.colors[1];
}

function displayResults() {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Results</h2>';
    for (var type in results) {
        if (results[type] > 2) {
            resultDiv.innerHTML += '<p>Potential ' + type + ' color blindness: High</p>';
        } else if (results[type] > 0) {
            resultDiv.innerHTML += '<p>Potential ' + type + ' color blindness: Low</p>';
        }
    }
}

loadColorPair();
