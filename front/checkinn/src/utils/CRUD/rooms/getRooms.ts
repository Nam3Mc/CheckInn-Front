import axios from "axios";

export const getRooms = async () => {
  try {
    const response = await axios.get("http://localhost:8080/Rooms");
    if (response) console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error get rooms");
  }
};
export const getRoomsByID = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/Rooms/${id}`);
    if (response) console.log("Esta es la data by ID:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error al obtener la habitación por ID:", error);
  }
};
