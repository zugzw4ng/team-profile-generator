const Employee = require("../lib/Employee");

describe("Employee", () => {
    it("Can create new Employee", () => {
        const e = new Employee();
        expect(typeof (e)).toBe("object");
    });

    it("Can set name for new Employee", () => {
        const name = "Aurelius";
        const e = new Employee(name);
        expect(e.name).toBe(name);
    });

    it("Can set ID for new Employee", () => {
        const testValue = 123;
        const e = new Employee("Test", testValue);
        expect(e.id).toBe(testValue);
    });

    it("Can set email for new Employee", () => {
        const testValue = "test@test.com";
        const e = new Employee("Test", 1, testValue);
        expect(e.email).toBe(testValue);
    });

    describe("getName", () => {
        it("Can get name via getName()", () => {
            const testValue = "Aurelius";
            const e = new Employee(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });

    describe("getId", () => {
        it("Can get id via getId()", () => {
            const testValue = 123;
            const e = new Employee("Test", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });

    describe("getEmail", () => {
        it("Can get email via getEmail()", () => {
            const testValue = "test@test.com";
            const e = new Employee("Test", 1, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });

    describe("getRole", () => {
        it("getRole() should return \"Employee\"", () => {
            const testValue = "Employee";
            const e = new Employee("Aurelius", 1, "test@test.com");
            expect(e.getRole()).toBe(testValue);
        });
    });
});