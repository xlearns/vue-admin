import { fileURLToPath, URL } from "url";
const url = "./../../";
const alias = {
  "@": fileURLToPath(new URL(`${url}src`, import.meta.url)),
  "@c": fileURLToPath(new URL(`${url}src/components`, import.meta.url)),
  "@build": fileURLToPath(new URL(`${url}build`, import.meta.url))
};
export default alias;
