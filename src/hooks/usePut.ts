import { useState } from "react";
import { isLoadingActions } from "../store/states/loaderSlice";
import { useDispatch } from "react-redux";

type PutData =
  | any
  | {
      data: {
        name: string;
      };
    };

type PutResponse = {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
    };
  };
};
const usePut = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PutResponse | null>(null);
  const dispatch = useDispatch();
  const putData = async (data: PutData) => {
    setLoading(true);
    try {
      dispatch(isLoadingActions.setIsLoading(true));
      const token = localStorage.getItem("token") || "";
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      alert(error)
    } finally {
      dispatch(isLoadingActions.setIsLoading(false));
      setLoading(false);
    }
  };

  return { loading, error, response, putData };
};

export default usePut;
