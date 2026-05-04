import { loadConfig, saveConfig } from '../utils.js';

export async function config({ host, port }) {
  const cfg = loadConfig();
  if (host) cfg.host = host;
  if (port) cfg.port = parseInt(port, 10);
  saveConfig(cfg);
  console.log(`\u2699\ufe0f  \u914d\u7f6e\u5df2\u4fdd\u5b58: ${cfg.host}:${cfg.port}`);
}

export async function showConfig() {
  const cfg = loadConfig();
  console.log(`\u2699\ufe0f  \u5f53\u524d\u914d\u7f6e:`);
  console.log(`   host: ${cfg.host}`);
  console.log(`   port: ${cfg.port}`);
}
