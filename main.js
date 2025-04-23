const idInput = document.querySelector('#idInput')
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

btn.addEventListener('click', onClick);




function removeMsg(){
    setTimeout(() => msg.remove(), 4000)//remove the msg after 4sec
}

//check for the date validation
function isDateValid(yyMMdd) {
    if (!/^\d{6}$/.test(yyMMdd)) return false;

    let year = parseInt(yyMMdd.substring(0, 2), 10);
    const month = parseInt(yyMMdd.substring(2, 4), 10);
    const day = parseInt(yyMMdd.substring(4, 6), 10);

    // Assume 1900-1999 for 00-99, or adjust based on your requirement
    let fullYear= year >= 25 ? 1900 + year : 2000 + year;

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === fullYear &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}


function onClick(e){
    //console.log('button click')
    if( idInput.value === ''){                           //check if the iput is filled
        msg.innerHTML = "CANNOT TEST THE EMPTY ID"      //throw error msg in the msg space
      //alert('can not test empty id')
       removeMsg();
      //setTimeout(() => msg.remove(), 4000)//remove the msg after 4sec
    } else {
              
            if(idInput.value.length !== 13){
                msg.innerHTML = "Check the length of your id make sure it has 13 digit"
                removeMsg();
            }
             // Check if the input contains only digits (no letters or special characters)
            else if(!/^\d+$/.test(idInput.value)){
                msg.textContent = 'Invalid ID: Please enter only numbers.';  // Error message for invalid input
                msg.style.color = 'red';  // Set message color to red for error
                removeMsg();
            }

            //check the Id
            //1st 6 digit must be dob
            else if (!isDateValid(idInput.value.substring(0, 6))) {
                msg.textContent = 'Invalid date in ID: First 6 digits must be a valid date (YYMMDD).';
                msg.style.color = 'red';
                removeMsg();
            }
  
        }
}



//get the input
//check if the iput is filled
//throw error msg in the msg space
//if the input is filled check for the valiadation
//is is digit only
//if not throw the error
//the size is 13
//if less or more 
//throw the error
