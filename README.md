# companyhelm-protos

NPM package source for CompanyHelm protobuf bindings, generated with Buf.

Install package:
```
npm i @companyhelm/protos
```

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

Publishing to [@companyhelm/protos](https://www.npmjs.com/package/@companyhelm/protos) is automated by GitHub Actions:

```bash
npm version patch|minor|major
git push --follow-tags
``` 

Then push changes, this will publish a new package with the version already bumped.