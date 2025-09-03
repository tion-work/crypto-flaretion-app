# API配置说明

## 📋 概述

本项目支持通过环境变量文件配置开发环境和生产环境的API地址，提供更灵活的配置方式。

## 🔧 配置方式

### 1. 创建环境变量文件

在 `app` 目录下创建以下文件：

#### `.env.development` (开发环境)
```bash
# 开发环境配置
API_BASE_URL=http://localhost:8000
```

#### `.env.production` (生产环境)
```bash
# 生产环境配置
API_BASE_URL=https://api.yourserver.com
```

### 2. API地址配置

在 `src/services/api.ts` 中：

```typescript
// 从环境变量获取API地址
const API_BASE_URL = import.meta.env.API_BASE_URL;
```

## 🚀 使用方法

### 1. 创建环境文件
```bash
# 在app目录下创建环境文件
cd app

# 创建开发环境配置
echo "API_BASE_URL=http://localhost:8000" > .env.development

# 创建生产环境配置
echo "API_BASE_URL=https://api.yourserver.com" > .env.production
```

### 2. 启动应用

#### 开发环境
```bash
# 启动开发服务器（自动加载.env.development）
npm run dev
```
- **API地址**: 从 `.env.development` 读取
- **用途**: 本地开发调试

#### 生产环境
```bash
# 构建生产版本（自动加载.env.production）
npm run build
```
- **API地址**: 从 `.env.production` 读取
- **用途**: 生产环境部署

#### 生产环境开发服务器
```bash
# 使用生产环境配置启动开发服务器
npm run dev:prod
```
- **API地址**: 从 `.env.production` 读取
- **用途**: 测试生产环境API连接

## 🔄 工作原理

### Vite环境检测
- `import.meta.env.DEV`: 开发环境时为 `true`
- `import.meta.env.PROD`: 生产环境时为 `true`

### 环境变量加载
- **开发环境**: 自动加载 `.env.development` 中的 `API_BASE_URL`
- **生产环境**: 自动加载 `.env.production` 中的 `API_BASE_URL`

### 配置要求
- **必须配置**: 每个环境都需要在对应的 `.env` 文件中设置 `API_BASE_URL`
- **无默认值**: 如果环境变量未设置，API调用将失败

## ⚙️ 自定义配置

### 修改API地址

直接编辑对应的环境文件：

```bash
# 修改开发环境API地址
echo "API_BASE_URL=http://192.168.1.100:8000" > .env.development

# 修改生产环境API地址
echo "API_BASE_URL=https://your-new-api.com" > .env.production
```

### 添加更多环境

如果需要支持更多环境，可以扩展配置：

```typescript
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8000';  // 开发环境
  } else if (import.meta.env.MODE === 'staging') {
    return 'https://staging-api.com';  // 测试环境
  } else {
    return 'https://api.yourserver.com';  // 生产环境
  }
};

const API_BASE_URL = getApiBaseUrl();
```

## 🔍 调试配置

### 检查当前环境
```typescript
// 在代码中检查当前环境
console.log('当前环境:', import.meta.env.DEV ? '开发' : '生产');
console.log('API地址:', API_BASE_URL);
```

### 测试API连接
```typescript
// 测试API连接
const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    console.log('API连接状态:', response.ok ? '正常' : '失败');
  } catch (error) {
    console.error('API连接错误:', error);
  }
};
```

## ⚠️ 注意事项

1. **生产环境地址**: 确保 `https://api.yourserver.com` 是你的实际生产环境API地址
2. **HTTPS**: 生产环境建议使用HTTPS
3. **CORS**: 确保后端服务器配置了正确的CORS策略
4. **网络访问**: 确保生产环境API地址可以被访问

## 🛠️ 故障排除

### 常见问题

1. **API请求失败**
   - 检查API地址是否正确
   - 确认后端服务器是否运行
   - 检查网络连接

2. **CORS错误**
   - 确认后端服务器CORS配置
   - 检查请求头设置

3. **环境检测错误**
   - 确认使用正确的npm脚本
   - 检查Vite配置
