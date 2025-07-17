import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);
  const fetchHello = async () => {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div>Hello from frontend
      {data ? (
        <div>
          <p>Message: {data.message}</p>
          <p>Timestamp: {data.timestamp}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
