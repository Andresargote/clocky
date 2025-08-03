class StorageProvider {
    constructor() {
        this.storage = window.localStorage;
    }

    save(key, value) {
        this.storage.setItem(key, value);
    }

    get(key) {
        return this.storage.getItem(key);
    }
}
    
export default StorageProvider;
