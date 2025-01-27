import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
export const executeCode = async (
  name: string,
  input: string,
  language: string,
  sourceCode: string
) => {
  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          name: name,
          content: sourceCode,
        },
      ],
      stdin: input,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
