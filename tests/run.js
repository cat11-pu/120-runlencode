import assert from "node:assert";
import { encode } from "../rle.js";
import { decode } from "../block.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("encode returns segments", () => {
  assert.ok(Array.isArray(encode([1, 1, 1], 3)));
});

check("each segment has a kind", () => {
  assert.strictEqual(typeof encode([1, 1, 1], 3)[0].kind, "string");
});

check("decode returns a list", () => {
  assert.ok(Array.isArray(decode([{ kind: "run", value: 1, count: 3 }])));
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ values: [1, 1, 1], min_run: 3 }).segment_count, "number");
});

check("render exposes round trip flag", () => {
  const view = render({ values: [1, 1, 1], min_run: 3 });
  assert.strictEqual(typeof view.round_trip, "boolean");
  assert.ok(Array.isArray(view.segments));
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
