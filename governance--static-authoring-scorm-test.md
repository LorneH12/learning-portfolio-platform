# Static authoring and independent SCORM test recommendation

Checked 2026-10-09. Research only. No user-computer access, accounts, forks, downloads, installations or execution were performed. The public portal is an evolving integration checkpoint; this research document does not establish its final course count or current tracking capability. Reverify deployed coverage and persistence against the release acceptance tests.

## 1. Lowest-friction authoring: official eXeLearning static ZIP

Use the upstream **exelearning/exelearning v4.0.5** release and its prebuilt **exelearning-static-v4.0.5.zip**, listed at 24.8 MB. Release date: 2026-09-16; commit prefix: `63748a3`. The published SHA-256 is `e9acedea9be6afd842867daa6b515f85369711b94b5d22d1523d375bcbbdf6e2`. Verify it before extraction; resolve the complete tag commit locally and record it. Do not use a moving `latest` URL as the version lock. [Official release and asset list](https://github.com/exelearning/exelearning/releases)

The upstream license is **AGPL-3.0**. Keep license, copyright, third-party notices and corresponding source accessible with the hosted distribution. A fork should preserve the exact upstream version and separate any modifications. This is an upstream visual authoring tool, not a new homegrown editor. [Repository](https://github.com/exelearning/exelearning), [Pinned license](https://github.com/exelearning/exelearning/blob/v4.0.5/LICENSE)

The static distribution runs in the browser, uses IndexedDB and file save/export, and does not need the Bun server. **Node 24 is enough to serve the extracted files locally; no Node/Bun execution is needed on GitHub Pages.** Rebuilding eXe from source is a different task and uses Bun; do not attempt to execute its server using Node alone. Static authoring is single-browser/local-file work, not authenticated collaborative editing or central project storage. [Architecture](https://github.com/exelearning/exelearning/blob/main/doc/architecture.md)

Important release-specific constraint: **v4.0.5 removed xAPI emission from exported packages**. It remains a SCORM authoring route. The release also changes scoring and fixes resume/commit behavior. Test assessment thresholds rather than assuming our portfolio policy overrides the exporter's behavior. No native xAPI promise should appear beside this authoring option. [Pinned release notes](https://github.com/exelearning/exelearning/releases/tag/v4.0.5)

### Minimal builder handoff

1. Download the official pinned static ZIP through the already authorized desktop workflow; verify checksum and safe extraction paths.
2. Place its complete contents in an isolated folder such as `authoring/exelearning-4.0.5/`, preserve notices, and add an attribution/source link. Keep the core portal untouched.
3. Serve locally at the same subdirectory prefix that Pages will use. Verify asset requests, service-worker scope, preview and export. Do not assume root-relative URLs work at `/learning-portfolio-platform/authoring/.../`. This exact subpath deployment has not been run in this research.
4. Add one portal link to the authoring tool. Prefer a separate tab initially over iframe integration: fewer origin, file picker and preview complications. Do not wire public editing to repository publication or request GitHub OAuth merely to make the editor useful.
5. Create one small source project, save `.elpx`, close/reopen it, modify it, preview it and export SCORM 1.2. Keep the editable source as well as the ZIP. Do not describe the existing custom courses as eXe-editable unless actually recreated or imported successfully.
6. Require explicit file backups; browser storage can be cleared. A static editor available to visitors does not grant them access to change published courses.

GitHub Pages supports public repositories on GitHub Free, but has a 1 GB published-site limit and approximately 100 GB/month soft bandwidth limit. Check unpacked size, individual repository file constraints and actual delivery before committing the bundle. Keep this a portfolio/demo; Pages is not intended for commercial SaaS or sensitive transactions. [Official Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## 2. Immediate Node-only interoperability layer: scorm-again

Use **jcputney/scorm-again**, MIT, a substantial open-source SCORM runtime with validation and actual SCORM 1.2 data-model behavior. It is suitable for an independent runtime compatibility check without a hosted account. It is **not a complete LMS, package importer, or certification service**. The maintainer provides browser bundles, npm package, integration documentation and player-wrapper demos. If no commit endpoint is configured, the default behavior logs rather than persists to an LMS. [Official repository](https://github.com/jcputney/scorm-again)

Verified stable release reference: **3.2.0**, commit prefix `68af119`. The fetched current master package declares **3.4.7**, so the `/releases/latest` response appears behind the current source. Do not describe 3.2.0 as conclusively newest. For reproducibility, start with the verified tag or have the builder verify the published newer package and lock its integrity. Never combine current-master demo code with an older runtime silently. [3.2.0 release](https://github.com/jcputney/scorm-again/releases/tag/3.2.0)

Current package metadata requires Node **>=20.19**, which Node 24 satisfies. Browser execution uses the compiled JavaScript. Some source-build scripts use POSIX shell syntax (`rm`, inline environment assignment), so **use the prebuilt pinned npm/browser distribution** to avoid unnecessary Windows shell/build work. Compatibility with Node 24 is inferred from declared engines, not a Windows test performed here. [Package metadata](https://github.com/jcputney/scorm-again/blob/master/package.json)

### Honest test setup

- Keep a separate local test player using the upstream `Scorm12API` implementation. The existing portal's own API shim must not be the oracle that declares its own ZIP valid.
- Serve player and safely extracted course from one loopback origin. Read `imsmanifest.xml` and launch the declared SCO; do not hardcode a convenient internal HTML page that bypasses the manifest. A multi-SCO package requires the matching player navigation/state behavior.
- Use the upstream player-wrapper example as a starting point after checking it exists at the chosen revision. Published examples include `demos/player-wrapper/scorm12-multi-sco`; specific contents at 3.2.0 were not retrievable in this research. [Demo directory](https://github.com/jcputney/scorm-again/tree/master/demos/player-wrapper)
- For durable reload testing, supply a **small real local persistence adapter**: commit accepted state to an attempt-specific file, return success only after save, and load it before starting the next session. This is limited test infrastructure, not a custom LMS. A browser-only variant may demonstrate local resume but must be labeled browser-local.
- Record initialize, get/set, commit, finish, error codes, score/status, location and suspend data. Test partial exit and resume, fail then pass, a clean independent attempt, and reopening after the local server restarts. Simulate a rejected commit and verify it is not reported as saved.
- Report “tested with scorm-again [version] for these behaviors.” Do not report Moodle compatibility, full LMS completion, ADL certification or universal SCORM compliance from this test alone.

## 3. Real Moodle check: useful options and limitations

For the strongest conventional LMS test, the official **moodlehq/moodle-docker** project is GPL-3.0 and provides a Moodle developer/test environment with actual databases. Use it only if Docker is already available/authorized, otherwise it adds setup and is not a Node-only portable solution. Pin Moodle and the container tooling; use a test course and verify the Moodle attempt report. [Official test environment](https://github.com/moodlehq/moodle-docker)

Do **not** recommend the current official Windows all-in-one bundle as a clean shortcut without inspection: its download page warns the bundled XAMPP stack is unmaintained and database requirements do not match modern Moodle. Do not alter `environment.xml` to defeat compatibility checks for this proof. [Official Windows warning](https://download.moodle.org/windows/)

There is also **ateeducacion/moodle-playground**, GPL-3.0, an independent community project running actual Moodle/PHP-WASM with a patched SQLite snapshot in the browser. Its live demo needs no paid account. It may provide a genuine exploratory Moodle SCORM import/launch check if that module works in the chosen snapshot, which has not been established here. It is **not Moodle HQ's official distribution**. State is explicitly ephemeral and closing the tab destroys it, so it cannot prove durable resume across browser closure. Local rebuilding lists Node 18+, Python and PHP prerequisites; it is not automatically Node-only. Do not turn it into the public production LMS. [Project and limitations](https://github.com/ateeducacion/moodle-playground)

Reject permissive preview tools as the standards oracle. For example, `jakerains/scormplayer` is MIT, Windows/Node20-compatible and convenient for review, but its own README says its API is forgiving and does not enforce the full specification. Likewise a hand-written API returning `true` cannot substantiate interoperability. [Maintainer's stated scope](https://github.com/jakerains/scormplayer)

## Decision for the present blocker

Deploy the pinned eXe static authoring assets after subpath smoke tests. Add an independent scorm-again compatibility test locally using a narrow real persistence adapter. Preserve the distinction between that evidence and a full Moodle test. If Docker is absent, do not silently expand into installing a large system stack or weakening checks; retain Moodle validation as an explicit remaining gate, with the browser Playground only an optional ephemeral preliminary check. Public learner storage and LRS setup remain separate blocked work.
