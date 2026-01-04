
import { SlideContent } from './types';

export const SLIDES: SlideContent[] = [
  {
    id: 'intro',
    title: '硬件加速指令集对后量子加密代理协议',
    subtitle: '性能与能耗影响的深度研究报告',
    type: 'title',
    details: '量子计算的潜在突破正威胁着传统加密体系。后量子密码学 (PQC) 成为现代安全协议的核心演进方向，特别是在 ChatGPT 等高交互场景下。'
  },
  {
    id: 'hardware-logic',
    title: '硬件加速器的技术机理',
    type: 'content',
    points: [
      '核心目标：将计算密集型加密任务从软件循环中解脱。',
      '实现方式：处理器内部集成专用逻辑电路。',
      '必要性：在后量子时代，硬件加速是维持实时通信可用性的基础。',
      '关键指令集：AES-NI (对称加密) 与 AVX-512 (多项式算术)。'
    ]
  },
  {
    id: 'aes-ni-perf',
    title: 'AES-NI 指令集与能效比',
    type: 'chart',
    points: [
      'AES-NI 将 AES 核心步骤（字节替换、行移位等）直接映射到硬件。',
      '性能提升：开启后加密速度提升高达 13.5 倍。',
      '能效优化：能耗较纯软件实现降低约 90%。',
      'ChatGPT 应用：对于流式传输的批量数据处理至关重要。'
    ],
    data: [
      { name: '软件实现', performance: 1, energy: 100 },
      { name: 'AES-NI 硬件', performance: 13.5, energy: 10 }
    ]
  },
  {
    id: 'avx512-pqc',
    title: 'AVX-512 与格密码学加速',
    type: 'chart',
    points: [
      'ML-KEM (原 Kyber) 核心负担：模 q = 3329 的多项式算术运算。',
      'SIMD 优势：512 位宽 ZMM 寄存器提供强大的并行处理能力。',
      '实现：支持 32 路并行多项式乘法和 8 路并行哈希运算。',
      '结果：AVX-512 优化的 ML-KEM 比 AVX2 快约 1.64 倍。'
    ],
    data: [
      { name: '密钥生成', '纯C': 1220000, AVX2: 420000, 'AVX-512': 285000 },
      { name: '封装', '纯C': 2000000, AVX2: 455000, 'AVX-512': 299000 },
      { name: '解封装', '纯C': 2130000, AVX2: 428000, 'AVX-512': 299000 }
    ]
  },
  {
    id: 'protocol-comparison',
    title: '代理协议架构对比',
    type: 'comparison',
    comparison: {
      left: {
        title: 'Cloudflare WARP + MASQUE',
        points: [
          '基于 QUIC (HTTP/3) 隧道',
          '传输层与加密层深度整合',
          '支持 X25519MLKEM768 混合密钥',
          '原生 1-RTT / 0-RTT 握手性能'
        ]
      },
      right: {
        title: 'Xray VLESS + xHTTP',
        points: [
          '极简协议，安全性由传输层提供',
          '支持带有 ML-KEM 的 TLS 1.3',
          'xHTTP 模拟复杂 HTTP 行为',
          '在复杂环境下具有高生存率/抗探测'
        ]
      }
    }
  },
  {
    id: 'latency-analysis',
    title: '延迟分析：从物理往返到算法开销',
    type: 'content',
    points: [
      'MASQUE 受益于 QUIC：合并 TLS 握手，延迟主要取决于 RTT。',
      'VLESS+TLS (TCP)：经历三次握手 + TLS 握手，通常比 QUIC 多 1 个 RTT。',
      '关键因素：PQC 密钥大小引发的碎片化延迟。',
      'MTU 限制：ML-KEM 密钥 (>1KB) 易导致 IP 碎片化，低带宽下延迟增加 >32%。'
    ]
  },
  {
    id: 'key-size-chart',
    title: '后量子算法密钥体积对比 (Bytes)',
    type: 'chart',
    data: [
      { name: 'X25519 (传统)', 公钥: 32, 密文: 32 },
      { name: 'ML-KEM-768', 公钥: 1184, 密文: 1088 },
      { name: 'ML-DSA-65', 公钥: 1952, 签名: 3309 }
    ]
  },
  {
    id: 'energy-analysis',
    title: '能源消耗：处理器负载与射频开销',
    type: 'content',
    points: [
      'CPU 能效：硬件加速缩短 CPU 时间，使芯片更快进入 C-state 休眠。',
      '射频功耗：5G 网络功耗是 4G 的 2-3 倍，PQC 额外传输量延长射频激活时间。',
      '策略差异：MASQUE 多路复用减少射频唤醒；xHTTP 若心跳过频则推高能耗。',
      '节能关键：加速计算，减少通信占空比。'
    ]
  },
  {
    id: 'chatgpt-eval',
    title: '针对 ChatGPT 场景的深度评估',
    type: 'comparison',
    comparison: {
      left: {
        title: 'MASQUE (QUIC)',
        points: [
          '完全消除传输层头阻塞',
          'SSE 文字流更加平滑',
          '复杂 Prompt 输入实时加密几乎透明'
        ]
      },
      right: {
        title: 'VLESS (TCP)',
        points: [
          '受限 TCP 顺序交付，易受头阻塞影响',
          '数据包增大放大了丢包卡顿',
          '低端设备上纯软件加密引入毫秒级延迟'
        ]
      }
    }
  },
  {
    id: 'summary',
    title: '总结：硬件加速器作为“性能门槛”',
    type: 'summary',
    points: [
      '具备加速器的现代架构：PQC 额外开销几乎可以忽略不计。',
      '旧架构：计算时延成为 RTT 不可忽视的一部分，能耗成倍增加。',
      '极致体验建议：首选 Cloudflare WARP + MASQUE，节能且低延迟。',
      '极高隐私需求：VLESS + TLS + PQC，需针对特定指令集优化内核编译。'
    ]
  }
];
