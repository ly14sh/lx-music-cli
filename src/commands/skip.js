import { api } from '../client.js';

export async function next() {
  await api.skipNext();
  console.log('\u23ed\ufe0f  \u4e0b\u4e00\u9996');
}

export async function prev() {
  await api.skipPrev();
  console.log('\u23ee\ufe0f  \u4e0a\u4e00\u9996');
}
