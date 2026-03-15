import PocketBase from 'pocketbase';
const pb = new PocketBase(process.env.PB_LINK);
pb.autoCancellation(false);

export const api = {
    getList: async () => {
        return await pb.collection('lista_compra').getFullList({
            sort:'-created',
            expand:'user'
        });
    },

    subscribe: (callback) => {
        pb.collection('lista_compra').subscribe('*', callback);
    },

    unsubscribe: () => {
        pb.collection('lista_compra').unsubscribe('*');
    },

    addItem: async (text) => {
        //logged user is assigned automatically
        return await pb.collection('lista_compra').create({
            producto: text,
            comprado: false,
            user: pb.authStore.model?.id,
        });
    },

    //cross/uncross
    toggleItem: async (id, currentStatus) => {
        return await pb.collection('lista_compra').update(id, {
            comprado: !currentStatus
        });
    },

    deleteItem: async (id) => {
        return await pb.collection('lista_compra').delete(id);
    },

    //helper for avatar
    getAvatarUrl: (record) => {
        //record is the user object inside 'expand'
        if (!record || !record.avatar){
            return 'https://ui-avatars.com/api/?background=333&color=fff&name=?';
        }
        return pb.files.getUrl(record, record.avatar, {thumb:'100x100'});
    },

    login: async (email, password) => {
        return await pb.collection('users').authWithPassword(email, password);
    },

    logout: () => {
        pb.authStore.clear();
    },

    //know if someone is logged
    isLoggedIn: () => {
        return pb.authStore.isValid;
    },

    //i use this to get info (especially avatar) of logged user
    getCurrentUser: () => {
        return pb.authStore.model;
    }
}
