const body = document.querySelector("body");
const inputName = document.querySelector(".inputName");
const inputLastName = document.querySelector(".inputLastName");
const inputPhone = document.querySelector(".inputPhone");
const inputPassword = document.querySelector(".inputPassword");
const btnSignUp = document.querySelector(".btnSignUp");
const parText = document.createElement("p");
const parSameName = document.createElement("p");
const divCardLogin = document.createElement("div")
body.append(divCardLogin);
const btnLogIn = document.createElement("button");
btnLogIn.innerText = "Log in";
divCardLogin.style.backgroundColor = "grey"


const loginUserLabel = document.createElement("label");
loginUserLabel.innerText = "Login";
body.append(loginUserLabel)
const loginUserInput = document.createElement("input");
body.append(loginUserInput)

btnLogIn.style.margin = "20px 0 0 20px"

const passUserLabel = document.createElement("label");
passUserLabel.innerText = "Password";
body.append(passUserLabel)
const passUserInput = document.createElement("input");

body.append(passUserInput)

divCardLogin.append(loginUserLabel, loginUserInput, passUserLabel, passUserInput, btnLogIn)
divCardLogin.style.margin = "60px 0  0 20px";
divCardLogin.style.padding = "10px 10px 10px 0";
divCardLogin.style.maxWidth = "200px";
divCardLogin.style.display = "flex";
divCardLogin.style.flexDirection = "column";

body.append(parText);

const users = JSON.parse(localStorage.getItem("users")) || [];

function emptyInputsRegistration() {
    inputName.value == ""
    inputLastName.value == ""
    inputPhone.value == ""
    inputPassword.value == ""
}

btnSignUp.addEventListener("click", () => {

    if (inputName.value == "" || inputLastName.value == "" || inputPhone.value == "" || inputPassword.value == "") {

        parText.innerText = "fill the rest of fields!";
        parText.style.color = "red";
    } else {
        const cardUser = {
            id: Math.random(),
            name: inputName.value,
            lastName: inputLastName.value,
            phone: inputPhone.value,
            password: inputPassword.value
        }
        let checkNamePhone = false;

        for (let i = 0; i < users.length; i++) {
            if (inputName.value === users[i].name) {
                checkNamePhone = true;
                parText.innerText = "есть совпадения имени";
                parText.style.color = "blue";
            }
        }

        for (let i = 0; i < users.length; i++) {
            if (inputPhone.value === users[i].phone) {
                checkNamePhone = true;
                parText.innerText = "есть совпадения телефона";
                parText.style.color = "pink";
            }
        }

        if (checkNamePhone === false) {
            users.push(cardUser);
            localStorage.setItem("users", JSON.stringify(users));
            body.append(parText);
            parText.innerText = "Регистрация прошла успешно! Войдите в систему!";
            parText.style.color = "green";
            emptyInputsRegistration()
        }
    }
})

// ====================LOG IN==============================

const loginText = document.createElement("p");
body.append(loginText);

btnLogIn.addEventListener("click", () => {
    let acceessOk = false
    const loginUser = {
        name: loginUserInput.value,
        password: passUserInput.value
    }
    if (loginUserInput.value === "" && passUserInput.value === "") {
        loginText.innerText = "Заполните login и password"
    } else if (loginUserInput.value === "") {
        loginText.innerText = "Отсутсвует Login"
        loginText.style.color = "red";
    } else if (passUserInput.value === "") {
        loginText.innerText = "Отсутсвует Password"
        loginText.style.color = "red";
    }

    else {
        for (let i = 0; i < users.length; i++) {

            if (loginUserInput.value === users[i].name && passUserInput.value === users[i].password) {
                acceessOk = true;
            }
        }
        if (acceessOk) {
            loginText.innerText = `Welcome ${loginUserInput.value} `
            loginText.style.color = "green"
        } else {
            loginText.innerText = `Пользователя ${loginUserInput.value}  не существует`
            loginText.style.color = "red"
        }
    }
})

