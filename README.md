# companyhelm-protos

NPM package source for CompanyHelm protobuf bindings, generated with Buf.

## Local build

```bash
npm ci
npm run verify
npm run build
```

## Local prerequisites

The project follows the Buf toolchain from the Buf quickstart:

```bash
npm install --save-dev @bufbuild/buf @bufbuild/protoc-gen-es
npm run build
```

## Publish

Publishing to [npmjs.com](https://www.npmjs.com/) is automated by GitHub Actions:

- Push a tag like `v1.2.3`, or
- Trigger the `publish-npm-package` workflow manually.

The workflow expects a repository secret named `NPM_TOKEN`.
