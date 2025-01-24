import { Card } from "@/components/ui/card";

import { Dispatch, SetStateAction } from "react";

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
}

const Input = ({ setInput }: InputProps) => {
  return (
    <Card className="w-full mx-auto p-4 grid grid-rows-6">
      <h2 className="text-2xl font-bold row-span-1">Input</h2>
      <div className="flex justify-between items-center row-span-5 border border-foreground rounded">
        <textarea
          className="w-full h-full bg-transparent text-foreground p-2 resize-none"
          placeholder="Type Your Input here"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default Input;
