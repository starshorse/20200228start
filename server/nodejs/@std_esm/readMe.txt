!!! need  nvm version 8.17.0 !!!

@std/esm
========
This fast, small, zero-dependency package is all you need to enable ES modules in Node 6+ today!

See the release post 📖 and video 🎥 for all the details.

Discontinued
This package has been discontinued in favor of esm.

Getting started
----------------
Run npm i --save @std/esm in your app or package directory.

There are three ways to enable ESM with @std/esm.

Enable ESM with a CJS bridge:

index.js

// Provide options as a parameter, environment variable, or rc file.
require = require("@std/esm")(module/*, options*/)
module.exports = require("./main.mjs").default
Enable ESM in the Node CLI with the -r option:

node -r @std/esm main.mjs
Enable ESM in the Node REPL:

node -r @std/esm
or upon entering:

$ node
> require("@std/esm")
@std/esm enabled
Note: All "cjs" options are unlocked in the Node REPL.

Standard Features
The @std/esm loader is as spec-compliant as possible and follows Node’s ESM rules.

👉 This means, by default, ESM requires the use of the .mjs file extension.
🔓 You can unlock ESM with the .js file extension using the "js" ESM mode.

Out of the box @std/esm just works, no configuration necessary, and supports:

import / export
import.meta
Dynamic import
Improved errors
Live bindings
Loading .mjs files as ESM
The file URI scheme
Node --eval and --print flags
Node 6+ support
