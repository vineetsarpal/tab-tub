# Contributing to TabTub

Thank you for contributing to TabTub! This Chrome extension helps users manage browser tabs efficiently.

## 🚀 Getting Started

### Prerequisites
- Node.js (16+)
- Chrome browser
- Git

### Setup
1. Fork and clone the repository
2. `npm install`
3. `npm run dev` for development
4. `npm run build` to build the extension
5. Load `dist` folder in Chrome via `chrome://extensions/` (Developer mode enabled)

## 📝 Development Guidelines

### Code Style
- Run `npm run lint` before committing
- Follow existing patterns in the codebase
- Use meaningful variable names

### Tech Stack
- React 19.1.0 + Vite
- @dnd-kit for drag & drop
- ESLint for linting

## 🔄 Contributing Process

1. **Create feature branch** from `main`
2. **Make focused changes** with clear commits
3. **Test thoroughly** in Chrome extension environment
4. **Run quality checks:** `npm run lint && npm run build`
5. **Submit pull request** with clear description

### PR Guidelines
- One feature per PR
- Include screenshots for UI changes
- Reference related issues
- Test on multiple Chrome versions when possible

## 🐛 Issues & Features

**Bug Reports:** Include steps to reproduce, Chrome version, and screenshots

**Feature Requests:** Explain the use case and how it fits TabTub's core functionality

## 🎯 Areas for Contribution
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- Bug fixes
- Documentation updates

## 📋 Chrome Extension Notes
- Follow Manifest V3 standards
- Be mindful of chrome.storage.sync quotas
- Keep the extension lightweight and secure

## 🤝 Code of Conduct
Be respectful, constructive, and welcoming to all contributors.

Thanks for helping make TabTub better! 🎉