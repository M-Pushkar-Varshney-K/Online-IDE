import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { executeCode } from "@/api";
import {
  CODE_SNIPPETS,
  EXTENSIONS_TO_LANGUAGES,
  LANGUAGE_EXTENSIONS,
} from "@/constants";
import { saveAs } from "file-saver";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Actions from "@/components/Actions"; // Adjust path as needed
import FileActions from "@/components/FileActions";

interface CodeEditorProps {
  language: string;
  Value: string;
  setOutput: (output: Array<string>) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  Value,
  setOutput,
  input,
  setLoading,
  setError,
}) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<string>("dark");
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>(Value);
  const [load, setLoad] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("Main");

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
        title: "Extension missing!",
        description: "Please provide a file extension!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    toast({
      variant: "default",
      title: "File created successfully!",
      description: `File ${name}.${extension} created successfully`,
    });
    setFiles((prevFiles) => [...prevFiles, { name, extension }]);
  };

  setLoading(load);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRun = async (input: string) => {
    if (!editorRef.current) return;
    const language = editorRef.current.getModel().getLanguageId();
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
      toast({
        title: "Code URL copied to clipboard!",
        description: "Share the URL with your friends",
        action: <ToastAction altText="Got it">Got it</ToastAction>,
      });
    });
  };

  const handleSave = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const language = editorRef.current.getModel().getLanguageId();
      const extension = LANGUAGE_EXTENSIONS[language];
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `Main.${extension}`);
      toast({
        title: "Code saved successfully!",
        description: `File Main.${extension} saved successfully`,
      });
    }
  };

  const handleFormat = () => {
    if (!editorRef.current) return;
    editorRef.current.getAction("editor.action.formatDocument").run();
  };

  return (
    <Card className="w-full p-4 space-y-4">
      <Tabs defaultValue={files[0].name} className="flex flex-col">
        <div className="flex justify-between items-center" id="FileActions">
          <FileActions
            handleFile={handleFile}
            fileName={fileName}
            setFileName={setFileName}
            files={files}
          />

          <Actions
            theme={theme}
            setTheme={setTheme}
            handleRun={handleRun}
            handleShare={handleShare}
            handleSave={handleSave}
            handleFormat={handleFormat}
            load={load}
            input={input}
          />
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
