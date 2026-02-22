import { cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const thisFile = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(thisFile);
const repoRoot = path.resolve(scriptsDir, "..");
const protoRoot = path.join(repoRoot, "proto");
const outProtoRoot = path.join(repoRoot, "dist", "proto");

await cp(path.join(protoRoot, "companyhelm"), path.join(outProtoRoot, "companyhelm"), {
  recursive: true
});
