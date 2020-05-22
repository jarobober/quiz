const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultButton = document.getElementById("result-btn");
const questionElement = document.getElementById("question")
const answerButtonElement = document.getElementById("answer-buttons")
const checked = document.getElementsByClassName("checked")
const resultElements = document.getElementById("result-container")
const resultName = document.getElementById("result-fullname")
const resultPhoto = document.getElementById("result-photo")
const resultCharInfo = document.getElementById("result-info")
const initialText = document.getElementById("initial-text")
let answersArray = []


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    collectAnswers(checked)
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    emptyAnswersArray()
    startButton.classList.add("hide");
    initialText.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const div = document.createElement("div")
        const button = document.createElement("input")
        const label = document.createElement("label")
        const text = document.createTextNode(answer.text)
        button.setAttribute("type", "radio")
        button.setAttribute("name", "radio")
        button.setAttribute("id", answer.text)
        button.dataset.person = answer.person
        label.setAttribute("for", answer.text)
        button.addEventListener("click", selectAnswer)
        answerButtonElement.appendChild(div)
        div.appendChild(button)
        div.appendChild(label)
        label.appendChild(text)
        })
    }

function resetState() {
    nextButton.classList.add("hide")
    resultElements.classList.add("hide");
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    selectedButton.classList.toggle("checked")
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        resultButton.classList.remove("hide")
        resultButton.addEventListener("click", checkResult)
    }
}

function collectAnswers(element) {
    answersArray.push(element[0].getAttribute("data-person"))
}

function checkResult() {
    collectAnswers(checked)
    questionContainerElement.classList.add("hide");
    resultInfo()
    resultButton.classList.add("hide");
    startButton.innerText = "Start again";
    startButton.classList.remove("hide");

}

function resultInfo() {
    resultElements.classList.remove("hide");
    resultName.innerHTML = eval(mostFreq(answersArray)).name;
    resultCharInfo.innerHTML = eval(mostFreq(answersArray)).info;
    resultPhoto.setAttribute("src", eval(mostFreq(answersArray)).photo);
}

function emptyAnswersArray() {
    answersArray = [];
}

function mostFreq() {
    var counts = {};
    var compare = 0;
    var mostFrequent;

    for(var i = 0, len = answersArray.length; i < len; i++)
    {
        var word = answersArray[i];

        if(counts[word] === undefined){
            counts[word] = 1;
        } else {
            counts[word] = counts[word] + 1;
        }

        if(counts[word] > compare){
        compare = counts[word];
        mostFrequent = answersArray[i];
        }
    }

    return mostFrequent;

}

    


const questions = [
    {
        question: "Your friends secretly hate about you that ...",
        answers: [
            { text: "You like to be in the center of attention.", person: "arturito"},
            { text: "You are looking for an issues everywhere", person: "professor"},
            { text: "You are risking all the time.", person: "tokio"},
            { text: "It's impossible to hate you.", person: "helsinki"}
        ]
    },
    {
        question: "What's your lifestyle?",
        answers: [
            { text: "My life is a party.", person: "tokio"},
            { text: "I used to work hard all my life.", person: "helsinki"},
            { text: "I know what i want from life, i don't accept mediocrity.", person: "berlin"},
            { text: "I'm living a modest life.", person: "professor"}
        ]
    },
    {
        question: "If you would have an enemy, how you would punish him?",
        answers: [
            { text: "I would shoot him in head", person: "tokio"},
            { text: "I would tell him in person what i think and then hurt him badly.", person: "berlin"},
            { text: "I would find a way that nobody will now what happenede.", person: "professor"},
            { text: "I would sue him.", person: "arturito"}
        ]
    },
]

const tokio = {
    name: "Silene TOKIO Oliveira",
    photo: "https://3.bp.blogspot.com/-ZeadMZYcwSo/XorLMm-CGsI/AAAAAAAAXHE/LGfD1otNbxsQia9nQk-TwAlz4Qli7R3lwCLcBGAsYHQ/w600-h600-p-k-no-nu/money-heist-vault-tokio-ursula-corbero-uhdpaper.com-4K-6.1115-wp.thumbnail.jpg",
    info: "Tokyo is reckless and impulsive, she usually acts before she thinks, which sometimes results in things she regrets. She is quick to lose her patience, as well as sometimes being shown to quickly draw conclusions. She can’t control her emotions.",
};

const professor = {
    name: "Sergio EL PROFESOR Marquina",
    photo: "https://fsa.zobj.net/crop.php?r=gEAPy38-B64Ak-Bs0hA5CRIzRgmGun8YzC6dw9X1SUPcfCR21WhZ-9Yj6YWmviDf6I8nuK-0YxqUIK7AD_ZWF4fESHWLQj9hHARuIlKgEwWyTGrLWP5sRxOA8efR9CugM3UxQ9n8aEi_EHT_",
    info: "Sergio is highly intelligent and meticulous. He appears to be very determined to pull off the greatest money heist in the world. He had been planning for it for several years.",
};

const helsinki = {
    name: "Yashin HELSINKI Dasáyev",
    photo: "https://vignette.wikia.nocookie.net/money-heist/images/f/fd/MH_Part_3_Helsinki_Mask_Still.jpg/revision/latest?cb=20200313171435",
    info: "Helsinki (Darko Perić) has a dark past that's little spoken about. Born in Serbia, he was a soldier in the Yugoslav Wars and has been described as a war criminal.",
};

const arturito = {
    name: "Arturo ARTURITO Román",
    photo: "https://vignette.wikia.nocookie.net/haus-des-geldes/images/9/92/Arturo_Roman.jpg/revision/latest?cb=20180427220213&path-prefix=de",
    info: "He was the general director of the Royal Mint of Spain before the heist took place. As one of the hostages, Arturo constantly got himself in trouble due to his attempts to defy the robbers and stage uprisings within the Royal Mint. After the heist, he became something of a celebrity, giving talks about his experience.",
};

const berlin = {
    name: "Andrés BERLIN de Fonollosa",
    photo: "https://i.pinimg.com/originals/71/7a/1f/717a1f42ae00bf54a2dbeb695d37602d.jpg",
    info: "Berlin is arrogant, narcissistic and seems to be a psychopath, showing multiple symptoms such as superficial charm and lack of empathy, proven as he coldly ordered the execution of a pregnant woman.",
};

const nairobi = {
    name: "Ágata NAIROBI Jímemez",
    photo: "https://d.newsweek.com/en/full/1578556/money-heist-season-4.jpg?w=1600&h=1600&q=88&f=89398f05b610061739be6d8349330c31",
    info: "Nairobi is enthusiastic, motivating and always active. She usually speaks loud and clear and does her job, leading the production of money very well because of these skills. Out of the other robbers, she seems to be most kind hearted and empathetic as seen in tendency to be easily affected by an emotional situation or other people's actions.",
};

const rio = {
    name: "Aníbal RIO Cortes",
    photo: "",
    info: "",
};

const lisbona = {
    name: "Raquel LISBOA Murillo",
    photo: "",
    info: "",
};