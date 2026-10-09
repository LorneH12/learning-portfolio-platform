# Zero-purchase public LRS follow-up

Checked 2026-10-09. Read-only research; no account, credential, deployment, or software execution performed.

## Best available option

**Use Veracity Learning's Free SaaS LRS for a bounded public portfolio pilot, behind the existing Sites backend-for-frontend (BFF), after owner setup and specific credential approval.** This removes the need to find a JVM host for the pilot. Keep the portable xAPI export and SQL LRS self-hosted target. It does not solve public Moodle hosting or replace the LMS administration work.

Veracity's current pricing explicitly lists a Free hosted plan at $0/month, rather than an expiring trial. It provides three stores and 10,000 API calls/day; estimated statement capacity is 50,000–100,000 depending on size. [Pricing](https://lrs.io/home/lrs-pricing/)

The current vendor manual clarifies 100 MB **per store** and describes the free service on shared infrastructure. It gives no fixed expiration date. Treat it as an ongoing free offering subject to its terms, not a perpetual availability guarantee. [Plans](https://veracitytech.zohodesk.com/portal/en/kb/articles/versions-of-veracity-learning)

The vendor positions Free for initial xAPI work and prototypes; this is appropriate for a portfolio demonstration, not a service-level promise for production training. [Deployment guidance](https://veracity.it/choosing_an_lrs_saa_s_versus_on_premise_and_enterprise_deployment_options)

### Signup, card, credentials

The documented signup asks for email and password, email verification, then terms acceptance. No card step appears in that documented flow; **a live no-card signup was not independently completed or verified**. Stop if the actual flow requests payment or changes the plan. The account password is not the LRS integration credential: a separate access key is required. Read, write, advanced-query and limited-read permissions are documented. Limited-read restrictions do not protect document endpoints. Prefer a server-side, write-only integration key initially; use the owner's dashboard for validation, rather than giving a browser a reusable read key. [Account and key manual](https://veracitytech.zohodesk.com/portal/en/kb/articles/veracity-learning-basics)

### Retention, portability, and material terms

The manual documents raw xAPI statement JSON exports, CSV subsets, and binary BSON backups. The hosted service manages nightly backups, but the downloaded binary backup is intended for restore into LRS.io; migration to an on-premises installation requires help. Therefore preserve JSON as the portable statement archive, and separately account for attachments and state documents. Exports started during ongoing writes can miss later arrivals. Free-plan UI entitlement should be checked at setup. [Data management](https://veracitytech.zohodesk.com/portal/en/kb/articles/lrs-management)

No definite inactivity purge interval, free-plan retention duration, or guaranteed recovery period was established from the official sources inspected. The general terms allow immediate suspension/termination, disclaim uninterrupted service, and grant Veracity broad rights to store, republish, and display submitted content. Owner review is material before use. Do not send confidential training content or identified/sensitive learner records under an assumption that Free has enterprise contractual protections. [Terms](https://veracity.it/terms-of-service)

The privacy policy describes retaining personal data as necessary, rights to request access/erasure, third-party service providers and international transfers; this is not a precise statement-retention commitment. Use pseudonymous demo IDs and bounded learning-event fields, with learner notice. Pseudonymity reduces disclosure but is not equivalent to anonymity. [Privacy](https://veracity.it/privacy-policy)

Veracity advertises xAPI conformance and complete statement/document support; this research did not independently certify a deployed instance or its current version. Acceptance must prove POST, GET, idempotent retry, and retrieval after reload against the actual chosen tenant. [Product](https://lrs.io/home/)

## Useful alternative: SCORM Cloud LRS

Rustici's current pricing FAQ explicitly says externally generated xAPI statements are free, and its account called “Trial” is not time-limited. It also limits hosted course delivery to three courses, 5 GB of content and ten resettable registrations. Thus it is an ongoing-free **external LRS candidate**, despite the Trial label; it cannot be the free seven-course hosted delivery solution. No numeric external-statement quota, retention guarantee, or no-card signup guarantee was verified here. [Pricing FAQ](https://rusticisoftware.com/products/scorm-cloud/pricing/)

Rustici advertises ADL-test-suite conformance and support for statements, activity state and profiles. If Veracity's terms or signup prove unacceptable, investigate this external-LRS route before commissioning a custom LRS. Separate account/terms/credential review remains necessary. [LRS product](https://rusticisoftware.com/products/scorm-cloud/lrs/)

## Existing Worker/D1 implementation: Praxity Proof

There is a real MIT-licensed Worker/D1-native project, **Praxity Proof**, with ingestion, teacher-readable reports, export, separate read/ingest keys and retention controls described upstream. Its README explicitly identifies its standards scope as a statements-only xAPI subset and directs users needing a full LRS to SQL LRS. This is a potentially reusable pilot collector/reporting implementation, **not a conformant replacement** for Veracity/SQL LRS. It is relatively new; reported tests are author claims, not our audit. Documentation links beyond the README failed during this pass, so exact retention defaults and endpoint coverage remain unverified. Adopting it would need source/security review, pinned dependencies, isolated tests and deployment verification in the user's authorized engineering environment. [Repository](https://github.com/Praxity/praxity-proof)

No verified full, open-source conformant Worker/D1 LRS was established. Do not rewrite the entire LRS to avoid this gap. The unrelated commercial xapi.to API platform found in search is not an Experience API LRS.

## Minimal integration and verification

1. Owner creates or selects a free Veracity account and dedicated portfolio store. Do not reuse a store containing private training records.
2. Store a specifically approved, scoped key only in the verified BFF secret facility through a secure owner handoff. Never paste secrets in chat, ZIPs, frontend source, URLs or a public repository.
3. BFF validates session/actor/course/attempt, rate-limits callers, constructs a bounded statement, persists a D1 outbox item and forwards it using a stable UUID. Display separate pending, accepted and failed states.
4. Use server-side identity binding; do not trust browser-supplied actor IDs. Initial payload: pseudonymous actor ID, course/activity ID, verb, registration, timestamp, result score/completion/success. Exclude names, emails, sensitive free text and uploaded evidence.
5. Verify an actual accepted statement in the hosted LRS, retry its ID without duplication, reload and retrieve it, then export and inspect it. Do not call local D1 acceptance proof of LRS delivery.
6. Budget under both BFF and LRS quotas; retain backlog when throttled, cap payloads, and do not automatically upgrade. Seven short samples can plausibly fit, but visitor volume and event density determine capacity.

## Exact owner action/approval needed

Ask the owner to review [Veracity's terms](https://veracity.it/terms-of-service) and [privacy policy](https://veracity.it/privacy-policy), create/sign in to the Free account at the verified [signup page](https://lrs.io/ui/users/create/), and enter/submit their password themselves. No payment details should be supplied. Account/terms acceptance should stay with the owner for this education-data service.

Before creating or configuring persistent access, obtain specific approval: “May I create a write-only API access key for your dedicated Veracity portfolio store and configure it in this portfolio's server-side backend so it can send pseudonymous course progress, scores and completion events to Veracity? The key would stay off the public site and would not allow reading your other stores.” Name the actual backend/tenant before acting, disclose the recurring data category/destination, and stop if the real key scope is broader than described. Secret transmission/configuration must use the supported secure owner handoff, not chat. Any later read key, JWT signing key, broader data category or additional destination needs its own properly scoped approval.

The implementation environment remains the user's previously selected computer. This recommendation changes the proposed public persistence service, not authorization to move engineering work elsewhere.
