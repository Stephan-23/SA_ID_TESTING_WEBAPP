
//DOM Elements
const idInput = document.querySelector('#idInput');
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');
const exportBtnSection = document.getElementById('exportButtons');

btn.addEventListener('click', validateID);

// === Utility Functions ===
//function to dispaly message
function showMessage(text, color = 'green') {     //display the details
    msg.innerHTML = text;
    msg.style.color = color;                      //add the green color
}
//funtion to clear the message after 4sec
function clearMessage() {
    setTimeout(() => {
        msg.innerHTML = '';
        hideExportButtons();    //make sure the button for pdf us hidden
    }, 4000);
}

// function to show the button for export the information to pdf
function showExportButtons() {
    exportBtnSection.style.display = 'block';
}

//function to hide the button 
function hideExportButtons() {
    exportBtnSection.style.display = 'none';
}

// === Validation Functions ===
//function to check for the date of birth validation
function isDateValid(yyMMdd) {
    if (!/^\d{6}$/.test(yyMMdd)) return false;   //check if 6 digits are digits
    let year = parseInt(yyMMdd.substring(0, 2), 10);  //convert the year into the integer base 10(decimal)
    let month = parseInt(yyMMdd.substring(2, 4), 10);
    let day = parseInt(yyMMdd.substring(4, 6), 10);
    let fullYear = year >= 25 ? 1900 + year : 2000 + year;

    const date = new Date(fullYear, month - 1, day);
    return (
        date.getFullYear() === fullYear &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}


//function to check for the citizenship
function isCitizen(id) {
    const digit = id[10];
    return digit === '0' || digit === '1';
}

//function to check the gender
function isGenderValid(id) {
    const code = parseInt(id.substring(6, 10), 10);
    return code >= 0 && code <= 9999;
}

function isLuhnValid(id) {
    let sum = 0, alternate = false;
    for (let i = id.length - 1; i >= 0; i--) {
        let n = parseInt(id[i], 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

// === Info Extract Functions ===
//function to get the dob info
function getDateOfBirth(id) {
    let year = parseInt(id.substring(0, 2), 10);
    let month = parseInt(id.substring(2, 4), 10);
    let day = parseInt(id.substring(4, 6), 10);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function getGender(id) {
    return parseInt(id.substring(6, 10), 10) < 5000 ? 'Female' : 'Male';
}

function getCitizenship(id) {
    return id[10] === '0' ? 'South African' : 'Permanent Resident';
}

//funnction to calculate the age based on the dob
function getAge(id) {
    let year = parseInt(id.substring(0, 2), 10);
    let month = parseInt(id.substring(2, 4), 10) - 1;
    let day = parseInt(id.substring(4, 6), 10);
    let fullYear = year >= 25 ? 1900 + year : 2000 + year;

    const birthDate = new Date(fullYear, month, day); //create the object from the dob in the id
    const today = new Date();   //the current date object

    let age = today.getFullYear() - birthDate.getFullYear();  
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age; 
}

//function for the zodiac signs
function getZodiacSign(day, month) {
    const signs = [
        { sign: "Capricorn", from: [12, 22], to: [1, 19] },
        { sign: "Aquarius", from: [1, 20], to: [2, 18] },
        { sign: "Pisces", from: [2, 19], to: [3, 20] },
        { sign: "Aries", from: [3, 21], to: [4, 19] },
        { sign: "Taurus", from: [4, 20], to: [5, 20] },
        { sign: "Gemini", from: [5, 21], to: [6, 20] },
        { sign: "Cancer", from: [6, 21], to: [7, 22] },
        { sign: "Leo", from: [7, 23], to: [8, 22] },
        { sign: "Virgo", from: [8, 23], to: [9, 22] },
        { sign: "Libra", from: [9, 23], to: [10, 22] },
        { sign: "Scorpio", from: [10, 23], to: [11, 21] },
        { sign: "Sagittarius", from: [11, 22], to: [12, 21] },
    ];

    for (let { sign, from, to } of signs) {
        const [fMonth, fDay] = from;
        const [tMonth, tDay] = to;
        if ((month === fMonth && day >= fDay) || (month === tMonth && day <= tDay)) {
            return sign;
        }
    }
    return "Capricorn";
}

// === Main Validation ===
//function for main validation validateID() used in the button 
function validateID() {
    const id = idInput.value.trim();

    if (id === '') return showError('CANNOT TEST THE EMPTY ID');       //if the id is empty show the msg 
    if (id.length !== 13) return showError('Check the length of your ID. It must have 13 digits.');
    if (!/^\d+$/.test(id)) return showError('Invalid ID: Please enter only numbers.');
    if (!isDateValid(id.substring(0, 6))) return showError('Invalid date in ID: First 6 digits must be a valid date.');
    if (!isCitizen(id)) return showError('Invalid citizenship: 10th digit should be "0" or "1".');
    if (!isGenderValid(id)) return showError('Invalid gender code: Should be a valid 4-digit number.');
    if (!isLuhnValid(id)) return showError('Invalid checksum: ID does not pass the Luhn check.');

    const birthdate = getDateOfBirth(id);
    const age = getAge(id);
    const gender = getGender(id);
    const citizenship = getCitizenship(id);
    const day = parseInt(id.substring(4, 6), 10);
    const month = parseInt(id.substring(2, 4), 10);
    const zodiac = getZodiacSign(day, month);

    const result = `
        <strong>ID is valid!</strong><br>
        Birthdate: ${birthdate}<br>
        Age: ${age} years old<br>
        Zodiac Sign: ${zodiac} ♈️<br>
        Gender: ${gender}<br>
        Citizenship: ${citizenship}
    `;
    showMessage(result);   //dispaly the details
    showExportButtons();
}

//function to show and clear the error message
function showError(message) {
    showMessage(message, 'red');      //in the show message pass the message and the red color
    hideExportButtons();
    clearMessage();
}

// === Export Button ===
document.querySelector('#exportPdfBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(msg.innerText, 10, 10);
    doc.save('ID_Report.pdf');
})