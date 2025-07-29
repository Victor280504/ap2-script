import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const updatePersistenceFile = async (data: { value: string }) => {
  const persistenceFilePath = "server/data/persistence.json";
  let result = undefined;
  fs.readFile(persistenceFilePath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading persistence file:", err);
      return;
    }
    const parsedData = JSON.parse(jsonData);

    if (!parsedData.data) {
      parsedData.data = [];
    }
    if (!parsedData.lastModified) {
      parsedData.lastModified = new Date().toISOString();
    }
    let valueExists = false;
    if (
      parsedData.data.some(
        (item: { value: string }) => item.value === data.value
      )
    )
      valueExists = true;

    if (valueExists) {
      parsedData.data = parsedData.data.map(
        (item: { value: string; count: any }) => {
          if (item.value === data.value) {
            item.count = (item.count || 0) + 1;
            return item;
          }
          return item;
        }
      );
    } else {
      parsedData.data.push({ value: data.value, count: 1 });
    }

    parsedData.lastModified = new Date().toISOString();
    fs.writeFile(
      persistenceFilePath,
      JSON.stringify(parsedData, null, 2),
      (err) => {
        if (err) {
          console.error("Error updating persistence file:", err);
        }
      }
    );
    result = parsedData.data.filter(
      (dataItem: { value: string; count: number }) =>
        dataItem.value == data.value
    )[0].count;
  });
  while (result === undefined) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return result;
};

app.post("/api/data", async (req, res) => {
  const receivedData = req.body;
  let numberOfCalls = await updatePersistenceFile(receivedData);
  console.log("Número de chamadas:", numberOfCalls);
  if (numberOfCalls === undefined) {
    return res.status(500).json({
      message: "Erro ao processar o valor recebido.",
    });
  }

  res.status(200).json({
    message: "Valor recebido com sucesso!",
    data: numberOfCalls,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
