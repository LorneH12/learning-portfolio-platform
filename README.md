# Independent learning portfolio platform

Original educational samples with fictional workplace scenarios. No vendor endorsement or certification.

7 courses, five lessons per course, with Read panels, captioned lesson films, transcripts, practice feedback and editable course JSON. Public progress and author drafts stay in the learner browser. There is no operational public LMS, learner account system or shared LRS.

SCORM 1.2 exports are package candidates; actual LMS interoperability is not yet verified. Automated tests cover grading, fake SCORM API behavior, visible rubrics, local queue persistence, HTTP byte ranges and video bookmark restoration. Full accessibility and human learner testing remain pending.

Playback never autostarts. Read/Watch changes retain lesson, panel, practice response and video bookmark. A learner explicitly marks lessons reviewed; watching every second is not required. All lessons plus the assessment pass threshold are required for course completion. Writing practice is not auto-scored.

Download platform-source.zip and extract into a new folder beside these published files. Run node scripts/restore-published-media.mjs to restore the separately published MP4/JPG assets, then npm ci, npm test, npm run build, and npm start with Node 24. Source folders separate public, content, scripts and tests. Do not expose the unauthenticated synthetic local service publicly.

Flat asset names support browser-based repository upload. Dependency licenses are included. No databases, credentials or private employer assets are published.
