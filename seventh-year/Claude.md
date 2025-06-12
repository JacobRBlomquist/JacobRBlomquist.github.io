Anniversary Website Specification
"Seven Years of Growing Together"
Project Overview
A static anniversary website deployable to GitHub Pages that takes the user through a seasonal journey representing different phases of a 7-year relationship. Each season is unlocked by answering a multiple-choice question correctly.
Technical Requirements

Platform: Static HTML/CSS/JavaScript website
Hosting: GitHub Pages compatible
No Backend: All functionality must work client-side
Mobile Responsive: Should work well on phones and tablets
Modern Browsers: Target Chrome, Firefox, Safari, Edge

Site Structure & Content
Header Section

Title: "Seven Years of Growing Together"
Subtitle: "Click on the garden to discover our journey through the seasons of love"

Navigation

Seasonal Icons: Horizontal row at top of page

Spring: Flower icon 🌸
Summer: Sun icon ☀️
Fall: Leaf icon 🍂
Winter: Snowflake icon ❄️


Behavior:

Unlocked icons: Full color and clickable
Locked icons: Grayed out and non-interactive
Only Spring starts unlocked



Main Garden Display

Single View: One garden scene displayed at a time
Click Trigger: Clicking anywhere on garden triggers the season's puzzle
Visual Style: Bright, cheerful garden colors
Illustrations: Realistic garden scenes using SVG illustrations

Seasonal Content
Spring: "First Met and Courting"

Garden Scene: Spring garden with blooming flowers, fresh green growth
Puzzle: 1 multiple-choice question about their first meeting/courtship
Reward: Poem about their early relationship + full garden scene reveal

Summer: "Engagement, Long Distance, and Marriage"

Garden Scene: Summer garden in full bloom, lush and vibrant
Puzzle: 1 multiple-choice question about engagement/long-distance period
Reward: Poem about waiting, commitment, and marriage + full garden scene

Fall: "Kids and Schooling"

Garden Scene: Autumn garden with falling leaves, harvest elements
Puzzle: 1 multiple-choice question about family/education period
Reward: Poem about growth, family, learning + full garden scene

Winter: "Fun Times and Growing Together"

Garden Scene: Winter garden with bare branches, snow, evergreens
Puzzle: 1 multiple-choice question about recent fun times/growth
Reward: Poem about enduring love, growth, future + full garden scene

Interactive Elements
Quiz Modal

Trigger: Clicking anywhere on the garden scene
Style: Modal popup overlaying the garden (with backdrop)
Content: Question + 3-4 multiple choice answers
Wrong Answer: Show "Try again!" message, same question reappears
Right Answer: Modal closes, reveal content (poem + visual), unlock next season

Transitions

Between Seasons: Fade out/fade in effect (smooth CSS transitions)
Duration: 1-2 seconds for comfortable viewing
Unlock Effect: New seasonal icon becomes colored/clickable

Technical Implementation Suggestions
Recommended Libraries/Resources

SVG Illustrations:

Undraw.co (customizable seasonal garden scenes)
Freepik (free tier botanical collections)
SVG Repo (simple botanical elements)


CSS Framework: Consider Tailwind CSS for quick styling
Animations: CSS transitions and keyframes

File Structure
/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── spring-garden.svg
│   ├── summer-garden.svg  
│   ├── fall-garden.svg
│   └── winter-garden.svg
└── README.md
Key Features to Implement

State Management: Track which seasons are unlocked (localStorage for persistence)
Modal System: Question popup with multiple choice functionality
Image Preloading: Load all season images for smooth transitions
Responsive Design: Works on mobile and desktop
Accessibility: Proper ARIA labels, keyboard navigation

Content Placeholders
Questions (To be filled in by developer)

Spring Question: [Multiple choice about first meeting/courtship]
Summer Question: [Multiple choice about engagement/long-distance]
Fall Question: [Multiple choice about kids/schooling period]
Winter Question: [Multiple choice about recent fun times]

Poems (To be written by developer)

Spring Poem: About early relationship, butterflies, new love
Summer Poem: About patience, commitment, distance, marriage
Fall Poem: About family growth, learning, maturing together
Winter Poem: About enduring love, reflection, future dreams

User Experience Flow

User arrives at site, sees title and Spring garden
Spring icon is active, others are grayed out
User clicks on garden → Spring question modal appears
User answers correctly → Modal closes, spring poem appears, summer icon unlocks
User can click Summer icon to transition to summer garden
Repeat process for each season
User can navigate back to any unlocked season via icons

Success Metrics

All seasons can be unlocked in sequence
Smooth transitions between seasons
Questions and poems display correctly
Site works on mobile devices
Fast loading times
Romantic and engaging user experience

Deployment Notes

Ensure all assets are properly linked for GitHub Pages
Test on GitHub Pages preview before going live
Consider custom domain if available
Add meta tags for social sharing


This specification provides a complete roadmap for creating a beautiful, interactive anniversary website that can be built and deployed within a few hours using modern web technologies.
