const Engineer = require("../lib/Engineer");

test("Can set Github username for new Engineer", () => {
  const testValue = "ProCodeGuy";
  const e = new Engineer("Test", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Test", 1, "test@test.com", "ProCodeGuy");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "ProCodeGuy";
  const e = new Engineer("Test", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});