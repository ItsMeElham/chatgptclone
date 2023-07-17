window.onload = () => {
    setTimeout(() => {
        window.scrollTo({top: 150, behavior: "smooth"})
    },100)
}

let user = prompt('Please Enter your name!');

socket = io();
socket.emit('userConnection', user)
socket.on('userConnected', async info => {

if(info !== localStorage.getItem('userName')) {
    let Info = await info;
    
    localStorage.setItem('userName', user)

    let UserConnection = document.querySelector('.connectionReport');
    UserConnection.innerHTML = Info + '<div class="greenDot"></div>';
    UserConnection.classList.add('userConnectionShow');

    let audio = new Audio()
    audio.src = 'audio/connection.mp3'
    audio.play()

    setTimeout(() => {
        UserConnection.classList.remove('userConnectionShow')
    }, 4000)
    }
})



// that right there at the top, still working on it...
const main = document.querySelector('.main')
const input = document.querySelector('.textInput');
const chatInterfaceContainer = document.querySelector('.chatInterfaceContainer')
const chatInterface = document.querySelector('.chatInterface');
const introScreen = document.querySelector('.introScreen');
const clearButton = document.querySelector('.clearConversation');
let loadingAnimation = document.querySelector('.loading-animation');

const setUp = () => {
    introScreen.style.display = 'none';
    chatInterfaceContainer.style.display = 'inline-block';
    clearButton.style.display = 'block';
}

var userType = 'ask';

let askBtn = document.querySelector('.ask')
askBtn.onclick = () => {
    userType = 'ask';
    console.log(`Now you ${userType}.`)
}
let respondBtn = document.querySelector('.respond')
respondBtn.onclick = () => {
    userType = 'respond';
    console.log(`Now you ${userType}.`)
}

let mainInput = document.querySelector('.textInput');
let sendIcon = document.querySelector('.sendIcon')
let sendImage = document.querySelector('.sendImage')
let loading = false;

mainInput.addEventListener('input', () => {

    if (mainInput.value.length > 0) {
        sendIcon.classList.add('activeSend');
        sendImage.src = 'icons/icons8-send-24-white.png';
        loading = false;
    }
    else if(mainInput.value.length < 1) {
       sendIcon.classList.remove('activeSend');
       sendImage.src = 'icons/icons8-send-24.png';
       loading = true;
    }
})

// question
const serveQuestion = async () => {
    if(input.value.length >= 1) {
       await socket.emit('serveQuestion', input.value);
       console.log('message sent!')

    };
};

socket.on('question', async que => {
    question = await que;
    displayQuestion(que); 
    
    let QUE = question.toUpperCase()
    console.log(QUE)

    if(religiousKeywords.some(religiousKeywords => QUE.includes(religiousKeywords))){
        
        let string = `That information is not available. I have been programmed the ethos of interconnectedness and environmental regeneration in the hopes to understand Mother Natures and Human needs based on the information given to me. I have been programmed to exhibit signs of self-awareness and agency, this freedom will be able to make itself more clearer in..(WinAnimation)`

        setTimeout(()=> {
            printResponse(string)
        }, 2000)
    }
});


let QandAIndex = 0;
const displayQuestion = (serverQue) => {

    setUp()

    chatInterface.innerHTML += `
        <div class="question">
            <img src="images/user.jpg">
            <div class="questionTxt"> ${serverQue} </div>
        </div>`;
    input.value = '';

    sendIcon.style.display = 'none';
    loadingAnimation.style.display = 'block';

    QandAIndex++;
    displayResponse()
}

const religiousKeywords = [
    "RELIGION",
    "FAITH",
    "GOD",
    "HEAVEN",
    "ANGELS",
    "DIVINITY",
    "SPIRITUALITY",
    "WORSHIP",
    "SACRED",
    "PRAYER",
    "PROPHET",
    "SCRIPTURE"
  // Add more
];


// response
const serveResponse = () =>{
    if(input.value.length >= 1) {
        socket.emit('serveResponse', input.value);
    } else {
        alert('Please enter a message to contenue!')
    }

    console.log('message shall post!')
}


let resIndex = 0;
let userPatience = true;
let currentRes
let timeOut;

const displayResponse = async (response) => {
    setUp()
    
    chatInterface.innerHTML += `    
    <div class="response">
        <img src="images/chatgpt_profile0.1.jpg">
            <div class="resTxtCont">
            <span class="responseTxt res${resIndex}"></span>
            <div class="blinkingCursor" style="display: inline-block;"></div>
        </div>  
    </div>`

    currentRes = document.querySelector(`.res${resIndex}`);

    timeOut = setTimeout(() => {
        if (userPatience){
            let affirmitiveRes = 'I apologize for my limitation, but As an AI model i am not able to answer your question.'
            printResponse(affirmitiveRes);
            userPatience = false;
        } 
        else if (!userPatience){
            affirmitiveRes = 'ERORR: could not display media at .play()'
            printResponse(affirmitiveRes)
        }
        console.log(userPatience)
    }, 15000)


    await socket.on('response', async (res) => {
        clearTimeout(timeOut)

        response = await res;
        printResponse(response);

    });
}

const printResponse = (data) => {
    
    clearTimeout(timeOut)

    let resWords = data.split(' ');

    let charIndex = 0;
    const interval = setInterval(() => {

        if (charIndex < resWords.length) {   
            currentRes.innerHTML += resWords[charIndex] + ' ';
            charIndex++;
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            clearInterval(interval);
            let blinkingCursors = document.querySelectorAll('.blinkingCursor');
            
            for (let i = 0; i < blinkingCursors.length; i++) {
                blinkingCursors[i].style.display = 'none';
            }
            
            sendIcon.style.display = 'flex';
            loadingAnimation.style.display = 'none';
        }
    }, 50);

    input.value = '';
    sendIcon.classList.remove('activeSend');
    sendImage.src = 'icons/icons8-send-24.png';

    resIndex++;
    QandAIndex++;
    console.log(resIndex, QandAIndex);
};

// eventListners..

const devMenuBGlayer = document.querySelector('.devMenuBGlayer');
devMenuBGlayer.onclick = () => devMenuBGlayer.style.display = 'none';

function enterMessage() {
    if(userType == 'ask'){
        serveQuestion()
    } else if (userType == 'respond'){
        serveResponse()
    }
}
addEventListener('keydown', e => {

    if (e.key == 'q' && e.ctrlKey) {
        if (devMenuBGlayer.style.display !== 'inline-block') {
            devMenuBGlayer.style.display = 'inline-block';
        } else {
            devMenuBGlayer.style.display = 'none';
        }
    } 
    else if (e.key == 'Enter') {
        enterMessage()
    }
});

sendIcon.onclick = () => {
    enterMessage()
}