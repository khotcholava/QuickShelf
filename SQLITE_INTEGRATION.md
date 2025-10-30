# SQLite Integration in QuickShelf

This document explains how SQLite is integrated into the QuickShelf Tauri application.

## Overview

The application uses SQLite as its local database with the following components:
- **sqlx**: Async SQL driver for Rust
- **tauri-plugin-sql**: Official Tauri SQL plugin
- Database file stored in the app's data directory

## Backend Structure

### Files

- `src-tauri/src/db.rs`: Database connection and initialization
- `src-tauri/src/models.rs`: Data models and DTOs
- `src-tauri/src/commands.rs`: Tauri commands for CRUD operations

### Database Location

The SQLite database file (`quickshelf.db`) is stored in:
- **macOS**: `~/Library/Application Support/com.khotcholava.quickshelf/`
- **Linux**: `~/.local/share/com.khotcholava.quickshelf/`
- **Windows**: `C:\Users\<username>\AppData\Roaming\com.khotcholava.quickshelf\`

## Available Commands

### Create Item
```rust
create_item(request: CreateItemRequest) -> Result<Item, String>
```

### Get Item
```rust
get_item(id: i64) -> Result<Item, String>
```

### Get All Items
```rust
get_all_items() -> Result<Vec<Item>, String>
```

### Update Item
```rust
update_item(request: UpdateItemRequest) -> Result<Item, String>
```

### Delete Item
```rust
delete_item(id: i64) -> Result<(), String>
```

## Frontend Usage

Import the database helper from `src/db.ts`:

```typescript
import { db } from "./db";

// Create an item
const item = await db.createItem({
  title: "My Item",
  description: "Optional description"
});

// Get all items
const items = await db.getAllItems();

// Update an item
const updated = await db.updateItem({
  id: item.id,
  title: "Updated Title",
  description: "Updated description"
});

// Delete an item
await db.deleteItem(item.id);
```

## Database Schema

### Items Table

```sql
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Adding New Tables

To add a new table:

1. Add the table creation SQL in `src-tauri/src/db.rs` in the `init_tables` function:

```rust
sqlx::query(
    r#"
    CREATE TABLE IF NOT EXISTS your_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        field1 TEXT NOT NULL,
        field2 INTEGER
    )
    "#,
)
.execute(pool)
.await?;
```

2. Create the corresponding model in `src-tauri/src/models.rs`:

```rust
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct YourModel {
    pub id: i64,
    pub field1: String,
    pub field2: Option<i32>,
}
```

3. Add commands in `src-tauri/src/commands.rs`:

```rust
#[tauri::command]
pub async fn create_your_model(
    db: State<'_, Database>,
    data: YourModel,
) -> Result<YourModel, String> {
    // Implementation
}
```

4. Register the command in `src-tauri/src/lib.rs`:

```rust
.invoke_handler(tauri::generate_handler![
    // ... existing commands
    commands::create_your_model,
])
```

## Development

### Running the App

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm tauri dev

# Build for production
pnpm tauri build
```

### Database Migrations

For more complex schema changes, consider using `sqlx-cli`:

```bash
# Install sqlx-cli
cargo install sqlx-cli --features sqlite

# Create a migration
sqlx migrate add create_your_table

# Run migrations
sqlx migrate run
```

## Troubleshooting

### Database not initializing

Check the app logs. The database initialization happens during the Tauri app setup phase.

### Permission errors

Make sure the app has permission to write to the app data directory.

### Database locked

SQLite uses file-based locking. If you see "database is locked" errors, ensure you're not accessing the database from multiple processes simultaneously.

## Resources

- [SQLx Documentation](https://docs.rs/sqlx/)
- [Tauri Plugin SQL](https://github.com/tauri-apps/tauri-plugin-sql)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

