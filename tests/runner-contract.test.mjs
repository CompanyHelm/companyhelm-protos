import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const runnerProtoModule = require(resolve(process.cwd(), "dist", "gen", "companyhelm", "runner", "v1", "runner_pb.js"));

test("generated runner contract exports thread token usage update messages", () => {
  assert.ok(runnerProtoModule.ClientMessageSchema);
  assert.ok(runnerProtoModule.TokenUsageBreakdownSchema);
  assert.ok(runnerProtoModule.ThreadTokenUsageUpdateSchema);
});
