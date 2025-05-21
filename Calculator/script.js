var total = 0;
var numbers_displayed = document.getElementById("text");  //used to display the numbers and answers of equations (bottom right of the output section)
var operation = document.getElementById("operation");
var flag = false; //used to keep track if sign operation was selected
var nums = "";  //used to keep track of the numbers being selected to be displayed
var last_used_sign;
var equal_flag = false;

document.querySelectorAll(".num").forEach(button => {
    button.addEventListener("click", () => {
        //if default display or if the user selected an operation sign, replace the number being displayed with the new number that was selected.
        if (numbers_displayed.textContent === "0" || flag===true) {
            numbers_displayed.textContent = button.id;
            nums += numbers_displayed.textContent;
            flag = false;
           
        }
        //if the user clicked the equal btn, remove the displayed equation (reset everything) and display the number being selected.
        else if (equal_flag === true) {
            operation.textContent = "";
            numbers_displayed.textContent = button.id;
            equal_flag = false;
            nums = "";
            total = 0;
        }
        //append the numbers being selected if no sign was selected.
        else {
            nums += button.id;
            numbers_displayed.textContent = nums;
        }
    })
})

document.querySelectorAll(".signs").forEach(sign => {
    sign.addEventListener("click", () => {
        //if the user put equal, the signs do nothing.
        if (equal_flag === false) {
            flag = true; //just to indicate that a sign was selected.
            if (last_used_sign === "add") {
                total += parseFloat(numbers_displayed.textContent);
                //if there is an operation and we select equal, display the answer.
                if (sign.id === "eq" && operation.textContent!=="") {
                    operation.textContent = `${parseFloat(operation.textContent)} + ${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
                //if there is no operation, just display the number itself as equal
                else if (sign.id==="eq"){
                    operation.textContent = `${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
            }

            //same concept for all the other operation signs

            else if (last_used_sign === "subt") {
                total -= parseFloat(numbers_displayed.textContent);
                if (sign.id === "eq" && operation.textContent!=="") {
                    operation.textContent = `${parseFloat(operation.textContent)} - ${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
                else if (sign.id==="eq"){
                    operation.textContent = `${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
            }
            else if (last_used_sign === "mult") {
                total = total * parseFloat(numbers_displayed.textContent);
                if (sign.id === "eq" && operation.textContent!=="") {
                    operation.textContent = `${parseFloat(operation.textContent)} * ${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
                else if (sign.id==="eq"){
                    operation.textContent = `${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
            }
            else if (last_used_sign === "div") {
                total = total / parseFloat(numbers_displayed.textContent);
                if (sign.id === "eq" && operation.textContent!=="") {
                    operation.textContent = `${parseFloat(operation.textContent)} ÷ ${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
                else if (sign.id==="eq"){
                    operation.textContent = `${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
            }
            else { //if no sign was used before
                total = parseFloat(numbers_displayed.textContent);
                if (sign.id === "eq") {
                    operation.textContent = `${numbers_displayed.textContent} =`;
                    numbers_displayed.textContent = total;
                    equal_flag = true;
                }
            }
            
            // display the sign that was chosen, calculate the total, and reset 'nums' to display new number being added to the operation
            if (sign.id === "add") {
                operation.textContent = `${total} +`
                numbers_displayed.textContent = total;
                nums = "";
                last_used_sign = "add";
            }
            else if (sign.id === "subt") {
                operation.textContent = `${total} -`
                numbers_displayed.textContent = total;
                nums = "";
                last_used_sign = "subt";
            }
            else if (sign.id === "mult") {
                operation.textContent = `${total} *`
                numbers_displayed.textContent = total;
                nums = "";
                last_used_sign = "mult";
            }
            else if (sign.id === "div") {
                operation.textContent = `${total} ÷`
                numbers_displayed.textContent = total;
                nums = "";
                last_used_sign = "div";
            }
            
        }
    })
})

//removes the last inserted number by user
document.getElementById("DEL").addEventListener("click",()=> {
    let N = numbers_displayed.textContent;
    if (N !== "0" && equal_flag === false) {
        N = N.substring(0, N.length-1);
        
        if (N === "") { //if we deleted all numbers,
            numbers_displayed.textContent = "0";
        }
        else {
            numbers_displayed.textContent = N;
        }
        //update nums in case the user wants to insert new numbers
        nums = numbers_displayed.textContent;
    }
})

//reset everything
document.getElementById("AC").addEventListener("click", ()=> {
    numbers_displayed.textContent = "0";
    total = 0;
    nums = "";
    operation.textContent = "";
    last_used_sign = "";
})