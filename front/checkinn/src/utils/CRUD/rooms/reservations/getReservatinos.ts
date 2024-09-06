import axios from "axios";

export const getReservationsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/reservations/user/${accountId}`
    );
    // Asegúrate de que response.data sea un array
    if (response && Array.isArray(response.data)) {
      console.log("Estas son las reservas por accountId:", response.data);
      return response.data; // Devuelve el array de reservas
    } else {
      console.error(
        "La respuesta no contiene un array de reservas:",
        response.data
      );
      return []; // Devuelve un array vacío en caso de error
    }
  } catch (error) {
    console.error("Error al obtener las reservas por accountId:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};
