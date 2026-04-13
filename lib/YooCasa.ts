import axios from "axios";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  // Сделай запрос к API Юкассы
  const { data } = await axios.post(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      // capture: true,
      description: details.description,

      // когда платеж будет успшеный мы возьмем этот order_id и скажим супер оплата произведена
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: "http://localhost:3000/?paid",
      },
    },

    {
      auth: {
        username: "462829", // Твой логин Юкассы
        password: "test_98fubqi3CzTE6_uCKi8P37k2OJW2xHcRNU87VlAcW4c", // Твой пароль Юкассы
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
