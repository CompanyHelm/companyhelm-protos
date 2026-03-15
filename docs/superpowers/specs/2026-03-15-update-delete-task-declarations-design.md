# Update/Delete/Execute Task Declarations Design

**Date:** 2026-03-15

## Goal

Re-add `UpdateTask`, `DeleteTask`, and `ExecuteTask` to `companyhelm.agent.v1.AgentTaskService` with complete protobuf message declarations, while keeping the change declaration-only.

## Scope

This change is limited to `companyhelm-protos`.

Included:
- `rpc UpdateTask(UpdateTaskRequest) returns (UpdateTaskResponse);`
- `rpc DeleteTask(DeleteTaskRequest) returns (DeleteTaskResponse);`
- `rpc ExecuteTask(ExecuteTaskRequest) returns (ExecuteTaskResponse);`
- the missing request/response message declarations required for Buf generation

Excluded:
- `companyhelm-api` gRPC handler support
- `companyhelm-agent-cli` client or command support
- downstream runtime behavior changes

## Design

Add the following RPCs back into `AgentTaskService`:

```proto
rpc UpdateTask(UpdateTaskRequest) returns (UpdateTaskResponse);
rpc DeleteTask(DeleteTaskRequest) returns (DeleteTaskResponse);
rpc ExecuteTask(ExecuteTaskRequest) returns (ExecuteTaskResponse);
```

Add the following message declarations:

```proto
message UpdateTaskRequest {
  string id = 1 [(buf.validate.field).string.min_len = 1];
  optional string name = 2;
  optional string description = 3;
  optional string acceptance_criteria = 4;
  optional string assignee_principal_id = 5;
  optional string parent_task_id = 6;
  TaskStatus status = 7 [(buf.validate.field).enum.defined_only = true];
}

message UpdateTaskResponse {
  Task task = 1;
}

message DeleteTaskRequest {
  string task_id = 1 [(buf.validate.field).string.min_len = 1];
}

message DeleteTaskResponse {
  string task_id = 1 [(buf.validate.field).string.min_len = 1];
}

message ExecuteTaskRequest {
  string task_id = 1 [(buf.validate.field).string.min_len = 1];
}

message ExecuteTaskResponse {
  Task task = 1;
}
```

## Rationale

- `ListTaskComments` and `AddTaskComment` must remain single-defined to avoid duplicate symbol errors.
- `UpdateTask` and `DeleteTask` can be safely reintroduced as declarations if their message types are fully declared.
- `ExecuteTask` can also be safely declared now as long as its request/response messages are fully declared.
- Leaving runtime support out preserves the declaration-only scope and keeps follow-up implementation separate.

## Verification

Run:

```bash
npm run verify
```

Expected result:
- Buf lint passes
- code generation passes
- TypeScript compilation passes
- package packing passes

## Follow-Up

Future work can add:
- `companyhelm-api` gRPC server implementations for `UpdateTask`, `DeleteTask`, and `ExecuteTask`
- `companyhelm-agent-cli` client methods and commands
- tests in downstream repos that exercise the new RPC surface
