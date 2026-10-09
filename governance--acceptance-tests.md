# Release acceptance tests

Status: UNRUN. This is a test specification, not a passed QA report. Record actual release SHA, environment, tester, date, steps, observed result and evidence artifact for every run. Mandatory tests block claims of overall completion. Optional SCORM 2004 support must not be advertised until T11 passes.

| ID | Test and procedure | Required result/evidence |
|---|---|---|
| T01 | Inventory all seven course repositories and deployments; compare names, course IDs and content. | Seven new independent repositories and seven working public course URLs; each has topic-specific instructional content, objectives, practice, feedback and assessment. Record exact URLs and commit SHAs. |
| T02 | Compare pre-work/post-work inventory of existing repositories. | Existing builds unchanged by this work; any authorized exceptions identified. No claim of preservation without baseline/diff evidence. |
| T03 | Complete home → module → lesson → assessment → completion using each course. Exercise back, next, resume, help, settings and restart. | Correct progress, no skipped required learning, sensible optional navigation, clear completion/pass distinction; no duplicate completion on refresh. Screenshots plus state assertions. |
| T04 | Copy template into two different course repositories; alter content and brand configuration only. | Distinct topic and original brand render without editing runtime logic. Separate HTML/CSS/JS/assets verified; shared runtime version pinned. |
| T05 | In authoring UI, import a course, edit objective/page/question/feedback/brand, validate, save, close, reload, preview and export. Reimport export. | Changes survive roundtrip; stable IDs and semantic content preserved; no secret bundled; invalid content rejected clearly. Actual exported artifact and comparison retained. JSON editor alone without this flow is not a passed authoring platform. |
| T06 | On deployed LMS, register or use approved synthetic learner, enroll/assign course, launch, exit/resume and view completion report as authorized role. | Working learner/course mapping and launch/reporting, access isolation and correct records. Static card gallery is insufficient. |
| T07 | Launch synthetic learner session and generate initialized, experienced, answered, completed, passed/failed and terminated events as applicable. Capture network response and UUIDs; retrieve each by ID from backend. | Valid xAPI 1.0.3 statement shapes; IDs/actor/activity/registration/result/timestamps match. Online healthy-service target: persisted GET within 5 seconds. Browser localStorage or a success toast does not qualify. |
| T08 | Close browser; reopen fresh session and query same event IDs. Restart backend within authorized safe test scope; query again. | Records survive browser closure and backend restart. Save redacted request/response evidence and storage environment. No reliance on ephemeral filesystem. |
| T09 | Disconnect/reconnect, resend same UUID, send malformed data, simulate denied credentials and quota response; observe reporting counts. | Stable IDs prevent duplicate counts; bounded safe retry/queue; malformed/unauthorized input rejected; visible pending/error state; offline events preserve occurrence time; no false claim that failed delivery was saved. |
| T10 | Export SCORM 1.2 single-SCO ZIP; inspect root imsmanifest.xml and resources. Import into a real SCORM 1.2 LMS and launch. Exercise initialize, score, lesson status, location, suspend/resume, session time, commit and finish. | Package imports; API initialized and errors checked; fail/complete/pass semantics correct; progress/attempt resume works after relaunch; LMS report agrees with course. Record LMS/version/ZIP/hash/results. Local fake API tests supplement but do not replace this. |
| T11 | OPTIONAL: separately export SCORM 2004 3rd Edition and import in a supporting real LMS; test completion_status, success_status, scaled score, location, suspend, session time and termination. | Version-specific schema/API used, not a relabeled SCORM 1.2 manifest. Completion distinct from success; all exercised behaviors pass. Moodle native SCORM 1.2 testing is not evidence for 2004. If not run, label 2004 unsupported/unverified. |
| T12 | Manual keyboard-only traversal and screen-reader review of every component and representative complete courses, including authoring, dialogs, quiz errors, progress and completion. | Semantic headings/landmarks, meaningful labels, correct names/roles/states, visible focus not obscured, logical focus order, focus restoration, no keyboard trap, announced feedback. Record browser and screen-reader versions and any limitations. |
| T13 | Automated accessibility scan every page/state; manually test contrast, text resizing 200%, reflow at 320 CSS px/400% desktop zoom, text spacing, high contrast and target size. | No known applicable WCAG 2.2 A/AA failures. Normal text ≥4.5:1, large text ≥3:1, meaningful UI indicators ≥3:1; targets satisfy 24×24 CSS-pixel rule or documented exception. Automated zero violations alone does not prove conformance. |
| T14 | Complete all media-dependent objectives without sound, without video and with reduced motion; test captions/transcripts and timeout controls. | Equivalent learning and assessment available; accurate captions and required visual-description support; no autoplay obstruction; pause/stop where required; warning and extension for timed sessions. Settings preferences persist accessibly. |
| T15 | Audit objective → instruction → practice → assessment → feedback mapping for all seven courses. | Every terminal objective directly assessed; task/cognitive demand matches; authentic examples, correct source-grounded explanations and useful distractor feedback. No course is merely title cards. |
| T16 | Execute all answer paths, calculations, course-specific thresholds, applicable authored-rubric failures, retries and pass/fail endings against the current curriculum answer keys. | Correct scores and rationales; no impossible pass, accidental answer disclosure or false completion. Synthetic evaluation clearly labeled; no fabricated learner outcomes. |
| T17 | Review every public image/logo/font/video/text/license and course disclaimer. | Rights/provenance documented, required attribution preserved. No original reference photographs, employee information, proprietary corporate training copy or unverified employer branding. Neutral original brands remain usable. |
| T18 | Read selected hosting account limits and billing configuration; test quota/failure path within safe limits. | Verified no-charge deployment, no paid trial/card/overage/auto-upgrade. Record limits, sleep/expiry, storage persistence and backup route. Unknown billing or inaccessible backend blocks complete launch. |
| T19 | Secret scan repository/history/builds and inspect browser source/network plus public API routes. Test unauthenticated read/admin and cross-learner requests. | No credentials/PII in public files; LRS admin/query rights protected; least privilege, HTTPS, input limits and safe CORS/rate limiting. Public write does not enable public record browsing. No security-certified claim from these limited tests. |
| T20 | Inspect event payloads, dashboard rows and privacy notice; exercise approved export/retention workflow using synthetic records. | Opaque actors only by default; no names/email/free-text PII; purpose/retention disclosure truthful; deletion not falsely claimed. Any permanent purge remains subject to action-specific approval. |
| T21 | From fresh anonymous browser, open every release URL on desktop/mobile; test course exports, documentation and cold start. | Public routes accessible with intended permissions, no broken links, clean load/error states, functioning persisted reporting where authorized, no secrets or private asset URLs. Record test results and limitations. |
| T22 | Restore known-good release in safe preview and execute smoke tests; follow operator handover docs from clean environment. | Reproducible setup, versioned schema/migration notes, export/backup path, rollback and quota runbook. Deployed release SHA and exact supported features documented. |

## Evidence template

- Test ID / requirement IDs:
- Release SHA and artifact hash:
- Actual environment, LMS/LRS versions and public URL:
- Timestamp / tester / browser-assistive technology:
- Inputs and steps:
- Expected result:
- Actual result:
- Redacted evidence artifact(s):
- Verdict: pass / fail / blocked / not run / not applicable with rationale:
- Defect and retest reference:

## Completion language

“Working static course samples” requires T01/T03/T04 and applicable content/accessibility/security/publication tests. “Operational authoring + LMS/LRS portfolio platform” additionally requires authoring roundtrip, real LMS launches, persisted xAPI retrieval after restart and deployed integration. “SCORM compatible” must name the tested version and LMS. “WCAG 2.2 AA tested” must name scope and residual defects; do not call it independently certified. No passing results are asserted in this document.

## Current authored scoring reference

Use curriculum-alignment.md and requirements.json, not preliminary generic thresholds. Business courses: 6/7; software courses: 5/6; learning-theory courses: 6/8. Written-task rubric review is separate from automated quiz scoring. These values are authored requirements, not proof of deployed scoring behavior.
