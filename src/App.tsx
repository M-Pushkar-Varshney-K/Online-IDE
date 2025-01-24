import { useState } from "react";
import "./App.css";
import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
// import { ThemeProvider } from "@/components/theme-provider"

import { CODE_SNIPPETS } from "@/constants";
import Input from "./components/Input";
import Output from "./components/Output";

type SupportedLanguage = keyof typeof CODE_SNIPPETS;

function App() {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [Value, setValue] = useState("");
  const onSelect = (language: SupportedLanguage) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-4 py-4">
        <LanguageSelector onSelect={onSelect} />
        <div className="grid gap-1 grid-cols-10">
          <div className="col-span-7">
            <CodeEditor
              language={language}
              Value={Value}
              setOutput={setOutput}
              input={input} // Pass input state to CodeEditor
              setLoading={setLoading}
              setError={setError}
            />
          </div>
          <div className="grid grid-rows-2 gap-1 col-span-3">
            <Input setInput={setInput} />
            <Output output={output} loading={loading} error={error}/>
          </div>
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
}

export default App;
