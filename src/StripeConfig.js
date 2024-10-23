import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("SUA_CHAVE_PUBLICA_STRIPE");

export default stripePromise;
