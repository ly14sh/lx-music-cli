import http from 'http';
import { loadConfig } from './utils.js';

function request(path, method = 'GET') {
  const config = loadConfig();
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: config.host,
        port: config.port,
        path,
        method,
        timeout: 5000,
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const isJson = res.headers['content-type']?.includes('application/json');
              const result = isJson ? JSON.parse(data) : data;
              resolve(result != null ? result : {});
            } catch {
              resolve({});
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

export const api = {
  status: () => request('/status'),
  lyric: () => request('/lyric'),
  lyricAll: () => request('/lyric-all'),
  play: () => request('/play'),
  pause: () => request('/pause'),
  skipNext: () => request('/skip-next'),
  skipPrev: () => request('/skip-prev'),
  seek: (offset) => request(`/seek?offset=${offset}`),
  volume: (vol) => request(`/volume?volume=${vol}`),
  mute: (m) => request(`/mute?mute=${m}`),
  collect: () => request('/collect'),
  uncollect: () => request('/uncollect'),
  dislike: () => request('/dislike'),
};
