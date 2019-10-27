const cocoaQuiz = new CocoaQuiz();

window.onload = function(){
  cocoaQuiz.init();
  //cocoaQuiz.showResult();

  // 前へボタン
  document.getElementById('back-button').addEventListener("click", function(){
    cocoaQuiz.decrementActiveNo();
    cocoaQuiz.updateQuiz();
  });

  // 次へボタン
  document.getElementById('next-button').addEventListener("click", function(){
    cocoaQuiz.incrementActiveNo();
  });

  // タイトルクリック
  document.getElementById('quiz-title').addEventListener('click', function(){
    cocoaQuiz.init();
  });

  // もう1回
  document.getElementById('quiz-retry').addEventListener('click', function(){
    cocoaQuiz.init();
  });
}
