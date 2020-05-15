export const setClientData = (id, client) => client.find(i => i._id === id);
export const findObj = (modals, id) => modals.find(i => i.id === id);
