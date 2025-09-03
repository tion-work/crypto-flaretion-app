#!/bin/bash

# Ionic React App Netlify 部署脚本

echo "🚀 开始部署 Ionic React App 到 Netlify..."

# 检查是否安装了 Netlify CLI
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI 未安装"
    echo "请先安装: npm install -g netlify-cli"
    exit 1
fi

# 检查是否已登录
if ! netlify status &> /dev/null; then
    echo "🔐 请先登录 Netlify:"
    netlify login
fi

# 安装依赖
echo "📦 安装依赖..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 检查构建输出
if [ ! -d "dist" ]; then
    echo "❌ 构建输出目录 dist 不存在"
    exit 1
fi

# 部署到 Netlify
echo "🌐 部署到 Netlify..."
netlify deploy --prod --dir=dist

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌍 应用已上线"
    echo "📱 移动端应用已部署"
else
    echo "❌ 部署失败"
    exit 1
fi
