# Project Nirvana — multipage website

Nine static HTML pages: Home, About, Team, Results, Join Nirvana, Contact, Courses, Privacy information, and Website use & content. The main navigation contains the seven primary pages. Open index.html or run `node preview.cjs` for http://127.0.0.1:4173. No installation or build step is needed.

## Design and content

Black, white, and neutral gray interface with full-color photographs and logos. Animation includes headline entrances, section reveals, a ticker, program panels, and page entrances. The motion toggle and system reduced-motion preference are supported. The homepage retains a hero image placeholder plus six workshop photo placeholders.

Content comes from the user-provided text and the supplied Project_Nirvana_Website GitHub repository, retrieved 9 October 2026. Eleven team profiles and portraits, partner logos, competition logos, mentor-institution logos, the About image, and contact/application destinations were reused from that repository. Missing competition logos are represented by names rather than broken images. Mentorship pathways are distinguished from awards earned, mentor connections from institutional sponsorship, and future roadmap goals from current results. The five education-gap percentages are attributed to Project Nirvana and explicitly lack independent source citations.

## Contact and applications

The contact form uses the repository's existing Formspree endpoint: https://formspree.io/f/xdarnokv. It validates required fields and email format, confirms success only after a successful response, preserves text on delivery errors, and times out after 20 seconds. Formspree handles delivery. The HTML form also works without JavaScript. No real test message was sent; success and failure handling were checked using mocked responses.

Student application: https://forms.gle/xBwQNfAEKPdsCwWn9
Team application: https://forms.gle/RSccdr3cWM6ZyVSeA

Courses and modules are marked Coming soon; lessons, accounts, payments, and course enrollment are not implemented. Privacy and website-use pages describe implemented features and supplied ownership information; the original repository's corresponding footer buttons had no policy content.

## Editing and hosting

Edit each HTML page directly. style.css contains the main design, pages.css the shared multipage layouts, script.js interactions, and contact.js the contact form behavior. Assets are local under assets/. Google Fonts is the only rendering dependency; system font fallbacks work offline. To replace a placeholder, insert an img element with descriptive alt text inside its photo-placeholder figure; it will display in its original colors.

For Netlify, publish this directory with no build command. This version is a local deliverable; it has not been deployed or pushed to GitHub. The existing portfolio is separate and unchanged.

## Validation

All nine HTML pages have one main heading and their local links, anchors, and assets resolve (296 references checked). The seven primary pages were checked in desktop and mobile browser layouts, with no horizontal overflow or browser errors observed. Mobile menu navigation and contact success/server-error/network-error behavior were checked.

Photo placement update: visually reviewed source images now replace homepage and Join placeholders. 3D printer, electronics, classroom and learning-space images are captioned by visible content. Added seven olympiad logos to Results and the existing Nirvana mark to shared headers/footers. Photographs retain color and compact dimensions.
