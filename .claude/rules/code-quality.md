# コード品質ガイドライン

このプロジェクトのコード品質ツールと設定について説明します。

## ESLint

### 設定ファイル
- **eslint.config.js**: フラットコンフィグ形式

### ルール
- TypeScript ESLint: TypeScript特有のルール
- React Hooks: Hooksの使用ルール
- React Refresh: HMR対応のルール

### 実行コマンド
- `npm run lint` - ESLintによる検証

## Prettier

### 設定（.prettierrc）
- **セミコロン**: あり
- **シングルクォート**: あり
- **タブ幅**: 2
- **トレーリングコンマ**: es5
- **行幅**: 80

### 実行コマンド
- `npm run format` - 自動フォーマット
- `npm run format:check` - フォーマットのチェック

### Claude Code統合
`.claude/settings.json`でWrite/Edit後にPrettierを自動実行する設定あり

## TypeScript

### tsconfig.app.json（アプリケーション向け）
- **Target**: ESNext
- **Strict mode**: 有効（全ての厳密性チェック）
- **JSX**: react-jsx
- **未使用変数・パラメータの検出**: 有効

**厳密性チェック:**
- noUnusedLocals: true
- noUnusedParameters: true
- noFallthroughCasesInSwitch: true
- noUncheckedSideEffectImports: true

### tsconfig.node.json（ビルドツール向け）
- **Target**: ESNext
- Vite設定用

## Git Hooks

### Husky + lint-staged
- **pre-commit**: コミット前にlintとformatを自動実行
- 設定ファイル: `.husky/pre-commit`

## EditorConfig

### 設定（.editorconfig）
- **インデント**: スペース2
- **改行**: LF
- **文字エンコーディング**: UTF-8
- **末尾の空白**: 削除

## コーディング規約

### 型安全性
- **strict mode**: 必ず有効にする
- **any型**: 使用禁止（unknown型を使用）
- **型アサーション**: 最小限に留める
- **リテラル型**: 可能な限り使用（例: CityId型）

### 命名規則
- **ファイル名**: PascalCase（コンポーネント）、camelCase（ユーティリティ）
- **コンポーネント**: PascalCase
- **関数**: camelCase
- **定数**: UPPER_SNAKE_CASE（エクスポートする定数のみ）
- **型**: PascalCase

### インポート順序
1. React関連
2. 外部ライブラリ
3. 内部モジュール（types, constants, lib等）
4. 相対パス

### コンポーネント設計
- **単一責任の原則**: 1コンポーネント1責任
- **Props型定義**: 必ず型定義する
- **デフォルトエクスポート**: コンポーネントのみ使用

### 関数設計
- **純粋関数**: 副作用を避ける
- **引数**: 3個以下（それ以上ならオブジェクトにまとめる）
- **戻り値の型**: 明示的に定義する
