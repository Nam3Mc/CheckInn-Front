"use client";
import {signIn, useSession} from 'next-auth/react'
import React from "react";
//HOOKS
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

//INTERFACES
import { Login } from "@/utils/interfaces/interfaces";
//UTILS
import loginUserFireBase from "@/utils/CRUD/signUp/loginFireBase";
import loginUserFireBaseGoogle from "@/utils/CRUD/signUp/loginFireBaseGoogle";
//FIREBASE
import { initializeApp } from "firebase/app";
import loginGoogle from '@/utils/CRUD/signUp/LoginGoogle';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";

const LoginComponent: React.FC = (): React.ReactNode => {
  //ESTADOS
  const [formData, setFormData] = useState<any>({
    /* name: "", */
    email: "",
    password: "",
    phone: "" /* DE MOMENTO LO VAMOS A HACER + PHONE  */,
  });

   const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }; 

   const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); 
  const provider = new GoogleAuthProvider();

  const router = useRouter();
  
  //estados locales de login convencional
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorState, setError] = useState(null);
  const [errorStateFirebase, setErrorFirebase] = useState(null);

  //estados locales de login con google (aun sin uso)
  const [errorStateGoogle, setErrorGoogle] = useState(null);
  const [isSuccessGoogle, setIsSuccessGoogle] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  //EVENT HANDLER LLENADO DE INPUTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  //EVENT HANDLER ENVIO FORMULARIO
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*     alert(formData.value); */
    setIsLoading(true);
    loginUserFireBase(
      formData,
        auth, 
      signInWithEmailAndPassword,
      setIsSuccess
      /*      
      router
       setError,
      setIsLoading,
      setErrorFirebase */
    );
    router.push("/");
  };

  //EVENT HANDLER ENVIO DE FORMULARIO CON GOOGLE
     const handleGoogleLogIn = async () => {
    setIsLoadingGoogle(true);
    loginGoogle(
      auth,
      provider,
      router,
      setErrorGoogle,
      setIsLoadingGoogle,
      setIsSuccessGoogle,
      signInWithPopup
    );
  }; 

  return (
    <div className="flex justify-center items-center  text-center pt-32 pb-32 bg-greyVivino dark:bg-darkMode-greyVivino ">
      <div className="justify-start mt-0 mr-32">
        <h1 className="pb-8 text-gray-400 text-6xl font-normal dark:text-darkMode-white">
          Únete a{" "}
        </h1>

        <p className="text-gray-600 pb-8 font-Lato text-6xl">CheckINN</p>
      </div>

      <div className="rounded border bg-white border-wine  dark:bg-darkMode-grey1">
        <form
          className="justify-end w-96  bg-white p-12  dark:bg-darkMode-grey1"
          onSubmit={handleSubmit}>
          <div className="pb-2">
            <input
              className="w-full p-3 rounded border  dark:bg-darkMode-grey1 border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="text"
              value={formData.email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="pb-2">
            <input
              className="w-full p-3 rounded border  dark:bg-darkMode-grey1 border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="password"
              value={formData.password}
              name="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </div>{" "}
          <div className="pb-2  dark:bg-darkMode-grey1">
            <input
              className="w-full p-3 rounded border  dark:bg-darkMode-grey1 border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="number"
              value={formData.phone}
              name="phone"
              placeholder="phone"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              className={`inline-block cursor-pointer w-full max-w-xs p-4 rounded-lg ${
                !(
                  formData.email.trim() &&
                  formData.password.trim() &&
                  formData.phone.trim()
                )
                  ? "opacity-60 pointer-events-none bg-gray-300 text-gray-600"
                  : "bg-green text-gray-500 hover:bg-green-300 hover:text-white"
              } text-lg mt-0 transition duration-200`}
              type="submit"
              disabled={
                isLoading ||
                !(
                  formData.email.trim() &&
                  formData.password.trim() &&
                  formData.phone.trim()
                )
              }>
              {isLoading ? "Enviando..." : "Iniciar Sesión"}
            </button>
          </div>
          <div className="inline-block pb-8 pt-5  dark:text-darkMode-white">
            ¿Aún no te registraste? <br />
            <br />
            <Link href="/register">
              <span className="text-wine hover:text-red-900 transition-colors duration-100">
                Registrarse
              </span>
            </Link>
            <br />
          </div>
          {isSuccess && (
            <p className="inline-block mt-2 rounded bg-green-500 text-white p-2">
              ¡Login exitoso! <br /> Redirigiendo...
            </p>
          )}
          {(errorState || errorStateFirebase) && (
            <p className="inline-block cursor-pointer w-1/2 rounded bg-red-500 text-white p-2 mt-2">
              {errorState || errorStateFirebase}
            </p>
          )}
        </form>

        <div className="flex mt-0 bg-white  dark:bg-darkMode-grey1 mb-10 px-12 flex-row items-center">
          <hr className="w-1/2 border-gray-400"></hr>
          <p className="mx-4  dark:text-darkMode-white">o</p>
          <hr className="w-1/2 border-gray-400"></hr>
        </div>

        <button
            onClick={handleGoogleLogIn}  /* DE MOMENTO LO HACEMOS SIN GOOGLE AUTH   */
          className="rounded-3xl  mb-11 w-3/4 border-2 border-grey3 hover:border-blueGoogle font-plus-jakarta-sans">
          <div className="flex flex-row p-2">
            <Image
              className="justify-start"
              src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg"
              alt="Google icon"
              width={24} // Ajusta el ancho según sea necesario
              height={24} // Ajusta la altura según sea necesario
            />
            {!errorStateGoogle ? (
              <p className="justify-center pl-5 dark:text-darkMode-white">
                {isLoadingGoogle ? "Enviando..." : "Continuar con Google"}
              </p>
            ) : (
              <p className="justify-center pl-5">{errorStateGoogle}</p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
