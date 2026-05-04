#!/usr/bin/env node

import { play, pause, toggle } from './commands/play.js';
import { next, prev } from './commands/skip.js';
import { search } from './commands/search.js';
import { openSonglist, playSonglist } from './commands/songlist.js';
import { collect, uncollect } from './commands/collect.js';
import { dislike } from './commands/dislike.js';
import { status, lyric, now } from './commands/status.js';
import { volume, mute, unmute } from './commands/volume.js';
import { config, showConfig } from './commands/config.js';
import { watch } from './commands/watch.js';

const args = process.argv.slice(2);
const cmd = args[0];

async function main() {
  try {
    switch (cmd) {
      case 'play':
        await play();
        break;
      case 'pause':
        await pause();
        break;
      case 'toggle':
        await toggle();
        break;
      case 'next':
        await next();
        break;
      case 'prev':
        await prev();
        break;
      case 'search':
        if (args[1] === '-p') {
          await search(args[2], { play: true });
        } else {
          await search(args[1]);
        }
        break;
      case 'status':
        await status();
        break;
      case 'lyric':
        await lyric();
        break;
      case 'now':
        await now();
        break;
      case 'volume':
        await volume(args[1]);
        break;
      case 'mute':
        await mute();
        break;
      case 'unmute':
        await unmute();
        break;
      case 'watch':
        await watch();
        break;
      case 'songlist':
        await openSonglist(args[1], args[2]);
        break;
      case 'songlist-play':
        await playSonglist(args[1], args[2]);
        break;
      case 'collect':
        await collect();
        break;
      case 'uncollect':
        await uncollect();
        break;
      case 'dislike':
        await dislike();
        break;
      case 'config':
        if (args.includes('--host') || args.includes('--port')) {
          const hostIdx = args.indexOf('--host');
          const portIdx = args.indexOf('--port');
          await config({
            host: hostIdx >= 0 ? args[hostIdx + 1] : undefined,
            port: portIdx >= 0 ? args[portIdx + 1] : undefined,
          });
        } else {
          await showConfig();
        }
        break;
      case 'help':
      case '-h':
      case '--help':
      default:
        showHelp();
        break;
    }
  } catch (err) {
    console.error('\u274c  \u9519\u8bef:', err.message);
    if (err.message.includes('ECONNREFUSED')) {
      console.log('   \u8bf7\u786e\u4fdd LX Music \u684c\u9762\u7aef\u5df2\u542f\u52a8\u5e76\u5f00\u542f OpenAPI');
      console.log('   \u8bbe\u7f6e -> \u57fa\u672c\u8bbe\u7f6e -> \u5f00\u653e API');
    }
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
\ud83c\udfb5  LX Music CLI

\u7528\u6cd5: lx <command> [args]

\u64ad\u653e\u63a7\u5236:
  play              \u64ad\u653e
  pause             \u6682\u505c
  toggle            \u64ad\u653e/\u6682\u505c\u5207\u6362
  next              \u4e0b\u4e00\u9996
  prev              \u4e0a\u4e00\u9996

\u641c\u7d22:
  search <\u5173\u952e\u8bcd>          \u6253\u5f00\u641c\u7d22\u9875\u9762
  search -p <\u6b4c\u66f2\u540d>       \u76f4\u63a5\u64ad\u653e\uff08\u9700\u7f13\u5b58\uff09
  search -p <\u6b4c\u66f2\u540d>-<\u6b4c\u624b>  \u6307\u5b9a\u6b4c\u624b\u64ad\u653e

\u6b4c\u5355:
  songlist <\u6e90> <ID>       \u6253\u5f00\u6b4c\u5355
  songlist-play <\u6e90> <ID>  \u64ad\u653e\u6b4c\u5355

\u6536\u85cf:
  collect           \u6536\u85cf\u5f53\u524d\u6b4c\u66f2
  uncollect         \u53d6\u6d88\u6536\u85cf\u5f53\u524d\u6b4c\u66f2
  dislike           \u4e0d\u559c\u6b22\u5f53\u524d\u6b4c\u66f2

\u72b6\u6001\u67e5\u8be2:
  status            \u663e\u793a\u64ad\u653e\u72b6\u6001
  now               \u663e\u793a\u5f53\u524d\u64ad\u653e\u4fe1\u606f
  lyric             \u663e\u793a\u5f53\u524d\u6b4c\u8bcd

\u5b9e\u65f6\u76d1\u63a7:
  watch             \u5b9e\u65f6\u76d1\u63a7\u64ad\u653e\u72b6\u6001\uff08SSE\uff09

\u97f3\u91cf:
  volume <0-100>    \u8bbe\u7f6e\u97f3\u91cf
  mute              \u9759\u97f3
  unmute            \u53d6\u6d88\u9759\u97f3

\u914d\u7f6e:
  config            \u663e\u793a\u5f53\u524d\u914d\u7f6e
  config --host <ip> --port <port>  \u4fee\u6539\u914d\u7f6e

\u6b4c\u5355\u6e90: kw(\u9177\u6211), kg(\u9177\u72d7), tx(QQ), wy(\u7f51\u6613), mg(\u54aa\u5495)

\u5e2e\u52a9:
  help              \u663e\u793a\u6b64\u5e2e\u52a9\u4fe1\u606f
`);
}

main();
