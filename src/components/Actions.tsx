import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Play, Share, Save, Braces } from "lucide-react";

interface ActionsProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  handleRun: (input: string, filename: string) => void;
  handleShare: () => void;
  handleSave: () => void;
  handleFormat: () => void;
  load: boolean;
  input: string;
  filename: string;
}

const Actions: React.FC<ActionsProps> = ({
  theme,
  setTheme,
  handleRun,
  handleShare,
  handleSave,
  handleFormat,
  load,
  input,
  filename,
}) => {
  return (
    <div className="flex space-x-2">
      {/* Toggle theme */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Run The Code */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleRun(input, filename)}
              disabled={load}
            >
              {load ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-green-500"></div>
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Run</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Share the code */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Save the code */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Format the code */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" onClick={handleFormat}>
              <Braces className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Format</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Actions;
