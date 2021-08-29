# Vue3-playground

基于[vite-ts](https://github.com/vitejs/vite/tree/main/packages/create-app/template-vue-ts)搭建。
原[README](./README-ENG.md)

# 注意事项

## Vscode插件Volar

因为项目采用了`<script setup>`语法以及TypeScript,为了在模版内得到正确的类型支持，请安装[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)插件并打开该插件的TS Plugin,同时为了避免冲突，请在工作区中关闭Vetur.

- 注意：在打包阶段vue-tsc会对组件内`<template>`进行类型检测，如果没有安装Volar插件你可能会在编码阶段忽略掉一些会在打包阶段崩溃的错误。

## 关于`<script setup>`

[官方示例](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)

由于`<script setup>`语法糖处于RFC阶段，在升级vue/vite时请关注提案进展，确保语法兼容 & 编译成功。

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9530](http://localhost:9530)

## 发布

```bash

# 构建生产环境
npm run build

# 构建预生产环境
npm run build:pre

```

## 项目结构

```bash
src
├── App.vue # 入口APP
├── api # API接口汇总
├── assets # 资源文件
├── components # 公共组件
├── layouts # 布局模板
├── main.ts # 入口js
├── router # 路由
│   ├── components.js # 权限路由
│   ├── constComponents.js  # 普通路由
│   └── index.j
├── store # pinia store
├── styles  # 样式
├── utils # 基础工具
└── views # 路由页面
    ├── error # 错误页面
```

## 其他

