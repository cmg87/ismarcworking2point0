
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/chris/Dev/ismarcworking2point0/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/chris/Dev/ismarcworking2point0/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/home/chris/Dev/ismarcworking2point0/src/pages/index.js")),
  "component---src-pages-test-js": preferDefault(require("/home/chris/Dev/ismarcworking2point0/src/pages/test.js")),
  "component---src-pages-trial-js": preferDefault(require("/home/chris/Dev/ismarcworking2point0/src/pages/trial.js"))
}
