<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="PQC Hardware Acceleration Insights Banner" width="1200">
</div>

# 🔐 PQC Hardware Acceleration Insights

> **深度研究报告：硬件加速指令集对后量子加密代理协议的性能与能耗影响**

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 项目简介

量子计算的突破正威胁着传统加密体系，后量子密码学（Post-Quantum Cryptography, PQC）成为现代安全协议的核心演进方向。本项目通过交互式演示，深入分析了硬件加速指令集（如 AES-NI 和 AVX-512）对后量子加密协议性能与能耗的影响。

特别聚焦于在 ChatGPT 等高交互场景下的实际应用，对比了 Cloudflare WARP + MASQUE 与 Xray VLESS + xHTTP 两种代理协议架构。

### ✨ 核心亮点

- 🎯 **硬件加速机理解析**：深入剖析 AES-NI 与 AVX-512 指令集如何优化加密计算
- 📊 **可视化数据对比**：实时图表展示性能提升与能耗优化
- 🤖 **AI 深度洞察**：集成 Google Gemini 3.0 Flash，提供实时技术解读
- 🎨 **现代化 UI**：基于 React 19 + Tailwind CSS 的精美演示界面
- ⚡ **交互式体验**：支持键盘导航、自动播放等多种演示模式

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** 或 **pnpm**

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/masx200/pqc-hardware-acceleration-insights.git
cd pqc-hardware-acceleration-insights

# 安装依赖
npm install
# 或
pnpm install

# 配置环境变量
# 复制 .env.local 文件并设置你的 Google Gemini API Key
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 启动开发服务器
npm run dev
# 或
pnpm dev

# 构建生产版本
npm run build
# 或
pnpm build
```

访问 `http://localhost:5173` 查看演示。

---

## 📚 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| **前端框架** | React 19.2.3 | 使用最新特性的用户界面 |
| **开发语言** | TypeScript 5.8.2 | 类型安全的 JavaScript |
| **构建工具** | Vite 6.2.0 | 快速的开发与构建 |
| **图表库** | Recharts 3.6.0 | 数据可视化组件 |
| **图标库** | Lucide React 0.562.0 | 精美的 SVG 图标 |
| **AI 集成** | Google GenAI SDK 1.34.0 | Gemini 3.0 Flash API |

---

## 🎯 主要内容

### 演示章节

1. **引言** - 后量子密码学时代的安全挑战
2. **硬件加速机理** - AES-NI 与 AVX-512 技术原理
3. **性能数据分析** - 真实性能基准测试数据
4. **协议架构对比** - MASQUE vs VLESS 深度解析
5. **延迟分析** - 从物理往返到算法开销
6. **能耗评估** - 处理器负载与射频功耗
7. **ChatGPT 场景实战** - 真实应用场景下的性能表现
8. **总结与建议** - 硬件加速器作为"性能门槛"

### 关键技术洞察

- **AES-NI 硬件加速**：加密速度提升高达 **13.5 倍**，能耗降低约 **90%**
- **AVX-512 并行计算**：ML-KEM (Kyber) 性能比 AVX2 快约 **1.64 倍**
- **协议延迟对比**：QUIC (MASQUE) 比 TCP (VLESS) 少 **1 个 RTT**
- **密钥大小挑战**：ML-KEM-768 公钥达 **1184 字节**，易引发 IP 碎片化

---

## 🎮 使用说明

### 键盘快捷键

| 按键 | 功能 |
|------|------|
| `→` 或 `空格` | 下一页 |
| `←` | 上一页 |
| `自动播放按钮` | 切换自动播放模式（8秒间隔）|
| `AI 洞察按钮` | 调用 Gemini 生成深度分析 |

### 功能按钮

- 📺 **自动播放**：开启后每 8 秒自动切换页面
- 🧠 **AI 深度洞察**：使用 Gemini 3.0 Flash 生成当前页面的技术深度分析
- ⬅️➡️ **导航按钮**：手动切换页面

---

## 🔑 API 配置

本项目集成了 Google Gemini 3.0 Flash API，用于生成实时技术洞察。配置方法：

1. 前往 [Google AI Studio](https://ai.studio.google.com/app/apikey) 获取 API Key
2. 在项目根目录创建 `.env.local` 文件：
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. 重启开发服务器

> **注意**：API Key 仅在本地使用，不会被上传到 Git 仓库（已在 `.gitignore` 中排除）。

---

## 📊 数据来源

本演示中的性能数据基于公开研究文献和硬件厂商白皮书：

- [Intel AES-NI Instruction Set](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)
- [NIST Post-Quantum Cryptography Standardization](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [Cloudflare MASQUE Protocol](https://blog.cloudflare.com/masque/)
- [Xray Project Documentation](https://xtls.github.io/)

---

## 🛠️ 开发指南

### 项目结构

```
pqc-hardware-acceleration-insights/
├── src/
│   ├── App.tsx              # 主应用组件
│   ├── constants.tsx        # 演示内容数据
│   ├── types.ts            # TypeScript 类型定义
│   ├── index.tsx           # 应用入口
│   └── index.html          # HTML 模板
├── public/                  # 静态资源
├── .env.local              # 环境变量配置（需自行创建）
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 构建配置
└── README.md               # 项目说明文档
```

### 添加新的演示页面

在 `constants.tsx` 中添加新的幻灯片对象：

```typescript
{
  id: 'unique-id',
  title: '页面标题',
  type: 'content' | 'chart' | 'comparison' | 'summary',
  points: ['要点1', '要点2'],
  data: [...] // 仅 chart 类型需要
}
```

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🌟 致谢

- [Google Gemini](https://ai.google.dev/) - AI 洞察生成支持
- [Vite](https://vitejs.dev/) - 极速的前端构建工具
- [Recharts](https://recharts.org/) - 强大的 React 图表库
- [Lucide](https://lucide.dev/) - 精美的图标库

---

## 📮 联系方式

- **作者**：masx200
- **项目链接**：[https://github.com/masx200/pqc-hardware-acceleration-insights](https://github.com/masx200/pqc-hardware-acceleration-insights)

---

<div align="center">
  <p>如果这个项目对你有帮助，请给它一个 ⭐️ Star！</p>
  <p>用 ❤️ 和代码构建更安全的数字未来</p>
</div>
