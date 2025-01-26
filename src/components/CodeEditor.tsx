import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Play, Share, Save, Braces, Plus } from "lucide-react";
import { executeCode } from "@/api";
import {
  CODE_SNIPPETS,
  EXTENSIONS_TO_LANGUAGES,
  LANGUAGE_EXTENSIONS,
} from "@/constants";
import { saveAs } from "file-saver";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState(Value);
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState("Main");

  const [files, setFiles] = useState<
    Array<{ name: string; extension: string }>
  >([{ name: "Main", extension: LANGUAGE_EXTENSIONS[language] }]);

  const handleFile = (file: string) => {
    const [name, extension] = file.split(".");
    if (files.some((f) => f.name === name && f.extension === extension)) {
      toast({
        variant: "destructive",
        title: "File name already exists!",
        description: "Use a different name or extension",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    if (!extension) {
      toast({
        variant: "destructive",
        title: "Extenstion missing!",
        description: "Please provide a file extension!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    console.log("Creating file", name, extension);
    setFiles((prevFiles) => [...prevFiles, { name, extension }]);
  };

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
      <Tabs defaultValue={files[0].name} className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <TabsList className="flex space-x-2 ">
              {files.map((file) => (
                <TabsTrigger value={file.name} key={file.name}>
                  {file.name}
                  {"."}
                  {file.extension}
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
                      <Button
                        type="submit"
                        onClick={() => handleFile(fileName)}
                      >
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

          <div className="flex space-x-2">
            {/* Toggle theme */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
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
        </div>
        {files.map((file) => (
          <TabsContent value={file.name} key={file.name}>
            <Editor
              height="75vh"
              width={"100%"}
              theme={theme === "dark" ? "vs-dark" : "light"}
              language={EXTENSIONS_TO_LANGUAGES[file.extension]}
              onMount={onMount}
              value={
                CODE_SNIPPETS[EXTENSIONS_TO_LANGUAGES[file.extension]] || value
              }
              onChange={(value) => setValue(value || "")}
              options={{
                fontFamily: "Consolas, 'Courier New', monospace",
                fontSize: 16,
                tabSize: 4,
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default CodeEditor;
