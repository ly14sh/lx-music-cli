import { execSync } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';

const CONFIG_DIR = path.join(os.homedir(), '.lx-music-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export const DEFAULT_CONFIG = {
  host: '127.0.0.1',
  port: 23330,
};

export function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')) };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(config) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function printStatus(data) {
  if (!data || !data.name) {
    console.log('\u26a0\ufe0f  \u6ca1\u6709\u6b63\u5728\u64ad\u653e\u7684\u6b4c\u66f2');
    return;
  }
  const icon = data.status === 'playing' ? '\u25b6\ufe0f' : data.status === 'paused' ? '\u23f8\ufe0f' : '\u23f9\ufe0f';
  console.log(`${icon}  ${data.name}`);
  console.log(`   \u6b4c\u624b: ${data.singer || '-'}`);
  console.log(`   \u4e13\u8f91: ${data.albumName || '-'}`);
  console.log(`   \u8fdb\u5ea6: ${formatDuration(data.progress)} / ${formatDuration(data.duration)}`);
  console.log(`   \u97f3\u91cf: ${Math.round((data.volume || 0) * 100)}% ${data.mute ? '(\u9759\u97f3)' : ''}`);
  if (data.lyricLineText) {
    console.log(`   \u6b4c\u8bcd: ${data.lyricLineText}`);
  }
}

export function openSchemeUrl(url) {
  const platform = os.platform();
  try {
    if (platform === 'win32') {
      execSync(`start "" "${url}"`, { shell: 'cmd.exe', stdio: 'ignore' });
    } else if (platform === 'darwin') {
      execSync(`open "${url}"`, { stdio: 'ignore' });
    } else {
      execSync(`xdg-open "${url}"`, { stdio: 'ignore' });
    }
  } catch (err) {
    console.error('\u274c \u65e0\u6cd5\u5524\u8d77 Scheme URL:', err.message);
  }
}
