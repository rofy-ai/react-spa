import { Calculator } from "@/components/Calculator";
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
   <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-4 text-foreground">
            Liquid Glass
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Beautiful calculator with glass morphism design
          </p>
        </div>
        
        <Calculator />
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Designed with modern glass UI aesthetics</p>
        </div>
      </div>
    </div>
  );
}
