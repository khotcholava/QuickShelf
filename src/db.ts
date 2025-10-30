import { invoke } from "@tauri-apps/api/core";

export interface Item {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
}

export interface CreateItemRequest {
  title: string;
  description?: string | null;
}

export interface UpdateItemRequest {
  id: number;
  title: string;
  description?: string | null;
}

export const db = {
  /**
   * Create a new item in the database
   */
  async createItem(request: CreateItemRequest): Promise<Item> {
    return await invoke<Item>("create_item", { request });
  },

  /**
   * Get a single item by ID
   */
  async getItem(id: number): Promise<Item> {
    return await invoke<Item>("get_item", { id });
  },

  /**
   * Get all items from the database
   */
  async getAllItems(): Promise<Item[]> {
    return await invoke<Item[]>("get_all_items");
  },

  /**
   * Update an existing item
   */
  async updateItem(request: UpdateItemRequest): Promise<Item> {
    return await invoke<Item>("update_item", { request });
  },

  /**
   * Delete an item by ID
   */
  async deleteItem(id: number): Promise<void> {
    return await invoke<void>("delete_item", { id });
  },
};

