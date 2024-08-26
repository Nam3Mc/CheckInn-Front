import Link from "next/link";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-10 bg-greyVivino dark:bg-darkMode-greyVivino p-6 rounded-lg ">
      <Image
        src="/404.png" // Asegúrate de tener una imagen en formato SVG o ajusta la ruta
        alt="404"
        width={400}
        height={300}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold text-wine dark:text-darkMode-wine">
        PAGE NOT FOUND
      </h1>
      <p className="text-lg text-gray-700 dark:text-darkMode-gray mt-4">
        ¡Disculpa! No encontramos la página que estabas buscando.
      </p>
      <Link
        href="/"
        className="mt-6 bg-wine text-green-700 font-bold py-2 px-4 rounded-lg hover:bg-wine-dark transition duration-200"
      >
        Ir al Home
      </Link>
    </div>
  );
};

export default ErrorPage;
