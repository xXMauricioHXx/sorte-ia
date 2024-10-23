import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { BRLFormat } from "../../utils/currency";
import { getOrderById } from "../../service/order";

function PaymentScreen({ paymentData, setGeneratedNumbers }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const { orderId } = useParams();
  const [isPooling, setIsPooling] = useState(true);
  const navigate = useNavigate();

  const { selectedGame, qrcode } = paymentData || {};

  useEffect(() => {
    let interval;

    if (isPooling) {
      interval = setInterval(() => {
        getOrderById(orderId).then((result) => {
          if (result?.games?.length) {
            setIsPooling(false);
            setGeneratedNumbers(
              result.games.map((item) => {
                return item.games;
              })
            );
            navigate(`/resultado/${orderId}`);
          }
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate(`/`);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return paymentData ? (
    <div className="container mt-5 payment-screen">
      <div className="product-details mt-4">
        <ul className="list-unstyled">
          <li className="details-item">
            <span className="detail-text">Total de jogos escolhidos:</span>
            <span className="detail-value">{selectedGame?.numOfGames}</span>
          </li>
          <li className="details-item">
            <span className="detail-text">Valor:</span>
            <span className="detail-value">
              {BRLFormat(selectedGame?.price)}
            </span>
          </li>
        </ul>
      </div>

      <div className="qrcode-box text-center">
        {qrcode ? <QRCode value={qrcode} /> : null}
      </div>

      <div className="step-by-step mt-4">
        <ol className="step-list">
          <li>Escolha a opção pagar com Pix no aplicativo de seu banco.</li>
          <li>Aponte a câmera para o QRCode exibido na tela.</li>
          <li>Confirme o valor do pagamento e finalize a transação.</li>
        </ol>
      </div>

      <div className="timer mt-4 text-center">
        <p>Tempo restante para o pagamento: {formatTime(timeLeft)}</p>
      </div>
    </div>
  ) : (
    navigate("/")
  );
}

export default PaymentScreen;
