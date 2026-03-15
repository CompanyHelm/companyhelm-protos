# Agent Questions Contract Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone agent questions protobuf contract with create/list/get RPCs, question entities, ranked options, and status enums in `companyhelm-protos`.

**Architecture:** Introduce a dedicated `questions.proto` file under `proto/companyhelm/agent/v1/` so the new service is isolated from the existing task and actor contracts. Publish the generated TypeScript bindings by updating the package root export and verify the package with the existing Buf and build pipeline.

**Tech Stack:** Proto3, Buf, protoc-gen-es, TypeScript, npm

---

### Task 1: Add Red Verification For The Missing Question Contract

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Export the future generated question bindings**

Add:

```ts
export * from "./gen/companyhelm/agent/v1/questions_pb";
```

- [ ] **Step 2: Run verification to confirm the contract is missing**

Run: `npm run build`
Expected: FAIL because `src/gen/companyhelm/agent/v1/questions_pb` does not exist yet.

### Task 2: Implement The Questions Proto Contract

**Files:**
- Create: `proto/companyhelm/agent/v1/questions.proto`

- [ ] **Step 1: Add the standalone service**

Define `AgentQuestionService` with:

```proto
rpc CreateQuestion(CreateQuestionRequest) returns (CreateQuestionResponse);
rpc ListQuestions(ListQuestionsRequest) returns (ListQuestionsResponse);
rpc GetQuestion(GetQuestionRequest) returns (GetQuestionResponse);
```

- [ ] **Step 2: Add shared question data structures**

Define:

```proto
enum QuestionStatus
message QuestionOption
message Question
```

Use `google.protobuf.Timestamp` for lifecycle timestamps and keep options ordered by `rank`.

- [ ] **Step 3: Add request/response messages**

Define create/list/get request and response messages following the validation style already used by the task APIs.

### Task 3: Verify And Prepare Delivery

**Files:**
- Modify: `src/index.ts`
- Check: `companyhelm-common` e2e test coverage only for impact review

- [ ] **Step 1: Run package verification**

Run: `npm run verify`
Expected: PASS with Buf lint, generation, TypeScript compile, and dry-run pack succeeding.

- [ ] **Step 2: Check for required cross-repo test changes**

Run a targeted search in `companyhelm-common` for question-related e2e coverage.
Expected: No test updates required because this task only adds a shared contract.

- [ ] **Step 3: Commit and publish branch state**

Commit the proto and export changes with a focused message.
