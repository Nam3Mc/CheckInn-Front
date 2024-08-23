import axios from "axios";

const loginUserFireBase = async (
  formData: any,
  /*   auth: any, */
  signInWithEmailAndPassword: any,
  /*   setIsSuccess: any,
  setError: any,
  setIsLoading: any,
  setErrorFirebase: any */
  router: any
) => {
  try {
    //___________________________________________POST LOGIN A FIREBASE_________________________________________
    /*     const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
      formData.phone
    );
    //TOKEN LOGIN FIREBASE, CARGO AL LOCALSTORAGE
    const user = JSON.stringify(userCredential.user.accessToken);
    localStorage.setItem("loginToken", user);
    //UID LOGIN FIREBASE, CARGO AL LOCALSTORAGE /--> este tomi lo envia al back para recibir otro
    const userUid = userCredential.user.uid;
    JSON.stringify(userUid); */
    //__________________________________________POST LOGIN A BACK END_________________________________________
    const loginObjet = {
      /*    email: userCredential.user.email, */
      phone: formData.phone,
      email: formData.email,
      password:
        formData.password /* DE MOMENTO VAMOS A HACERLO SIN AUTH, despues se borra passs y se reemplaza por el uid de firebase para guardarla en la base de datos  */,
      /*    firebaseUid: userCredential.user.uid, */
    };
    alert(loginObjet);
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      loginObjet
    );

    //USERDATA LOGIN
    if (response.data.user) {
      const userDataLogin: any = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        accountId: response.data.accountId,
        accounts: {
          id: response.data.user.accounts
            .id /* ERA ESTA DATA PERO DE MOMENTO GUARDE USER */,
          photo: response.data.user.accounts.photo,
        },
        /*    name: formData.name,
      password: formData.password,
      phone: formData.phone,
      email: formData.email, */

        /*   email: userCredential.user.email, */
        /*       id: response.data.id, */
        /*     role: response.data.role,
      token: response.data.token, */
      };
      const newData = JSON.stringify(userDataLogin);
      localStorage.setItem("userDataLogin", newData);
      router.push("/");
      /*     setIsSuccess(true);
    setError(null); */
      /*     setTimeout(() => {
      router.push("/");
    }, 2000); */
    }
  } catch (error: any) {
    const errorMessage = error.message;
    console.error("Error en el inicio de sesión:", error);
    if (error.response && error.response.data && error.response.data.message) {
      /*      setError(error.response.data.message); */
    }
    /*     setErrorFirebase(errorMessage);
    setIsSuccess(false); */
  } finally {
    /*     setIsLoading(false); */
  }
};

export default loginUserFireBase;
