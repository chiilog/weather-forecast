# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

React 19 + TypeScript + Viteによる天気予報アプリケーション。段階的な実装を想定した設計で、現在はプロジェクト基盤とテスト環境が構築された状態。

## 開発コマンド

### 基本コマンド
- `npm run dev` - 開発サーバー起動（Vite）
- `npm run build` - 本番ビルド（TypeScriptコンパイル + Viteビルド）
- `npm run preview` - ビルド後のプレビュー

ただし、`npm run dev`が必要な時は知らせて、自身では実行しないでください。

### コード品質
- `npm run lint` - ESLintによる検証
- `npm run format` - Prettierによる自動フォーマット
- `npm run format:check` - フォーマットのチェック（CIで使用）

### テスト
- `npm run test:run` - テストを一度だけ実行
- `npm run test:coverage` - カバレッジレポート生成

## 技術スタック

| 用途 | ライブラリ | バージョン |
|------|----------|---------|
| フレームワーク | React | 19.2.0 |
| ルーティング | react-router-dom | 7.12.0 |
| 状態管理 | @tanstack/react-query | 5.90.19 |
| スタイリング | tailwindcss | 4.1.18 |
| ビルドツール | Vite | 7.2.4 |
| テスト | vitest | 4.0.17 |
| APIモック | msw | 2.12.7 |

## 設計の意図

1. **段階的な実装**: コア機能から順次実装する設計
2. **テスト駆動型**: MSWでAPIをモックし、実装前からテスト可能
3. **型安全性重視**: TypeScript strictモード、地域IDはリテラル型で制限
4. **開発体験の最適化**: Vite高速ビルド、Hot Module Replacement、自動フォーマット

## 開発方針

- YAGNI原則: 今必要のない機能は実装しない
- Baby steps: 小さく確実に進む、一度に多くを変更しない
- **TDD実践**: t-wadaスタイルのテスト駆動開発を採用（詳細は`.claude/rules/tdd.md`参照）
  - 報告タイミング: Greenフェーズ（テストが通る最小実装）で一旦報告
  - 可読性優先: 最初は動作する汚い状態でOK、抽象化は後回し
- **テスト戦略**: Vitest + MSW + Testing Library（詳細は`.claude/rules/testing.md`参照）
- **コード品質**: ESLint + Prettier + TypeScript strict（詳細は`.claude/rules/code-quality.md`参照）
