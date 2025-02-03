import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { List } from "./components/List";
import { request } from "./hooks/machine";
import useCurrentTime from "./hooks/datetime";

const App = () => {
  const [value, setValue] = useState(0);
  const [machineName, setMachineName] = useState("Carregando");
  const currentTime = useCurrentTime();

  useEffect(() => {
    const fetchMachineName = async () => {
      const name = await request();
      setMachineName(name);
    };

    fetchMachineName();
  }, []);

  useEffect(() => {
    setValue(value + 1);
  }, [currentTime]);

  return (
    <>
      <div className="grid grid-rows-10 grid-cols-10 h-screen w-screen gap-1 p-2 select-none">
        <Card rowSpan="row-span-1" colSpan="col-span-10">
          <Card gridCol="grid-cols-2" color="bg-yellow-300">
            <Card>
              <p className="text-xl font-semibold">{machineName}</p>
            </Card>
            <Card>
              <div className="text-xl font-semibold">
                {currentTime.toLocaleDateString()}{" "}
                {currentTime.toLocaleTimeString()}
              </div>
            </Card>
          </Card>
        </Card>
        <Card rowSpan="row-span-1" colSpan="col-span-10">
          <Card color="bg-yellow-300 text-xl font-semibold">
            Produto não cadastrado
          </Card>
        </Card>
        <Card rowSpan="row-span-4" colSpan="col-span-10" gridCol="grid-cols-4">
          <Card color="bg-yellow-300" colSpan="col-span-3">
            <div className="flex justify-center items-center">
              <p className="text-8xl">{value}</p>
              <p className="text-4xl">PC</p>
            </div>
          </Card>
          <Card color="bg-yellow-300">
            <List title="RITMO - PC/min">
              <div className="flex justify-around p-2 bg-green-500 text-lg">
                <p>ATUAL</p>
                <p>240</p>
              </div>
              <div className="flex justify-around p-2 text-lg">
                <p>DIA</p>
                <p>345600</p>
              </div>
              <div className="flex justify-around p-2 text-lg">
                <p>META</p>
                <p>215</p>
              </div>
            </List>
          </Card>
        </Card>
        <Card rowSpan="row-span-2" colSpan="col-span-10" gridCol="grid-cols-3">
          <Card color="bg-yellow-300">
            <List
              title="META PC"
              color={value < 544 ? "bg-red-500" : "bg-green-500"}
            >
              <p className="text-2xl">544</p>
            </List>
          </Card>
          <Card color="bg-yellow-300">
            <List
              title="META %"
              color={value < 544 ? "bg-red-500" : "bg-green-500"}
            >
              <p className="text-2xl">{((value / 544) * 100).toFixed(2)} %</p>
            </List>
          </Card>
          <Card color="bg-yellow-300">
            <List title="Retrabalho">
              <p className="text-2xl">0.0 %</p>
            </List>
          </Card>
        </Card>
        <Card rowSpan="row-span-2" colSpan="col-span-10" gridCol="grid-cols-4">
          <Card color="bg-yellow-300">
            <List title="Disponibilidade">
              <p className="text-2xl">39.1 %</p>
            </List>
          </Card>
          <Card color="bg-yellow-300">
            <List title="Performace">
              <p className="text-2xl">120.5 %</p>
            </List>
          </Card>
          <Card color="bg-yellow-300">
            <List title="Qualidade">
              <p className="text-2xl">100.0%</p>
            </List>
          </Card>
          <Card color="bg-yellow-300">
            <List title="OEE">
              <p className="text-2xl">47.1 %</p>
            </List>
          </Card>
        </Card>
      </div>
    </>
  );
};

export default App;
