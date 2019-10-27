function CocoaQuiz() {
  this.title = 'ミニバスクイズ';
  this.quizList = [
     {
          question:'味方のシュートが入ったらなんと言いますか？'
        , choices: [
              {text:'ナイスシュー', ans: true}
            , {text:'グッドシュー', ans:false}
            , {text:'オッケー', ans:false}
        ]
      }
    , {
        question:'味方のシュートが外れたら、なんといってはげましますか？'
      , choices: [
            {text:'オッケー', ans: false}
          , {text:'バッドシュー', ans:false}
          , {text:'ドンマイ', ans:true}
      ]
    }
    , {
      question:'キャプテンの背番号は何番ですか？'
    , choices: [
          {text:'1番', ans: false}
        , {text:'4番', ans:true}
        , {text:'7番', ans:false}
      ]
    }
    , {
      question:'チームは、ベンチに座る場所がユニフォームの色で決まります。濃い色を来たチームは、右ベンチ・左ベンチどちらに座りますか？'
    , choices: [
          {text:'右ベンチ', ans: false}
        , {text:'左ベンチ', ans:true}
      ]
    }

  ];
  this.answerList = [];
  this.activeNo = 0;
}

CocoaQuiz.prototype.init = function() {
  document.getElementById('exam').style.display  = 'block';
  document.getElementById('result').style.display  = 'none';
  document.getElementById('quiz-error').style.visibility = 'hidden';
  this.activeNo = 0;
  this.answerList = [];
  this.updateQuiz();
}

CocoaQuiz.prototype.updateQuiz = function(){
  const activeNo = this.activeNo;
  const quizData =  this.quizList[activeNo];
  document.getElementById('quiz-title').innerText = this.title
  document.getElementById('q-no').innerText = 'Q' + (activeNo + 1);;
  document.getElementById('q-text').innerText = quizData.question;
  document.getElementById('quiz-error').style.visibility = 'hidden';
  // 選択肢
  let choicesHtml = '';
  for ( let i=0; i < quizData.choices.length; i++){
    choicesHtml += '<p><label><input type="radio" name="quiz" value="' + i + '">' 
                + quizData.choices[i].text + '</label></p>';
                console.log(quizData.choices[i].text);
  }
  document.getElementById('choices').innerHTML = choicesHtml;

  // プログレス
  let progressText = '';
  for ( let i=0; i < this.quizList.length; i++){
    if ( i <= activeNo) {
      progressText += '●';
    } else {
      progressText += '○';
    }
  }
  console.log(progressText);
  document.getElementById('progress').innerText = progressText;
  // 前へボタン
  const backButton = document.getElementById('back-button');
  if ( activeNo == 0) {
    backButton.style.borderColor = '#DCDCDC';
    backButton.style.backgroundColor = '#DCDCDC';
    backButton.style.pointerEvents = 'none';
  } else {
    backButton.style.borderColor = '#6495ED';
    backButton.style.backgroundColor = '#6495ED';
    backButton.style.pointerEvents = 'auto';
  }

  // 次へボタン
  const nextButton = document.getElementById('next-button');
  if ( activeNo + 1 == this.quizList.length ) {
    nextButton.innerText = '答え合わせ';
  } else {
    nextButton.innerText = '次へ';
    nextButton.style.borderColor = '#6495ED';
    nextButton.style.backgroundColor = '#6495ED';
    nextButton.style.pointerEvents = 'auto';
  }
}

CocoaQuiz.prototype.getCorrectAnswerList = function(){
  let correctAnswerList = [];
  for (let i=0; i < this.quizList.length; i++){
    let choices = this.quizList[i].choices;

    for (let j=0; j<choices.length; j++){
      if(choices[j].ans){
        correctAnswerList[i] = {
          value: j + 1,
          text: choices[j].text
        }
      }
    }
  }
  return correctAnswerList;
}

CocoaQuiz.prototype.showResult = function(){
  document.getElementById('exam').style.display  = 'none';
  document.getElementById('result').style.display  = 'block';

  // 答え合わせ結果
 //  this.answerList = [{value:0, check:false}, {value:1, check:true}, {value:2, check:true}, {value:2, check:true}];
  const answerList = this.answerList;
  let checkResultHtml = '';
  let result = '';
  let answerValue = 0;
  for (let i=0; i< answerList.length; i++) {
    if (answerList[i].check) {
      result = '○';
    } else {
      result = '×';
    }
    answerValue = Number(answerList[i].value) + 1;
    checkResultHtml +=  '<div class="row-left-align">' +
                        '<p>Q' + (i+1) + '. </p><p>' + answerValue + ')　</p>' +
                        '<p>' + result + '</p>' +
                        '</div>';
  }
  document.getElementById('your-answer').innerHTML = checkResultHtml;
  // 正解
  let correctAnswerList = this.getCorrectAnswerList();
  let collectAnswerListHtml = '';
  for (let i=0; i < this.quizList.length; i++){
    collectAnswerListHtml += '<div class="row-left-align quiz-answer-question-text">' +
                      '<p>Q' + (i + 1) + '. <br>' + this.quizList[i].question + '</p>' +
                      '</div>' +
                      '<div class="row-left-align quiz-answer">' +
                      '<p>答：</p>' +
                      '<p>' + correctAnswerList[i].value + '） ' + correctAnswerList[i].text + '</p>' +
                      '</div>';
  }
  document.getElementById('correct-answer-list').innerHTML = collectAnswerListHtml;
}

CocoaQuiz.prototype.getAnswerValue = function(activeNo){
  const radios = document.getElementsByName('quiz');
  const answerDefaultValue = 100;
  let answer = {value:answerDefaultValue, check:false};
  for (let i=0; i<radios.length; i++){
    if(radios[i].checked) {
      answer.value = radios[i].value;
    }
  }

  if ( answer.value == answerDefaultValue) {
    document.getElementById('quiz-error').style.visibility = 'visible';
    document.getElementById('quiz-error').innerText = 'ひとつ選んでください'
    return false;
  }
  answer.check = this.quizList[activeNo].choices[answer.value].ans ;
  this.answerList[activeNo] = answer;
  console.log(JSON.stringify(this.answerList));
  return true;
}

CocoaQuiz.prototype.incrementActiveNo = function(){
  let activeNo = this.activeNo;
  const quizNum = this.quizList.length;
  let answerCheck = this.getAnswerValue(activeNo);
  console.log('quizNum:' + quizNum + ' activeNo:' + activeNo);
  if (answerCheck){
    if (activeNo + 1 < quizNum) {
      this.activeNo += 1; 
      this.updateQuiz();
    } else {
      this.showResult();
    }  
  }
}

CocoaQuiz.prototype.decrementActiveNo = function(){
  let activeNo = this.activeNo;
  const quizNum = this.quizList.length;
  console.log('quizNum:' + quizNum + ' activeNo:' + activeNo);
  if (activeNo > 0) {
    this.activeNo -= 1; 
  }
}