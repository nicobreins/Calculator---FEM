const displayInput = document.getElementById('display-input');
const numberBtns = document.getElementsByClassName('btn-num');
const symbBtns = document.getElementsByClassName('btn-symb');
const delBtn = document.getElementById('btn-del');
const resetBtn = document.getElementById('btn-reset');
const calcBtn = document.getElementById('calculate');
const screen = document.getElementById('display');
const screenSecond = document.getElementById('display-second');
const screenContainer = document.getElementById('display-container');
const maxFont = window.getComputedStyle(screen).fontSize.slice(0,-2);
const toggleElements = document.getElementsByName('toggle-theme');


// Screen update
const updateValue = () => {
    screen.textContent = displayInput.value;
}
updateValue();

// Number Buttons Values
for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].onclick = () =>{
        if(!(displayInput.value.length >= 12)){
            if(displayInput.value === '0' && screenSecond.textContent.length === 0 || displayInput.value.includes('=')){
                displayInput.value = numberBtns[i].textContent;
                screenSecond.textContent ='';
            }else if(displayInput.value === '0' && screenSecond.textContent.length !== 0 ){
                displayInput.value = numberBtns[i].textContent;
            }else if(numberBtns[i].textContent === '.'){
                if(displayInput.value.includes('.') === false){
                    displayInput.value += numberBtns[i].textContent;
                }
            } else{
                displayInput.value += numberBtns[i].textContent;
            }
        }else if (displayInput.value.length >= 12 && displayInput.value.includes('=')){
            displayInput.value = numberBtns[i].textContent;
            screenSecond.textContent ='';
        }
        updateValue();
        screen.style.fontSize = maxFont + 'px';

        
    }
}

// Symbol Button values
for(let i = 0; i < symbBtns.length; i++){
    symbBtns[i].onclick = () =>{
        if(displayInput.value.includes('=')){
            screenSecond.textContent = screen.textContent.slice(3) +  symbBtns[i].textContent;
            screen.textContent = screen.textContent.slice(3);
        }else if(displayInput.value !== ''){
            screenSecond.textContent += displayInput.value + symbBtns[i].textContent;
        }
        displayInput.value = '';

    }

}

// Delete Button aka backspace
delBtn.onclick = () =>  {
    if(displayInput.value.length === 1 ){
        displayInput.value = '0';
    }else if(displayInput.value.slice(1).includes('=')){
        screenSecond.textContent = '';
        displayInput.value = displayInput.value.slice(3);
    }else if(displayInput.value === ''){
        displayInput.value = screen.textContent;
        displayInput.value = displayInput.value.slice(0,-1);
    } else{
        displayInput.value = displayInput.value.slice(0,-1);
    }
    updateValue();

    if(displayInput.value.length <= 12){
        screen.style.fontSize = maxFont + 'px';
    }


}

// Reset
resetBtn.onclick = () =>  {
    displayInput.value = '0';
    screenSecond.textContent ='';
    updateValue();
    screen.style.fontSize = maxFont + 'px';
}

//Calculate
calcBtn.onclick = () => {
    if(displayInput.value.slice(1).includes('=') === false && displayInput.value !== '.`'){
        const calcEq = screenSecond.textContent + screen.textContent;
        screenSecond.textContent = calcEq;
        displayInput.value =" = " + eval(calcEq);
        updateValue();

        const textWidth = screen.offsetWidth;
        const containerWidth = screenContainer.offsetWidth - 48;
 
        if(textWidth > containerWidth){
            let newFontSize = containerWidth * maxFont / textWidth;
            screen.style.fontSize = newFontSize + 'px';
        }
    
    }

    

}


//Theme 

window.onload = () => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if(userPrefersDark){
        toggleElements[0].checked = true;
    }else if(userPrefersLight){
        toggleElements[1].checked = true;
    }
}

for(let i = 0; i < toggleElements.length; i++){
    toggleElements[i].onchange = () =>{
        const bodyElement = document.querySelector('body');
        if(toggleElements[0].checked){
            bodyElement.className = "theme1";
        }else if(toggleElements[1].checked){
            bodyElement.className = "theme2";
        }else if(toggleElements[2].checked){
            bodyElement.className = "theme3";
        }
    }
}