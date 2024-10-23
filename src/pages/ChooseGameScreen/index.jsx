import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import HowItWorks from "../../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import { getPacks } from "../../service/packs";
import { getProducts } from "../../service/products";
import { createPayment } from "../../service/payment";
import { BRLFormat } from "../../utils/currency";

function ChooseGameScreen({ setPaymentData }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedGame, setSelectedGame] = useState({});
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState();

  const handleSearchGames = () => {
    navigate(`/jogos/${searchEmail}`);
  };

  useEffect(() => {
    setLoading(true);
    getPacks()
      .then((packs) => {
        setGames(packs);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    getProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    const orderId = uuid();
    createPayment(orderId, email, selectedGame.id, selectedProduct)
      .then((result) => {
        setPaymentData({
          selectedGame,
          qrcode: result.point_of_interaction.transaction_data.qr_code,
        });
        setLoading(false);
        navigate(`/pagamento/${orderId}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(`Failed to create payment - ${err.message}`);
      });
  };

  const handleNumOfGames = (numOfGames) => {
    const selectedGame = games.find((item) => item.numOfGames === numOfGames);
    const mutatedGames = games.reduce((mudatedGames, item) => {
      const data = {
        ...item,
        selected: item.numOfGames === numOfGames,
      };

      mudatedGames.push(data);
      return mudatedGames;
    }, []);

    setGames(mutatedGames);
    setSelectedGame(selectedGame);
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
        <div className="row mt-4">
          <div className="col-12 col-lg-5">
            <HowItWorks />
            <div className="search-games mt-4">
              <label>Procurar jogos gerados pelo seu e-mail:</label>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control searchInput"
                  placeholder="example@example.com"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSearchGames}
                  disabled={!searchEmail}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 d-flex flex-column justify-content-between">
            <div>
              <div className="row">
                <div className="col d-flex justify-content-center flex-column">
                  <label>Selecione a loteria:</label>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label="Large select example"
                    value={selectedProduct}
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);
                    }}
                  >
                    <option value="" selected={true}>
                      Selecione uma loteria
                    </option>
                    {products?.map((product) => (
                      <option value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col d-flex justify-content-center flex-column">
                  <label>Informe um e-mail:</label>
                  <div class="input-group input-group-lg">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col d-flex justify-content-center flex-column">
                  <label>Escolha a quantidade de jogos:</label>
                  <div className="row mt-3">
                    {games.map((item, index) => {
                      return index === games.length - 1 ? (
                        <div
                          className={`col-12 mb-3`}
                          onClick={() => handleNumOfGames(item.numOfGames)}
                        >
                          <div
                            className={`game-amount  ${
                              item.selected ? "game-amount-active" : null
                            }`}
                          >
                            {item.numOfGames} Jogos
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`col-12 col-md-6 mb-3 `}
                          onClick={() => handleNumOfGames(item.numOfGames)}
                        >
                          <div
                            className={`game-amount ${
                              item.selected ? "game-amount-active" : null
                            }`}
                          >
                            {item.bestSeller ? (
                              <span className="game-amount-best-seller">
                                Mais vendido
                              </span>
                            ) : null}
                            {item.numOfGames} Jogos
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Preço e Botão de Pagamento */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
              <h4 className="price">{BRLFormat(selectedGame?.price || 0)}</h4>
              <button
                className="btn btn-success button-success mt-2 mt-md-0"
                onClick={handleSubmit}
                disabled={!selectedGame?.price || !email || !selectedProduct}
              >
                Ir para pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChooseGameScreen;
