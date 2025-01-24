import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import LanguageSelector from "./components/LanguageSelector";
import CodeEditor from "./components/CodeEditor";
import Input from "./components/Input";
import Output from "./components/Output";
import { CODE_SNIPPETS } from "@/constants";

type SupportedLanguage = keyof typeof CODE_SNIPPETS;

function App() {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [Value, setValue] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSelect = (language: SupportedLanguage) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-4 py-4">
        <LanguageSelector onSelect={onSelect} />
        <div className="flex gap-2 h-max">
          <ResizableBox
            className="resize-vertical h-max"
            width={window.innerWidth * 0.7}
            minConstraints={[window.innerWidth * 0.3, 300]}
            maxConstraints={[window.innerWidth * 0.7, 1000]}
            axis="x"
          >
            <CodeEditor
              language={language}
              Value={Value}
              setOutput={setOutput}
              input={input}
              setLoading={setLoading}
              setError={setError}
            />
          </ResizableBox>
          <div className="flex-1 flex flex-col gap-2">
            <ResizableBox
              className="resize-horizontal"
              height={window.innerHeight * 0.4}
              minConstraints={[200, window.innerHeight * 0.2]}
              maxConstraints={[500, window.innerHeight * 0.6]}
              axis="y"
            >
              <Input setInput={setInput} />
            </ResizableBox>
            <div className="flex-1">
              <Output output={output} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
