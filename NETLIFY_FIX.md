# 🔧 Netlify 部署问题修复

## 问题描述

Netlify 部署失败，主要错误：
1. **Node.js 版本不兼容** - Capacitor 7.4.3 需要 Node.js 20+
2. **TypeScript 命令找不到** - `tsc: not found`

## 修复方案

### 1. 升级 Node.js 版本

**修改前:**
```toml
NODE_VERSION = "18"
NPM_VERSION = "9"
```

**修改后:**
```toml
NODE_VERSION = "20"
NPM_VERSION = "10"
```

### 2. 移动构建依赖到 dependencies

**问题:** TypeScript 和 Vite 在 `devDependencies` 中，Netlify 生产构建时无法访问

**修复:** 将以下包从 `devDependencies` 移动到 `dependencies`:
- `typescript`
- `vite`
- `@vitejs/plugin-legacy`
- `@vitejs/plugin-react`

### 3. 更新后的 package.json 结构

```json
{
  "dependencies": {
    // ... 其他依赖
    "typescript": "^5.1.6",
    "vite": "~5.2.0",
    "@vitejs/plugin-legacy": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.1"
  },
  "devDependencies": {
    // 测试和开发工具保留在 devDependencies
    "@testing-library/...": "...",
    "cypress": "^13.5.0",
    "eslint": "^9.20.1",
    // ...
  }
}
```

## 验证修复

### 本地测试
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm ci

# 测试构建
npm run build
```

### 构建输出
```
✓ 253 modules transformed.
dist/index.html                           2.33 kB │ gzip:   1.02 kB
dist/assets/index-ACUv6roh.css           53.08 kB │ gzip:   8.56 kB
dist/assets/index-Dz_gwlJV.js           919.61 kB │ gzip: 218.80 kB
✓ built in 7.89s
```

## 部署配置更新

### netlify.toml 关键配置
```toml
[build]
  command = "npm ci && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"
  NODE_ENV = "production"
  VITE_TELEMETRY_DISABLED = "1"
```

## 为什么需要这些修复？

### Node.js 20 要求
- **Capacitor 7.4.3** 明确要求 Node.js 20+
- 新版本的依赖包（如 `@isaacs/balanced-match`）需要 Node.js 20+
- 避免 `EBADENGINE` 警告

### 构建依赖位置
- **Netlify 生产构建** 只安装 `dependencies`
- **TypeScript 编译** 需要 `tsc` 命令可用
- **Vite 构建** 需要 `vite` 命令可用

## 部署检查清单

- [x] Node.js 版本升级到 20
- [x] NPM 版本升级到 10
- [x] TypeScript 移动到 dependencies
- [x] Vite 移动到 dependencies
- [x] 本地构建测试通过
- [x] 配置文件语法正确
- [x] 部署脚本更新

## 下一步

1. **推送更改到 Git**
   ```bash
   git add .
   git commit -m "Fix Netlify deployment: upgrade Node.js to 20 and move build deps"
   git push origin main
   ```

2. **重新部署**
   - Netlify 会自动检测更改并重新构建
   - 或者手动触发部署

3. **验证部署**
   - 检查构建日志
   - 测试网站功能
   - 验证移动端体验

## 预期结果

- ✅ 构建成功完成
- ✅ 无 Node.js 版本警告
- ✅ TypeScript 编译正常
- ✅ Vite 构建输出正确
- ✅ 网站正常访问
- ✅ 移动端功能正常
