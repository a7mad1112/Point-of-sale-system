import { useState } from "react";

type PutData = {
  id: number;
  title: string;
  body: string;
};

type PutResponse = {
  id: number;
  title: string;
  body: string;
};

const usePut = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PutResponse | null>(null);

  const putData = async (data: PutData) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update data");
      }
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError((error as Error).message || "Error updating data");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, putData };
};

export default usePut;
