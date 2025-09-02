// X (Twitter) Premium勧誘要素を動的に監視して非表示にする

// 非表示にする要素の具体的なテキストパターン（完全一致または特定のフレーズ）
const SPECIFIC_TEXT_PATTERNS = [
  'You aren\'t verified yet',
  'Get verified for boosted replies',
  'まだ認証されていません',
  '認証を取得して'
];

// 現在のページが自分のプロフィールページかどうかを判定
function isOwnProfilePage() {
  // URLパターンでチェック
  const path = window.location.pathname;
  
  // プロフィール編集ボタンの存在でチェック
  const editProfileButton = document.querySelector('a[href="/settings/profile"]');
  const editButton = document.querySelector('[aria-label*="Edit profile"]');
  const editButtonJp = document.querySelector('[aria-label*="プロフィールを編集"]');
  
  // いずれかの条件に合致すれば自分のプロフィール
  return editProfileButton || editButton || editButtonJp;
}

// 要素を非表示にする関数
function hideElement(element) {
  if (element && element.style.display !== 'none') {
    element.style.display = 'none';
    element.style.visibility = 'hidden';
  }
}

// Premium勧誘バナーを特定して非表示にする
function hidePremiumBanner() {
  // 自分のプロフィールページでは、より慎重に処理
  const isOwnProfile = isOwnProfilePage();
  
  // Premium sign upリンクを持つ要素を検索
  const premiumLinks = document.querySelectorAll('a[href="/i/premium_sign_up"]');
  
  premiumLinks.forEach(link => {
    // 自分のプロフィールページでは、リンク自体のみを非表示
    if (isOwnProfile) {
      // リンクとその直接の親要素のみ非表示（最大1階層）
      const parent = link.parentElement;
      
      // 親要素が小さなコンテナの場合のみ非表示
      if (parent && parent.childElementCount <= 3) {
        // 子要素が3個以下の小さな要素のみ対象
        hideElement(parent);
      } else {
        // それ以外はリンクのみ非表示
        hideElement(link);
      }
    } else {
      // 他のページでは通常通り処理
      let targetElement = link;
      let parent = link.parentElement;
      
      // 最大2階層まで遡る
      for (let i = 0; i < 2 && parent; i++) {
        // Premium勧誘バナー特有のクラスを持つ場合のみ
        if (parent.classList.contains('css-175oi2r') && 
            parent.classList.contains('r-nsbfu8')) {
          targetElement = parent;
          break;
        }
        parent = parent.parentElement;
      }
      
      hideElement(targetElement);
    }
  });
  
  // 特定のテキストを含む要素を検索（自分のプロフィール以外で）
  if (!isOwnProfile) {
    const allDivs = document.querySelectorAll('div');
    
    allDivs.forEach(div => {
      const text = div.textContent || '';
      
      // 特定のテキストパターンに完全一致する場合のみ
      for (const pattern of SPECIFIC_TEXT_PATTERNS) {
        if (text.includes(pattern) && div.querySelector('a[href="/i/premium_sign_up"]')) {
          // Premium sign upリンクも含む場合のみ非表示
          hideElement(div);
          break;
        }
      }
    });
  } else {
    // 自分のプロフィールページでは、テキストベースでの非表示を行わない
    // または、より限定的な要素のみを対象にする
    const specificBanners = document.querySelectorAll('[data-testid="placementTracking"]');
    specificBanners.forEach(banner => {
      if (banner.querySelector('a[href="/i/premium_sign_up"]')) {
        hideElement(banner);
      }
    });
  }
}

// 中点（·）を削除する関数
function removeDots() {
  // ツイート内の中点のみをターゲットに
  const allSpans = document.querySelectorAll('article span');
  
  allSpans.forEach(span => {
    // spanのテキストが完全に「·」のみの場合
    const text = span.textContent;
    if (text && text.trim() === '·') {
      span.style.display = 'none';
      span.style.visibility = 'hidden';
    }
  });
}

// @usernameを削除する関数
function removeUsernames() {
  // User-Nameエリア内の@usernameリンクのみを非表示
  const userNameDivs = document.querySelectorAll('article div[data-testid="User-Name"]');
  
  userNameDivs.forEach(div => {
    // User-Name内の@usernameリンクを探す
    const userLink = div.querySelector('a[role="link"][tabindex="-1"]');
    if (userLink && userLink.textContent && userLink.textContent.startsWith('@')) {
      userLink.style.display = 'none';
      userLink.style.visibility = 'hidden';
    }
    
    // User-Name内の@usernameを含むspanを探す（リンク以外）
    const spans = div.querySelectorAll('span');
    spans.forEach(span => {
      const text = span.textContent;
      // @で始まり、他の文字を含まない純粹な@usernameのみ
      if (text && text.match(/^@[a-zA-Z0-9_]+$/) && !span.querySelector('*')) {
        // 子要素を持たないspanのみ対象（表示名は通常子要素を持つ）
        span.style.display = 'none';
        span.style.visibility = 'hidden';
      }
    });
  });
  
  // 特定のクラスを持つ@username span（プロフィールページ等）
  const specificUsernameSpans = document.querySelectorAll(
    'span.r-14j79pv:not([data-testid]):not([role]), ' +
    'span.r-18jsvk2:not([data-testid]):not([role])'
  );
  
  specificUsernameSpans.forEach(span => {
    const text = span.textContent;
    if (text && text.match(/^@[a-zA-Z0-9_]+$/)) {
      span.style.display = 'none';
      span.style.visibility = 'hidden';
    }
  });
}

// Explain this post、Grok、Quoteボタンを削除する関数
function removeExplainGrokAndQuote() {
  // Explain this postボタン
  const explainButtons = document.querySelectorAll(
    'button[aria-label*="Explain"], ' +
    'div[role="button"][aria-label*="Explain"], ' +
    'button[data-testid*="explain"]'
  );
  
  explainButtons.forEach(button => {
    const text = button.textContent || button.getAttribute('aria-label') || '';
    if (text.includes('Explain') || text.includes('explain')) {
      hideElement(button);
    }
  });
  
  // Grokボタン
  const grokButtons = document.querySelectorAll(
    'button[aria-label*="Grok"], ' +
    'div[aria-label*="Grok"], ' +
    'button[data-testid*="grok"], ' +
    'div[data-testid*="grok"]'
  );
  
  grokButtons.forEach(button => {
    hideElement(button);
  });
  
  // テキストベースでGrokを含む要素を検索
  const allButtons = document.querySelectorAll('button, div[role="button"]');
  allButtons.forEach(button => {
    const text = button.textContent || '';
    if (text.includes('Enhance your post with Grok') || text.includes('Grok')) {
      hideElement(button);
    }
  });
  
  // Quoteボタンを削除（Repost絶対保護版）
  const potentialQuoteButtons = document.querySelectorAll(
    'button[aria-label*="Quote"], ' +
    'div[role="button"][aria-label*="Quote"], ' +
    'button[data-testid*="quote"], ' +
    'div[data-testid*="quote"], ' +
    'button[aria-label*="引用"], ' +
    'div[role="button"][aria-label*="引用"]'
  );
  
  potentialQuoteButtons.forEach(button => {
    const text = button.textContent || '';
    const ariaLabel = button.getAttribute('aria-label') || '';
    const dataTestId = button.getAttribute('data-testid') || '';
    const combinedText = (text + ' ' + ariaLabel + ' ' + dataTestId).toLowerCase();
    
    // Repost要素は絶対に保護（最優先チェック）
    const isRepost = combinedText.includes('repost') || 
                    combinedText.includes('リポスト') || 
                    combinedText.includes('retweet') || 
                    combinedText.includes('リツイート');
    
    if (isRepost) return; // Repostは絶対保護
    
    // Quote確認（Repost除外済みなので安全）
    const isQuote = combinedText.includes('quote') || combinedText.includes('引用');
    
    if (isQuote) {
      hideElement(button);
    }
  });
}

// 三点メニューの不要な項目を削除する関数（Repost保護強化版）
function cleanupThreeDotMenu() {
  // より包括的な不要メニューパターン
  const unwantedPatterns = [
    // 短縮版キーワード（部分マッチでキャッチ）
    'Community', 'コミュニティ', 'Bookmark', 'ブックマーク',
    'Analytics', 'アナリティクス', 'Engagement', 'エンゲージメント', 
    'Embed', '埋め込み', 'Follow @', 'フォロー @', 'Unfollow @', 'フォロー解除 @',
    'Highlight', 'ハイライト', 'Pin to', '固定', 'Lists', 'リスト', 'reply', '返信'
  ];
  
  // より包括的なセレクタで検索
  const selectors = [
    'div[role="menuitem"]',
    'div[data-testid*="menu"] div',
    'div[role="menu"] div',
    '[role="menuitem"]'
  ];
  
  selectors.forEach(selector => {
    try {
      const menuItems = document.querySelectorAll(selector);
      
      menuItems.forEach(menuItem => {
        const text = (menuItem.textContent || '').trim();
        const ariaLabel = menuItem.getAttribute('aria-label') || '';
        const combinedText = (text + ' ' + ariaLabel).toLowerCase();
        
        // 空のテキストは無視
        if (!text) return;
        
        // Repostは絶対保護（最優先）
        const repostPatterns = ['repost', 'リポスト', 'retweet', 'リツイート'];
        const isRepost = repostPatterns.some(pattern => 
          combinedText.includes(pattern.toLowerCase())
        );
        
        if (isRepost) return; // Repostは絶対に保護
        
        // 重要な項目は保護（削除、ミュート、ブロック、Not interested）
        const protectedPatterns = ['delete', '削除', 'mute', 'ミュート', 'block', 'ブロック', 
                                 'not interested', '興味がない', 'report', '報告'];
        
        const isProtected = protectedPatterns.some(pattern => 
          combinedText.includes(pattern.toLowerCase())
        );
        
        if (isProtected) return; // 保護されたアイテムはスキップ
        
        // Quote専用チェック（Repost除外済みなので安全）
        if (combinedText.includes('quote') || combinedText.includes('引用')) {
          hideElement(menuItem);
          return;
        }
        
        // 不要パターンチェック
        const shouldHide = unwantedPatterns.some(pattern => 
          combinedText.includes(pattern.toLowerCase())
        );
        
        if (shouldHide) {
          hideElement(menuItem);
          return;
        }
        
        // @usernameを含むフォローボタン（動的対応）
        if (text.match(/^(Follow|Unfollow)\s+@\w+/) || 
            text.match(/^(フォロー|フォロー解除)\s+@\w+/)) {
          hideElement(menuItem);
        }
      });
    } catch (e) {
      // セレクタエラーを無視して続行
      console.debug('Menu selector error:', e);
    }
  });
}

// すべての非表示処理を実行する関数
function hideAllElements() {
  hidePremiumBanner();
  removeDots();
  removeUsernames();
  removeExplainGrokAndQuote();
  cleanupThreeDotMenu();
}

// MutationObserverで動的に追加される要素を監視
let observer = null;

// 三点メニュー専用の高速監視
function setupMenuObserver() {
  // 三点ボタンクリック時の即座処理
  document.addEventListener('click', (event) => {
    // 三点メニューボタンがクリックされた場合
    const target = event.target.closest('button[aria-label*="More"], button[aria-haspopup="menu"]');
    if (target) {
      // 少し遅延してメニュー項目が作られるのを待つ
      setTimeout(() => {
        cleanupThreeDotMenu();
      }, 10); // 極小遅延
    }
  });
  
  // ドロップダウンメニューの出現を監視
  const menuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // メニューまたはドロップダウンが追加された場合
          if (node.matches?.('div[role="menu"], div[data-testid*="Dropdown"], div[role="menuitem"]') ||
              node.querySelector?.('div[role="menuitem"]')) {
            // 即座にクリーンアップ実行
            cleanupThreeDotMenu();
          }
        }
      });
    });
  });
  
  if (document.body) {
    menuObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// MutationObserverをセットアップする関数
function setupObserver() {
  if (observer) return; // すでに設定済みの場合はスキップ
  
  observer = new MutationObserver((mutations) => {
    // 変更があった場合のみチェック
    let shouldCheck = false;
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Premium関連の要素または中点を含む要素が追加された可能性がある場合
          if (node.tagName === 'A' || 
              node.tagName === 'SPAN' || 
              node.querySelector?.('a[href*="premium"]') ||
              node.querySelector?.('span')) {
            shouldCheck = true;
          }
        }
      });
    });
    
    if (shouldCheck) {
      // 即座に実行（遅延を最小化）
      setTimeout(hideAllElements, 0);
    }
  });
  
  // document.bodyが存在する場合のみ開始
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// document.bodyが利用可能になるまで待つ
function waitForBody() {
  if (document.body) {
    setupObserver();
    setupMenuObserver(); // メニュー専用監視を追加
    hideAllElements();
  } else {
    // まだbodyが存在しない場合は少し待って再試行
    setTimeout(waitForBody, 10);
  }
}

// URLの変更を監視（SPAのページ遷移に対応）
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // ページが変わったら再チェック
    setTimeout(hideAllElements, 500);
  }
}).observe(document, {subtree: true, childList: true});

// 初期化
if (document.readyState === 'loading') {
  // DOMがまだ読み込み中の場合
  document.addEventListener('DOMContentLoaded', () => {
    setupObserver();
    setupMenuObserver();
    hideAllElements();
  });
} else {
  // DOMがすでに読み込み済みの場合
  waitForBody();
}

// ページが完全に読み込まれた後にも実行
window.addEventListener('load', () => {
  setupObserver(); // 念のため再度確認
  setupMenuObserver(); // メニュー監視も再確認
  setTimeout(hideAllElements, 1000);
  setTimeout(hideAllElements, 3000);
});

// 定期的にスキャン（フォールバック、頻度を下げる）
setInterval(hideAllElements, 30000);

// 早期実行
waitForBody();