# Test harness

Nothing here ships. `index.html` remains the whole game; these are the tools used
to run it headlessly and find out what it actually does.

## Files

- `serve.js` — static file server. `node tools/serve.js . 8100`. Set `CHARSET=1`
  to send `Content-Type: text/html; charset=utf-8`, which is what a real host
  does and what the file currently depends on.
- `clock.js` — injected before the page loads. Replaces `performance.now` and
  `requestAnimationFrame` with a virtual clock, so `dt` stays a steady 1/60s
  while frames run as fast as the CPU allows. Canvas drawing is skipped on
  seven of every eight frames so a fifty-room stage finishes in minutes instead
  of a quarter of an hour, while `draw()` still runs often enough to surface
  exceptions.
- `bot.js` — an autopilot. Stands still to attack, retreats and circle-strafes
  from enemies, bullets, telegraphs and hazards, walks into the sanctuary
  angel, and picks the first boon offered. It plays ranged weapons only; it
  cannot play a melee weapon because it always keeps its distance.
- `debug-build.js` — writes a copy of `index.html` with a `window.__EF` handle
  onto the game's internals. The shipped file exposes nothing, which is right
  for production and impossible to test against.

## Running a stage

```
node tools/debug-build.js /tmp/ef            # writes /tmp/ef/index.debug.html
CHARSET=1 node tools/serve.js /tmp/ef 8100 &
node tools/play.js                           # drives a full stage, prints a room log
```
