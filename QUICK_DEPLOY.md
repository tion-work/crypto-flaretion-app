# 🚀 快速部署指南 - Ionic React App

## 一键部署到 Netlify

### 方法 1: 通过 Git 连接（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify deployment config for Ionic app"
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

### 方法 2: 使用部署脚本

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 运行部署脚本
./deploy.sh
```

### 方法 3: 手动拖拽部署

```bash
# 构建项目
npm ci && npm run build

# 将 dist 文件夹拖拽到 netlify.com 的部署区域
```

## 📋 部署配置说明

### `netlify.toml` 包含的配置：

- ✅ **构建命令**: `npm ci && npm run build`
- ✅ **发布目录**: `dist` (Vite 输出目录)
- ✅ **Node.js 版本**: 20 (支持 Capacitor 7.4.3)
- ✅ **SPA 路由支持**: React Router 重定向
- ✅ **缓存策略**: 静态资源 1年缓存
- ✅ **安全头部**: 完整的安全配置
- ✅ **PWA 支持**: Manifest 和 Service Worker
- ✅ **移动端优化**: Ionic 框架支持

### 环境变量（可选）：

```
NODE_ENV=production
VITE_TELEMETRY_DISABLED=1
```

## 📱 移动端特性

- **响应式设计**: Ionic 框架自动适配
- **触摸优化**: 移动端友好的交互
- **PWA 支持**: 可安装到主屏幕
- **原生功能**: Capacitor 集成支持

## 🔧 自定义域名

1. 在 Netlify 控制台添加自定义域名
2. 配置 DNS 记录指向 Netlify
3. 启用 SSL 证书（自动）

## 📊 性能优化

配置已包含：
- 静态资源长期缓存
- Gzip 压缩
- CDN 加速
- 代码分割（Vite 自动）

## 🐛 故障排除

### 构建失败
- 检查 Node.js 版本是否为 20 (Capacitor 要求)
- 确保 TypeScript 和 Vite 在 dependencies 中
- 检查 Vite 配置

### 页面 404
- 检查 SPA 重定向规则
- 确认发布目录为 `dist`
- 验证 React Router 配置

### 移动端问题
- 检查 viewport 设置
- 确认 Ionic 组件正确导入
- 验证触摸事件处理

## 📞 需要帮助？

查看完整的 [DEPLOYMENT.md](./DEPLOYMENT.md) 文档获取详细说明。

## 🎯 部署后可以做什么

1. **测试移动端体验**
2. **配置 PWA 功能**
3. **集成分析工具**
4. **设置推送通知**
5. **配置原生功能**
