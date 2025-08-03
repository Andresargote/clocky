import StorageProvider from "../persistence/index.js";

class WorkHoursTracker {
    constructor() {
        this.storageProvider = new StorageProvider();
        this.STANDARD_WORK_DAY = 8.5;
    }

    timeToDecimal(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours + (minutes / 60);
    }
    calculateWorkedHours(startTime, endTime, breakHours = 0) {
        const start = this.timeToDecimal(startTime);
        const end = this.timeToDecimal(endTime);
        let worked = end - start - parseFloat(breakHours);
        
        if (end < start) {
            worked = (24 - start) + end - parseFloat(breakHours);
        }
        
        return Math.max(0, worked);
    }

    registerWorkDay(date, startTime, endTime, breakHours = 0) {
        const workedHours = this.calculateWorkedHours(startTime, endTime, breakHours);
        
        const workDay = {
            date,
            startTime,
            endTime,
            breakHours: parseFloat(breakHours),
            workedHours: Math.round(workedHours * 100) / 100
        };

        const workDays = this.getWorkDays();
   
        workDays.push(workDay);
        this.storageProvider.save('workDays', JSON.stringify(workDays));
        this.updateTotals();

        return workDay;
    }
    getWorkDays() {
        const workDays = this.storageProvider.get('workDays');
        return workDays ? JSON.parse(workDays) : [];
    }
    updateTotals() {
        const workDays = this.getWorkDays();
        let totalWorkedHours = 0;
        let extraHours = 0;
        let pendingHours = 0;
    
        workDays.forEach(day => {
            totalWorkedHours += day.workedHours;
    
            const difference = (day.workedHours + day.breakHours) - this.STANDARD_WORK_DAY;
    
            if (difference > 0) {
                if (pendingHours > 0) {
                    const compensation = Math.min(difference, pendingHours);
                    pendingHours -= compensation;
                    const remainder = difference - compensation;
                    extraHours += remainder;
                } else {
                    extraHours += difference;
                }
            } else if (difference < 0) {
                const deficit = Math.abs(difference);
                if (extraHours >= deficit) {
                    extraHours -= deficit;
                } else {
                    pendingHours += deficit - extraHours;
                    extraHours = 0;
                }
            }
        });
    
        const totals = {
            totalWorkedHours: Math.round(totalWorkedHours * 100) / 100,
            extraHours: Math.round(extraHours * 100) / 100,
            pendingHours: Math.round(pendingHours * 100) / 100
        };
    
        this.storageProvider.save('hoursTotals', JSON.stringify(totals));
        return totals;
    }
    
    getTotals() {
        const totals = this.storageProvider.get('hoursTotals');
        return totals ? JSON.parse(totals) : {
            totalWorkedHours: 0,
            extraHours: 0,
            pendingHours: 0
        };
    }

    formatHours(hours) {
        return `${Math.floor(hours)}:${String(Math.round((hours % 1) * 60)).padStart(2, '0')}`;
    }
    removeWorkDay(index) {
        const workDays = this.getWorkDays();
        if (index >= 0 && index < workDays.length) {
            workDays.splice(index, 1);
            this.storageProvider.save('workDays', JSON.stringify(workDays));
            this.updateTotals();
            return true;
        }
        return false;
    }
}

export default WorkHoursTracker;
