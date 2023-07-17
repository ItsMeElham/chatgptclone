console.log('sideMenu.js')

const confirmClearConv = document.querySelector('.confirmClearConv');

clearButton.onclick = () => { 
    confirmClearConv.style.display = 'flex';
    clearButton.style.display = 'none';
}

const clearConversations = () => {
    chatInterface.innerHTML = '';

    introScreen.style.display = 'flex';
    confirmClearConv.style.display = 'none';
    
    // otherop.. not tested yet!
    otherOptions.style.display = 'none'
    setTimeout(() => {
        window.scrollTo({top: 150, behavior: "smooth"})
    },100)
}

let newChat = document.querySelector('.newChat');
newChat.onclick = () => clearConversations();

let USER = document.querySelector('.emailAndMore');
let otherOptions = document.querySelector('.otherOptions');

confirmClearConv.onclick = () => clearConversations();

USER.onclick = () => {
    if(otherOptions.style.display == 'none') {
        otherOptions.style.display = 'flex';
    } else {
        otherOptions.style.display = 'none';
    }
}

const SMBGlayer = document.querySelector('.settingsMenuBGlayer');
const closeIcon = document.querySelector('.close');
const settingsOption = document.querySelector('.setting');

//close open
const C_OsettingsMenu = () => {
    if(SMBGlayer.style.display == 'block'){
        SMBGlayer.style.display = 'none';
    } else {
        SMBGlayer.style.display = 'block';
    }

    console.log('clicked')
}


closeIcon.onclick = () => C_OsettingsMenu();
settingsOption.onclick = () => C_OsettingsMenu();

tsb = document.querySelector('.toggleSideBar');
tsb.onclick = () => {
    main.classList.toggle('mainFS')
}

// UTPMENU = upgrade to plus MenuBGlayer
let UTPMENU = document.querySelector('.UTPMenuBGlayer');
document.querySelector('.upgradeToPlus').onclick = () => UTPMENU.style.display = 'flex';
document.querySelector('.closeUTPMenu').onclick = () => UTPMENU.style.display = 'none';
UTPMENU.onclick = () => UTPMENU.style.display = 'none';
