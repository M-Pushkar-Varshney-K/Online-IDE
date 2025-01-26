import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

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
    <Card className="flex flex-col justify-evenly w-full h-full px-4 py-2">
      <Label className="text-2xl font-bold overflow-hidden min-h-[40px]">
        Output
      </Label>
      <div className="w-full h-5/6 bg-black text-white p-2 rounded font-mono overflow-y-scroll">
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
