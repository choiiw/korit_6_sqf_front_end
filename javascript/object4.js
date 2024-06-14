 // 비구조 할당 or 구조 분해 
 function main() {
    const user = {
        username: "admin",
        password: "1234",
        name: "김준일",
        email: "aaa@gmail.com"
    }

    const names = [ "박현주", "이성희", "권오광", "권혁진"];

    const { username, password, email } = user;
    
    console.log(username); 
    console.log(password); 
    console.log(email); 

    const [ a, b ] = names;

    console.log(a);
    console.log(b);

    const { name, ...rest } = user;
    console.log(rest); 

    console.log(names.slice(1, 3));
 }

 main();