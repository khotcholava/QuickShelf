# QuickShelf SQLite Setup Guide

## Quick Start

Your SQLite integration is now complete! Follow these steps to get started:

### 1. Install Dependencies

First, install the Rust dependencies:

```bash
cd src-tauri
cargo build
```

### 2. Run the Application

From the project root:

```bash
pnpm tauri dev
```

This will:
- Start the Vite development server
- Build and launch the Tauri application
- Automatically create the SQLite database on first run

### 3. Test the Integration

The demo app includes a full CRUD interface:
- **Create**: Add new items with a title and optional description
- **Read**: View all items in the list
- **Update**: Click "Edit" on any item to modify it
- **Delete**: Click "Delete" to remove an item

## What Was Added

### Backend (Rust)

1. **Database Module** (`src-tauri/src/db.rs`)
   - Database connection pool management
   - Automatic table initialization
   - Connection to app data directory

2. **Models** (`src-tauri/src/models.rs`)
   - `Item`: Main data model with FromRow trait
   - DTOs for create/update operations

3. **Commands** (`src-tauri/src/commands.rs`)
   - Full CRUD operations
   - Async Tauri commands
   - Error handling

4. **Dependencies** (`src-tauri/Cargo.toml`)
   - `sqlx` with SQLite support
   - `tokio` async runtime

### Frontend (TypeScript/React)

1. **Database Helper** (`src/db.ts`)
   - Type-safe database operations
   - Interface definitions matching Rust models
   - Wrapper functions for all CRUD operations

2. **Demo UI** (`src/App.tsx`)
   - Complete CRUD interface
   - Form for create/update
   - List view with edit/delete actions

3. **Styling** (`src/App.css`)
   - Modern, clean UI
   - Dark mode support
   - Responsive design

## Database Location

Your SQLite database will be created at:

- **macOS**: `~/Library/Application Support/com.khotcholava.quickshelf/quickshelf.db`
- **Linux**: `~/.local/share/com.khotcholava.quickshelf/quickshelf.db`
- **Windows**: `%APPDATA%\com.khotcholava.quickshelf\quickshelf.db`

## Next Steps

1. **Customize the Schema**: Modify the `items` table or add new tables in `db.rs`
2. **Add More Commands**: Create additional CRUD operations in `commands.rs`
3. **Extend the Frontend**: Build your actual application features using the database
4. **Remove Demo UI**: Once you're comfortable, replace the demo UI with your actual app

## Troubleshooting

### Build Errors

If you see SQLx compilation errors:

```bash
cd src-tauri
cargo clean
cargo build
```

### Database Issues

To reset the database, delete the database file and restart the app:

```bash
# macOS
rm ~/Library/Application\ Support/com.khotcholava.quickshelf/quickshelf.db

# Linux
rm ~/.local/share/com.khotcholava.quickshelf/quickshelf.db

# Windows
del %APPDATA%\com.khotcholava.quickshelf\quickshelf.db
```

## Resources

- [SQLite Integration Docs](./SQLITE_INTEGRATION.md)
- [Tauri Documentation](https://tauri.app/)
- [SQLx Documentation](https://docs.rs/sqlx/)

Happy coding! 🚀

