const idInput = document.querySelector('#idInput')
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

btn.addEventListener('click', onClick);

function onClick(e){
    //console.log('button click')
    if( idInput.value === ''){                           //check if the iput is filled
        msg.innerHTML = "CANNOT TEST THE EMPTY ID"      //throw error msg in the msg space
      //alert('can not test empty id')
      //remove the msg after 4sec
      setTimeout(() => msg.remove(), 4000)
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
