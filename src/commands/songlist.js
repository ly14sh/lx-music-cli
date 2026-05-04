import { openSchemeUrl } from '../utils.js';

export async function openSonglist(source, id) {
  // 支持的音源
  const validSources = ['kw', 'kg', 'tx', 'wy', 'mg'];
  
  if (!source || !id) {
    console.error('\u274c  \u8bf7\u63d0\u4f9b\u97f3\u6e90\u548c\u6b4c\u5355ID');
    console.log('');
    console.log('\u7528\u6cd5: lx songlist <\u97f3\u6e90> <\u6b4c\u5355ID>');
    console.log('');
    console.log('\u652f\u6301\u7684\u97f3\u6e90:');
    console.log('  kw  - \u9177\u6211\u97f3\u4e50');
    console.log('  kg  - \u9177\u72d7\u97f3\u4e50');
    console.log('  tx  - \u817e\u8bafQQ\u97f3\u4e50');
    console.log('  wy  - \u7f51\u6613\u4e91\u97f3\u4e50');
    console.log('  mg  - \u54aa\u5495\u97f3\u4e50');
    console.log('');
    console.log('\u793a\u4f8b:');
    console.log('  lx songlist kw 3373919903     # \u6253\u5f00\u9177\u6211\u6b4c\u5355');
    console.log('  lx songlist tx 7077           # \u6253\u5f00QQ\u97f3\u4e50\u6b4c\u5355');
    console.log('');
    console.log('\u83b7\u53d6\u6b4c\u5355ID\u65b9\u6cd5:');
    console.log('  1. \u5728\u97f3\u4e50\u5e73\u53f0\u7f51\u9875\u7248\u6253\u5f00\u6b4c\u5355');
    console.log('  2. \u67e5\u770bURL\uff0c\u63d0\u53d6ID\u53f7');
    console.log('  3. \u6216\u5728 LX Music \u4e2d\u5206\u4eab/\u590d\u5236\u6b4c\u5355\u94fe\u63a5');
    return;
  }

  // 验证音源
  if (!validSources.includes(source)) {
    console.error(`\u274c  \u4e0d\u652f\u6301\u7684\u97f3\u6e90: ${source}`);
    console.log(`\u652f\u6301\u7684\u97f3\u6e90: ${validSources.join(', ')}`);
    return;
  }

  // 构建 Scheme URL
  const data = { source, id };
  const encodedData = encodeURIComponent(JSON.stringify(data));
  const url = `lxmusic://songlist/open?data=${encodedData}`;
  
  openSchemeUrl(url);
  console.log(`\ud83d\udcc1  \u6253\u5f00\u6b4c\u5355: ${source} / ${id}`);
}

export async function playSonglist(source, id) {
  // 支持的音源
  const validSources = ['kw', 'kg', 'tx', 'wy', 'mg'];
  
  if (!source || !id) {
    console.error('\u274c  \u8bf7\u63d0\u4f9b\u97f3\u6e90\u548c\u6b4c\u5355ID');
    console.log('');
    console.log('\u7528\u6cd5: lx songlist-play <\u97f3\u6e90> <\u6b4c\u5355ID>');
    console.log('');
    console.log('\u793a\u4f8b:');
    console.log('  lx songlist-play kw 3373919903  # \u64ad\u653e\u9177\u6211\u6b4c\u5355');
    return;
  }

  // 验证音源
  if (!validSources.includes(source)) {
    console.error(`\u274c  \u4e0d\u652f\u6301\u7684\u97f3\u6e90: ${source}`);
    console.log(`\u652f\u6301\u7684\u97f3\u6e90: ${validSources.join(', ')}`);
    return;
  }

  // 构建 Scheme URL
  const data = { source, id };
  const encodedData = encodeURIComponent(JSON.stringify(data));
  const url = `lxmusic://songlist/play?data=${encodedData}`;
  
  openSchemeUrl(url);
  console.log(`\u25b6\ufe0f  \u64ad\u653e\u6b4c\u5355: ${source} / ${id}`);
}
