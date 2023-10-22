let sentences = [
    "実行行為とは、結果を惹起する現実的な危険性を有する行為をいう。",
    "故意責任の本質は反規範的人格態度に対する道義的非難である。",
    "未遂犯の処罰根拠は、結果発生の客観的危険を生じさせる点にある。",
];
let currentSentenceIndex = 0;
let startTime;
let isTimerStarted = false;

setSentence(sentences[currentSentenceIndex]);

document.getElementById('userInput').addEventListener('input', function() {
    if (!isTimerStarted && this.value.length > 0) {
        startTime = Date.now();
        isTimerStarted = true;
        updateTimer();
    }
});

document.getElementById('userInput').addEventListener('compositionend', function() {
    const inputValue = this.value;
    const sentenceChars = document.querySelectorAll('#sentence span');
    sentenceChars.forEach((charElem, index) => {
        if (inputValue[index] === charElem.textContent) {
            charElem.style.color = 'red';
        } else {
            charElem.style.color = 'black';
        }
    });

    if (inputValue === document.getElementById('sentence').textContent.replace(/<span>|<\/span>/g, '')) {
        isTimerStarted = false;
        let now = Date.now();
        let timeElapsed = (now - startTime) / 1000; // seconds
        let charsPerMinute = (inputValue.length / timeElapsed) * 60;
        document.getElementById('charPerMinute').textContent = Math.round(charsPerMinute) + '文字/分';
    }
});

function updateTimer() {
    let now = Date.now();
    let timeElapsed = (now - startTime) / 1000;
    document.getElementById('timer').textContent = timeElapsed.toFixed(1) + '秒';
    if (isTimerStarted) {
        setTimeout(updateTimer, 100);
    }
}

document.getElementById('changeSentence').addEventListener('click', function() {
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    setSentence(sentences[currentSentenceIndex]);
    document.getElementById('userInput').value = '';
    isTimerStarted = false;
    document.getElementById('timer').textContent = '0.0秒';
    document.getElementById('charPerMinute').textContent = '0文字/分';
});

function setSentence(sentence) {
    let charElems = '';
    for (let char of sentence) {
        charElems += `<span>${char}</span>`;
    }
    document.getElementById('sentence').innerHTML = charElems;

    // 追加部分: 指定された文章の文字数を表示する
    document.getElementById('sentenceLength').textContent = '文章の文字数: ' + sentence.length;
}
