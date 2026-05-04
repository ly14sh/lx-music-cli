import http from 'http';
import { loadConfig } from '../utils.js';

export async function watch() {
  const { host, port } = loadConfig();
  const url = `http://${host}:${port}/subscribe-player-status`;

  console.log(`\ud83d\udc41\ufe0f  \u5b9e\u65f6\u76d1\u63a7\u64ad\u653e\u72b6\u6001...`);
  console.log(`   \u8fde\u63a5: ${url}`);
  console.log(`   \u6309 Ctrl+C \u9000\u51fa\n`);

  const req = http.get(url, (res) => {
    let buffer = '';

    res.on('data', (chunk) => {
      buffer += chunk.toString();

      // \u89e3\u6790 SSE \u683c\u5f0f
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // \u4fdd\u7559\u672a\u5b8c\u6574\u7684\u884c

      let event = null;
      let data = null;

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          event = line.slice(7).trim();
        } else if (line.startsWith('data: ')) {
          data = line.slice(6).trim();
        } else if (line === '' && event && data) {
          // \u5b8c\u6574\u7684\u4e8b\u4ef6\uff0c\u663e\u793a
          displayEvent(event, data);
          event = null;
          data = null;
        }
      }
    });

    res.on('end', () => {
      console.log('\n\u26a0\ufe0f  \u8fde\u63a5\u5df2\u5173\u95ed');
    });

    res.on('error', (err) => {
      console.error(`\u274c  \u8fde\u63a5\u9519\u8bef: ${err.message}`);
    });
  });

  req.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
      console.error(`\u274c  \u65e0\u6cd5\u8fde\u63a5\u5230 LX Music`);
      console.error(`   \u8bf7\u786e\u4fdd\u684c\u9762\u7aef\u5df2\u542f\u52a8\u5e76\u5f00\u542f OpenAPI`);
    } else {
      console.error(`\u274c  \u8bf7\u6c42\u9519\u8bef: ${err.message}`);
    }
  });

  // \u5904\u7406 Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\n\ud83d\udc4b  \u5df2\u9000\u51fa\u76d1\u63a7');
    req.destroy();
    process.exit(0);
  });
}

function displayEvent(event, data) {
  const timestamp = new Date().toLocaleTimeString();

  switch (event) {
    case 'status':
      const status = data.replace(/"/g, '');
      const icon = status === 'playing' ? '\u25b6\ufe0f' : status === 'paused' ? '\u23f8\ufe0f' : '\u23f9\ufe0f';
      console.log(`[${timestamp}] ${icon} \u72b6\u6001: ${status}`);
      break;

    case 'name':
      console.log(`[${timestamp}] \ud83c\udfb5 \u6b4c\u66f2: ${data.replace(/"/g, '')}`);
      break;

    case 'singer':
      console.log(`[${timestamp}] \ud83c\udfa4 \u6b4c\u624b: ${data.replace(/"/g, '')}`);
      break;

    case 'albumName':
      console.log(`[${timestamp}] \ud83d\udcbf \u4e13\u8f91: ${data.replace(/"/g, '')}`);
      break;

    case 'lyricLineText':
      console.log(`[${timestamp}] \ud83d\udcdd \u6b4c\u8bcd: ${data.replace(/"/g, '')}`);
      break;

    case 'duration':
      console.log(`[${timestamp}] \u23f1\ufe0f  \u65f6\u957f: ${formatTime(parseFloat(data))}`);
      break;

    case 'progress':
      console.log(`[${timestamp}] \ud83d\udccd \u8fdb\u5ea6: ${formatTime(parseFloat(data))}`);
      break;

    case 'playbackRate':
      console.log(`[${timestamp}] \ud83d\ude80 \u901f\u5ea6: ${data}x`);
      break;

    default:
      console.log(`[${timestamp}] ${event}: ${data}`);
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
