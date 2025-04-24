const idInput = document.querySelector('#idInput');
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

btn.addEventListener('click', onClick);

function removeMsg() {
    setTimeout(() => msg.innerHTML = '', 4000); // Remove the msg after 4 seconds
}

// Check for date validity
function isDateValid(yyMMdd) {
    if (!/^\d{6}$/.test(yyMMdd)) return false;

    let year = parseInt(yyMMdd.substring(0, 2), 10);
    const month = parseInt(yyMMdd.substring(2, 4), 10);
    const day = parseInt(yyMMdd.substring(4, 6), 10);

    // Correct year logic: If the year is less than 25, assume it's 2000s, otherwise 1900s
    let fullYear = year >= 25 ? 1900 + year : 2000 + year;

    // Create a Date object with the parsed year, month, and day
    const date = new Date(fullYear, month - 1, day);

    // Compare the date components with the input values
    return (
        date.getFullYear() === fullYear &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

// Check for citizenship based on the 10th digit (index 10 in the ID)
function isCitizen() {
    const citizenDigit = idInput.value[10]; // The 10th character is at index 10
    return citizenDigit === "1" || citizenDigit === "0";
}

// Check for gender validation
function genderValidation() {
    let genderCode = parseInt(idInput.value.substring(6, 10), 10); // Extract gender code
    return genderCode >= 0 && genderCode <= 9999; // Valid gender code range
}
//check for the last digit
function isLuhnValid(idNumber) {
    let sum = 0;
    let alternate = false;

    for (let i = idNumber.length - 1; i >= 0; i--) {
        let n = parseInt(idNumber[i], 10);
        if (alternate) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }
        sum += n;
        alternate = !alternate;
    }

    return (sum % 10 === 0);
}

//fuction to display the information
function getDateOfBirth(id){
    let year = parseInt(id.substring(0, 2), 10);
    const month = parseInt(id.substring(2, 4), 10);
    const day = parseInt(id.substring(4, 6), 10);

    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${fullYear}`;
}

function getGender(id) {
    let genderCode = parseInt(id.substring(6, 10), 10);
    return genderCode < 5000 ? 'Female' : 'Male';
}

function getCitizenship(id) {
    const citizenDigit = id[10];
    return citizenDigit === '0' ? 'South African' : 'Permanent Resident';
}

function onClick(e) {
    if (idInput.value === '') {  // Check if the input is filled
        msg.innerHTML = "CANNOT TEST THE EMPTY ID";
        removeMsg();
    } else {
        if (idInput.value.length !== 13) {
            msg.innerHTML = "Check the length of your ID. It must have 13 digits.";
            removeMsg();
        }
        // Check if the input contains only digits (no letters or special characters)
        else if (!/^\d+$/.test(idInput.value)) {
            msg.textContent = 'Invalid ID: Please enter only numbers.';
            msg.style.color = 'red';
            removeMsg();
        }
        // Check the ID: First 6 digits must be a valid date (YYMMDD)
        else if (!isDateValid(idInput.value.substring(0, 6))) {
            msg.textContent = 'Invalid date in ID: First 6 digits must be a valid date (YYMMDD).';
            msg.style.color = 'red';
            removeMsg();
        }
        // Check the 10th digit for citizenship
        else if (!isCitizen()) {
            msg.textContent = 'Invalid citizenship: 10th digit should be "0" or "1".';
            msg.style.color = 'red';
            removeMsg();
        }
        // Check the gender code
        else if (!genderValidation()) {
            msg.textContent = 'Invalid gender code: Should be a valid 4-digit number.';
            msg.style.color = 'red';
            removeMsg();
        }
        //Check the last digit
        else if (!isLuhnValid(idInput.value)) {
            msg.textContent = 'Invalid checksum: ID does not pass the Luhn check.';
            msg.style.color = 'red';
            removeMsg();
        }
        
        else {
            msg.textContent = 'ID is valid!';
            msg.style.color = 'green';
            removeMsg();
        }
    }
}
