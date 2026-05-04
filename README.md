# 🎵 LX Music CLI

> 通过命令行控制 [LX Music Desktop](https://github.com/lyswhut/lx-music-desktop) 的智能点歌助手

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-brightgreen)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)]()

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🎛️ **播放控制** | 播放、暂停、切换、下一首、上一首 |
| 🔍 **智能搜索** | 搜索歌曲并直接播放（支持路径格式） |
| 📋 **歌单管理** | 打开/播放酷我、网易云等歌单 |
| ❤️ **收藏管理** | 收藏/取消收藏当前歌曲 |
| 🚫 **不喜欢** | 将歌曲加入不喜欢列表 |
| 🔊 **音量控制** | 调节音量、静音/取消静音 |
| 📊 **实时监控** | SSE 实时监听播放状态变化 |
| 📝 **歌词显示** | 获取当前播放歌曲的完整歌词 |

---

## 📦 安装

### 方式一：全局安装（推荐）

```bash
npm install -g lx-music-cli
```

### 方式二：本地使用

```bash
git clone https://github.com/ly14sh/lx-music-cli.git
cd lx-music-cli
npm install
```

### 前置要求

- [LX Music Desktop](https://github.com/lyswhut/lx-music-desktop) 已安装并运行
- 在 LX Music 设置中开启 **OpenAPI HTTP 服务**（默认端口 `23330`）

---

## 🚀 快速开始

```bash
# 播放/暂停
lx play
lx pause

# 下一首/上一首
lx next
lx prev

# 搜索歌曲（打开搜索页）
lx search "周杰伦"

# 直接播放歌曲（需精确匹配）
lx search -p "晴天-周杰伦"

# 查看播放状态
lx status

# 获取歌词
lx lyric

# 调节音量
lx volume 50

# 收藏当前歌曲
lx collect

# 打开歌单
lx songlist kw 3373919903
```

---

## 📖 命令手册

### 播放控制

| 命令 | 说明 |
|------|------|
| `lx play` | 开始播放 |
| `lx pause` | 暂停播放 |
| `lx toggle` | 切换播放/暂停状态 |
| `lx next` | 下一首 |
| `lx prev` | 上一首 |

### 搜索与歌单

| 命令 | 说明 | 示例 |
|------|------|------|
| `lx search <关键词>` | 打开搜索页面 | `lx search "周杰伦"` |
| `lx search -p <歌曲-歌手>` | 直接播放（精确匹配） | `lx search -p "晴天-周杰伦"` |
| `lx songlist <源> <ID>` | 打开歌单 | `lx songlist kw 3373919903` |
| `lx songlist-play <源> <ID>` | 播放歌单 | `lx songlist-play wy 123456` |

> **支持的音源**: `kw`(酷我)、`kg`(酷狗)、`tx`(QQ音乐)、`wy`(网易云)、`mg`(咪咕)

### 状态与信息

| 命令 | 说明 |
|------|------|
| `lx status` | 显示当前播放状态（歌曲、歌手、进度、音量） |
| `lx now` | 显示当前播放歌曲信息 |
| `lx lyric` | 显示当前歌曲歌词 |
| `lx watch` | SSE 实时监控播放状态变化（按 Ctrl+C 退出） |

### 音量控制

| 命令 | 说明 | 示例 |
|------|------|------|
| `lx volume <0-100>` | 设置音量 | `lx volume 50` |
| `lx mute` | 静音 |
| `lx unmute` | 取消静音 |

### 收藏管理

| 命令 | 说明 |
|------|------|
| `lx collect` | 收藏当前歌曲 |
| `lx uncollect` | 取消收藏当前歌曲 |
| `lx dislike` | 将当前歌曲加入不喜欢列表 |

### 配置

| 命令 | 说明 | 示例 |
|------|------|------|
| `lx config host <地址>` | 设置服务器地址 | `lx config host 127.0.0.1` |
| `lx config port <端口>` | 设置服务器端口 | `lx config port 23330` |

---

## ⚙️ 配置说明

配置文件位于用户目录下的 `.lx-music-cli.json`：

```json
{
  "host": "127.0.0.1",
  "port": 23330
}
```

---

## 🏗️ 技术架构

```
┌─────────────────┐     HTTP/OpenAPI      ┌──────────────────┐
│   lx-music-cli  │ ◄──────────────────► │  LX Music Desktop │
│   (Node.js CLI) │    Scheme URL         │   (OpenAPI服务)   │
└─────────────────┘                       └──────────────────┘
```

- **OpenAPI HTTP**: 播放控制、状态查询、收藏管理
- **Scheme URL**: 搜索、歌单、不喜欢（`lxmusic://` 协议）
- **SSE 订阅**: 实时播放状态推送

---

## 📝 注意事项

1. **searchPlay 限制**: `search -p` 命令只能播放**已有缓存记录**的歌曲，需要歌曲名和歌手精确匹配
2. **OpenAPI 服务**: 确保 LX Music Desktop 的 OpenAPI HTTP 服务已开启
3. **防火墙**: 确保端口 `23330` 未被防火墙阻止

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

[MIT](LICENSE) © ly14sh

---

> 🎶 **让音乐触手可及** —— 用命令行掌控你的音乐世界
