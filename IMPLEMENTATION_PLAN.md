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