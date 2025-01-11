import { Editor } from "@monaco-editor/react";
import { PRE_CODE, LANGUAGE_VERSIONS } from "../Constants";
import { useState, useRef } from "react";
import Lang from "./Lang";

const Edit = () => {
    const [theme, setTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(16);
    const [code, SetCode] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("cpp");
    const editRef = useRef();

    window.lang = selectedLanguage;
    window.code = code;
    window.ver = LANGUAGE_VERSIONS[selectedLanguage];
    // console.log(`${selectedLanguage}  ${PRE_CODE[selectedLanguage]}  ${LANGUAGE_VERSIONS[selectedLanguage]}`);
    const onMount = (edit) => {
        editRef.current = edit;
        edit.focus();
    }
    const onSelect = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage);
        SetCode(PRE_CODE[selectedLanguage]);
        window.lang = selectedLanguage;
        window.code = code;
        window.ver = LANGUAGE_VERSIONS[selectedLanguage];
    }

    return (
        <>
        <Lang selectedLanguage={selectedLanguage} onSelect={onSelect}/>
        <div
        style={{
            padding: "10px",
            borderRadius: "12px",
            backgroundColor: "#2a2a3d",
            fontWeight: "500",
            boxShadow: "0 4px 8px rgba(15, 17, 28, 0.55)",
            height: "100%",
          }}
        >
            <Editor
          height="75vh"
          theme={theme}
          language={selectedLanguage.toLowerCase()}
          defaultValue={PRE_CODE[selectedLanguage]}
          value={code}
          onChange={
            (value) => {
            SetCode(value);
            window.code = value;
            // console.log(window.edit_code.toString());
            }
          }
          onMount={onMount}
          options={{
            fontSize: fontSize,
            minimap: { enabled: true },
            lineNumbers: "on",
            smoothScrolling: true,
            wordWrap: "on",
          }}
        />
        </div>
        </>
    );
};

export default Edit;