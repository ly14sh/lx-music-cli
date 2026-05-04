import { openSchemeUrl } from '../utils.js';

export async function search(keyword, options = {}) {
  if (!keyword) {
    console.error('\u274c  \u8bf7\u63d0\u4f9b\u641c\u7d22\u5173\u952e\u8bcd');
    console.log('   \u7528\u6cd5: lx search <\u6b4c\u66f2\u540d>');
    console.log('         lx search -p <\u6b4c\u66f2\u540d>  # \u76f4\u63a5\u64ad\u653e');
    console.log('         lx search -p <\u6b4c\u66f2\u540d>-<\u6b4c\u624b>  # \u6307\u5b9a\u6b4c\u624b');
    return;
  }

  // \u5982\u679c\u4f7f\u7528 -p \u53c2\u6570\uff0c\u76f4\u63a5\u64ad\u653e\uff08searchPlay\uff09
  if (options.play) {
    // \u4f7f\u7528\u8def\u5f84\u683c\u5f0f\uff1alxmusic://music/searchPlay/\u6b4c\u66f2\u540d
    // \u6216 lxmusic://music/searchPlay/\u6b4c\u66f2\u540d-\u6b4c\u624b
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `lxmusic://music/searchPlay/${encodedKeyword}`;
    openSchemeUrl(url);
    console.log(`\u25b6\ufe0f  \u5c1d\u8bd5\u64ad\u653e: ${keyword}`);
    console.log(`   \u63d0\u793a: \u4ec5\u9002\u7528\u4e8e\u5df2\u7f13\u5b58\u7684\u6b4c\u66f2`);
    return;
  }

  // \u9ed8\u8ba4\uff1a\u6253\u5f00\u641c\u7d22\u9875\u9762
  const data = { keywords: keyword };
  const encodedData = encodeURIComponent(JSON.stringify(data));
  const url = `lxmusic://music/search?data=${encodedData}`;
  openSchemeUrl(url);
  console.log(`\ud83d\udd0d  \u641c\u7d22: ${keyword}`);
}
