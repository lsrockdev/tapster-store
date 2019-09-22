export const server = "https://tapster-dev.herokuapp.com/api/admin";

export const Api = {
    server: server,
    auth: {
        logIn: `${server}/login`,
        updateprofile: `${server}/updateprofile`
    },
    size: {
        getAll: `${server}/getSizes`,
        add: `${server}/addSize`,
        update: `${server}/updateSize`,
        delete: `${server}/deleteSize`
    },
    category: {
        getAll: `${server}/getCategories`,
        add: `${server}/addCategory`,
        update: `${server}/updateCategory`,
        delete: `${server}/deleteCategory`,
        checkIsCategoryAssigned: `${server}/checkIsCategoryAssigned`
    },
    product: {
        getAll: `${server}/getProducts`,
        add: `${server}/addProduct`,
        update: `${server}/updateProduct`,
        delete: `${server}/deleteProduct`
    },
    store: {
        getAll: `${server}/getStores`,
        add: `${server}/addStore`,
        update: `${server}/updateStore`,
        delete: `${server}/deleteStore`
    },
    storeCode: {
        getAll: `${server}/getUniqueCodes`,
        create: `${server}/createUniqueCode`,
        delete: `${server}/deleteUniqueCode`
    },
    driver: {
        getAll: `${server}/getDrivers`,
        add: `${server}/addDriver`,
        update: `${server}/updateDriver`,
        delete: `${server}/deleteDriver`
    },
    setting: {
        get: `${server}/getSettings`,
        update: `${server}/updateSetting`,
        getby: `${server}/getSettingByName`
    }
};
