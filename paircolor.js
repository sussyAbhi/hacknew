document.getElementById('quizForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Don't submit the form normally

  var quizResults = {
    deuteranopia: document.querySelector('input[name="deuteranopia"]:checked').value,
    // Add similar lines for the other types of color blindness
  };

  console.log(quizResults);
});
