const contacts = document.querySelectorAll(".names");
const contact_names = Array.from(contacts).map(contact=>contact.textContent);
const inputBox = document.getElementById('input');

inputBox.addEventListener("input", ()=> {
    if (inputBox.value === "") { 
        for (let i=0; i<contacts.length; i++) {
            contacts[i].style.display = "list-item";
        }
    }
    else {
        //go through all the names
        for (let i=0; i<contact_names.length; i++) {
            let name = contact_names[i];
            var flag = false;
            //for each name, find a match between the input letter(s) and that name
            for (let j=0; j<name.length; j++) {
                if (name.substring(j,j+inputBox.value.length).toLowerCase() === inputBox.value.toLowerCase()) {
                    flag = true;
                    break; //once you find a match, no need to go through the rest of the name
                }
            }
            //if match was not found, remove the name from display
            if (flag === false) {
                contacts[i].style.display = "none";
            }
            else {
                contacts[i].style.display = "list-item";
            }
        }
    }
    
})

