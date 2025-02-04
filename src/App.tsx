import axios from "axios";
import { useEffect, useState } from "react";
import { Indicator } from "./components/Indicator";
import { Paragraph } from "./components/Paragraph";

const App = () => {
  const [enable, setEnable] = useState(false); // Estado para controlar a visibilidade do modal de configurações
  const [machine, setMachine] = useState("Carregando..."); // Estado para armazenar o nome da máquina
  const [datetime, setDatetime] = useState("Carregando..."); // Estado para armazenar o horário atual
  const [performance, setPerformance] = useState(0); // Estado para armazenar a quantidade de peças produzidas
  const [goal, setGoal] = useState(20); // Estado para armazenar a meta de produção
  const [rate, setRate] = useState(1000); // Estado para armazenar o tempo para produzir uma peça
  const [rateGoal, setRateGoal] = useState(55); // Estado para armazenar a meta de PC/Min
  const [rateDayGoal, setRateDayGoal] = useState(0); // Estado para armazenar a meta do dia

  useEffect(() => {
    // Hook para buscar o nome da máquina
    const request = async () => {
      // Requisição HTTP utilizando Axios para buscar o nome da máquina na API externa
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setMachine(response.data.name);
    };
    request();
  }, []);

  useEffect(() => {
    // Hook para buscar o horário atual a cada segundo
    const interval = setInterval(() => {
      setDatetime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Hook para simular a performance da máquina, a cada 5 segundos aumenta em 1 a quantidade de peças produzidas
    const interval = setInterval(() => {
      setPerformance((prevCount) => prevCount + 1);
    }, rate);

    return () => clearInterval(interval);
  }, [rate]);

  return (
    <>
      <div className="h-screen w-screen grid grid-rows-12 p-2 gap-1 select-none">
        {enable && (
          <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 shadow-lg flex flex-col gap-4 rounded-md sahdow border border-neutral-200">
              <p className="text-lg">Configurações</p>
              <label htmlFor="rate">
                {" "}
                Tempo para uma peça (Em milissegundos){" "}
              </label>
              <input
                id="rate"
                type="number"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="p-2 focus:outline-none bg-stone-100 rounded-md"
              />
              <label htmlFor="goal">Meta de produção</label>
              <input
                id="goal"
                type="number"
                value={goal}
                onChange={(event) => setGoal(Number(event.target.value))}
                className="p-2 focus:outline-none bg-stone-100 rounded-md"
              />
              <label htmlFor="rateDayGoal">Meta do dia</label>
              <input
                id="rateDayGoal"
                type="number"
                value={rateDayGoal}
                onChange={(event) => setRateDayGoal(Number(event.target.value))}
                className="p-2 focus:outline-none bg-stone-100 rounded-md"
              />
              <label htmlFor="rateGoal">Meta de PC/Min</label>
              <input
                id="rateGoal"
                type="number"
                value={rateGoal}
                onChange={(event) => setRateGoal(Number(event.target.value))}
                className="p-2 focus:outline-none bg-stone-100 rounded-md"
              />
              <button
                className="col-span-2 p-2 mt-2 bg-blue-500 text-white rounded-md"
                onClick={() => setEnable(false)}
              >
                {" "}
                Fechar{" "}
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 grid-rows-1 row-span-1 md:row-span-1 lg:row-span-1 gap-1">
          <p
            className="grid items-center justify-center text-center h-full shadow-md text-lg md:text-xl lg:text-3xl"
            onClick={() => setEnable(!enable)}
          >
            {machine}
          </p>
          <p className="grid items-center justify-center text-center h-full shadow-md text-lg md:text-xl lg:text-3xl">
            {datetime}
          </p>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 row-span-1 md:row-span-1 lg:row-span-1 gap-1">
          <p className="grid items-center justify-center text-center h-full shadow-md text-lg md:text-xl lg:text-3xl">
            Produto não cadastrado
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 row-span-4 md:row-span-6 lg:row-span-6 gap-1">
          <p className="grid items-center justify-center text-center h-full shadow-md text-4xl md:text-6xl lg:text-8xl">
            {performance} PC
          </p>
          <ul className="flex flex-col items-center justify-around text-center h-full shadow-md">
            <p className="text-4xl py-4 w-full">PC/Min</p>
            <li
              className={`flex h-full w-full items-center justify-around ${
                60000 / rate >= rateGoal
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              <Paragraph text="Atual:" />
              <Paragraph text={60000 / rate} />
            </li>
            <li className="flex h-full w-full items-center justify-around">
              <Paragraph text="No dia:" />
              <Paragraph text={rateDayGoal} />
            </li>
            <li className="flex h-full w-full items-center justify-around">
              <Paragraph text="Meta:" />
              <Paragraph text={rateGoal} />
            </li>
          </ul>
        </div>
        <div className="row-span-2 md:row-span-2 lg:row-span-2">
          <div className="grid grid-cols-3 h-full gap-1">
            <Indicator
              name="Meta - PC"
              value={goal}
              goal={performance}
              direction="down"
            />
            <Indicator
              name="Meta - %"
              value={(performance / goal) * 100}
              goal={100}
              direction="up"
            />
            <Indicator name="Retrabalho" value={0} goal={0} direction="down" />
          </div>
        </div>
        <div className="row-span-4">
          <div className="grid grid-rows-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 h-full gap-1">
            <Indicator
              name="Disponibilidade"
              value={39.1}
              goal={25}
              direction="down"
            />
            <Indicator
              name="Performace"
              value={120.5}
              goal={75}
              direction="up"
            />
            <Indicator
              name="Qualidade"
              value={100.0}
              goal={80}
              direction="up"
            />
            <Indicator name="OEE" value={47.1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
