# 天気予報アプリ 要件定義書

OpenWeatherMap APIを使用して、4つの地域（東京、兵庫、大分、北海道）の5日間天気予報を表示するWebアプリケーション。

---

## 前提条件

```gherkin
Background:
  Given ユーザーがアプリにアクセスしている
```

---

## 1. ホーム画面

### 1.1 地域リスト表示

```gherkin
Scenario: ホーム画面で地域リストが表示される
  When ユーザーがホーム画面（"/"）にアクセスする
  Then 4つの地域が縦並びリストで表示される
    | 地域名   |
    | 東京     |
    | 兵庫     |
    | 大分     |
    | 北海道   |
  And 各地域はクリック可能なリストアイテムとして表示される
```

### 1.2 地域選択・画面遷移

```gherkin
Scenario Outline: 地域をクリックすると天気画面に遷移する
  Given ユーザーがホーム画面を表示している
  When ユーザーが"<地域名>"をクリックする
  Then "/weather/<cityId>"に遷移する

  Examples:
    | 地域名   | cityId   |
    | 東京     | tokyo    |
    | 兵庫     | hyogo    |
    | 大分     | oita     |
    | 北海道   | hokkaido |
```

### 1.3 視覚的フィードバック

```gherkin
Scenario: 地域クリック時に視覚的フィードバックがある
  Given ユーザーがホーム画面を表示している
  When ユーザーが地域リストアイテムをタップまたはクリックする
  Then 視覚的なフィードバック（ホバー/アクティブ状態）が表示される
```

---

## 2. 天気画面

### 2.1 API呼び出し

```gherkin
Scenario: 天気画面表示時にAPIからデータを取得する
  When ユーザーが"/weather/tokyo"にアクセスする
  Then OpenWeatherMap APIが呼び出される
  And 取得パラメータは以下の通りである
    | パラメータ | 値         |
    | q          | Tokyo      |
    | units      | metric     |
    | lang       | ja         |
    | APPID      | {API_KEY}  |
```

### 2.2 天気データ表示

```gherkin
Scenario: 天気予報データが正しく表示される
  Given APIから天気データの取得に成功した
  When 天気画面が表示される
  Then 5日間の天気予報リストが表示される
  And 各予報アイテムには以下の情報が含まれる
    | 項目           | 形式                  |
    | 天気アイコン   | 画像                  |
    | 気温           | 数値（℃）            |
    | 日時           | M/D HH:mm形式（JST）  |
```

### 2.3 タイムゾーン

```gherkin
Scenario: 日時が日本のタイムゾーン（JST）で表示される
  Given APIから天気データの取得に成功した
  When 天気画面が表示される
  Then 全ての日時がJST（UTC+9）で表示される
```

### 2.4 ナビゲーション

```gherkin
Scenario: 天気画面からホーム画面に戻れる
  Given ユーザーが天気画面を表示している
  When ユーザーが"戻る"ナビゲーションをクリックする
  Then ホーム画面（"/"）に遷移する
```

### 2.5 ローディング状態

```gherkin
Scenario: データ取得中にローディング状態が表示される
  When ユーザーが天気画面にアクセスする
  And APIからのレスポンスを待機している
  Then スケルトンローディングが表示される
```

---

## 3. エラー画面

### 3.1 5xxエラー時の表示

```gherkin
Scenario: 5xxエラー時にエラー画面が表示される
  Given ユーザーが天気画面にアクセスする
  When APIが5xxエラーを返す
  Then エラー画面が表示される
  And "エラーが発生しました"というメッセージが表示される
  And "天気情報を取得できませんでした"という説明が表示される
```

### 3.2 エラー画面からの復帰

```gherkin
Scenario: エラー画面からホーム画面に戻れる
  Given エラー画面が表示されている
  When ユーザーが"ホームに戻る"リンクをクリックする
  Then ホーム画面（"/"）に遷移する
```

### 3.3 4xxエラー時の挙動

```gherkin
Scenario: 401エラー（認証エラー）時の表示
  Given ユーザーが天気画面にアクセスする
  When APIが401エラーを返す
  Then エラー画面が表示される
  And "設定エラーが発生しました"というメッセージが表示される
  And "管理者にお問い合わせください"という説明が表示される

Scenario: 404エラー（都市が見つからない）時の表示
  Given ユーザーが天気画面にアクセスする
  When APIが404エラーを返す
  Then エラー画面が表示される
  And "指定された地域が見つかりません"というメッセージが表示される

Scenario: 429エラー（レート制限）時の表示
  Given ユーザーが天気画面にアクセスする
  When APIが429エラーを返す
  Then エラー画面が表示される
  And "しばらく時間をおいてお試しください"というメッセージが表示される

Scenario: その他の4xxエラー時の表示
  Given ユーザーが天気画面にアクセスする
  When APIが上記以外の4xxエラーを返す
  Then エラー画面が表示される
  And "エラーが発生しました"というメッセージが表示される
```

---

## 4. キャッシュ機能（応用要件）

### 4.1 キャッシュの利用

```gherkin
Scenario: 同一地域への再アクセス時にキャッシュが使用される
  Given ユーザーが"/weather/tokyo"にアクセスしてデータを取得した
  When ユーザーがホーム画面に戻る
  And 再度"/weather/tokyo"にアクセスする
  Then APIリクエストは発生しない
  And キャッシュされたデータが即座に表示される
```

### 4.2 異なる地域へのアクセス

```gherkin
Scenario: 異なる地域へのアクセス時は新規にAPIを呼び出す
  Given ユーザーが"/weather/tokyo"にアクセスしてデータを取得した
  When ユーザーが"/weather/hyogo"にアクセスする
  Then 兵庫の天気データを取得するためにAPIリクエストが発生する
```

### 4.3 キャッシュの有効期限

```gherkin
Scenario: キャッシュの有効期限
  Given 天気データがキャッシュされている
  When キャッシュが10分間新鮮（stale）として扱われる
  And キャッシュが30分間保持される
  Then TanStack Queryのキャッシュ設定に従って動作する
```

---

## 5. ルーティング

### 5.1 URLルーティング

```gherkin
Scenario Outline: URLルーティングが正しく動作する
  When ユーザーが"<URL>"にアクセスする
  Then "<画面>"が表示される

  Examples:
    | URL               | 画面       |
    | /                 | ホーム画面 |
    | /weather/tokyo    | 天気画面   |
    | /weather/hyogo    | 天気画面   |
    | /weather/oita     | 天気画面   |
    | /weather/hokkaido | 天気画面   |
```

---

## 6. UX・アクセシビリティ

### 6.1 レスポンシブデザイン

```gherkin
Scenario: レスポンシブデザインで表示される
  When ユーザーが様々な画面サイズでアプリにアクセスする
  Then 画面サイズに応じて適切にレイアウトが調整される
```

### 6.2 天気アイコン

```gherkin
Scenario: 天気アイコンが正しく表示される
  Given APIから天気データの取得に成功した
  When 天気画面が表示される
  Then 天気アイコンがOpenWeatherMapのアイコンURLから取得されて表示される
  And アイコンURLは"https://openweathermap.org/img/wn/{icon}@2x.png"形式である
```
