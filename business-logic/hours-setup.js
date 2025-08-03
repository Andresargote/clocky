import StorageProvider from "../persistence/index.js";

class HoursSetup {
    constructor() {
        this.storageProvider = new StorageProvider();
    }

    formatHours(hours) {
        return parseInt(hours);
    }

    isValidHours(hours) {
        const formattedHours = this.formatHours(hours);
        return formattedHours > 0 && formattedHours <= 24;
    }

    saveHours(key, hours) {
        if (!this.isValidHours(hours)) {
            throw new Error("Hours must be between 1 and 24");
        }
        this.storageProvider.save(key, hours);
    }

    saveBreakHours(key, hours) {
        this.storageProvider.save(key, hours);
    }

    getHours(key) {
        if (this.storageProvider.get(key)) {
            return this.storageProvider.get(key);
        }
        return "Not found";
    }
}

export default HoursSetup;
