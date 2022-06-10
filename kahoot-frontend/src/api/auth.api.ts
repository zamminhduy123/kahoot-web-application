
export const login = (username : string,password : string) => {
    const requestOptions = {
        url: 'localhost:3001/authentication'
    }

    const loginSuccess = true, message = "Login successfully";
    return [loginSuccess,message];
}


export const register = (username : string,password : string) => {
    const requestOptions = {
        url: 'localhost:3001/authentication'
    }

    const registerSuccess = true, message = "Login successfully";
    return [registerSuccess,message];
}