# X Button Hider

A Chrome extension that hides the **Lists**, **Bookmarks**, and **More** buttons from X (Twitter)’s navigation menu. Strongly recommended to use together with *calm Twitter*.

## Features

### Navigation Buttons

* 📋 Hide the **Lists** button
* 🔖 Hide the **Bookmarks** button
* ➕ Hide the **More** button
* 🔔 Hide the **Notifications** button
* ✉️ Hide the **Messages** button (added in v1.4.1)

### User Information

* 👤 Hide **@username** (user handle) (added in v1.4.0)
* 🔄 Hide the **account switch button** (added in v1.4.0)

### Tweet-related

* ⏰ Hide the **time display** (e.g., "5m ago", "2h ago")
* • Hide the **dot separator** (·)
* 🤖 Hide the **Explain this post** button
* 🤖 Hide the **Enhance your post with Grok** button (added in v1.4.1)

### Other UI Elements

* ✨ Hide the **X Premium** (verified badge) promotion banner
* 🔍 Hide the **search box**
* 📄 Hide the **footer** (Terms of Service, Privacy Policy, etc.)

## Installation

1. **Open the Chrome extensions page**

   * Type `chrome://extensions/` into the address bar
   * Or go to Chrome Menu → More Tools → Extensions

2. **Enable Developer Mode**

   * Toggle the “Developer mode” switch at the top right

3. **Load the extension**

   * Click the “Load unpacked” button
   * Select the **X** folder and click “Select Folder”

4. **Check**

   * Open X (Twitter) and confirm the specified buttons are hidden
   * A page reload may be required

## Supported Sites

* [https://twitter.com](https://twitter.com)
* [https://x.com](https://x.com)

## Troubleshooting

### Buttons are not hidden

1. **Reload the page** (Ctrl/Cmd + R)
2. Make sure the **extension is enabled**
3. **Restart Chrome**

### Only some buttons are hidden

X (Twitter) frequently updates its UI, so selectors may change.
If this happens, you’ll need to update the selectors in `content.css`.

## File Structure

```
X/
├── manifest.json     # Extension configuration file
├── content.css       # CSS to hide buttons
├── content.js        # JavaScript to dynamically hide elements
├── icon.svg          # Icon (unused)
└── README.md         # This file
```

## Customization

If you want to keep certain elements visible, comment out the corresponding section in `content.css`.

### Example 1: Show only the Bookmarks button

```css
/* Hide Bookmarks button */
/* Comment out this section
nav[aria-label="Primary"] a[href="/i/bookmarks"],
... {
  display: none !important;
}
*/
```

### Example 2: Show the time display

```css
/* Hide tweet time display */
/* Comment out this entire section
/* General time tag */
/* time { ... } */
/* through */
/* Dot (·) hide */
/* article span:has(+ a time) { ... } */
*/
```

## Notes

* This extension is not an official feature of X (Twitter)
* It may stop working if the UI changes
* Recommended for private use only

## Changelog

### v1.4.2 (January 2025)

* 🔧 Fixed @username removal again (resolved display name disappearing)
* 🎯 More specific selector targeting only @username
* ⚡ Optimized to affect only the user-name area

### v1.4.1 (January 2025)

* ✉️ Added option to hide **Messages** button
* 🤖 Added option to hide **Enhance your post with Grok** button
* 🔧 Improved @username removal (keeps display name visible)
* 🎯 Strengthened removal of **Explain this post** button

### v1.4.0 (January 2025)

* 👤 Added option to hide @username (user handle)
* 🤖 Added option to hide **Explain this post** button
* 🔄 Added option to hide the account switch button
* 🎯 Dynamic @username removal via JavaScript

### v1.3.1 (January 2025)

* 🔧 Fixed black screen issue
* 🎯 Optimized CSS selectors (removed overly broad ones)
* 🔍 Refined dot removal logic
* ⚡ Performance improvements

### v1.3.0 (January 2025)

* 🔔 Added option to hide Notifications button
* • Added option to hide dot (·)
* 🔍 Added option to hide search box
* 📄 Added option to hide footer (Terms of Service, etc.)
* 🔧 Dynamic dot removal via JavaScript

### v1.2.0 (January 2025)

* ⏰ Added option to hide tweet time display
* 🗿 Hide relative time (e.g., "5m ago", "2h ago")
* 🔗 Hide links to time display

### v1.1.2 (January 2025)

* 🎯 Fixed black screen issue on profile page
* 🔍 Added profile page detection logic
* 🏯 Supported SPA page transitions

### v1.1.1 (January 2025)

* 🔧 Fixed black screen issue
* 🎯 Fine-tuned CSS selectors
* 🔍 Optimized JavaScript hiding process

### v1.1.0 (January 2025)

* ✨ Added option to hide X Premium promotion banner
* 🔄 Support for dynamically loaded elements

### v1.0.0 (January 2025)

* 🎉 Initial release
* 📋 Hide Lists button
* 🔖 Hide Bookmarks button
* ➕ Hide More button

## License

For personal use only. Redistribution is prohibited.
