# Contributing Guide

All contributions are greatly appreciated 👍🎉. This guide includes:

* [Repository overview](#overview) that provides an introduction to the module
  code to help with getting started
* [Contributing process](#requirements) with details on how to submit a pull
  request.

<h2 id="overview">Repository overview</h2>

1. webpack loader `svg-symbol-sprite-loader` that allows importing SVG files
   into a webpack project.
1. webpack plugin that aggregates the imported SVGs into a separate `<symbol>`
   sprite file and emits it as a build asset.
1. _Optional_ `local-storage-svg-loader.js` that will fetch an SVG sprite and
   save it to local storage using the asset id. On subsequent visits to your
   application if the sprite id hasn't changed the sprite will be served from
   local storage.

<h2 id="requirements">Contributing process</h2>

* Review the [code of conduct][conduct], we take it seriously!
* Use the git flow branching model when creating your PR (Fork the repo and
  create a feature/bug/documentation/test branch off of the **develop** branch).
* Commit your contribution 🎊
* Ensure that all tests pass (Running `npm test` will run all unit tests and
  linting validation).

<!-- Links -->

[conduct]: ../CODE_OF_CONDUCT.md
