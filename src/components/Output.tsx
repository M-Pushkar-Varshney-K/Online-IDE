import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, useState, useEffect } from "react";

interface OutputProps {
  output: Array<string> | null;
  loading: boolean;
  error: boolean;
}

const Output: FC<OutputProps> = ({ output, loading, error }) => {
  const [initialMessage, setInitialMessage] = useState(true);

  useEffect(() => {
    if (loading) {
      setInitialMessage(false);
    }
  }, [loading]);

  return (
    <Card className="w-full mx-auto p-4 h-full grid grid-rows-6 min-h-4">
      <h2 className="text-2xl font-bold pb-4">Output</h2>
      <div className="overflow-y-auto bg-black text-white p-2 rounded font-mono">
        {initialMessage ? (
          <p className="text-gray-500">Click run to check your output</p>
        ) : loading ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-[20px] rounded-full" />
            <Skeleton className="w-5/6 h-[20px] rounded-full" />
          </div>
        ) : output && output.length > 0 ? (
          output.map((line, index) => (
            <p key={index} className={error ? `text-red-600` : `text-white`}>
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No output available</p>
        )}
      </div>
    </Card>
  );
};

export default Output;
