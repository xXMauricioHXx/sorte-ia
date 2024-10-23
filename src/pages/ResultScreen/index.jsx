import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";
import { getOrderById } from "../../service/order";

export default function ResultScreen({
  generatedNumbers,
  setGeneratedNumbers,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();

  useEffect(() => {
    setLoading(true);
    getOrderById(orderId).then((result) => {
      setLoading(false);
      if (result?.games?.length) {
        setGeneratedNumbers(
          result.games.map((item) => {
            return item.games;
          })
        );
      }
    });
  }, []);

  const handleNewGame = () => {
    navigate("/");
  };

  return (
    <div>
      {loading && (
        <>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </>
      )}
      {!loading && (
        <main className="container mt-5">
          <div className="row">
            <h1 className="unlock-regular text-center">Resultado dos Jogos</h1>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="p-4 result-box">
                {generatedNumbers && generatedNumbers?.length > 0 ? (
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Jogo</th>
                        <th>Números</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedNumbers?.map((numbers, index) => (
                        <tr key={index}>
                          <td>Jogo {index + 1}</td>
                          <td>
                            {numbers.map((num, i) => (
                              <span key={i} className="number mx-1">
                                {num}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Nenhum número gerado ainda.</p>
                )}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 text-center">
              <button className="btn btn-primary" onClick={handleNewGame}>
                Gerar novos números
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
