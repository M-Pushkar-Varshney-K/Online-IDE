import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Play, Share, Save, Braces } from "lucide-react";
import { executeCode } from "@/api";
import { CODE_SNIPPETS, LANGUAGE_EXTENSIONS } from "@/constants";
import { saveAs } from "file-saver";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeEditorProps {
  language: string;
  Value: string;
  setOutput: (output: Array<string>) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
}

const CodeEditor = ({
  language,
  Value,
  setOutput,
  input,
  setLoading,
  setError,
}: CodeEditorProps) => {
  const [theme, setTheme] = useState("dark");
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState(Value);
  const [load, setLoad] = useState(false);
  setLoading(load);
  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRun = async (input: string) => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setLoad(true);
      const { run: result } = await executeCode(input, language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setError(true) : setError(false);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setOutput(["Error:", error.message]);
      } else {
        setOutput(["An unknown error occurred"]);
      }
    } finally {
      setLoad(false);
    }
  };

  const handleShare = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    navigator.clipboard.writeText(url).then(() => {
      alert("Code URL copied to clipboard!");
    });
  };

  const handleSave = () => {
    console.log("Saving code");
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const language = editorRef.current.getModel().getLanguageId();
      const extension = LANGUAGE_EXTENSIONS[language];
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `Main.${extension}`);
    }
  };
  const handleFormat = () => {
    if (!editorRef.current) return;
    editorRef.current.getAction("editor.action.formatDocument").run();
  };
  return (
    <Card className="w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <h2 className="text-2xl font-bold">
                  Main{LANGUAGE_EXTENSIONS[language]}
                </h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>Selected File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => alert("Plus button clicked!")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Selected Language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex space-x-2">
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
                <p>Change the Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRun(input)}
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
                <p>Click to Run</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      </div>
      <Editor
        height="75vh"
        width={"100%"}
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={language}
        onMount={onMount}
        value={CODE_SNIPPETS[language] || value}
        onChange={(value) => setValue(value || "")}
        options={{
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: 16,
          tabSize: 4,
        }}
      />
    </Card>
  );
};

export default CodeEditor;
