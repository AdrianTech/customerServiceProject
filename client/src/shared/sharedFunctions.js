export const setClientData = (id, client) => client.find((i) => i._id === id);
export const findObj = (modals, id) => modals.find((i) => i.id === id);
export const generateID = () => Math.floor(Math.random() * 100000);
export const clearData = (data) => Object.keys(data).forEach((i) => (data[i] = ""));
