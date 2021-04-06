export const passwordValidate = (text: any) => {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,16}$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      console.log("Passord is Correct");
      return true;
    }

  }