import { api } from '../client.js';

export async function play() {
  await api.play();
  console.log('\u25b6\ufe0f  \u64ad\u653e');
}

export async function pause() {
  await api.pause();
  console.log('\u23f8\ufe0f  \u6682\u505c');
}

export async function toggle() {
  let isPlaying = false;
  try {
    const data = await api.status();
    isPlaying = data && data.status === 'playing';
  } catch {
    // status failed, assume not playing
  }
  if (isPlaying) {
    await api.pause();
    console.log('\u23f8\ufe0f  \u6682\u505c');
  } else {
    await api.play();
    console.log('\u25b6\ufe0f  \u64ad\u653e');
  }
}
