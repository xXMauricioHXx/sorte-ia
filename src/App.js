import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseGameScreen from "./pages/ChooseGameScreen";
import Footer from "./components/Footer";
import "./App.css";
import PaymentScreen from "./pages/PaymentScreen";
import ResultScreen from "./pages/ResultScreen";
import GamesList from "./pages/GamesList";

function App() {
  const [paymentData, setPaymentData] = useState();
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  return (
    <>
      <Router>
        <div className="container mt-5 flex-column min-vh-90">
          <div className="row">
            <h1 className="unlock-regular logo text-center">Sorte.IA</h1>{" "}
          </div>
          <Routes>
            {/* Rota para escolher jogos */}
            <Route
              path="/"
              element={<ChooseGameScreen setPaymentData={setPaymentData} />}
            />
            <Route
              path="/pagamento/:orderId"
              element={
                <PaymentScreen
                  paymentData={paymentData}
                  setGeneratedNumbers={setGeneratedNumbers}
                />
              }
            />
            <Route
              path="/resultado/:orderId"
              element={
                <ResultScreen
                  generatedNumbers={generatedNumbers}
                  setGeneratedNumbers={setGeneratedNumbers}
                />
              }
            />
            <Route path="/jogos/:email" element={<GamesList />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
