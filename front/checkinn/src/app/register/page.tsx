"use client";

import{signIn, useSession} from 'next-auth/react'
import React, { useEffect } from "react";
//HOOKS
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
//INTERFACES DATOS
import { Register } from "@/utils/interfaces/interfaces";
//FUNCION PARA VALIDAR FORM.
import validate from "@/utils/CRUD/signUp/validate";
//FUNCION REGISTRO FIREBASE
import registerUserFirebase from "@/utils/CRUD/signUp/registerFireBase";
import loginUserFireBaseGoogle from "@/utils/CRUD/signUp/loginFireBaseGoogle";
//FIREBASE CONFIGS
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";

const RegisterComponent: React.FC = (): React.ReactNode => {
  //ESTADOSz
  const [formData, setFormData] = useState<Register>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phone: undefined,
  });

  //ojo con modularizar esta config, me dio problemas.
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);
  /*   console.log(app); */
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const router = useRouter();

  //estados locales de login con google (aun sin uso)
  const [errorStateGoogle, setErrorGoogle] = useState(null);
  const [isSuccessGoogle, setIsSuccessGoogle] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorStateBack, setErrorBack] = useState(null);
  const [registerToken, setToken] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      router.push("/");
    }
  }, [auth, router]);

  //EVENT HANDLER LLENADO DE INPUTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    //VALIDACION DE ERRORES DE INPUTS
    const newErrors = validate({ ...formData, [name]: value }); //--> envio obeto que contiene los datos del form actualizados
    setErrors({ ...errors, [name]: newErrors[name] || "" }); //--> actualiza el estado de errores con los errores encontrados, de no haber
    // errores se establece cadena vacia.
    console.log(formData);
  };

  //EVENT HANDLER ENVIO FORMULARIO
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    registerUserFirebase(
      formData,
      auth,
      createUserWithEmailAndPassword
      /*     
      setIsSuccess,
      setErrors,
      router,
      errors,
      setIsLoading,
      setToken,
      setErrorBack */
    );
    router.push("/");
  };

  //EVENT HANDLER ENVIO DE FORMULARIO CON GOOGLE
  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    loginUserFireBaseGoogle(
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
    <div className="flex justify-center items-center text-center pt-32 pb-32 bg-greyVivino dark:bg-darkMode-greyVivino">
      <div className="justify-start mt-0 mr-32">
        <h1 className="pb-8 text-gray-600 text-6xl font-normal dark:text-darkMode-white ">
          Únete a{" "}
        </h1>
        <p className="text-gray-400 pb-8 font-Lato text-6xl">CheckINN</p>
      </div>

      <div className="rounded border border-wine">
        <form
          className="justify-end w-96 bg-white dark:bg-darkMode-grey1 p-12"
          onSubmit={handleSubmit}>
          <div className="pb-2">
            <input
              className="w-full p-3 rounded border border-gray-400  dark:bg-darkMode-grey1 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200"
              type="text"
              value={formData.name}
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
            />
            {errors?.name && <p className=" max-w-full">{errors.name}</p>}
          </div>
          <div className="pb-2">
            <input
              className={`p-3 dark:bg-darkMode-grey1 rounded border  w-full ${
                errors?.email ? "border-red-700" : "border-gray-400"
              } outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200`}
              type="text"
              value={formData.email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors?.email && (
              <p className=" text-gray-500 max-w-full">{errors.email}</p>
            )}
          </div>
          <div className="pb-2  max-w-xs">
            <input
              className=" p-3 dark:bg-darkMode-grey1 rounded border border-gray-400  w-full outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200"
              type="password"
              value={formData.password}
              name="password"
              placeholder="*******"
              onChange={handleChange}
            />
            {errors?.password && (
              <p className="text-gray-500 max-w-full">{errors.password}</p>
            )}
          </div>
          {/* ------------------------------------------------------------------------------------ */}
          <div className="pb-2  max-w-xs">
            <input
              className=" p-3 dark:bg-darkMode-grey1 rounded border border-gray-400  w-full outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200"
              type="password"
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
              placeholder="*******"
              onChange={handleChange}
            />
            {errors?.passwordConfirmation && (
              <p className="text-gray-500 max-w-full">
                {errors.passwordConfirmation}
              </p>
            )}
          </div>
          <div className="pb-2">
            <input
              className={`p-3 dark:bg-darkMode-grey1 rounded border  w-full ${
                errors?.phone ? "border-red-700" : "border-gray-400"
              } outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200`}
              type="number"
              value={formData.phone}
              name="phone"
              placeholder="phone"
              onChange={handleChange}
            />
            {errors?.phone && (
              <p className=" text-gray-500 max-w-full">{errors.phone}</p>
            )}
          </div>
          <div className="text-center">
            <button
              className={`inline-block cursor-pointer w-full max-w-xs p-4 rounded-lg ${
                isLoading ||
                !(formData.email.trim() && formData.password.trim())
                  ? "opacity-60 pointer-events-none bg-gray-900 text-gray-600"
                  : "bg-white text-gray-500 hover:bg-blue-500 hover:text-white"
              } text-lg mt-0 transition duration-200`}
              type="submit"
              disabled={
                isLoading ||
                !(formData.email.trim() && formData.password.trim())
              }>
              {isLoading ? "Enviando..." : "Registrarse"}
            </button>
          </div>

          <div className="inline-block pb-8 pt-5  dark:text-darkMode-white">
            ¿Ya estás registrado? <br />
            <br />
            <Link href="/login">
              <span className="text-wine hover:text-red-900 transition-colors duration-100">
                Iniciar Sesion
              </span>
            </Link>
            <br />
          </div>

          {isSuccess && (
            <span className="inline-block mt-2 rounded bg-green-500 text-white p-2">
              ¡Registro exitoso!
            </span>
          )}
          {!isSuccess && (errors.submit || errorStateBack) && (
            <span className="inline-block   w-1/2 rounded bg-red-500 text-white p-2 mt-2">
              {errors.submit || errorStateBack}
            </span>
          )}
          <div className="flex mt-11 bg-white dark:bg-darkMode-grey1 mb-10 px-1 flex-row items-center">
            <hr className="w-9/12 border-gray-400"></hr>
            <p className="mx-4 dark:text-darkMode-white">o</p>
            <hr className="w-9/12 border-gray-400"></hr>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="rounded-3xl  mb-0 px-0 w-full border-2 border-grey3  hover:border-blueGoogle font-plus-jakarta-sans">
            <div className="flex flex-row p-2">
              <Image
                className="justify-start"
                src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg"
                alt="Google icon"
                width={24} // Ajusta el ancho según sea necesario
                height={24} // Ajusta la altura según sea necesario
              />
              {!errorStateGoogle ? (
                <p className="justify-center text-base pl-5 dark:text-darkMode-white">
                  {isLoadingGoogle ? "Enviando..." : "Continuar con Google"}
                </p>
              ) : (
                <p className="justify-center pl-5">{errorStateGoogle}</p>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
