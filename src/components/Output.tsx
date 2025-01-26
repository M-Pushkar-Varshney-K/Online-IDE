import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <ScrollArea className="w-full h-5/6 bg-black rounded ">
        <div className="h-full text-white p-2 font-mono">
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
      </ScrollArea>
    </Card>
  );
};

export default Output;
