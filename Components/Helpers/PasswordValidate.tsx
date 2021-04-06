export const passwordValidate = (text: any) => {
    // console.log(text, type);

    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,16}$/;
    if (reg.test(text) === false) {
      console.log("Password is Not Correct");
      // this.setState({ email: text })
      // setEmail(text)
      return false;
    }
    else {
      // this.setState({ email: text })
      // setEmail(text)
      console.log("Passord is Correct");

      // register(email, password)
      return true;
    }

  }