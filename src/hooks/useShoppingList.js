import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useShoppingList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try{
                const data = await api.getList();
                setItems(data);
                setLoading(false);
            }catch(e){
                console.error("Failed to load shopping list:", e);
            }
        }
        load();
        api.subscribe(() => load());
        return () => api.unsubscribe();
    }, []);

    const add = async(text) => {
        if(!text.trim()) return;
        await api.addItem(text);
    };
    
    const deleteSelected = async() => {
        const toDelete = items.filter(i => i.comprado);
        await Promise.all(toDelete.map(i => api.deleteItem(i.id)));
    };

    const clearList = async() => {
        if(confirm("¿Borrar todo?")){
            await Promise.all(items.map(i => api.deleteItem(i.id)));
        }
    };

    const toggleItem = async (id, currentStatus) => {
    // 1. Visual trick: item gets marked without waiting for the server
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, comprado: !currentStatus } : item
    ));

    // 2. Change is sent on the background
    try {
      await api.toggleItem(id, currentStatus);
    } catch (error) {
      console.error("Error al tachar:", error);
      // If error, undo the visua change
    }
  };

    return {items, loading, addItem: add, toggleItem, deleteSelected, clearList, getAvatarUrl: api.getAvatarUrl};
}