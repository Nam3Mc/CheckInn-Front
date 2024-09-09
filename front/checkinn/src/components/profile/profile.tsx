"use client"; // Indica que este componente se debe renderizar en el cliente

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userId, setUserId] = useState<string>(""); // Nuevo estado para guardar el ID del usuario

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/accounts");
        console.log(response.data); // Para verificar la estructura de la respuesta

        if (response.data.length > 0) {
          const accountData = response.data[0]; // Obtenemos la data de la cuenta
          const userData = accountData.user; // Obtenemos la data del usuario desde accountData

          // Establecemos los valores en el estado
          setProfilePic(accountData.photo || "");
          setName(userData.name || "");
          setEmail(userData.email || "");
          setPhone(userData.phone || "");
          setUserId(accountData.id); // Guardamos el ID de la cuenta
        }
      } catch (error: any) {
        console.error("Error fetching user data", error.response || error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) return; // Verificamos que se tiene un archivo y un userId

    const formData = new FormData();
    formData.append("file", selectedFile); // Asegúrate de que el campo se llama "file", como está en el controlador

    setUploading(true);
    try {
      // Actualizamos la URL para incluir el ID del usuario en la ruta
      const response = await axios.post(`http://localhost:8080/accounts/${userId}/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfilePic(response.data.imageUrl);
      alert("Profile picture updated!");
    } catch (error: any) {
      console.error("Error uploading image", error.response || error.message);
      alert("Failed to upload image: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h1>

      <div className="flex items-center mb-6 space-x-4">
        <div className="flex-shrink-0">
          <img
            src={profilePic || ""}
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
          />
        </div>
        <div className="flex-1">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
          />
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Picture"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
          <p className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">{name}</p>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <p className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">{email}</p>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
          <p className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
