# Culm X-twitter-

[日本語](README_JP.md) | English

A browser extension that hides distracting UI elements on X (formerly Twitter) to provide a cleaner browsing experience.I highly recommend using it in conjunction with Culm Twitter.

## Features

- Hides navigation buttons (Lists, Bookmarks, More)
- Removes @username displays from posts
- Removes time separators (dots) between elements
- Blocks Premium subscription prompts and advertisements
- Hides unnecessary buttons (Explain, Grok, Quote)
- Cleans up context menu items
- Automatically adjusts menu sizes after hiding elements

## Installation

### Chrome/Edge
1. Download or clone this repository
2. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download or clone this repository
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

## Supported Sites

- https://twitter.com/*
- https://x.com/*

## How It Works

The extension uses content scripts to:
- Monitor DOM changes dynamically
- Identify and hide unwanted elements
- Preserve important functionality while removing clutter
- Handle both static elements and dynamically loaded content

## Privacy

- No data collection
- No network requests
- Works entirely locally in your browser
- No permissions required beyond site access

## Compatibility

- Manifest V3 compatible
- Works with Chromium-based browsers (Chrome, Edge, etc.)
- Compatible with Firefox

## Contributing

1. Fork the repository
2. Make your changes
3. Test thoroughly on both X.com and Twitter.com
4. Submit a pull request

## License

This project is open source and available under standard terms.
