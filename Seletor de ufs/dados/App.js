import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

function App() {
  const [ufs, setUfs] = useState([]);
  const [ufSelecionada, setUfSelecionada] = useState();
  const [textoBuscaDigitado, setTextoBuscaDigitado] = useState("");

  useEffect(() => {
    axios.get("https://api-ufs.onrender.com/ufs").then((response) => {
      setUfs(response.data);
    });
  }, []);

  const handleSelecionarUf = (event) => {
    setUfSelecionada(ufs.filter((uf) => uf.id.toString() === event));
    setTextoBuscaDigitado("");
  };

  const handleBuscarUf = (textoDigitado) => {
    setTextoBuscaDigitado(textoDigitado);
    textoDigitado.length >= 3
      ? setUfSelecionada(
          ufs.filter((uf) =>
            uf.nome.toLowerCase().includes(textoDigitado.toLowerCase())
          )
        )
      : null;
  };

  return (
    <main>
      <h1>Seletor de UFs</h1>
      <div className="container-principal">
        <div className="comboBox">
          <div className="campoDeBusca">
            <input
              type="text"
              placeholder="Digite o nome da UF"
              value={textoBuscaDigitado}
              onChange={(event) => handleBuscarUf(event.target.value)}
            />
          </div>
          <div className="campoDeSelecao">
            <select
              name="uf"
              id="uf"
              onChange={(event) => handleSelecionarUf(event.target.value)}
            >
              <option value="0">Selecione UF</option>
              {ufs.map((uf) => (
                <option key={uf.id} value={uf.id}>
                  {uf.uf}
                </option>
              ))}
            </select>
          </div>
        </div>
        {ufSelecionada?.length > 0 &&
          ufSelecionada.map((uf) => (
            <div className="card" key={uf.id}>
              <p>Sigla: {uf.uf}</p>
              <p>Código IBGE: {uf.id}</p>
              <p>Nome: {uf.nome}</p>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
