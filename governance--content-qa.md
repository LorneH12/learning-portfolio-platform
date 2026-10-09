# Course content QA ledger

Observed 2026-10-09 UTC. Independent desk review of all seven authored course JSON/Markdown pairs. This is not a learner pilot, accessibility audit, runtime test, accreditation review, or proof of workplace competence. No content files were edited by this reviewer.

## Observed automated checks

- business/adkar-change-foundations.json: schema PASS; 5 lessons, 5 formative checks, 7 final questions; pass 6/7. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 8d713c5e25d608c1.
- business/ebitda-foundations.json: schema PASS; 5 lessons, 5 formative checks, 7 final questions; pass 6/7. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 4feb740740a6fe11.
- learning/adult-learning-theory.json: schema PASS; 5 lessons, 5 formative checks, 8 final questions; pass 6/8. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 38338b2395e3987f.
- learning/blooms-taxonomy.json: schema PASS; 5 lessons, 5 formative checks, 8 final questions; pass 6/8. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 881001f0e4e46ff9.
- tools/confluence-cloud.json: schema PASS; 5 lessons, 5 formative checks, 6 final questions; pass 5/6. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 8aa4c64027385e9d.
- tools/jira-cloud.json: schema PASS; 5 lessons, 5 formative checks, 6 final questions; pass 5/6. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 e18f82b4ce14a027.
- tools/sap-fieldglass.json: schema PASS; 5 lessons, 5 formative checks, 6 final questions; pass 5/6. JSON/Markdown lesson, prompt and rationale parity PASS. SHA-256 fd3e8038b023a95f.

All keyed answers reference exactly one available option. Each lesson activity has exactly one best response. Formative/final question IDs are unique within each course. Pass thresholds use the first attainable score meeting the configured percentage.

## Observed content checks

- EBITDA: independently recalculated the worked examples, assessment calculations, signed tax benefits, and cash bridge. No arithmetic defect. Scope differentiates EBITDA from cash and adjusted metrics. SEC primary guidance supports the net-income reconciliation and distinct labeling.
- ADKAR: five elements, evidence-based support decisions, privacy-aware fictional scenarios, trademark attribution, and no certification/endorsement claim checked. Create-level objective a-o4 has a written lesson-five practice prompt and a disclosed facilitator rubric; the multiple-choice result does not establish creation mastery. Preserve that limitation in the player.
- Adult learning: avoids universal adult traits and fixed sensory learning-style claims; prior knowledge, guidance, practice, feedback, and enabling conditions are coherent. Previously invalid prerequisites string is now an array. Estimate and assessment metadata now present.
- Bloom: original versus revised labels and knowledge dimensions are distinguished. Previous bt-o4/bt-a7 coverage gap corrected: bt-a7 now compares complete objective–practice–assessment plans with an appropriate answer and rationale. Prerequisites array and estimate metadata corrected.
- SAP Fieldglass: independently checked 36 DEL + 2 TRN = 38 hours and discrepancy allocation. Fictional policy is distinguished from SAP behavior and law. Official SAP guide supports rejection/resubmission, approval routes, and revised time sheets for invoiced records.
- Jira: duplicate comparison, raw CSV versus spreadsheet formatting, testable criteria, and configured workflow boundaries are coherent. Official Atlassian docs confirm current work item/space terminology and Title replacing Summary in current creation UI.
- Confluence: sample stop conditions, draft/publish distinction, live-doc distinction, effective access, and maintenance scenarios are coherent. Atlassian documentation supports the content model and container-restricted access.
- All seven: explanatory choice feedback and correct assessment keys found; no apparent private employer data, proprietary vendor assessment instruments, unqualified compliance claims, measured results, or vendor endorsement claims. Originality is a content inspection, not a plagiarism certification. Durations are design estimates, not learner-tested observations.

## Resolved findings and final disposition

Rechecked 2026-10-09 at approximately 07:38 UTC against the updated authored files, not cached versions. No unresolved content blocker remains in this scoped desk review.

- Learning prerequisite types and Bloom bt-a7 alignment were corrected and revalidated.
- Confluence co-2 now includes a learner-authored mini-runbook with its own explicitly distinguished 5-minute rule and a four-part rubric in designNotes.performanceTask. This supplies practice for create-level O2. The quiz does not claim to score the artifact.
- Jira ji-2 now includes a new Pending-filter defect packet and a learner-authored record task with a four-part rubric. This supplies the construction practice for O2; quiz recognition is distinguished from construction mastery.
- SAP fg-3 now includes a new discrepancy packet and written rejection-reason task with a four-part rubric. This supplies writing practice for O3; quiz recognition is distinguished from writing mastery.
- All three enterprise courses now say “Six selected-response questions sampling the taught decisions,” removing the inaccurate novelty claim.
- All three enterprise durations are now explicitly estimated at 28 minutes, including three additional writing-task minutes. Timing components sum to 28 (2 + 17 + 5 + 1 + 3). requiredCorrect is explicitly 5 of 6.
- New writing prompts, rubrics, revised durations, and limitations were inspected for internal coherence. Written work remains self/facilitator scored, not automatically verified. The player must show the rubric before asking learners to compare their drafts with it.

## Integration conditions and separate release work

- The renderer must handle nested designNotes in tools courses; business/learning notes have different shapes. Do not render objects directly as React children or expose [object Object].
- Some optional duration/assessment metadata differs by course family. Use explicit normalization/defaults; display every duration as an estimate.
- Preserve disclaimers, source links, fictional scenario labels, scoring limitations, and unscored writing-task status in the player.
- Runtime QA remains separate: keyboard operation, screen-reader feedback, visible focus, mobile layout, navigation/completion rules, scoring, retry, persistence, source-link behavior, and public deployment smoke tests.
- Timing and effectiveness require representative learner pilots; no pilot was performed in this review.

## Primary-source spot checks

- SEC non-GAAP guidance: https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures
- Prosci model overview: https://www.prosci.com/methodology/adkar
- Carnegie Mellon learning principles: https://www.cmu.edu/teaching/principles/learning.html
- SAP Fieldglass time and expense guide, sections 2.3 and 2.6: https://help.sap.com/doc/71f244da2f304aa1828dda707734b09f/Cloud/en-US/SAP_FG_Time_and_Expense_Management.pdf
- Jira creation: https://support.atlassian.com/jira-software-cloud/docs/create-a-work-item-and-a-subtask/
- Confluence writing: https://support.atlassian.com/confluence-cloud/docs/create-edit-and-publish-a-page/
- Confluence access: https://support.atlassian.com/confluence-cloud/docs/manage-permissions-on-the-page-level/

## Entity readiness recheck

2026-10-09 07:53 UTC: searched all seven JSON files and matching Markdown files for named and numeric HTML entities, including parsed JSON strings. None found. Bloom audience and lesson-five title already use literal L&D, as does Adult Learning audience. No course edits were needed. Revalidated all seven against schema, question/answer uniqueness, one best activity answer, required-correct arithmetic, and JSON/Markdown lesson/prompt/rationale parity: all pass. If a handed-off copy displays literal &amp;, normalize that copy’s plain-text source or remove double encoding in its renderer; do not introduce HTML decoding or unsafe HTML rendering merely to display ordinary text.
