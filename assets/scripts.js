//* Copy Button Star
const passwordInput = document.getElementById("passwordOutput");
const copyBtn = document.querySelector(".copy_container");
const copyIcon = document.querySelector(".fa-copy");

async function copyPassword() {
    const password = passwordInput.value;

    if (!password) return; //! evitar copiar vacío

    try {
        await navigator.clipboard.writeText(password);

        //! cambiar icono a check
        copyIcon.classList.remove("fa-copy");
        copyIcon.classList.add("fa-check");

        //! volver al icono original después de 2 segundos
        setTimeout(() => {
            copyIcon.classList.remove("fa-check");
            copyIcon.classList.add("fa-copy");
        }, 2000);

        passwordInput.value = "";
        passwordInput.placeholder = "Generate a new password";

    } catch (error) {
        console.error("Error to copy:", error);
    }
}

copyBtn.addEventListener("click", copyPassword)
//* Copy Button End


//* Apply Formats Start */
const charsets = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: "!@#$%^&*()_+[]{}<>?"
};

function getActiveCharacters() {
    const checkboxes = document.querySelectorAll("#formats input");

    let characters = "";

    checkboxes.forEach(cb => {
        if (cb.checked) {
            characters += charsets[cb.value];
        }
    });

    return characters;
}
//* Apply Formats End */


// * Generate Random Password Start
function generatePassword(length, characters) {
    let password = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
// * Generate Random Password End


// * Characters Range Control Start
const rangeInput = document.getElementById("charactersRange");
const rangeTooltip = document.querySelector(".range_container .tooltip");

function updateRangeValue() {
    const value = Number(rangeInput.value);
    const min = Number(rangeInput.min);
    const max = Number(rangeInput.max);

    const percentage = (value - min) / (max - min) * 100;
    rangeTooltip.textContent = Math.floor(percentage) + "%";
}

rangeInput.addEventListener("input", updateRangeValue);

updateRangeValue();
// * Characters Range Control End


//* Show Random Password Ouutput Start
document.querySelector(".btn").addEventListener("click", () => {

    const length = document.getElementById("charactersRange").value;

    const characters = getActiveCharacters();

    if (characters === "") {
        const alert = document.querySelector(".alert");
        alert.classList.add("active"); //! Ajustar para que solo se muestre por 2 Segundos
        return;
    }

    const password = generatePassword(length, characters);

    passwordInput.value = password;
});
//* Show Random Password Ouutput End