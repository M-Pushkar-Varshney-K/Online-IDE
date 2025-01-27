import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FileActionsProps {
  handleFile: (file: string) => void;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  files: Array<{ name: string; extension: string }>;
  setCurrentFile: React.Dispatch<React.SetStateAction<[string, string]>>;
}

const FileActions: React.FC<FileActionsProps> = ({
  handleFile,
  fileName,
  setFileName,
  files,
  setCurrentFile,
}) => {
  return (
    <div className="flex space-x-2 p-1 rounded-md">
      {/* <ScrollArea className="whitespace-nowrap rounded-md border w-full h-10 max-w-[80%]">
        <div className="flex w-max space-x-4 px-1 py-1 bg-muted">
          {files.map((file) => (
            <Card
              key={file.name}
              className="cursor-pointer bg-muted border-none shadow-none"
            >
              <CardContent
                className="flex items-center space-x-2 px-2 py-1 font-medium text-sm"
                onClick={() => setCurrentFile([file.name, file.extension])}
              >
                <p>
                  {file.name}.{file.extension}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea> */}
      {/* <TabsList className="flex space-x-2 w-full h-10 max-w-[60%] overflow-y-hidden overflow-x-scroll"> */}
      <TabsList className="flex space-x-2 w-full h-10">
        {files.map((file) => (
          <TabsTrigger
            value={file.name}
            key={file.name}
            onClick={() => setCurrentFile([file.name, file.extension])}
          >
            {file.name}.{file.extension}
          </TabsTrigger>
        ))}
      </TabsList>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col space-y-4 p-4">
                <Label htmlFor="input">File Name</Label>
                <Input
                  id="input"
                  placeholder="Type Your file name with extension here"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
                <Button type="submit" onClick={() => handleFile(fileName)}>
                  Submit
                </Button>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FileActions;
