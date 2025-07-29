import { useEffect, useState } from "react";
import { postData } from "./api";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [numberOfCalls, setNumberOfCalls] = useState<number>(0);
  const [receivedData, setReceivedData] = useState<string>("");
  const [flag, setFlag] = useState<"success" | "danger" | "default">("default");

  useEffect(() => {
    setInputValue("");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setResponseMessage("Enviando dados...");
    setFlag("default");
    await postData({ value: inputValue }).then((response) => {
      setResponseMessage(response.message);
      if (response.flag) {
        setFlag(response.flag);
      } else {
        setFlag("danger");
      }
      const { flag, ...responseWithoutFlag } = response;
      setReceivedData(JSON.stringify(responseWithoutFlag, null, 2));
      setNumberOfCalls(response.data);
      console.log(response);
    });
    setTimeout(() => {
      setResponseMessage("");
      setFlag("default");
    }, 3000);
  };

  return (
    <div className="bg-gray-100 text-gray-800 flex flex-col justify-between relative">
      <div className="flex flex-col h-[100vh] justify-between bg-blue-900">
        <nav className="bg-blue-900 p-4">
          <h1 className="text-white text-3xl font-bold text-center">
            Avaliação Progressiva II - Linguagem de Programação Scrip
          </h1>
        </nav>
        <main className="w-[80%] h-full mx-auto p-8 flex flex-row gap-8 align-center justify-center">
          <aside className="w-[50%] h-[100%] bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Dados Recebidos</h2>
            <h3 className="mb-4 font-medium text-lg mt-10">
              Número de vezes que o servidor recebeu esse valor:
            </h3>
            <p
              className="text-lg mb-4 text-center text-[200px]"
              id="number-of-calls"
            >
              {numberOfCalls}
            </p>
            <pre id="received-data" className="bg-gray-100 p-4 rounded">
              {receivedData}
            </pre>
          </aside>
          <section className="w-[50%] self-center h-[100%] bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Formulário</h2>
            <form
              className="bg-white p-6 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="text-input-1"
                className="block text-lg mb-2 font-bold"
              >
                Insira um valor:
              </label>
              <input
                type="text"
                id="text-input-1"
                className="border border-gray-300 p-2 w-60 mb-4"
                placeholder="Digite um valor"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <input
                type="submit"
                id="myButton"
                value="Enviar"
                className="bg-blue-500 ml-4 text-white px-4 py-2 rounded hover:bg-blue-600"
              />
              <p
                id="response-message"
                className={`mt-4 text-lg 
                ${flag === "default" ? "text-gray-600" : ""}
                ${flag === "success" ? "text-green-600" : ""}
                ${flag === "danger" ? "text-red-600" : ""}`}
              >
                {responseMessage}
              </p>
            </form>
            <h3 className="mb-4 font-medium text-lg mt-10">Checklist</h3>
            <ol className="mt-8 list-decimal pl-6 space-y-2 text-gray-700 text-base">
              <li>
                <strong>Frontend: React</strong>
                <ul className="list-disc pl-6">
                  <li>
                    Uma caixa de texto onde o usuário possa inserir um valor
                    (por exemplo, um número).
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅
                    </span>
                  </li>
                  <li>
                    Um botão que, quando pressionado, envie o conteúdo da caixa
                    de texto para o servidor.
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅
                    </span>
                  </li>
                  <li>
                    Após receber uma resposta do servidor, exiba na página o
                    número de vezes que o valor enviado foi recebido pelo
                    servidor desde que o mesmo foi iniciado.
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Backend: Express</strong>
                <ul className="list-disc pl-6">
                  <li>
                    Receber o conteúdo enviado pelo frontend (via requisição
                    HTTP, como POST ou GET).{" "}
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅
                    </span>
                  </li>
                  <li>
                    Manter uma contagem de quantas vezes cada valor foi
                    recebido. Para isso, é recomendado usar uma estrutura como
                    uma tabela (por exemplo, em um arquivo ou em uma estrutura
                    de dados na memória).
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅ (./server/data/persistence.json)
                    </span>
                  </li>
                  <li>
                    Retornar o número atualizado de vezes que o valor foi
                    recebido.
                    <span role="img" aria-label="confirmado" className="ml-2">
                      ✅
                    </span>
                  </li>
                </ul>
              </li>
            </ol>
          </section>
        </main>
        <footer className="bg-blue-900 p-4 text-white text-center w-full">
          @2025 - Victor Emanuel Tomaz das Neves - 537516
        </footer>
      </div>
    </div>
  );
}

export default App;
