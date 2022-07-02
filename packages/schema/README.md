# schema

Chocolate schema library. Typescript definitions of the Schemas defined [here](https://github.com/chocolatenetwork/Chocolate-Spec) as well as a build step that generates json schema from the types.

## Build

Run `nx build schema` to build the schema.

## Naming convention

Schemas are named to match example and type files in the pattern: `${schema-id}-schema.json`, corresponding to `${schema-id}-instance.json`. `${schema-id}` should be unique.