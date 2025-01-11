import React, { useState } from "react";
import axios from "axios";

const Output = () => {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const runCode = async () => {
    if (!window.code) {
      setOutput(["Please write the code to execute."]);
      return;
    }

    setLoading(true);
    setOutput(["Running your code..."]);
    setError(false);

    try {
      const result = await axios.post("http://localhost:3000/execute", {
        code: window.code,
        lang: window.lang,
        ver: window.ver,
      });

      if (result.data.error) {
        setError(true);
        setOutput([result.data.output, result.data.error]);
      } else {
        const tAm = `Time-Taken: ${result.data.cpuTime} ==== Memory-Used: ${result.data.memory}`;
        const finalOutput = result.data.output.split("\n");
        finalOutput.unshift(tAm); // Add timing info at the start
        finalOutput.push("-------Finished-------"); // Add footer at the end
        setOutput(finalOutput);
      }
    } catch (err) {
      setOutput([`Error: ${err.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        style={{
          margin: "20px 0",
          padding: "10px 15px",
          borderRadius: "12px",
          border: "1px solid #333",
          backgroundColor: "#42a345",
          cursor: "pointer",
          width: "111px",
          textAlign: "center",
          color: "#f0f0f0",
          fontWeight: "500",
          boxShadow: "0 4px 8px rgba(15, 17, 28, 0.55)",
        }}
        onClick={runCode}
      >
        {loading ? "Running..." : "Run Code"}
      </button>
      <output
        style={{
          border: `1px solid ${error ? "#E74C3C" : "#333"}`,
          padding: "10px",
          display: "block",
          height: "90vh",
          backgroundColor: "#2a2a3d",
          color: error ? "#E74C3C" : "#f0f0f0",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          overflowY: "auto",
        }}
      >
        {/* Separate p tags for tAm and F */}
        <p className="timeMemoryInfo">{output.length > 0 && output[0]}</p>
        <div>
          {output.length > 1
            ? output.slice(1).map((line, index) => (
                <div key={index} style={{ whiteSpace: "pre-wrap" }}>
                  {line}
                </div>
              ))
            : "Click 'Run Code' to execute the code"}
        </div>
        <p className="footer">{output.length > 1 && output[output.length - 1]}</p>
      </output>
    </div>
  );
};

export default Output;
