# IMPLEMENTATION_PLAN.md

## Stage 1: 基本構造の作成
**Goal**: Chrome拡張機能の基本ファイル構造を作成
**Success Criteria**: 
- manifest.jsonが正しいフォーマットで作成される
- 拡張機能として読み込み可能
**Tests**: Chromeの拡張機能管理画面で読み込みエラーが出ない
**Status**: Complete ✅

## Stage 2: CSS実装
**Goal**: ターゲットボタンを非表示にするCSSを実装
**Success Criteria**: 
- Lists、Bookmarks、Moreボタンが非表示になる
- 他のUI要素に影響しない
**Tests**: X.comで各ボタンが見えなくなることを確認
**Status**: Complete ✅

## Stage 3: ドキュメント作成
**Goal**: 使用方法とトラブルシューティングガイドを作成
**Success Criteria**: 
- インストール手順が明確
- トラブルシューティング方法が記載されている
**Tests**: READMEの手順通りにインストールできる
**Status**: Complete ✅

## 実装メモ

### 採用したアプローチ
- **CSS-only solution**: JavaScriptを使わず、CSSのみで実装
  - 理由: シンプルで高速、メンテナンスが容易
  - トレードオフ: 動的な要素には対応しにくい

### セレクタ戦略
- 複数のセレクタを使用して確実性を高める
- aria-label、href、data-testidを組み合わせる
- 日本語と英語両方のラベルに対応

### 今後の改善点
- [ ] アイコンを適切なPNG形式で作成
- [ ] オプションページでボタンごとのON/OFF切り替え機能
- [x] 動的に追加される要素への対応（MutationObserver） - v1.1.0で実装済み

## Stage 4: Premium勧誘バナーの非表示機能追加
**Goal**: X Premiumの勧誘バナーを非表示にする
**Success Criteria**: 
- "You aren't verified yet"バナーが非表示になる
- Premiumサインアップリンクが非表示になる
- 動的に追加される勧誘要素も非表示になる
**Tests**: X.comでPremium勧誘が表示されないことを確認
**Status**: Complete ✅

## Stage 5: バグ修正 - サイトが真っ黒になる問題
**Goal**: 幅広すぎるセレクタによる表示不具合を修正
**Success Criteria**: 
- サイトが正常に表示される
- 必要なボタンのみが非表示になる
- Premium勧誘バナーのみが非表示になる
**Tests**: X.comでコンテンツが正常に表示されることを確認
**Status**: Complete ✅

## Stage 6: バグ修正 - 自分のプロフィールページの問題
**Goal**: 自分のプロフィールページで画面が真っ黒になる問題を修正
**Success Criteria**: 
- 自分のプロフィールページが正常に表示される
- 他人のプロフィールページも正常に表示される
- Premium勧誘バナーは適切に非表示になる
**Tests**: 自分のプロフィールページと他人のプロフィールページの両方で動作確認
**Status**: Complete ✅

### v1.1.2での修正内容
- `isOwnProfilePage()`関数を追加して自分のプロフィールを判定
- 自分のプロフィールページでは親要素の非表示を制限
- URL変更の監視を追加してSPAのページ遷移に対応
- プロフィール編集ボタンの存在で自分のページを判定

## Stage 7: 新機能 - ツイートの時間表示非表示
**Goal**: 各ツイートの時間表示（○分前、○時間前など）を非表示にする
**Success Criteria**: 
- ツイートの時間表示が非表示になる
- timeタグとdatetime属性を持つ要素が非表示になる
- 時間表示の前後の区切り文字（·）も非表示になる
**Tests**: タイムラインで時間表示が非表示になっていることを確認
**Status**: Complete ✅

### v1.2.0での実装内容
- CSSでtimeタグとdatetime属性を持つ要素を非表示
- 相対時間表示のaria-labelをターゲット
- 時間表示を含むリンク要素も非表示
- 時間表示の前後の区切り文字も削除

## Stage 8: 新機能 - 追加のUI要素非表示
**Goal**: 通知ボタン、中点、検索ボックス、フッターを非表示にする
**Success Criteria**: 
- 通知ボタンが非表示になる
- ユーザー名後の中点（·）が非表示になる
- 検索ボックスが非表示になる
- フッター（Terms of Service等）が非表示になる
**Tests**: 各要素が非表示になっていることを確認
**Status**: Complete ✅

### v1.3.0での実装内容
- CSSで通知ボタンと検索ボックス、フッターを非表示
- JavaScriptで中点を動的に検出して削除
- `removeDots()`関数を追加して中点を処理
- `hideAllElements()`ですべての非表示処理を統合

## Stage 9: バグ修正 - 幅広すぎるCSSセレクタ
**Goal**: 画面が真っ黒になる問題を修正
**Success Criteria**: 
- 画面が正常に表示される
- 必要な要素のみが非表示になる
- コンテンツが正しく表示される
**Tests**: X.comで通常のコンテンツが表示されることを確認
**Status**: Complete ✅

### v1.3.1での修正内容
- 問題のあるCSSセレクタを削除
  - `article span[aria-hidden="true"]` を削除
  - `article div[dir] > span` を削除
  - `:has(time)` セレクタを制限
  - `[datetime]` セレクタを削除
- JavaScriptの中点削除を最適化
  - 完全に「·」のみのspanを対象に
  - 不要な幅広い検索を削除

## Stage 10: 新機能 - @username、Explainボタン、ユーザー切り替え
**Goal**: @username、Explain this postボタン、ユーザー切り替えボタンを非表示
**Success Criteria**: 
- ツイート内の@usernameが非表示になる
- Explain this postボタンが非表示になる
- ユーザー切り替えボタンが非表示になる
**Tests**: 各要素が非表示になっていることを確認
**Status**: Complete ✅

### v1.4.0での実装内容
- CSSで@username、Explainボタン、ユーザー切り替えボタンを非表示
- `removeUsernames()`関数を追加して@usernameを動的に削除
- @で始まるすべてのspanを対象に
- ユーザー名エリア内の@usernameリンクも非表示

## Stage 11: バグ修正と機能追加 - v1.4.1
**Goal**: 表示名が消える問題を修正し、MessagesボタンとGrokボタンを非表示
**Success Criteria**: 
- @usernameのみが非表示になり、表示名は残る
- Messagesボタンが非表示になる
- Enhance your post with Grokボタンが非表示になる
- Explain this postボタンが確実に非表示になる
**Tests**: 各要素が正しく処理されることを確認
**Status**: Complete ✅

### v1.4.1での修正・実装内容
- `removeUsernames()`関数を修正して@usernameのみを対象に
- 正規表現で@usernameのパターンを厳密にマッチ
- `removeExplainAndGrok()`関数を追加
- Messagesボタンを非表示にするCSSを追加
- Grokボタンを非表示にするCSSとJavaScriptを追加

## Stage 12: バグ修正 - 表示名消失問題 v1.4.2
**Goal**: 表示名まで削除されてしまう問題を解決
**Success Criteria**: 
- @usernameのみが削除される
- 表示名（username）は正常に表示される
- User-Nameエリア内の@usernameのみを対象にする
**Tests**: ツイートで表示名が表示され、@usernameが非表示になることを確認
**Status**: Complete ✅

### v1.4.2での修正内容
- `article div[dir="ltr"] span`のような幅広いセレクタを削除
- User-Nameエリア内の要素のみを対象にするように変更
- 子要素を持たないspanのみを対象に（表示名は通常子要素を持つ）
- CSSセレクタも同様に限定的に修正

## Stage 13: 三点メニュー改善 - v1.4.3
**Goal**: Repostボタン復活とQuoteボタン非表示、三点メニューの整理
**Success Criteria**: 
- Repostボタンが表示される
- Quoteボタンが非表示になる
- 三点メニューで削除、ミュート、ブロック、Not interesting以外が非表示になる
**Tests**: 各ボタンとメニュー項目が適切に表示/非表示になることを確認
**Status**: Complete ✅

### v1.4.3での修正・実装内容
- RepostボタンのCSS・JavaScript非表示設定を削除
- Quoteボタンを非表示にするCSS追加
- 三点メニューから以下の項目を非表示に追加:
  - Follow/Unfollow {@username}
  - Add/remove from Lists
  - View post engagements  
  - Embed post
  - Highlight on your profile
  - Change who can reply
  - Pin to your profile
- CSSとJavaScript両方で対応し確実性を向上

## Stage 14: 三点メニュー完全修正 - v1.4.4
**Goal**: 残存する不要メニュー項目の完全削除とQuoteボタンの確実な非表示
**Success Criteria**: 
- Add/remove from Lists, View post engagements/analytics, Request Community Note, Highlight on your profileが確実に非表示
- Quoteボタンが完全に非表示になる
- Repostボタンは表示されたまま
**Tests**: 三点メニューで削除、ミュート、ブロック、Not interesting以外が全て非表示になることを確認
**Status**: Complete ✅

### v1.4.4での修正・実装内容
- **包括的なテキストマッチング追加**: 
  - "View post analytics"、"Analytics"、"Engagements"等の短縮形も追加
  - 日本語バリエーション追加（"ツイートアナリティクス"等）
- **CSS セレクタの強化**:
  - `analytics`、`list`のdata-testidを追加
  - aria-labelベースのセレクタを追加（data-testidに依存しない）
- **Quote ボタン対策の大幅強化**:
  - CSS: 多様なQuoteボタンパターンに対応（inline、menu、親要素等）
  - JavaScript: Repost除外条件付きでQuote完全削除
  - 関数名を`removeExplainGrokAndQuote`に変更
- **二重保護システム**: CSS + JavaScriptの両方で確実性を最大化

## Stage 15: レスポンス高速化とラグ削減 - v1.4.5
**Goal**: 三点メニュー項目の表示ラグを削減し、@usernameレベルの即座非表示を実現
**Success Criteria**: 
- 三点メニューのクリック時に遅延なく不要項目が非表示になる
- MutationObserverの応答性を大幅改善
- 保護対象項目（削除・ミュート・ブロック・Not interested）は確実に表示維持
**Tests**: 三点メニューを開いた瞬間に不要項目が見えない状態を確認
**Status**: Complete ✅

### v1.4.5での修正・実装内容
- **ラグ削減の根本対策**:
  - MutationObserver遅延: 100ms → 0ms （即座実行）
  - 三点ボタンクリック検知システム追加（10ms極小遅延）
  - メニュー出現専用監視システム `setupMenuObserver()` 新設
- **高速処理アーキテクチャ**:
  - クリックイベントリスナーでボタン押下を即座検知
  - ドロップダウン/メニュー要素追加を独立監視
  - 複数セレクタパターンで包括的検索
- **強化されたメニュークリーンアップ**:
  - 保護パターン追加（delete, mute, block, not interested, report）
  - 短縮キーワードでの効率的マッチング
  - エラー耐性向上（try-catch包含）
- **多重初期化保護**: DOMContentLoaded、load、URLchange全てでメニュー監視を確実に設定

## Stage 16: Repostボタン保護修正 - v1.4.6  
**Goal**: Repostボタンが誤って非表示になる問題を修正し、Quoteのみを非表示にする
**Success Criteria**: 
- Repostボタンが確実に表示される
- Quoteボタンは非表示のまま  
- 三点メニューでもRepost項目が表示される
**Tests**: Repostボタンが機能し、Quoteボタンが非表示になることを確認
**Status**: Complete ✅

### v1.4.6での修正・実装内容
**根本原因**: 広すぎるCSSセレクタとJavaScriptパターンがRepostボタンも捉えていた
- **CSS完全修正**:
  - 全Quoteセレクタに`:not([aria-label*="Repost"])`と`:not([data-testid*="repost"])`を追加
  - 日本語版も`:not([aria-label*="リポスト"])`で保護強化
  - 二重・三重のRepost除外条件で確実性を最大化
- **JavaScript強化**:
  - `cleanupThreeDotMenu()`でRepost絶対保護（最優先チェック）
  - `removeExplainGrokAndQuote()`でRepost検出ロジック大幅強化
  - retweet/リツイートパターンも保護対象に追加
- **保護階層システム**:
  1. Repost絶対保護（最優先）
  2. 重要項目保護（delete, mute, block, not interested）  
  3. 不要項目削除（quote, community, bookmark等）
- **確実性向上**: text + aria-label + data-testid の全属性を複合チェック