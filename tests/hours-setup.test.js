import { describe, test, expect } from '@jest/globals';
import HoursSetup from '../business-logic/hours-setup.js';

describe('HoursSetup', () => {

    const hoursSetup = new HoursSetup();

    test('isValidHours', () => {
        expect(hoursSetup.isValidHours(1)).toBe(true);
        expect(hoursSetup.isValidHours(12)).toBe(true);
        expect(hoursSetup.isValidHours(24)).toBe(true);
    });

    test("!isValidHours", () => {
        expect(hoursSetup.isValidHours(0)).toBe(false);
        expect(hoursSetup.isValidHours(25)).toBe(false);
    });

    test("formatHours", () => {
        expect(hoursSetup.formatHours("1")).toBe(1);
        expect(hoursSetup.formatHours("12")).toBe(12);
    });

    test("saveHours", () => {
        hoursSetup.saveHours("hours", "12");
        expect(hoursSetup.getHours("hours")).toBe("12");
    });

    test("saveHours error", () => {
        expect(() => hoursSetup.saveHours("hours", "25")).toThrow();
        expect(() => hoursSetup.saveHours("hours", "0")).toThrow();
        expect(() => hoursSetup.saveHours("hours", undefined)).toThrow();
        expect(() => hoursSetup.saveHours("hours", null)).toThrow();
    });

    test("getHours", () => {
        expect(hoursSetup.getHours("hours")).toBe("12");
    });

    test("getHours error", () => {
        expect(hoursSetup.getHours("")).toBe("Not found");
    });
})