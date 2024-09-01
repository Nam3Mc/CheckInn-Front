import axios from "axios";

interface PaymentPreferenceResponse {
  init_point: string;
}

const useMercadoPago = () => {
  const createPaymentPreference = async (bookingData: { price: number; id: string }): Promise<string> => {
    try {
      if (!bookingData.price || !bookingData.id) {
        throw new Error("Invalid reservation data");
      }

      const requestBody = {
        transaction_amount: bookingData.price,
        description: "Hotel Reservation",
        reservationId: bookingData.id,
      };

      console.log("Request Body:", requestBody); // Verifica el cuerpo de la solicitud

      const response = await axios.post<PaymentPreferenceResponse>(
        "http://localhost:3000/mercadopago/create",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { init_point } = response.data;

      if (init_point) {
        return init_point;
      } else {
        throw new Error("Init point not provided");
      }
    } catch (error) {
      console.error("Error creating payment preference:", error);
      throw new Error("Error creating payment preference. Please try again.");
    }
  };

  return { createPaymentPreference };
};

export default useMercadoPago;
