export const emailValidate = (text: any) => {
    // console.log(text, type);

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      // this.setState({ email: text })
      // setEmail(text)
      return false;
    }
    else {
      // this.setState({ email: text })
      // setEmail(text)
      console.log("Email is Correct");

      // register(email, password)
      return true;
    }

  }
