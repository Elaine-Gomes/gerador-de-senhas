const lengthSlider = document.querySelector('.pass-length input');
const passwordLength = document.querySelector('.details span');
const generateBtn  = document.querySelector('.generate-btn');
const copyIcon  = document.querySelector('.material-symbols-rounded');
const options  = document.querySelectorAll('.option input');
const passwordInput  = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!#$%&( )*+-.|:;<>=?@[]^-,{}~"
}

const generatePassword = ()=>{
    let staticPassword = "";
    randomPassword = "";
    excludeDuplicate = false;
    passLength = lengthSlider.value;

    options.forEach((option)=>{
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }else if(option.id === "spaces"){
                staticPassword += ` ${staticPassword} `
            }else{
                excludeDuplicate = true;
          }
        }
});

for (let i = 0; i < passLength; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
        if (randomChar == "" || !randomPassword.includes(randomChar)) {
            randomPassword += randomChar;
        } else {
            i--;
        }
              
    } else {
        randomPassword += randomChar;
    }
}
    passwordInput .value = randomPassword

}
const updatePassIndicator = ()=>{
    passIndicator.id = lengthSlider.value < 8 ?"weak" : lengthSlider.value <= 16 ? "medium" :"strong"
}
const updateSlider = ()=>{
    passwordLength.innerHTML = lengthSlider.value ;
    generatePassword();
    updatePassIndicator();
}

updateSlider();
const copyPasssword = ()=>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerHTML = '<i id="check" class="fa-solid fa-check"></i>'
    setTimeout(()=>{
        copyIcon.innerHTML = '<i class="fa-regular fa-clone"></i>'
    },1500)
}
copyIcon.addEventListener('click', copyPasssword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);