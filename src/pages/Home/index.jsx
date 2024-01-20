import Agents from "../../componentes/Agents";
import React, { useEffect, useState } from "react";
import valorant from "../../img/nome valorant.png";
import lupa from "../../img/icone-lupa.svg";
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";


export default function Home() {
  const [datas, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch(
        "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
      );
      const json = await response.json();
      setData(json.data);
      setInitialData(json.data);
    }
    fetchApi();
  }, []);

  function handleChange(event) {
    const valor = event.target.value;
    if (!valor) {
      setData(initialData);
      return;
    }

    const filterData = datas.filter((agente) =>
      agente.displayName.toLowerCase().includes(valor.toLowerCase())
    );
    setData(filterData);
  }

  return (
    <>
      <Header />
      <div className="main">
        <img src={valorant} alt="nome valorant" />

        <form>
          <input
            type="text"
            name="name"
            placeholder="Procurar agentes..."
            onChange={handleChange}
          />
          <div>
            <img src={lupa} />
          </div>
        </form>
      </div>
      {datas && <Agents dado={datas} />}
      <Footer />
    </>
  );
}