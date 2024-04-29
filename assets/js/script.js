
'use strict'
// Função responsável por obter os tipos de caracteres selecionados;
function getCharTypes() {

    let checkBoxIds = [
        '#include_uppercase',
        '#include_number',
        '#include_lowercase',
        '#include_special_character'
    ];

    const charTypesMap = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        special_character: '!@#$%^&*()_+-=[]{}|;:\',.<>?`~"'
    };

    const arrayCharTypes = [];
    //array = [''ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*()_+-=[]{}|;:\',.<>?`~"']

    let isChecked = false;

    checkBoxIds.forEach((id) => {
        const checkbox = document.querySelector(id);
        if (checkbox.checked) {
            isChecked = true;
            const type = id.replace('#include_', '');
            arrayCharTypes.push(charTypesMap[type])
        }
    })

     // Verifica se nenhum checkbox foi selecionado e exibe uma mensagem
     if (!isChecked) {
        message('Nenhum tipo de caractere foi selecionado. Por favor, escolha uma ou mais opções.','error', 1800)
    }

    return arrayCharTypes;
}

//Menssagem de alerta
function message(text, status = 'success', duration){
    return Toastify({
        text: text,
        duration: duration,
        style: {
            background: status === 'success' ? '#84aa16': '#dc2645',
            boxShadow: 'none'
        }
    }).showToast();
}


//Função para gerar um caractere aleatorio de um array

function getRandomCharacter(array) {
    const randomIndexArray = Math.floor(Math.random() * array.length); //retorna index do array
    const innerArray = array[randomIndexArray]; //retorna o array array 
    const randomCharacter = Math.floor(Math.random() * innerArray.length) //retorna o caractere aleatorio dentro do array 
    return innerArray[randomCharacter] //caractere aleatorio do index do array
}

//Função para pegar o tamanho da senha
function getSizePassword() {
    const size = document.querySelector('#size');
    let sizeValue = parseInt(size.value, 10);

    if (isNaN(sizeValue)) {
        sizeValue = 0; // Define o valor padrão como 0
    }
   
    
    if (sizeValue < 4 || sizeValue > 35) {
        message('Tamanho de senha invalido. Tente entre 4 e 35 caracteres','error', 1900);
    }
    return sizeValue;
}


//Função para gerar uma senha aleatoria com base no tamanho
function generateRandomPassword(size, charType) {
    let randomPassword = '';

    while(randomPassword.length < size) {
        randomPassword += getRandomCharacter(charType);
    }
    return randomPassword;

}


function renderPassword(passwordValue) {
    let renderPassword = document.querySelector('#password_container');
    renderPassword.classList.add('show');
    let password = document.querySelector('#password');
    password.innerText = passwordValue;

}

document.querySelector('#generate').addEventListener('click', function () {
    let sizePassword = getSizePassword();
    let charType = getCharTypes();

    if (!isNaN(sizePassword) && sizePassword >= 4 && sizePassword < 35 && charType.length > 0) {
        const password = generateRandomPassword(sizePassword, charType)
        renderPassword(password)
    }

});

//Copiar para area de transferência
document.querySelector('#copy').addEventListener('click', () => {
    const passwordText = document.querySelector('#password').textContent;
    navigator.clipboard.writeText(passwordText) 
    .then(() => {
        message('Senha copiada para area de transferência','success', 1900);
    }).catch(() => {
        alert('Falha ao copiar senha para area de transferência')
    });
    
})