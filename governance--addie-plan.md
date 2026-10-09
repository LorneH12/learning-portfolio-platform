# ADDIE delivery and governance plan

Date: 2026-10-09. Status: specification, not implementation evidence.
Project: Seven-course independent eLearning portfolio plus authoring, player, LMS and LRS.
Source: https://chatgpt.com/share/6ac89674-b160-83e8-a509-83d8b762ffb6

## Decision boundaries

Initial Analysis identified Adapt + Moodle + SQL LRS as a provisional shortlist rather than a selected or installed stack. Lorne authorized implementation and public launch on October 9, 2026, with no spending. Do not mistake a planning artifact, fork, browser-storage demo, passing unit test or local launch for an operating public platform.

Current baseline decisions: SCORM 1.2 single-SCO export; xAPI 1.0.3 persisted statements; WCAG 2.2 Level A/AA acceptance target; pseudonymous demonstration records; neutral original public brands until employer-asset rights are established. These operationalize the user requirements without claiming certification or inventing prior approval of a vendor stack. SCORM 2004 3rd Edition can be added only through its separate compatibility gate.

## A — Analysis

The seven learner segments, workplace problems, exact authored objectives, activities, assessment keys and rubrics are reconciled in requirements.json and curriculum-alignment.md. The JSON source hashes identify the authored checkpoint. These replace the preliminary topic sketches: SAP Fieldglass now focuses on time-sheet review, Jira on defect triage, and Confluence on a usable maintained runbook. They are proposed portfolio personas, not findings from real learner interviews. Each course must include a short design rationale labeling these assumptions. Curriculum owners may improve them, but preserve the objective-to-assessment relationship and record changes.

Collect: existing learner knowledge; task context; what failure looks like; performance support versus training need; sample boundary; prerequisite vocabulary; scope excluded; measurable success; sensitive-data risk. Use fictional organizations, projects and records. Each sample should contain a meaningful complete learning arc rather than an empty preview of a larger course.

A-exit gate: all seven briefs have a learner/performance problem, objective, assessment plan, accessibility/media plan, source register and sample boundary; platform requirements and hosting feasibility are explicit. Do not present seven topics as a completed needs analysis.

## D — Design

One shared flow: introduction and objectives → worked example → guided practice → authentic scenario/assessment → feedback and retry → summary/job aid → completion. Modules and pages can vary by topic. Completion is separate from passing; record both accurately. Use the authored course-specific thresholds: EBITDA and ADKAR require 6/7 correct (80% configured; 85.7% attainable); SAP Fieldglass, Jira and Confluence require 5/6 (80% configured; 83.3% attainable); Adult Learning Theory and Bloom’s Taxonomy require 6/8 (75%). Do not add a universal critical-step scoring override absent from the authored rubric. ADKAR written-plan practice uses 3/4 with behavior present; the three software-course authored tasks use their specific 4/4 practice rubrics. Those separately reviewed artifacts are not automatically passed by the quizzes.

Maintain stable course, module, page, objective, item and version IDs. For every objective map instruction, practice, scored evidence, feedback, remediation and xAPI activity ID. Build accessible native controls first; never make drag, audio or video the only completion path. Authoring must support editing content/feedback/brand, validation, preview, export, save and reload.

D-exit gate: alignment matrix complete; one representative storyboard approved through the project design review; schema validated against the seven courses; assessment scoring and attempt rules explicit; sample brand tokens and asset licenses registered; tracking event catalog and data minimization defined.

## Architecture options and selection gate

1. **Adapt Framework + Adapt Authoring + Moodle + SQL LRS**: closest historical shortlist. Maintained project foundations, separate authoring/course/LMS/LRS responsibilities. Biggest risks are editor/framework/plugin compatibility and operating several persistent services at zero cost. Do not fork by rote before verifying deployed viability.
2. **Adapt or eXeLearning exports + lightweight custom authoring/player + SQL LRS**: potentially smaller deployment footprint, but custom authoring and LMS functions must truly work. A JSON editor with preview can satisfy a modest authoring scope only if its full roundtrip passes; call it a lightweight authoring studio, not a full commercial-authoring replacement.
3. **Static player + custom database event collector**: useful prototype, but not a conformant LRS merely because it stores JSON events. It cannot be claimed as complete delivery of the LMS/LRS requirement without appropriate APIs, authentication, retrieval semantics and tested event handling. Use an actual LRS where feasible, or explicitly report unmet scope.

Score 1–5 with linked evidence: reference interaction fit (20%), authoring roundtrip (15%), SCORM/xAPI integration (20%), accessibility control (15%), maintenance/license obligations (10%), zero-cost operational feasibility (20%). Scores must come from actual checks, not invented numbers. Hard gates override scores: no spending, no secret in client code, durable storage, permissible license, working authoring roundtrip and real LMS launch.

Selected code versions, licenses, integration strategy and hosting provider must be recorded in an architecture decision record by the builder. A fork is code custody, not deployment. GitHub Pages is static hosting; backend services and persistent storage require a distinct operating environment. Do not promise uptime from a free tier or use an ephemeral process as durable hosting.

## D — Development

Build one vertical slice first using ADKAR's original fictional rollout case: objectives, explanation, scenario decisions, feedback, assessment, completion, export and statement retrieval. ADKAR is a sensible pilot because scenario choices exercise both learning design and tracking; use original explanations and attribution, not proprietary diagrams or official certification claims.

Then test a second, structurally different slice: EBITDA calculation or Jira defect-triage practice. This catches a template that only works for multiple-choice content. Scale to all seven only after both slices pass common acceptance gates.

Source layout should separate index, CSS, JavaScript, assets, content/schema, brand configuration, tests and documentation. Course repositories remain independently publishable; pin shared runtime version and document update propagation. Enforce asset/source inventories, sanitization of authored text, validation, deterministic packaging and reproducible builds.

D-exit gate: pilot T03–T20 passes with evidence; no critical accessibility/security defects; two-course content reuse demonstrated; real persistence verified; all seven contain complete learning content, source notes and feedback. A screenshot of a success toast is insufficient.

## I — Implementation

Deploy first to a non-public preview where possible, then public URLs within existing authority. Verify exact provider costs and limits before provisioning. Never start a paid trial, enter payment details, permit overage billing or accept new access grants without the applicable approval flow. If zero-cost durable services cannot be established, release the genuinely working static parts only with a clear blocker; do not label the overall project finished.

Prelaunch: publish privacy notice and independent portfolio disclaimer; remove personal reference photographs and credentials; validate public rights; verify all seven independent repositories/URLs; check cold start, navigation, exports, mobile and actual LMS integration. Operator docs must explain deployment, restore, content update, incident handling, quota behavior and fallback read-only operation. Tag known-good versions and test rollback.

I-exit gate: all mandatory acceptance tests pass against deployed release; evidence URLs and timestamps recorded; no broken course/authoring/reporting link; operational limits visible; state what remains optional or unverified.

## E — Evaluation

Formative: expert content review, keyboard/screen-reader checks and pilot scenario walkthrough; identify misconceptions from wrong-answer patterns. Before human testing, label any automated or simulated evaluation accurately.

Summative portfolio measures: completion accuracy, objective-level mastery, misconception frequency, scenario-decision quality, successful task completion and retry improvement. Satisfaction alone does not establish learning. Course analytics should allow item-level analysis without exposing learner identities. Report actual observed values only; never pre-populate testimonials, success rates or learning gains.

Operational measures: statement persistence/latency, duplicate rate, delivery failures/retries, resume accuracy, authoring export integrity, critical accessibility regressions and broken links. After release, observe the first complete deployed test run and at least one cold-start/restart retrieval before claiming completion. No ongoing scheduled monitoring is implied by this document.

E-exit gate: release evaluation report distinguishes evidence, limitations and next improvements. Every failed mandatory test has a fix and retest, or the affected scope remains explicitly incomplete.

## Privacy, branding and zero-cost governance

Use opaque demonstration learner IDs and synthetic answers only. Do not collect names, emails, employee identifiers or arbitrary free text by default. A proposed 30-day demo-record retention maximum is a design default to implement and disclose, not a claim that deletion already occurs. Document purge and export; require authorization for irreversible deletion. Persisted records must never live in public repositories. Admin/LRS secrets stay server-side, with least-privilege access, rate limits, input limits and safe CORS. A public anonymous demo write endpoint must not expose query/admin privileges.

Reference images are private design evidence. They contain third-party material and are not licensed production assets. Exclude originals and contact sheets from GitHub, public sites and distribution bundles; carry only a rights-safe design brief. Former employment does not establish reuse rights in logos, employee photos, videos or corporate course copy. Preserve swappable employer-brand capability but publish an original neutral brand while rights are unverified. Trademark mentions describing SAP, Atlassian and ADKAR topics should not imply affiliation or official training.

Free hosting inventory must state account owner, region, runtime/storage/bandwidth limits, sleep policy, expiry, persistence across restart, backup/restore, egress, usage alerts and hard billing protections. No credit-card trial or auto-upgrade. If a free tier sleeps, disclose initial-load expectations and prove storage survives. Unknown limits block a claim of sustainable zero-cost operation.

## Primary references consulted 2026-10-09

- WCAG 2.2 checklist: https://www.w3.org/WAI/WCAG22/quickref/
- Moodle SCORM FAQ: https://docs.moodle.org/503/en/SCORM_FAQ (SCORM 1.2 supported; SCORM 2004 not supported)
- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- SQL LRS repository: https://github.com/yetanalytics/lrsql
- Adapt Authoring repository: https://github.com/adaptlearning/adapt_authoring

These establish source pointers and major constraints, not verification of any deployed instance or current pricing for an unselected host.

## Checkpoint and release status

This document specifies the complete target, not a final deployed inventory. Integration is ongoing. The public portal is https://lorneh12.github.io/learning-portfolio-platform/ . Recheck its deployed commit, course coverage and test evidence at release rather than treating an intermediate course count as final. Real-LRS/account setup and applicable integration tests remain pending unless superseded by verified release evidence. R01 continues to require seven independent new public course repositories; it is not satisfied by a single portal repository. The original repository requirement is evidenced by user message f879820a-3d9f-4c96-afac-360858aa8991 in the linked source: “Each training will be its own repository and published publicly.” Current full-build/publication authorization supports this scope. Actual repositories and commits still require verification.
