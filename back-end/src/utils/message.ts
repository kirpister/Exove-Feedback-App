

export class Message { 
  constructor(public userName:string){
  }
  loginSucess () {
    return `${this.userName} success login`
  }
  loginFail (){
    return `${this.userName} failed to login, please check user name or password `
  }
  registerSuccess (){
    return `${this.userName} register success,`
  }
  registerFail (){
    return `${this.userName} fail to register `
  }
}



