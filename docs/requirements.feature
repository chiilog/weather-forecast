# language: ja

Feature: 天気予報アプリ
  OpenWeatherMap APIを使用して、4つの地域（東京、兵庫、大分、北海道）の
  5日間天気予報を表示するWebアプリケーション

  Background:
    Given ユーザーがアプリにアクセスしている

  # ========================================
  # ホーム画面
  # ========================================

  @home @display
  Scenario: ホーム画面で地域リストが表示される
    When ユーザーがホーム画面（"/"）にアクセスする
    Then 4つの地域が縦並びリストで表示される
      | 地域名   |
      | 東京     |
      | 兵庫     |
      | 大分     |
      | 北海道   |
    And 各地域はクリック可能なリストアイテムとして表示される

  @home @navigation
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

  @home @ux
  Scenario: 地域クリック時に視覚的フィードバックがある
    Given ユーザーがホーム画面を表示している
    When ユーザーが地域リストアイテムをタップまたはクリックする
    Then 視覚的なフィードバック（ホバー/アクティブ状態）が表示される

  # ========================================
  # 天気画面
  # ========================================

  @weather @api
  Scenario: 天気画面表示時にAPIからデータを取得する
    When ユーザーが"/weather/tokyo"にアクセスする
    Then OpenWeatherMap APIが呼び出される
    And 取得パラメータは以下の通りである
      | パラメータ | 値     |
      | q          | Tokyo  |
      | units      | metric |
      | lang       | ja     |

  @weather @display
  Scenario: 天気予報データが正しく表示される
    Given APIから天気データの取得に成功した
    When 天気画面が表示される
    Then 5日間の天気予報リストが表示される
    And 各予報アイテムには以下の情報が含まれる
      | 項目           | 形式                  |
      | 天気アイコン   | 画像                  |
      | 気温           | 数値（℃）            |
      | 日時           | M/D HH:mm形式（JST）  |

  @weather @timezone
  Scenario: 日時が日本のタイムゾーン（JST）で表示される
    Given APIから天気データの取得に成功した
    When 天気画面が表示される
    Then 全ての日時がJST（UTC+9）で表示される

  @weather @navigation
  Scenario: 天気画面からホーム画面に戻れる
    Given ユーザーが天気画面を表示している
    When ユーザーが"戻る"ナビゲーションをクリックする
    Then ホーム画面（"/"）に遷移する

  @weather @loading
  Scenario: データ取得中にローディング状態が表示される
    When ユーザーが天気画面にアクセスする
    And APIからのレスポンスを待機している
    Then スケルトンローディングが表示される

  # ========================================
  # エラー画面
  # ========================================

  @error @5xx
  Scenario: 5xxエラー時にエラー画面が表示される
    Given ユーザーが天気画面にアクセスする
    When APIが5xxエラーを返す
    Then エラー画面が表示される
    And "エラーが発生しました"というメッセージが表示される
    And "天気情報を取得できませんでした"という説明が表示される

  @error @navigation
  Scenario: エラー画面からホーム画面に戻れる
    Given エラー画面が表示されている
    When ユーザーが"ホームに戻る"リンクをクリックする
    Then ホーム画面（"/"）に遷移する

  @error @4xx
  Scenario: 4xxエラー時の挙動
    Given ユーザーが天気画面にアクセスする
    When APIが4xxエラーを返す
    Then エラー画面が表示される
    # 注: 4xxエラーの具体的な表示方法は実装時に決定

  # ========================================
  # キャッシュ機能（応用要件）
  # ========================================

  @cache @performance
  Scenario: 同一地域への再アクセス時にキャッシュが使用される
    Given ユーザーが"/weather/tokyo"にアクセスしてデータを取得した
    When ユーザーがホーム画面に戻る
    And 再度"/weather/tokyo"にアクセスする
    Then APIリクエストは発生しない
    And キャッシュされたデータが即座に表示される

  @cache @different-city
  Scenario: 異なる地域へのアクセス時は新規にAPIを呼び出す
    Given ユーザーが"/weather/tokyo"にアクセスしてデータを取得した
    When ユーザーが"/weather/hyogo"にアクセスする
    Then 兵庫の天気データを取得するためにAPIリクエストが発生する

  @cache @stale
  Scenario: キャッシュの有効期限
    Given 天気データがキャッシュされている
    When キャッシュが10分間新鮮（stale）として扱われる
    And キャッシュが30分間保持される
    Then TanStack Queryのキャッシュ設定に従って動作する

  # ========================================
  # 画面遷移
  # ========================================

  @routing
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

  # ========================================
  # アクセシビリティ・UX
  # ========================================

  @ux @responsive
  Scenario: レスポンシブデザインで表示される
    When ユーザーが様々な画面サイズでアプリにアクセスする
    Then 画面サイズに応じて適切にレイアウトが調整される

  @ux @icon
  Scenario: 天気アイコンが正しく表示される
    Given APIから天気データの取得に成功した
    When 天気画面が表示される
    Then 天気アイコンがOpenWeatherMapのアイコンURLから取得されて表示される
    And アイコンURLは"https://openweathermap.org/img/wn/{icon}@2x.png"形式である
