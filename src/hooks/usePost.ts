import { useState } from "react";

type PostData = {
  title: string;
  body: string;
};

type PostResponse = {
  id: number;
  title: string;
  body: string;
};

const usePost = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PostResponse | null>(null);

  const postData = async (data: PostData) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to post data");
      }
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError((error as Error).message || "Error posting data");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, postData };
};

export default usePost;