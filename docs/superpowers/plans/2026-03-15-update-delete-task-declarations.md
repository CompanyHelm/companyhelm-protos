# Update/Delete Task Declarations Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-add `UpdateTask` and `DeleteTask` protobuf declarations with complete message definitions while keeping the change declaration-only.

**Architecture:** Update the `AgentTaskService` contract in `agent.proto` and add the corresponding request/response messages so Buf generation succeeds. Verify the package end-to-end with the existing `npm run verify` pipeline and update the open PR branch only.

**Tech Stack:** Protobuf, Buf, Node.js, npm, TypeScript

---

### Task 1: Add a Regression Check for the Declared Surface

**Files:**
- Create: `tests/agent-service-contract.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create a Node-based test that imports the generated `agent_pb.js` module from the built package output and asserts:
- `AgentTaskService.method.updateTask` exists
- `AgentTaskService.method.deleteTask` exists
- `UpdateTaskRequestSchema`, `UpdateTaskResponseSchema`, `DeleteTaskRequestSchema`, and `DeleteTaskResponseSchema` exist

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/agent-service-contract.test.mjs`
Expected: FAIL because the generated module does not yet expose the re-added RPCs or message schemas.

### Task 2: Re-Add the Proto Declarations

**Files:**
- Modify: `proto/companyhelm/agent/v1/agent.proto`

- [ ] **Step 1: Write minimal implementation**

Add back:
- `rpc UpdateTask(UpdateTaskRequest) returns (UpdateTaskResponse);`
- `rpc DeleteTask(DeleteTaskRequest) returns (DeleteTaskResponse);`

Add:
- `message UpdateTaskRequest`
- `message UpdateTaskResponse`
- `message DeleteTaskRequest`
- `message DeleteTaskResponse`

Keep `ListTaskComments` and `AddTaskComment` single-defined and do not re-add `ExecuteTask`.

- [ ] **Step 2: Run generation to materialize the contract**

Run: `npm run build`
Expected: PASS and regenerate `dist/gen/companyhelm/agent/v1/agent_pb.js`.

- [ ] **Step 3: Run test to verify it passes**

Run: `node --test tests/agent-service-contract.test.mjs`
Expected: PASS.

### Task 3: Final Verification and PR Update

**Files:**
- Modify: `package-lock.json` only if dependency metadata changes during verification

- [ ] **Step 1: Run full verification**

Run: `npm run verify`
Expected: PASS.

- [ ] **Step 2: Commit and push the PR update**

Commit the declaration and test changes on the existing `fix/protos-release-chain` branch and push to update the open PR.

- [ ] **Step 3: Wait for PR checks**

Wait for the `companyhelm-protos` PR checks to complete successfully.
