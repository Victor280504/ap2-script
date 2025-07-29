type jsonDataType = {
  message: string;
  data: number;
  flag?: "success" | "danger";
};

export async function postData(data: {
  value: string;
}): Promise<jsonDataType> {
  try {
    const response = await fetch("http://localhost:3001/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        message: response.statusText || "Erro ao enviar dados",
        data: 0,
        flag: "danger",
      };
    }

    const jsonData = await response.json();
    return {
      message: jsonData.message,
      data: jsonData.data,
      flag: "success",
    };
  } catch (error) {
    console.error("Post error:", error);
    return {
      message: "Erro ao enviar dados",
      data: 0,
      flag: "danger",
    };
  }
}
