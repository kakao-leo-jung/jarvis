import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const docsPath = path.join(__dirname, "docs")
export const execsPath = path.join(__dirname, "execs")
export const shellPath = path.join(__dirname, "shell")
