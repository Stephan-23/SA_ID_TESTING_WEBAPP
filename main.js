const idInput = document.querySelector('#idInput')
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

btn.addEventListener('click', onClick);




function removeMsg(){
    setTimeout(() => msg.remove(), 4000)//remove the msg after 4sec
}

function onClick(e){
    //console.log('button click')
    if( idInput.value === ''){                           //check if the iput is filled
        msg.innerHTML = "CANNOT TEST THE EMPTY ID"      //throw error msg in the msg space
      //alert('can not test empty id')
       removeMsg();
      //setTimeout(() => msg.remove(), 4000)//remove the msg after 4sec
    } else {
               // Check if the input contains only digits (no letters or special characters)
            if (!/^\d+$/.test(idInput.value)) {
                msg.textContent = 'Invalid ID: Please enter only numbers.';  // Error message for invalid input
                msg.style.color = 'red';  // Set message color to red for error
                removeMsg();
            } 
            else if(idInput.value.length !== 13 ){
                msg.innerHTML = "WRONG ID" 
                removeMsg();
            }


            if(idInput.value.length !== 13){
                msg.innerHTML = "Check the length of your id make sure it has 13 digit"
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
