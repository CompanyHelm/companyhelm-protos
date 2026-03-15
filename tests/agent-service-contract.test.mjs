import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const agentProtoModule = require(resolve(process.cwd(), "dist", "gen", "companyhelm", "agent", "v1", "agent_pb.js"));

test("generated agent task service exports update and delete task contract", () => {
  assert.ok(agentProtoModule.AgentTaskService.method.updateTask);
  assert.ok(agentProtoModule.AgentTaskService.method.deleteTask);
  assert.ok(agentProtoModule.UpdateTaskRequestSchema);
  assert.ok(agentProtoModule.UpdateTaskResponseSchema);
  assert.ok(agentProtoModule.DeleteTaskRequestSchema);
  assert.ok(agentProtoModule.DeleteTaskResponseSchema);
});
