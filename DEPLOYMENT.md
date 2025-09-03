# Netlify 部署指南 - Ionic React App

## 🚀 项目概述

这是一个基于以下技术栈的移动端应用：
- **Vite** - 构建工具
- **React 19** - 前端框架
- **Ionic React** - 移动端 UI 框架
- **Capacitor** - 原生应用包装器
- **TypeScript** - 类型安全

## 📦 部署配置

### `netlify.toml` 配置说明

- **构建命令**: `npm ci && npm run build`
- **发布目录**: `dist` (Vite 默认输出目录)
- **Node.js 版本**: 18
- **环境**: production

### 构建流程

1. **安装依赖**: `npm ci`
2. **TypeScript 编译**: `tsc`
3. **Vite 构建**: `vite build`
4. **输出到**: `dist/` 目录

## 🚀 部署步骤

### 方法一：通过 Git 连接自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify deployment config"
   git push origin main
   ```

2. **连接 Netlify**
   - 访问 [app.netlify.com](https://app.netlify.com)
   - 点击 "New site from Git"
   - 选择你的 GitHub 仓库
   - 构建设置会自动从 `netlify.toml` 读取

3. **部署完成**
   - Netlify 会自动构建和部署
   - 获得一个 `xxx.netlify.app` 的域名

### 方法二：手动部署

1. **本地构建**
   ```bash
   npm ci
   npm run build
   ```

2. **上传到 Netlify**
   - 将 `dist` 文件夹拖拽到 Netlify 部署区域
   - 或者使用 Netlify CLI

### 方法三：使用 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

## 🔧 环境变量配置

在 Netlify 控制台中设置以下环境变量（如果需要）：

```
NODE_ENV=production
VITE_TELEMETRY_DISABLED=1
```

## 📱 PWA 和移动端优化

### PWA 配置
- **Manifest**: `/manifest.json`
- **Service Worker**: `/sw.js` (如果配置了)
- **缓存策略**: 静态资源长期缓存

### 移动端优化
- **响应式设计**: Ionic 框架自动处理
- **触摸优化**: 移动端友好的交互
- **性能优化**: Vite 构建优化

## 🛡️ 安全配置

配置文件包含以下安全设置：

- **CSP 策略**: 内容安全策略
- **安全头部**: X-Frame-Options, X-Content-Type-Options 等
- **HTTPS 强制**: Strict-Transport-Security
- **权限策略**: 限制摄像头、麦克风等权限

## ⚡ 性能优化

- **静态资源缓存**: 1年缓存时间
- **Gzip 压缩**: 自动启用
- **CDN 加速**: Netlify 全球 CDN
- **代码分割**: Vite 自动代码分割

## 🔍 调试和监控

### 构建日志
- 在 Netlify 控制台查看构建日志
- 监控构建时间和错误

### 实时日志
- 使用 Netlify 的 Functions 日志
- 监控应用性能

## 🐛 常见问题解决

### 构建失败
- 检查 Node.js 版本是否为 18
- 确保所有依赖都在 `dependencies` 中
- 检查 TypeScript 配置

### 页面无法访问
- 检查重定向规则（SPA 路由）
- 确认发布目录为 `dist`
- 查看 Netlify 的部署日志

### 样式不生效
- 确认 Vite 配置正确
- 检查 CSS 导入路径
- 验证构建输出

### 移动端问题
- 检查 viewport 设置
- 确认 Ionic 组件正确导入
- 验证触摸事件处理

## 📋 部署检查清单

- [ ] `netlify.toml` 配置正确
- [ ] `package.json` 脚本配置
- [ ] TypeScript 编译通过
- [ ] Vite 构建成功
- [ ] 环境变量设置
- [ ] PWA 配置（如果需要）
- [ ] 移动端测试通过
- [ ] 性能测试通过

## 🔄 持续部署

### 自动部署
- 每次推送到主分支自动部署
- 预览部署：推送到其他分支

### 分支部署
- `main` 分支：生产环境
- `develop` 分支：开发环境预览
- 其他分支：功能预览

## 📞 支持

如果遇到部署问题，请检查：
1. Netlify 构建日志
2. 本地构建是否成功
3. 环境变量配置
4. 依赖版本兼容性
5. TypeScript 配置
6. Vite 配置

## 🎯 下一步

部署成功后，你可以：
1. 配置自定义域名
2. 设置 SSL 证书
3. 配置环境变量
4. 设置表单处理
5. 配置函数（如果需要）
6. 集成分析工具
