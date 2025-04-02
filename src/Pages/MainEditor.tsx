import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "../components/CodeEditor";
import Input from "../components/Input";
import Output from "../components/Output";

// PROBLEMS:
// on changing the theme it doesn't chnage the color of file name from black to white...
// Cann't distinguish between the editor and "files name div" on light mode....

function MainEditor() {
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground p-4">
      <ResizablePanelGroup direction="vertical" className="h-full">
        <ResizablePanel defaultSize={90} minSize={90} maxSize={90}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={70}
              minSize={30}
              maxSize={80}
              className="gap-2"
            >
              <CodeEditor
                setOutput={setOutput}
                input={input}
                setLoading={setLoading}
                setError={setError}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20} maxSize={80}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
                  <Input setInput={setInput} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
                  <Output output={output} loading={loading} error={error} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default MainEditor