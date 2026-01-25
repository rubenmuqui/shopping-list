import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useShoppingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getList();
        setItems(data);
        setLoading(false);
      } catch (e) {
        console.error("Error loading list", e);
        setLoading(false);
      }
    }

    load();

    // Subscribe to real-time changes
    api.subscribe(() => {
      load();
    });

    return () => api.unsubscribe();
  }, []);

  const add = async (text) => {
    if(!text.trim()) return;
    await api.addItem(text);
  };

  const deleteSelected = async () => {
    const toDelete = items.filter(i => i.comprado);
    await Promise.all(toDelete.map(i => api.deleteItem(i.id)));
  };
  
  const clearList = async () => {
      if(confirm("Are you sure you want to delete everything?")) {
        await Promise.all(items.map(i => api.deleteItem(i.id)));
      }
  };

  return { 
    items, 
    loading, 
    addItem: add, 
    toggleItem: api.toggleItem, 
    deleteSelected, 
    clearList, 
    getAvatarUrl: api.getAvatarUrl 
  };
}