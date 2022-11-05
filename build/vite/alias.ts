import { fileURLToPath, URL } from "url";
const url = "./../../";
const alias = {
  "@": fileURLToPath(new URL(`${url}src`, import.meta.url)),
  "@c": fileURLToPath(new URL(`${url}src/components`, import.meta.url)),
  "@build": fileURLToPath(new URL(`${url}build`, import.meta.url)),
  "@plugins": fileURLToPath(new URL(`${url}src/plugins`, import.meta.url)),
  "@hooks": fileURLToPath(new URL(`${url}src/hooks`, import.meta.url))
};
export default alias;
