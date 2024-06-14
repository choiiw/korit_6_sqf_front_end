const list = ["e","r","t"];
console.log(list.join("s"));

let userList = [];
let emptyUser = {
    username: "",
    password: ""
};

let user = {
    ...emptyUser
}

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body");
    userTableBody.innerHTML = userList.map(({username, password}, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${username}</td>
                <td>${password}</td>
            </tr>
        `;
    }).join("");
}

function handleUserInputKeyDown(e) {
    user = {
        ...user,
        [e.target.name]: e.target.value
    }

    console.log(user);

    if(e.keyCode === 13) {
        const passwordInput = document.querySelector(".password-input");
        const usernameInput = document.querySelector(".username-input");
        
        if(e.target.name === "username") {
            passwordInput.focus();
        }
        if(e.target.name === "password") {
            userList = [ ...userList, { ...user } ];

            renderTable();

            usernameInput.value = emptyUser.username;
            passwordInput.value = emptyUser.password;
            
            usernameInput.focus();
        }
    }
    console.log(e.target.name);
}

