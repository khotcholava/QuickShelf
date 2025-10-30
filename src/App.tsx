import { useEffect, useState } from "react";
import "./App.css";
import { db, Item } from "./db";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const loadItems = async () => {
    try {
      const allItems = await db.getAllItems();
      setItems(allItems);
    } catch (error) {
      console.error("Failed to load items:", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.createItem({ title, description: description || null });
      setTitle("");
      setDescription("");
      loadItems();
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await db.updateItem({
        id: editingItem.id,
        title,
        description: description || null,
      });
      setTitle("");
      setDescription("");
      setEditingItem(null);
      loadItems();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.deleteItem(id);
      loadItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const startEdit = (item: Item) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || "");
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setTitle("");
    setDescription("");
  };

  return (
    <main className="container">
      <h1>QuickShelf - SQLite Integration Demo</h1>

      <form onSubmit={editingItem ? handleUpdate : handleCreate}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">
            {editingItem ? "Update" : "Create"} Item
          </button>
          {editingItem && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="items-list">
        <h2>Items ({items.length})</h2>
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
            <small>Created: {new Date(item.created_at).toLocaleString()}</small>
            <div className="item-actions">
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No items yet. Create your first item!</p>}
      </div>
    </main>
  );
}

export default App;
