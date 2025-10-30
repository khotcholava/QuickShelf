# QuickShelf 📋

A lightweight, privacy-respecting clipboard manager built for developers and power users. QuickShelf captures your clipboard history locally with optional secure cloud sync, making it easy to find and reuse anything you've copied.

## 🎯 Core Features

- **📝 Automatic Clipboard History** - Captures every copy action (text, code, URLs, commands)
- **🔍 Fast Search** - Instantly find anything from your clipboard history
- **🏷️ Smart Categories** - Automatically categorizes content (code, links, text, etc.)
- **⚡ Quick Access** - Global shortcuts to access your clipboard without leaving your workflow
- **🔒 Privacy First** - All data stored locally by default
- **☁️ Optional Sync** - Secure cloud sync when you need it
- **🎨 Beautiful UI** - Clean, modern interface built with React
- **🚀 Native Performance** - Rust-powered backend for speed and efficiency

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### Backend

- **Tauri 2** - Rust-powered desktop application framework
- **SQLx** - Async SQL toolkit for Rust
- **SQLite** - Lightweight embedded database for local storage

### Tauri Plugins

- `tauri-plugin-sql` - SQL database support
- `tauri-plugin-store` - Configuration storage
- `tauri-plugin-global-shortcut` - Global keyboard shortcuts
- `tauri-plugin-clipboard-manager` - Clipboard monitoring

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Rust** (latest stable version)
- **npm**, **pnpm**, or **yarn** package manager

### Platform-Specific Requirements

#### macOS

```bash
xcode-select --install
```

#### Windows

- Microsoft Visual Studio C++ Build Tools
- WebView2 (pre-installed on Windows 10+)

#### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

## 🗺️ Development Roadmap

This project will be built in phases, with each phase adding new functionality. Follow along step-by-step!

### **Phase 1: Foundation & Basic UI** ✅ (Current)

**Goal:** Set up the project structure and create a basic UI

**What we'll build:**

- Initialize Tauri + React project
- Set up SQLite database
- Create basic UI layout
- Implement simple CRUD operations for testing

**Skills you'll learn:**

- Tauri project structure
- React + TypeScript basics
- SQLite integration
- Rust-to-JavaScript communication

**Status:** Foundation complete - ready to move to Phase 2

---

### **Phase 2: Clipboard Monitoring**

**Goal:** Detect and capture clipboard changes automatically

**What we'll build:**

- Clipboard monitoring service in Rust
- Background thread to watch for clipboard changes
- Store clipboard content in SQLite
- Display clipboard history in UI

**Key concepts:**

- System clipboard access
- Background tasks in Tauri
- Event-driven architecture
- Debouncing clipboard events

**Estimated time:** 2-3 hours

---

### **Phase 3: Content Type Detection**

**Goal:** Automatically categorize clipboard content

**What we'll build:**

- Content type detection algorithms
- Pattern matching for URLs, code, emails, etc.
- Visual indicators for different content types
- Filter by content type

**Key concepts:**

- Regular expressions
- Pattern matching
- Content classification
- UI filtering and sorting

**Estimated time:** 2-3 hours

---

### **Phase 4: Search & Quick Access**

**Goal:** Make it easy to find and use clipboard items

**What we'll build:**

- Full-text search functionality
- Global keyboard shortcut (e.g., `Cmd/Ctrl+Shift+V`)
- Quick copy back to clipboard
- Keyboard navigation

**Key concepts:**

- SQLite full-text search (FTS5)
- Global shortcuts
- Keyboard event handling
- Fuzzy search algorithms

**Estimated time:** 3-4 hours

---

### **Phase 5: Rich Content & Previews**

**Goal:** Better display and handle different content types

**What we'll build:**

- Syntax highlighting for code
- Link previews
- Image thumbnail support
- Copy formatting options (plain text, formatted, etc.)

**Key concepts:**

- Code syntax highlighting
- Image handling
- Content rendering
- Format preservation

**Estimated time:** 3-4 hours

---

### **Phase 6: Favorites & Organization**

**Goal:** Let users organize their clipboard history

**What we'll build:**

- Pin/favorite items
- Custom tags
- Collections/folders
- Quick filters

**Key concepts:**

- Data relationships
- Tag management
- UI organization patterns
- User preferences

**Estimated time:** 2-3 hours

---

### **Phase 7: Privacy & Security**

**Goal:** Give users control over their data

**What we'll build:**

- Password/sensitive text exclusion
- Auto-clear after X days
- Exclude specific apps
- Privacy mode (pause monitoring)
- Encrypted storage option

**Key concepts:**

- Sensitive data detection
- Data retention policies
- App monitoring
- Encryption basics

**Estimated time:** 3-4 hours

---

### **Phase 8: Performance & Polish**

**Goal:** Optimize and refine the experience

**What we'll build:**

- Virtual scrolling for large lists
- Database optimization
- Lazy loading
- Settings panel
- Keyboard shortcuts configuration

**Key concepts:**

- Performance optimization
- React performance patterns
- Database indexing
- User settings management

**Estimated time:** 2-3 hours

---

### **Phase 9: Cloud Sync (Optional)**

**Goal:** Enable secure sync across devices

**What we'll build:**

- End-to-end encryption
- Sync service integration
- Conflict resolution
- Sync status indicators

**Key concepts:**

- Client-side encryption
- API integration
- Data synchronization
- Conflict handling

**Estimated time:** 5-6 hours

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd QuickShelf
```

2. **Install dependencies**

```bash
npm install
```

3. **Run in development mode**

```bash
npm run tauri dev
```

## 💻 Development Commands

```bash
# Start development server
npm run tauri dev

# Build for production
npm run tauri build

# Run frontend only (for UI development)
npm run dev

# Format code
npm run format

# Run tests
npm test
```

## 📁 Project Structure

```
QuickShelf/
├── src/                        # React frontend
│   ├── components/            # React components
│   │   ├── ClipboardHistory.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ClipboardItem.tsx
│   │   └── Settings.tsx
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # Frontend services
│   ├── types/                 # TypeScript types
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
├── src-tauri/                 # Rust backend
│   ├── src/
│   │   ├── clipboard/        # Clipboard monitoring
│   │   ├── database/         # Database operations
│   │   ├── models/           # Data models
│   │   ├── commands/         # Tauri commands
│   │   └── lib.rs            # Main entry point
│   ├── Cargo.toml            # Rust dependencies
│   └── tauri.conf.json       # Tauri configuration
└── README.md                  # This file
```

## 🗄️ Database Schema

```sql
-- Clipboard items table
CREATE TABLE clipboard_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    content_type TEXT NOT NULL,  -- 'text', 'code', 'url', 'email', etc.
    source_app TEXT,             -- Application where copy occurred
    is_favorite BOOLEAN DEFAULT 0,
    is_sensitive BOOLEAN DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_used_at TEXT
);

-- Tags table
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    color TEXT
);

-- Item-Tag junction table
CREATE TABLE item_tags (
    item_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY (item_id) REFERENCES clipboard_items(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (item_id, tag_id)
);

-- Full-text search index
CREATE VIRTUAL TABLE clipboard_fts USING fts5(
    content,
    content='clipboard_items',
    content_rowid='id'
);
```

## 🎯 Learning Path

Each phase is designed to teach you something new:

1. **Phase 1-2**: Learn Tauri basics and system integration
2. **Phase 3-4**: Master data processing and user interaction
3. **Phase 5-6**: Explore rich content handling
4. **Phase 7-8**: Understand security and optimization
5. **Phase 9**: Dive into distributed systems (optional)

## 📝 Current Status

**Phase 1: Foundation** - ✅ Complete

- Basic Tauri + React setup
- SQLite integration
- Simple CRUD operations

**Next Step:** Phase 2 - Clipboard Monitoring

Ready to start? Check the development guide in each phase folder or ask for the next step!

## 🔒 Privacy & Security

- **Local-first**: All data stored on your machine by default
- **No telemetry**: We don't collect any usage data
- **Optional sync**: Cloud sync is opt-in only
- **Sensitive data protection**: Automatically detect and handle passwords
- **Open source**: Audit the code yourself

## 🤝 Contributing

This is a learning project! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Ask questions

## 📄 License

MIT License - feel free to use this code for learning or your own projects!

## 🎓 Educational Goals

This project teaches:

- Desktop app development with Tauri
- React + TypeScript
- Rust basics
- Database design
- System integration
- Privacy-first design
- Performance optimization

---

**Ready to build?** Start with Phase 2 when you're ready! 🚀
# QuickShelf
