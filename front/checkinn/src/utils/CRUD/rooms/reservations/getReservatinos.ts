import axios from "axios";

export const getReservationsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/accounts/${accountId}`
    );
    // Asegúrate de que response.data sea un array
    if (response && Array.isArray(response.data.reservation_)) {
      console.log("Esta es la reservation by accountId:", response.data);
      return response.data.reservation_; // Devuelve el array de reservas
    } else {
      console.error(
        "La respuesta no contiene un array de reservas:",
        response.data
      );
      return []; // Devuelve un array vacío en caso de error
    }
  } catch (error) {
    console.error("Error al obtener la reservation por accountId:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};
