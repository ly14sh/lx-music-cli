import { api } from '../client.js';

export async function collect() {
  await api.collect();
  console.log('\u2764\ufe0f  \u5df2\u6536\u85cf\u5f53\u524d\u6b4c\u66f2');
}

export async function uncollect() {
  await api.uncollect();
  console.log('\ud83d\udc94  \u5df2\u53d6\u6d88\u6536\u85cf\u5f53\u524d\u6b4c\u66f2');
}
