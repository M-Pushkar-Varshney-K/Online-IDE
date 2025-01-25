import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Dispatch, SetStateAction } from "react";

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
}

const Input = ({ setInput }: InputProps) => {
  return (
    <Card className="flex flex-col justify-evenly w-full h-full px-4 py-2">
      <Label
        htmlFor="input"
        className="text-2xl font-bold overflow-hidden min-h-[40px]"
      >
        Input
      </Label>
      <Textarea
        id="input"
        placeholder="Type Your Input here"
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-5/6 p-2 rounded "
      />
    </Card>
  );
};

export default Input;
