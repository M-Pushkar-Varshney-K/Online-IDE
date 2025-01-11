import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../Constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const Lang = ({ selectedLanguage, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <button
          onClick={toggleDropdown}
          style={{
            padding: "10px 15px",
            borderRadius: "12px",
            border: "1px solid #333",
            backgroundColor: "#1E90FF",
            cursor: "pointer",
            width: "111px",
            textAlign: "center",
            color: "#f0f0f0",
            fontWeight: "500",
            boxShadow: "0 4px 8px rgba(15, 17, 28, 0.55)",
          }}
        >
          {selectedLanguage || "Select a Language"}
        </button>

        {isOpen && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              margin: "10px 0 0",
              padding: "10px 0",
              listStyle: "none",
              border: "1px solid #333",
              backgroundColor: "#2a2a3d",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
              zIndex: 1000,
              minWidth: "200px",
            }}
          >
            {languages.map(([lang, ver]) => (
              <li
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  color: lang === selectedLanguage ? "#4caf50" : "#f0f0f0",
                  backgroundColor:
                    lang === selectedLanguage ? "#1e1e30" : "transparent",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#33334d";
                  e.target.style.color = "#4caf50";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    lang === selectedLanguage ? "#1e1e30" : "transparent";
                  e.target.style.color =
                    lang === selectedLanguage ? "#4caf50" : "#f0f0f0";
                }}
              >
                {lang} - {ver}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Lang;
