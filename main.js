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

    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function getGender(id) {
    let genderCode = parseInt(id.substring(6, 10), 10);
    return genderCode < 5000 ? 'Female' : 'Male';
}

function getCitizenship(id) {
    const citizenDigit = id[10];
    return citizenDigit === '0' ? 'South African' : 'Permanent Resident';
}


//calculate the age
function getAge(id) {
    let year = parseInt(id.substring(0, 2), 10);
    let month = parseInt(id.substring(2, 4), 10) - 1; // Months are 0-based in JS
    let day = parseInt(id.substring(4, 6), 10);
    let fullYear = year >= 25 ? 1900 + year : 2000 + year;

    const birthDate = new Date(fullYear, month, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}


 //function for adding the Zodiac Sign
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

    for (const { sign, from, to } of signs) {
        const [fromMonth, fromDay] = from;
        const [toMonth, toDay] = to;

        if (
            (month === fromMonth && day >= fromDay) ||
            (month === toMonth && day <= toDay)
        ) {
            return sign;
        }
    }

    return "Capricorn"; // fallback
}


function onClick(e) {
    if (idInput.value === '') {  // Check if the input is filled
        msg.innerHTML = "CANNOT TEST THE EMPTY ID";
        document.getElementById('exportButtons').style.display = 'none';
        removeMsg();
    } else {
        if (idInput.value.length !== 13) {
            msg.innerHTML = "Check the length of your ID. It must have 13 digits.";
            document.getElementById('exportButtons').style.display = 'none';
            removeMsg();
        }
        // Check if the input contains only digits (no letters or special characters)
        else if (!/^\d+$/.test(idInput.value)) {
            msg.textContent = 'Invalid ID: Please enter only numbers.';
            msg.style.color = 'red';
            document.getElementById('exportButtons').style.display = 'none';
            removeMsg();
        }
        // Check the ID: First 6 digits must be a valid date (YYMMDD)
        else if (!isDateValid(idInput.value.substring(0, 6))) {
            msg.textContent = 'Invalid date in ID: First 6 digits must be a valid date (YYMMDD).';
            msg.style.color = 'red';
            document.getElementById('exportButtons').style.display = 'none';
            removeMsg();
        }
        // Check the 10th digit for citizenship
        else if (!isCitizen()) {
            msg.textContent = 'Invalid citizenship: 10th digit should be "0" or "1".';
            msg.style.color = 'red';
            document.getElementById('exportButtons').style.display = 'none';
            removeMsg();
        }
        // Check the gender code
        else if (!genderValidation()) {
            document.getElementById('exportButtons').style.display = 'none';
            msg.textContent = 'Invalid gender code: Should be a valid 4-digit number.';
            msg.style.color = 'red';
            removeMsg();
        }
        //Check the last digit
        else if (!isLuhnValid(idInput.value)) {
            document.getElementById('exportButtons').style.display = 'none';
            msg.textContent = 'Invalid checksum: ID does not pass the Luhn check.';
            msg.style.color = 'red';
            removeMsg();
        }
        
        else {
            const id = idInput.value;
            const birthdate = getDateOfBirth(id);
            const gender = getGender(id);
            const citizenship = getCitizenship(id);
            const age = getAge(id);
            const birthDay = parseInt(id.substring(4, 6), 10);
            const birthMonth = parseInt(id.substring(2, 4), 10);
            const zodiac = getZodiacSign(birthDay, birthMonth);


            msg.innerHTML = `
                <strong>ID is valid!</strong><br>
                Birthdate: ${birthdate}<br> 
                Age: ${age} years old<br>
                Zodiac Sign: ${zodiac} ♈️<br>
                Gender: ${gender}<br>
                Citizenship: ${citizenship}
            `;
            msg.style.color = 'green';
            //removeMsg();
            document.getElementById('exportButtons').style.display = 'block';
                }
            }
}
document.querySelector('#exportPdfBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
 
    const content = msg.innerText;
    doc.text(content, 10, 10);
    doc.save('ID_Report.pdf');
});
