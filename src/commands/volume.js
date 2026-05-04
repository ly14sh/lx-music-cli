import { api } from '../client.js';

export async function volume(val) {
  const num = parseInt(val, 10);
  if (isNaN(num) || num < 0 || num > 100) {
    console.error('\u274c  \u97f3\u91cf\u5fc5\u987b\u662f 0-100 \u4e4b\u95f4\u7684\u6570\u5b57');
    return;
  }
  await api.volume(num);
  console.log(`\ud83d\udd0a  \u97f3\u91cf\u8bbe\u7f6e\u4e3a ${num}%`);
}

export async function mute() {
  await api.mute(true);
  console.log('\ud83d\udd07  \u5df2\u9759\u97f3');
}

export async function unmute() {
  await api.mute(false);
  console.log('\ud83d\udd0a  \u5df2\u53d6\u6d88\u9759\u97f3');
}
