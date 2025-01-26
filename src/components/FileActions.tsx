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

interface FileActionsProps {
  handleFile: (file: string) => void;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  files: Array<{ name: string; extension: string }>;
}

const FileActions: React.FC<FileActionsProps> = ({
  handleFile,
  fileName,
  setFileName,
  files,
}) => {
  return (
    <div className="flex space-x-2">
      <TabsList className="flex space-x-2 ">
        {files.map((file) => (
          <TabsTrigger value={file.name} key={file.name}>
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
