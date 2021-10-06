const Intern = require("../lib/Intern");

test("Can set school for new Intern", () => {
  const testValue = "UPenn";
  const e = new Intern("Test", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Test", 1, "test@test.com", "UPenn");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UPenn";
  const e = new Intern("Test", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});