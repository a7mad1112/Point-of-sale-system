import { useState } from "react";

type DeleteResponse = {
  success: boolean;
  message?: string;
};

const useDelete = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<DeleteResponse | null>(null);

  const deleteData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete data");
      }
      setResponse(data);
      setError(null);
    } catch (error) {
      setError((error as Error).message || "Error fetching data");
      alert(error);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, deleteData };
};

export default useDelete;
