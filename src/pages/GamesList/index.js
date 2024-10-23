import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BRLFormat } from "../../utils/currency";
import { getOrderByEmail } from "../../service/order";

export default function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

  const handleGenerateGames = () => {
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    getOrderByEmail(email).then((result) => {
      setGames(result);
      setLoading(false);
    });
  }, [email]);

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
        <div className="container mt-5">
          <h1 className="text-center mb-4">Meus Jogos</h1>
          {games.length > 0 ? (
            <table className="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                  <th>Loteria</th>
                  <th>Quantidade de Jogos</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id}>
                    <td>{game.productName}</td>
                    <td>{game.packQuantity}</td>
                    <td>{BRLFormat(game.packPrice)}</td>
                    <td>10/10/2024</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/resultado/${game.id}`)}
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <p className="lead">Nenhum jogo gerado ainda.</p>
              <button className="btn btn-primary" onClick={handleGenerateGames}>
                Gerar Novos Jogos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
