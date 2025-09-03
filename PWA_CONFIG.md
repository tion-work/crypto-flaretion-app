# 📱 PWA 配置说明

## 概述

已为 Flaretion 应用配置了完整的 PWA (Progressive Web App) 支持，包括 manifest.json 和相关的 HTML meta 标签。

## 配置文件

### 1. `public/manifest.json`

```json
{
  "short_name": "Flaretion",
  "name": "Flaretion - 智能策略分析平台",
  "description": "基于多周期RSI共振分析的专业策略平台，为交易者提供精准的市场状态判断和智能信号提醒",
  "icons": [
    {
      "src": "favicon.png",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/png"
    },
    {
      "src": "favicon.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "favicon.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "zh-CN",
  "categories": ["finance", "productivity", "business"],
  "screenshots": [
    {
      "src": "favicon.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}
```

### 2. `index.html` 更新

已更新 HTML 文件，包含：

- **PWA Manifest 链接**
- **iOS PWA 支持**
- **主题颜色配置**
- **Open Graph 元数据**
- **Twitter Card 支持**
- **SEO 优化**

## 配置说明

### 应用信息
- **短名称**: Flaretion
- **完整名称**: Flaretion - 智能策略分析平台
- **描述**: 基于多周期RSI共振分析的专业策略平台
- **语言**: 中文 (zh-CN)

### 显示模式
- **display**: standalone (独立应用模式)
- **orientation**: portrait-primary (竖屏优先)
- **start_url**: / (从根路径开始)

### 主题颜色
- **主题色**: #3b82f6 (蓝色)
- **背景色**: #ffffff (白色)
- **状态栏**: default (iOS)

### 图标配置
- **小图标**: 16x16, 24x24, 32x32, 64x64
- **中等图标**: 192x192
- **大图标**: 512x512
- **用途**: any maskable (支持自适应图标)

### 分类标签
- **finance**: 金融类应用
- **productivity**: 生产力工具
- **business**: 商业应用

## PWA 功能

### 1. 安装到主屏幕
用户可以将应用添加到手机主屏幕，获得类似原生应用的体验。

### 2. 离线支持
配置了 Service Worker 支持（需要额外实现）。

### 3. 推送通知
支持推送通知功能（需要额外实现）。

### 4. 全屏体验
独立应用模式，隐藏浏览器地址栏。

## 社交媒体优化

### Open Graph
- 支持 Facebook、LinkedIn 等社交平台分享
- 自动生成卡片预览

### Twitter Card
- 支持 Twitter 分享
- 大图模式显示

## 移动端优化

### iOS 支持
- Apple Touch Icon
- 状态栏样式配置
- 全屏模式支持

### Android 支持
- 自适应图标
- 主题颜色集成
- 启动画面配置

## 部署注意事项

1. **图标文件**: 确保 `favicon.png` 文件存在于 `public/` 目录
2. **HTTPS**: PWA 功能需要 HTTPS 环境
3. **Service Worker**: 如需离线功能，需要实现 Service Worker
4. **推送通知**: 如需推送功能，需要配置推送服务

## 测试方法

### 1. Chrome DevTools
- 打开 Chrome DevTools
- 进入 Application 标签
- 查看 Manifest 和 Service Workers

### 2. Lighthouse
- 运行 Lighthouse 审计
- 检查 PWA 评分

### 3. 移动设备测试
- 在移动设备上访问应用
- 测试"添加到主屏幕"功能

## 后续优化建议

1. **自定义图标**: 创建专业的应用图标
2. **Service Worker**: 实现离线缓存
3. **推送通知**: 添加交易信号推送
4. **应用截图**: 添加真实的应用截图
5. **多语言支持**: 扩展国际化支持

## 相关文件

- `public/manifest.json` - PWA 清单文件
- `index.html` - HTML 元数据配置
- `public/favicon.png` - 应用图标
- `src/` - 应用源代码

---

✅ **配置完成**: PWA 基础配置已完成，应用可以安装到主屏幕并获得原生应用体验。
