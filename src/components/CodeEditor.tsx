import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Play, Share, Save, Braces } from "lucide-react";
import { executeCode } from "@/api";
import { CODE_SNIPPETS } from "@/constants";
import { saveAs } from "file-saver";

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
      console.log("Code " + result);
      result.stderr ? setError(true) : setError(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoad(false);
      console.log("Code execution completed");
    }
  };

  const handleShare = () => {
    console.log("Sharing code");
    // Implement code sharing logic here
  };

  const handleSave = () => {
    console.log("Saving code");
    if (editorRef.current) {
      // const code = editorRef.current.getValue();
      console.log(
        "Code:",
        editorRef.current.getModel().getLanguageId().language
      );
      // const language = editorRef.current.getModel().getLanguageId().language;
      // const extension = language === "javascript" ? "js" : language;
      // const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      // saveAs(blob, `code.${extension}`);
    }
  };
  const handleFormat = () => {
    if (!editorRef.current) return;
    editorRef.current.getAction("editor.action.formatDocument").run();
  };
  return (
    <Card className="w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{language}</h2>
        <div className="flex space-x-2">
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
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRun(input)}
            disabled={load}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleFormat}>
            <Braces className="h-4 w-4" />
          </Button>
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
