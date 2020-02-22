function onClick(e) {
    e.preventDefault();
    
    let s = document.getElementById('selector');
    let difficulty = s.options[s.selectedIndex].value;
    // setup URL
    let url = "https://opentdb.com/api.php?amount=5&category=18";
    if (difficulty !== 'any'){
      url += "&difficulty=" + difficulty;
    }
    // call API
    fetch(url)
      .then(function(response) {
          
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        let results = "";
        results += "<div class = 'question-container'>"
        for (let i=0; i < json.results.length; i++) {
          results += '<div class="question">' + json.results[i].question + "</div>";
          let answers = []
          if (json.results[i].type === 'multiple'){
            answers = json.results[i].incorrect_answers.concat(json.results[i].correct_answer);
            shuffle(answers)
          }
          else {
            answers = ['True','False'];
          }
          
          results += '<div class = "answers">'
          for (let j = 0; j < answers.length; j++) {
            if (answers[j] === json.results[i].correct_answer){
              results += '<div class="correct-answer" onClick="style.backgroundColor=\'#009c27\';">' + answers[j] + '</div>'
            }
            else {
              results += '<div class="incorrect-answer" onClick="style.backgroundColor=\'#c40000\';">' + answers[j] + '</div>'
            }
          }
          results += '</div>'
            
        }
        results += "</div>";
               
        updateTrivia(results);
      });
  }
  
  function updateTrivia(info) {

    document.getElementById('trivia-questions').innerHTML = info;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  document.getElementById('trivia-generator').addEventListener('click', onClick);
  