// env init is string => type
export function wrapperEnv(env: Recordable): ViteEnv {
  // 默认值
  const ret: ViteEnv = {
    VITE_PORT: 8080,
    VITE_PUBLIC_PATH: "",
    VITE_PROXY_DOMAIN: "",
    VITE_PROXY_DOMAIN_REAL: "",
    VITE_ROUTER_HISTORY: "",
    VITE_GLOB_APP_TITLE: "",
    VITE_LEGACY: false
  };

  for (const envName of Object.keys(env)) {
    let realName = env[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
