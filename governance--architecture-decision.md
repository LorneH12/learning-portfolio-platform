# Architecture decision: portable eLearning portfolio

Date: 2026-10-09. Status: researched recommendation, not an implemented or verified deployment. Scope: seven course samples, reusable authoring/player, LMS administration, SCORM 1.2 launch/resume/pass, persisted learning records, accessibility, and no purchases.

## Decision

Keep the complete target as **Adapt Framework + Moodle + SQL LRS**, with a public portfolio frontend. Use existing authorized compute for the full stack when available. No suitable permanent, zero-cost public host for the entire stack has been established by this research. Free software does not remove hosting, security, backup, or maintenance requirements.

If only Sites/Cloudflare Worker/D1 is available, build a clearly labelled **portfolio pilot**: seven playable samples, reusable content schema/editor, authenticated administration, persisted attempts, and exportable learning events. This is useful incremental delivery, not completion of the full Moodle/LRS target. Prefer preserving the same course sources and identifiers over creating seven unrelated demos.

The runtime availability of Sites/Worker/D1/auth is supplied project context. Its actual quotas, tenant configuration, authentication setup, and publishing permissions must be checked by the implementation owner. Cloudflare direct-account limits below are not a promise about a managed Sites allocation.

## Component choices and constraints

### Adapt: recommended standards-oriented course source

Adapt Framework is GPL-3.0 and produces responsive HTML5 for web or LMS delivery. Its current README requires Node 22 or later for build tasks. These are build-time requirements; the compiled course does not need a Node server. Reuse a theme, content structure, assessment components, and tracking configuration across all seven samples. Preserve source and license notices alongside distributions. [Framework](https://github.com/adaptlearning/adapt_framework)

The separate Adapt Authoring Tool is a GPL-3.0 web application using Node and MongoDB. It offers a genuine graphical authoring workflow but introduces another persistent service. Framework source editing is reusable authoring for developers, not equivalent to a finished nontechnical visual editor. If that editor is required, deploy and test Authoring explicitly rather than implying it comes with static course hosting. [Authoring Tool](https://github.com/adaptlearning/adapt_authoring)

Spoor provides the SCORM connection, with 1.2 the default. Its documentation has broader 2004 configuration references but also an official-support limitation; this project should target 1.2 only. Configure completion, assessment reporting, bookmarking/state, and commit behavior, then test the actual package in Moodle. Do not promise resume merely because a manifest exists. [Spoor](https://github.com/adaptlearning/adapt-contrib-spoor)

Adapt's separate xAPI extension documents launch/completion/answer events, assessment reporting, and optional State API tracking. Its README contains differing broad and version-specific compatibility statements, so pin and test a compatible framework/plugin pair. Simultaneous Spoor plus xAPI reporting is a proposed integration here, not a verified turnkey guarantee. The plugin's configurable key/secret fields must not be used to embed reusable LRS credentials in public assets. [xAPI extension](https://github.com/adaptlearning/adapt-contrib-xapi)

### eXeLearning: credible static authoring alternative

Current upstream eXeLearning is AGPL-licensed, with interactive authoring and Moodle integration. This differs from older 2.x references; do not assign an old version's license or runtime to current code. Preserve required notices and source availability for the selected distribution and modifications. [Repository](https://github.com/exelearning/exelearning)

Its current architecture documents a pure-static mode using browser IndexedDB and explicit file save/export, with no server API or collaboration. This is a promising route to a real browser editor on static hosting. The server mode instead uses Bun/Elysia, WebSockets, and SQLite/Postgres/MySQL. Static mode still needs a tested build, downloadable source projects, backup UX, and verification against hosting asset limits. Browser storage alone is not durable central authoring storage. Documentation on main is not proof that a chosen stable release includes every feature. [Architecture](https://github.com/exelearning/exelearning/blob/main/doc/architecture.md)

Use eXe SCORM exports as an alternative after package tests. Do not select its Moodle plugin as the xAPI/LRS solution: current tracking documentation says the plugin's browser xAPI channel was retired in favor of a SCORM 1.2 shim. That finding is about this integration, not a blanket claim that every eXe version lacks xAPI. [Tracking](https://github.com/exelearning/moodle-mod_exelearning/blob/main/docs/TRACKING.md)

### Moodle: full LMS administration

Use a supported, pinned Moodle release with tested plugin compatibility. Moodle is GPL-3.0-or-later. [License declaration](https://github.com/moodle/moodle/blob/main/composer.json)

Moodle needs a PHP application host, compatible relational database, persistent course-data storage, and scheduled maintenance. As one verified release example, Moodle 5.1 requires PHP 8.2+ and supports PostgreSQL 15+, MySQL 8.4+, or MariaDB 10.11+. Do not treat these example minimums as a mandate to install 5.1 or as requirements for all later releases. The ordinary Worker/D1 stack cannot directly run this PHP/database deployment. [Release requirements](https://moodledev.io/general/releases/5.1)

Moodle supports SCORM 1.2. Its FAQ points to third-party plugins for xAPI/Tin Can launch or log forwarding; core SCORM support does not make Moodle an LRS. Configure enrollments, roles, course visibility, attempts, gradebook and completion separately. A Moodle log exporter does not automatically capture all interactions inside a SCORM course. [SCORM FAQ](https://docs.moodle.org/en/SCORM_FAQ)

MoodleCloud offers a time-limited trial, not verified permanent free hosting. It also restricts custom plugin installation. Do not use a trial as the promised enduring public platform, or assume the needed integration can be installed there. [Trial signup](https://support.moodle.com/support/solutions/articles/80000836001), [Plugin restrictions](https://support.moodle.com/support/solutions/articles/80000831611)

### SQL LRS: full learning-record target

SQL LRS is Apache-2.0 and supports SQLite and external SQL databases. Use persisted SQLite for a small single-instance demonstration, or PostgreSQL for the durable multi-service target. Keep Moodle and LRS databases/roles separate even when sharing a database server. [Repository](https://github.com/yetanalytics/lrsql)

Its Dockerfile builds a Java 21 runtime; it needs a long-running JVM/container or supported executable environment, not an ordinary Worker isolate. [Dockerfile](https://github.com/yetanalytics/lrsql/blob/main/Dockerfile)

Do not choose ephemeral SQLite, which loses records on restart. Production needs trusted HTTPS, constrained origins, changed seed administration, persistent volumes, backup/restore, and protected credentials. Setup examples are not hardened deployment defaults. [Startup guide](https://github.com/yetanalytics/lrsql/blob/main/doc/startup.md)

Current SQL LRS docs state support for xAPI 1.0.3 and 2.0.0. Choose 1.0.3 for this initial integration and configure version handling deliberately; the docs warn that default responses can contain 2.0-formatted statements unless strict version behavior is enabled. Verify the deployed release, not just main-branch documentation. [Versioning](https://github.com/yetanalytics/lrsql/blob/main/doc/xapi_versioning.md)

## Target data flow

1. Author/version seven courses, build web previews and SCORM 1.2 ZIPs, retain source, assets, license inventory, and hashes.
2. Import approved ZIPs into Moodle; Moodle owns learner access, enrollment, attempt identity, SCORM state, and gradebook.
3. Establish one deliberate xAPI path: authenticated launch/session bridge for course events, or a verified Moodle-side exporter for the events it actually supports. Do not double-report completion through both paths without explicit deduplication.
4. A protected backend validates learner/attempt/course identity and forwards permitted statements to SQL LRS. Reusable service credentials stay server-side. This bridge is custom integration work and must be tested with Adapt's transport and launch mechanism.
5. Query records through authorized administrative endpoints; never expose whole-LRS read access to public learners.

SCORM remains the authority for the Moodle result; xAPI records describe learning events. Record and reconcile discrepancies. Do not advertise high-stakes assessment integrity: browser-based course scoring can be manipulated without additional server-side controls.

## Honest Sites pilot

Deliver a catalog, seven runnable lessons, schema-based course authoring with import/export, versioned publishing, learner attempts, resume, completion/score, and restricted administrative reports. A narrow custom editor is acceptable only when described by its supported fields and components; a JSON download button alone is not a full graphical authoring tool.

Use D1 for course metadata, attempt snapshots, events, and a forwarding outbox; store large media as static assets within verified limits. Use separate adapters for preview, pilot persistence, SCORM API, and xAPI export. Retain UUID event IDs, stable activity IRIs, attempt/registration identifiers, timestamps, scores, completion/success distinctions, and immutable original payloads. Failed network writes need visible unsaved status and idempotent retry. Do not display 'saved' before server confirmation.

A D1 table containing xAPI-shaped JSON is a **learning-event store**, not a conformant LRS. Even adding a statements endpoint does not establish conformance: the standard covers validation, query behavior, duplicate semantics, documents, versioning, and more. Exportable compatible data is a migration aid, not proof of compliant protocol behavior. [xAPI communication specification](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md)

Do not label the pilot a SCORM-compliant LMS on the strength of its own sample working. A limited SCORM 1.2 adapter can demonstrate launch/resume/pass for the tested packages and should be labelled accordingly. Test the exported ZIP in real Moodle before claiming portability. A full conformance claim needs defined scope and evidence; use the official LRS test suite for the chosen xAPI version where applicable. Passing local tests is not an ADL certification claim. [ADL test suite](https://github.com/adlnet/lrs-conformance-test-suite)

## Zero-spend operating boundary

Cloudflare Workers Free currently lists 100,000 requests/day, 10 ms CPU per invocation, 128 MB memory, 20,000 static files, and 25 MiB per static file. Heavy ZIP compilation and video assets may not fit: build packages outside request handlers and compress/split media where appropriate. [Worker limits](https://developers.cloudflare.com/workers/platform/limits/)

D1 Free lists 5 million rows read/day and 100,000 rows written/day, with queries failing at daily limits. Index report queries and avoid an event on every animation or scroll tick. [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)

Per-database free storage is 500 MB, total account storage 5 GB, and Time Travel recovery is seven days. Recovery history does not replace independent export/restore verification. Stay on verified free allocations; do not upgrade, attach payment, enable billable extras, or promise unlimited uptime. [D1 limits](https://developers.cloudflare.com/d1/platform/limits/)

## Security and permissions gate

- Public launch approval is not authorization to mint persistent credentials, grant OAuth scopes, expose a local machine to the internet, or weaken network/security settings. Obtain the required specific approval before these steps. No accounts, grants, installations, or deployments were performed in this research.
- Prefer existing managed authentication. Separate learner, author, and administrator roles with server-side authorization on every mutation and record read. Never trust a role or actor supplied only by browser JSON.
- Pilot anonymous visitors should get pseudonymous demonstration attempts with clear storage/reset information. Do not collect learner email, employer details, or sensitive free-text responses unnecessarily.
- Keep secrets out of course ZIPs, frontend bundles, URLs, source control, exports, and logs. Use scoped credentials only behind an approved server-side binding; short-lived sessions should be limited to the correct learner/attempt/course.
- Restrict embedded-course origins and postMessage origin/source validation. Approve only trusted package code initially; arbitrary ZIP upload brings script execution, traversal, zip-bomb, and asset-validation risks.
- Document retention and deletion, backups, operational ownership, quota behavior, and incident recovery before inviting real learners.

## Acceptance gates

For each of seven samples: source reload/edit/export works; learning objectives and assessment map are visible; all assets have rights/attribution; package imports; first launch starts a new attempt; partial completion resumes after browser closure; failed and passed attempts report correctly; completed status survives reload; different learners cannot read or overwrite each other's records; xAPI retry does not duplicate events; persisted records survive service restart; an export can be restored.

For administration: authorized authors can draft and publish; unauthorized visitors cannot; enrollment/access rules work; reports show actual saved attempts, not seeded example totals; source and data exports are portable.

Target WCAG 2.2 AA. Evaluate full learner and author/admin paths using automated checks plus keyboard and screen-reader testing. Include visible/unobscured focus, correct names/roles, logical headings, contrast, reflow/zoom, accessible errors, non-drag alternatives, transcripts/captions and appropriate audio description, reduced-motion behavior, and usable authentication. Framework claims never certify the finished courses. Publish the tested scope and remaining issues rather than a blanket compliance badge. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## Next implementation decision

Proceed with portable content and the pilot while the authorized existing execution environment is restored. Prefer Adapt for the standards-rich target; evaluate eXe static authoring only with a pinned version and a representative course. Do not rebuild Moodle or a conformant LRS inside Workers just to avoid hosting. Complete the full target on verified suitable existing infrastructure, or explicitly report the remaining hosting/permission gap. These recommendations preserve the complete requested outcome without pretending the pilot already satisfies it.
