import { useState } from "react";

type PostData = {
  data: {
    name: string;
  };
};

type PostResponse = {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
    };
  };
  meta: Record<string, unknown>;
};

const usePost = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PostResponse | null>(null);

  const postData = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token") || "";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to post data");
      }
      // console.log("res ", responseData)
      setResponse(responseData);
    } catch (error) {
      setError((error as Error).message || "Error posting data");
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, response, postData };
};

export default usePost;
