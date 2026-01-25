import PocketBase from 'pocketbase';

//If you want to use a different PocketBase URL, set the VITE_POCKETBASE_URL environment variable
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:1234';

const pb = new PocketBase(PB_URL);
pb.autoCancellation(false);

export const api = {
  login: async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password);
  },
  logout: () => {
    pb.authStore.clear();
  },
  isLoggedIn: () => {
    return pb.authStore.isValid;
  },
  getCurrentUser: () => {
    return pb.authStore.model;
  },
  getList: async () => {
    return await pb.collection('lista_compra').getFullList({
      sort: '-created',
      expand: 'user',
    });
  },
  subscribe: (callback) => {
    pb.collection('lista_compra').subscribe('*', callback);
  },
  unsubscribe: () => {
    pb.collection('lista_compra').unsubscribe('*');
  },
  addItem: async (text) => {
    return await pb.collection('lista_compra').create({
      producto: text,
      comprado: false,
      user: pb.authStore.model.id,
    });
  },
  toggleItem: async (id, currentStatus) => {
    return await pb.collection('lista_compra').update(id, {
      comprado: !currentStatus
    });
  },
  deleteItem: async (id) => {
    return await pb.collection('lista_compra').delete(id);
  },
  getAvatarUrl: (record) => {
    // If there is no avatar, return a placeholder image
    if (!record || !record.avatar) return `https://ui-avatars.com/api/?background=random&color=fff&name=${record?.name || 'User'}`;
    return pb.files.getUrl(record, record.avatar, { thumb: '100x100' });
  }
};