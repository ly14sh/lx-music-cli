import { openSchemeUrl } from '../utils.js';

export async function dislike() {
  const url = 'lxmusic://player/dislike';
  openSchemeUrl(url);
  console.log('\ud83d\udeab  \u5df2\u5c06\u5f53\u524d\u6b4c\u66f2\u52a0\u5165\u4e0d\u559c\u6b22\u5217\u8868');
}
