// inputMode = 1  > 추가
// inputMode = 2  > 수정
let inputMode = 1;


let userList = [];
loadUserList()

let emptyUser = {
    id: 0,
    name: "",
    username: "",
    password: ""
};

let user = {
    ...emptyUser
};

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body");
    userTableBody.innerHTML = userList.map(({id, name, username, password}, index) => {
        return `
            <tr>
                <th><input type="checkbox" onchange="handleUserCheck(event)"></th>
                <td>${index + 1}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${password}</td>
                <th><button onclick="deleteUser(event)" value="${id}">삭제</button></th>
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
    
        const nameInput = document.querySelector(".name-input");    
        const passwordInput = document.querySelector(".password-input");
        const usernameInput = document.querySelector(".username-input");

        
        if(e.target.name === "name") {
            usernameInput.focus();
        }


        if(e.target.name === "username") {
            passwordInput.focus();           
        }
        
        if(e.target.name === "password") {
            userList = [ ...userList, { ...user, id: getNewId() } ];
            
            saveUserList();
            renderTable();

            nameInput.value = emptyUser.name;
            usernameInput.value = emptyUser.username;
            passwordInput.value = emptyUser.password;
            
            nameInput.focus();
            
        }
        

    }
}
    
 function saveUserList() {
     localStorage.setItem("userList", JSON.stringify(userList));
}

function loadUserList() {
    const lsUserList = localStorage.getItem("userList");                                 //local에 데이터 저장
    userList = !lsUserList ? [] : JSON.parse(lsUserList);
    renderTable();
}

function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value));                 // 삭제 
    saveUserList();
    renderTable();
}

function getNewId() {
   const userIds = userList.map(user => user.id);                                          // 아이디값 부여
   const maxUserId = userIds.length === 0 ? 20240000 : Math.max.apply(null, userIds);

   return maxUserId + 1; 
}

function handleUserCheck(e) {   
    const checkBoxList = document.querySelectorAll('input[type="checkbox"]');                 // 체크박스 중복 제거 
    for(let i = 0; i < checkBoxList.length; i++){
        const checkbox = checkBoxList[i];
        if(e.target === checkbox){
            continue;
        }
        checkbox.checked = false;
    }
}
//  해당 인덱스 체크를 바탕으로 id 값 비교 -> id 값이 일치 하면 해당 인덱스의 내용 수정 (입력 방식은 등록할 때 같이)