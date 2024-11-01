# Sidekiq Queue Filter Chrome Extension

A Chrome extension to enhance Sidekiq's busy page by adding queue filtering and process table visibility control.

## Features

- Filter jobs by queue
- Toggle process table visibility
- Auto-maintains filters during Sidekiq polling

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Open your Sidekiq busy page
2. Click the extension icon
3. Select a queue to filter jobs
4. Use the checkbox to toggle process table visibility

## Development

The extension consists of:

- `manifest.json`: Extension configuration
- `popup.html`: UI for the extension
- `popup.js`: Popup interaction logic
- `content.js`: Page manipulation logic

## License

MIT License
