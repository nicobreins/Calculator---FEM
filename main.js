const display = document.getElementById('display-input');
const numberBtns = document.getElementsByClassName('btn-num');
const symbBtns = document.getElementsByClassName('btn-symb');
const delBtn = document.getElementById('btn-del');
const resetBtn = document.getElementById('btn-reset');
const calcBtn = document.getElementById('calculate');

// Number Buttons Values
for(let i = 0; i < numberBtns.length; i++){
    numberBtns[i].onclick = () =>{
        if(display.value === '0' || display.value.includes('=')){
            display.value = numberBtns[i].innerHTML;
        }else{
            display.value += numberBtns[i].innerHTML;
        }
    }
}

// Symbol Button values
for(let i = 0; i < symbBtns.length; i++){

        symbBtns[i].onclick = () =>{
            // console.log(lastChar.search(numRegEx));
            if(display.value.slice(-1).includes(' ') === false){
                display.value += symbBtns[i].innerHTML;                
            }


          
        }
    
}

// Delete Button aka backspace
delBtn.onclick = () =>  {
    if(display.value.length === 1){
        display.value = '0';
    }else if(display.value.slice(-1).includes(' ')){
        display.value = display.value.slice(0,-3);
    }
    else{
        display.value = display.value.slice(0,-1);
    }
}

// Reset
resetBtn.onclick = () =>  display.value = '0';

//Calculate
calcBtn.onclick = () => {
    display.value +=" = " + eval(display.value);
}


