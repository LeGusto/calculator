let container = document.querySelector('.container');
let buttons = document.querySelectorAll('button');
let top_op = document.querySelector('.process');
let num_display = document.querySelector('.current');
let clear = document.querySelector('.clear');
let undo = document.querySelector('.undo');
let prev_o = false;
let dotted = false;
let last_num = "";
let last_op = "";
let cur_num = "";

clear.addEventListener('click', () => {
    clear.classList.add('playing');
    top_op.textContent = "";
     num_display.textContent = "";
    prev_o = false;
dotted = false});

function evaluate()
{
    let text = top_op.textContent.split(" ");
    let ops = ['/', '*', '+', '-'];

    if (ops.includes(text[text.length-1])) {text.splice(text.length-1,2)};
    last_num = num_display.textContent;
    last_op = last_num;    

    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < text.length; j++) {
            console.log("hi");
            if (ops[i] === text[j]) {
                let res = undefined;

                switch (ops[i]) {
                    case '/':
                        res = parseFloat(text[j-1])/parseFloat(text[j+1]);
                        res = res.toFixed(2);
                        text.splice(j-1, 3, res);
                        break;
                    case '*':
                        res = parseFloat(text[j-1])*parseFloat(text[j+1]);
                        res = res.toFixed(2);
                        text.splice(j-1, 3, res);
                        break;
                    case '+':
                        res = parseFloat(text[j-1])+parseFloat(text[j+1]);
                        res =res.toFixed(2);
                        text.splice(j-1, 3, res);
                        break;
                    case '-':
                        res = parseFloat(text[j-1])-parseFloat(text[j+1]);
                        res = res.toFixed(2);
                        text.splice(j-1, 3, res);
                        break;
                }
                j--;
            }
        }
    }
    top_op.textContent = parseFloat(text[0]);
    num_display.textContent = parseFloat(text[0]);
    if (num_display.textContent.includes('.')) {dotted = true};
}

function clicked(button) {

    button.classList.add('playing');
    /*if (top_op.textContent.length %19 === 0){
        top_op.textContent += ' ';
    }*/

    if (!button.classList.contains('number')) {
        cur_num = "";
    }

    if (button.classList.contains('operator')) {
        if (top_op.textContent === "" || top_op.textContent.charAt(top_op.textContent.length-1) === '.') {return;}
        if (!prev_o){
            top_op.textContent += ` ${button.textContent}`;
        }
        else {
            top_op.textContent = top_op.textContent.slice(0, -1) + button.textContent;
        }
        prev_o = true;
        dotted = false;
    }
    else if (button.classList.contains('number')) {

        if (cur_num === '0') {return;}


        if (prev_o) {
            top_op.textContent += ` ${button.textContent}`;
        }
        else{
            top_op.textContent += button.textContent;
        }
        prev_o = false;
        cur_num += top_op.textContent;
    }
    else if (button.classList.contains('decimal')) {
        if (!prev_o && !dotted && top_op.textContent !== "") {
            top_op.textContent += '.';
            dotted = true;
        }
    }

    else if (button.classList.contains('result')) {
        /*if (top_op.textContent.charAt(top_op.textContent.length-1) === '.') {return;}
        */
       dotted = false;
       prev_o = false;
        evaluate();
    }
    else if (button.classList.contains('undo')) {
        num_display.textContent = last_num;
        top_op.textContent = last_op;
        dotted = false;
        prev_o = false;
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => 
    {
        if (button != clear) {clicked(button)};
    })
    button.addEventListener('transitionend', () => button.classList.remove('playing'))
})

function cancel(e){
    let code = e.keyCode;
    let chosen = document.querySelector(`button[data-key="${code}"]`);
    if (chosen === null) {return};
    if (chosen.classList.contains('playing')) {chosen.classList.remove('playing')}
}

function key_control(e)
{
    let code = e.keyCode;
    let chosen = document.querySelector(`button[data-key="${code}"]`);
    if (chosen === null) {return};
    if (!chosen.classList.contains('clear')) {clicked(chosen)}
    else if (chosen.classList.contains('clear')) { top_op.textContent = "";
    num_display.textContent = "";
   prev_o = false;
dotted = false;
clear.classList.add('playing');}
}

window.addEventListener('keydown', key_control)
window.addEventListener('keyup', cancel)

