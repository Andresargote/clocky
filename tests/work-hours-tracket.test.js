import { describe, test, expect } from '@jest/globals';
import WorkHoursTracker from '../business-logic/work-hours-tracker.js';


describe('WorkHoursTracker', () => { 

    const workHoursTracker = new WorkHoursTracker();

    test('registerWorkDay', () => {
        const workDay = workHoursTracker.registerWorkDay('2023-01-01', '08:00', '17:00');
        expect(workDay).toBeDefined();
    });

    test('getWorkDays', () => {
        const workDays = workHoursTracker.getWorkDays();
        expect(workDays).toBeDefined();
    });

    test('updateTotals', () => {
        const totals = workHoursTracker.updateTotals();
        expect(totals.totalWorkedHours).toBe(9);
        expect(totals.extraHours).toBe(0.5);
        expect(totals.pendingHours).toBe(0);
    });

    test('getTotals', () => {
        const totals = workHoursTracker.getTotals();
        expect(totals.totalWorkedHours).toBe(9);
        expect(totals.extraHours).toBe(0.5);
        expect(totals.pendingHours).toBe(0);
    });

    test('formatHours', () => {
        const hours = workHoursTracker.formatHours(8.5);
        expect(hours).toBe('8:30');
    });

    test('removeWorkDay', () => {
        const workDay = workHoursTracker.removeWorkDay(0);
        expect(workDay).toBeDefined();
    });

});
    
