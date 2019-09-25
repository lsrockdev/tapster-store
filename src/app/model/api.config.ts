// export const server = "https://tapster-dev.herokuapp.com/api/store";
export const server = "http://localhost:3000/api/store";

export const Api = {
    server: server,
    auth: {
        logIn: `${server}/authenticate`,
        register: `${server}/register`
    },
    orders: {
        getAll: `${server}/getOrders`
    },
    inventory: {
        getAll: `${server}/getInventories`,
        getById: `${server}/getInventoryById`,
        add: `${server}/addInventory`,
        delete: `${server}/deleteInventory`,
        update: `${server}/updateInventory`
    }
};
