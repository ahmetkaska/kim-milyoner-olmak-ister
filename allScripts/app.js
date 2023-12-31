let timerInterval;
let seconds = 10;
var currentQuestionIndex = 0;
var userResponses = [];
var totalPrize = 0;
let halfButtonIsClicked = true;
var skor = document.getElementById('score');
var halfButton = document.getElementById('half');

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds--;
    if (seconds < 0) {
        clearInterval(timerInterval);
        alert('Zaman doldu!');
        handleTimeout(); 
    } else {
        updateDisplay();
    }
}

function updateDisplay() {
    const formattedTime = pad(seconds);
    document.getElementById('timer').innerText = '00:00:' + formattedTime;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

var questions = [
    {
        question: "Hangi Gezegen Güneş Sistemi'ndeki En Küçük Gezegendir?",
        options: ["Mars", "Dünya", "Merkür", "Venus"],
        correctAnswer: "Merkür",
        prize: 500
    },
    {
        question: "Hangi Ülkenin Başkenti Tokyo'dur?",
        options: ["Çin", "Japonya", "Güney Kore", "Hindistan"],
        correctAnswer: "Japonya",
        prize: 1000
    },
    {
        question: "Galatasaray Uefa Kupasını Hangi Yıl Kazanmıştır?",
        options: ["2000", "2001", "2002", "2003"],
        correctAnswer: "2000",
        prize: 2000
    },
    {
        question: "Hangi Gezegen Güneş Sistemi'ndeki En Büyük Gezegendir?",
        options: ["Mars", "Dünya", "Jüpiter", "Satürn"],
        correctAnswer: "Jüpiter",
        prize: 3000
    },
    {
        question: "Mona Lisa Tablosu Hangi Ünlü Ressamın Eseridir?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci",
        prize: 5000
    },
    {
        question: "Einstein'ın Ünlü Denklemi Nedir?",
        options: ["E=mc^2", "F=ma", "a^2+b^2=c^2", "H2O"],
        correctAnswer: "E=mc^2",
        prize: 7500
    },
    {
        question: "Hangi Renk Türkiye Bayrağında Bulunmaz?",
        options: ["Kırmızı", "Beyaz", "Sarı", "Mavi"],
        correctAnswer: "Mavi",
        prize: 15000
    },
    {
        question: "Hangi Gezegen 'Akşam Yıldızı' olarak Bilinir?",
        options: ["Mars", "Venüs", "Satürn", "Jüpiter"],
        correctAnswer: "Venüs",
        prize: 30000
    },
    {
        question: "Dünyanın En Büyük Okyanusu Hangisidir?",
        options: ["Atlantik Okyanusu", "Hint Okyanusu", "Büyük Okyanus", "Arktik Okyanusu"],
        correctAnswer: "Büyük Okyanus",
        prize: 60000
    },
    {
        question: "İnsan Vücudundaki En Büyük Organ Hangisidir?",
        options: ["Kalp", "Beyin", "Karaciğer", "Cilt"],
        correctAnswer: "Cilt",
        prize: 125000
    },
    {
        question: "Hangi Gezegen Güneş Sistemi'ndeki En Küçük Gezegendir?",
        options: ["Mars", "Dünya", "Merkür", "Venus"],
        correctAnswer: "Merkür",
        prize: 250000
    },
    {
        question: "Hangi Ülkenin Başkenti Tokyo'dur?",
        options: ["Çin", "Japonya", "Güney Kore", "Hindistan"],
        correctAnswer: "Japonya",
        prize: 1000000
    }
];

function loadQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    document.getElementById("qusetion").innerHTML = "<p>" + currentQuestion.question + "</p>";

    for (var i = 0; i < 4; i++) {
        var answerElement = document.getElementById("answer" + (i + 1));
        answerElement.textContent = currentQuestion.options[i];
    }
    startTimer();
    seconds = 10;
}

function handleTimeout() {
    recordUserResponse(null);
    alert("Zaman doldu! Oyun sona erdi.");
    window.location.href = '../allPages/Login.html';
}

function checkAnswer(answerIndex) {
    var currentQuestion = questions[currentQuestionIndex];
    var correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);

    document.getElementById("container" + (correctAnswerIndex + 1)).style.backgroundColor = "green";

    if (currentQuestion.options[answerIndex] !== currentQuestion.correctAnswer) {
        document.getElementById("container" + (answerIndex + 1)).style.backgroundColor = "red";
    }

    clearInterval(timerInterval);

    recordUserResponse(currentQuestion, currentQuestion.options[answerIndex]);

    setTimeout(function () {
        document.getElementById("container" + (correctAnswerIndex + 1)).style.backgroundColor = "";

        if (currentQuestion.options[answerIndex] === currentQuestion.correctAnswer) {
            totalPrize = currentQuestion.prize;
            skor.innerHTML = 'Skor : ' + totalPrize; 
            alert("Doğru cevap! Bir sonraki soruya geçiliyor.");

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                displayUserResponses();
                alert("Tebrikler! Oyunu tamamladınız. Toplam Kazanç : " + totalPrize);
            }
        } else {
            setTimeout(function () {
                displayUserResponses();
                alert("Yanlış cevap! Oyun sona erdi. Toplam Kazac : " + totalPrize);
                window.location.href = '../allPages/Fail.html';
            }, 1500);
        }
    }, 1500);
}

function recordUserResponse(question, selectedAnswer) {
    var userResponse = {
        question: question ? question.question : null,
        selectedAnswer: selectedAnswer,
        correctAnswer: question ? question.correctAnswer : null
    };
    userResponses.push(userResponse);
}

function displayUserResponses() {
    console.log("User Responses:", userResponses);
}

for (var i = 0; i < 4; i++) {
    var answerElement = document.getElementById("answer" + (i + 1));
    answerElement.addEventListener("click", function (event) {
        var answerIndex = parseInt(event.target.id.slice(-1)) - 1;
        checkAnswer(answerIndex);
    });
}


function handleHalfButtonClick() {
    halfButton.removeEventListener('click', handleHalfButtonClick);

    var currentQuestion = questions[currentQuestionIndex];
    var correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);

    var incorrectAnswerIndices = [];
    for (var i = 0; i < 4; i++) {
        if (i !== correctAnswerIndex) {
            incorrectAnswerIndices.push(i);
        }
    }
    
    var firstIncorrectIndex = incorrectAnswerIndices[0];
    var secondIncorrectIndex = incorrectAnswerIndices[1];
    document.getElementById("answer" + (firstIncorrectIndex + 1)).style.display = "none";
    document.getElementById("answer" + (secondIncorrectIndex + 1)).style.display = "none";
    
    halfButton.disabled = true;

}

if (halfButtonIsClicked) {
    halfButton.addEventListener('click', handleHalfButtonClick);
    halfButtonIsClicked = false;    
}

document.getElementById('view').addEventListener('click', function () {
    var currentQuestion = questions[currentQuestionIndex];
    var answerDiv = document.createElement('div');
    answerDiv.innerHTML = '<p>Cevap: ' + currentQuestion.correctAnswer + '</p>';
    answerDiv.setAttribute('id', 'answerDiv');
    
    
    answerDiv.style.border = '1px solid #ccc';
    answerDiv.style.padding = '10px';
    answerDiv.style.marginTop = '50px';
    answerDiv.style.position = 'absolute';
   

    
    document.getElementById('joker-container').appendChild(answerDiv);

   
    document.getElementById('view').disabled = true;

    
    setTimeout(function () {
        document.getElementById('joker-container').removeChild(answerDiv);
    }, 5000); 
});





loadQuestion();



