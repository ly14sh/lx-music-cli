import { api } from '../client.js';
import { printStatus } from '../utils.js';

export async function status() {
  const data = await api.status();
  printStatus(data);
}

export async function lyric() {
  const text = await api.lyric();
  if (!text || !text.trim()) {
    console.log('\u26a0\ufe0f  \u6682\u65e0\u6b4c\u8bcd');
    return;
  }
  console.log(text);
}

export async function now() {
  const data = await api.status();
  printStatus(data);
}
