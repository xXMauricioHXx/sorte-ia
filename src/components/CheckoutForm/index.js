import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ onSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // Crie o pagamento
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Pagamento realizado com sucesso:", paymentMethod);
      // Aqui você chamaria a API para gerar os números após o pagamento
      onSubmit();
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
