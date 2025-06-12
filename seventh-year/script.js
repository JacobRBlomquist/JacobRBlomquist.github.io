class AnniversaryWebsite {
    constructor() {
        this.currentSeason = 'spring';
        this.unlockedSeasons = new Set(['spring']);
        this.seasonData = {
            spring: {
                title: "Spring - First Met and Courting",
                question: "Where did we first meet?",
                options: [
                    "At the mission office, and I annoyed you.",
                    "At the Auburn Stake Center",
                    "At Zone Conference",
                    "At President's House"
                ],
                correctAnswer: 0
            },
            summer: {
                title: "Summer - Engagement and Long Distance",
                question: "What kept us strong during our long-distance period before marriage?",
                options: [
                    "Daily video calls",
                    "Planning our future together and shared dreams",
                    "All of the above - our love conquered the miles"
                ],
                correctAnswer: 2
            },
            fall: {
                title: "Fall - Kids and Schooling",
                question: "What has been the most rewarding part of growing our family and pursuing education?",
                options: [
                    "Watching each other become amazing parents",
                    "Providing more for our family than we had growing up",
                    "Creating new traditions as our family grew",
                    "All of these beautiful moments combined"
                ],
                correctAnswer: 3
            },
            winter: {
                title: "Winter - Fun Times and Growing Together",
                question: "What makes our relationship stronger with each passing year?",
                options: [
                    "Sharing precious moments together",
                    "Growing in respect, love and care for each other",
                    "Spending quality time together and with our kids",
                    "All of the above - we're growing stronger every day"
                ],
                correctAnswer: 3
            }
        };

        this.init();
        this.loadProgressFromStorage();
    }

    init() {
        this.bindEvents();
        this.updateSeasonIcons();
        this.showSeason(this.currentSeason);
    }

    bindEvents() {
        // Season navigation
        document.querySelectorAll('.season-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const season = e.currentTarget.dataset.season;
                if (this.unlockedSeasons.has(season)) {
                    this.showSeason(season);
                }
            });
        });

        // Garden click to trigger quiz
        document.getElementById('garden-display').addEventListener('click', () => {
            this.showQuiz(this.currentSeason);
        });

        // Modal close on overlay click
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideModal();
            }
        });
    }

    showSeason(season) {
        // Hide all seasons
        document.querySelectorAll('.garden-scene').forEach(scene => {
            scene.classList.remove('active');
        });

        console.log(season)

        // Show selected season
        const selectedScenes = document.querySelectorAll(`[data-season="${season}"]`);
        console.log(selectedScenes)
        if (selectedScenes) {
            for (let scene of selectedScenes) {
                console.log(scene)
                scene.classList.add('active');
                scene.classList.add('season-transition');

                // Remove transition class after animation
                setTimeout(() => {
                    scene.classList.remove('season-transition');
                }, 1000);
            }
        }

        this.currentSeason = season;
        this.updateSeasonIcons();

        // Update click hint
        const clickHint = document.querySelector('.click-hint p');
        if (this.hasCompletedSeason(season)) {
            clickHint.textContent = 'Click to revisit this memory';
        } else {
            clickHint.textContent = 'Click on the garden to unlock this season';
        }
    }

    updateSeasonIcons() {
        document.querySelectorAll('.season-icon').forEach(icon => {
            const season = icon.dataset.season;

            // Remove existing classes
            icon.classList.remove('active', 'locked');

            if (season === this.currentSeason) {
                icon.classList.add('active');
            } else if (!this.unlockedSeasons.has(season)) {
                icon.classList.add('locked');
            }
        });
    }

    showQuiz(season) {
        const seasonInfo = this.seasonData[season];
        if (!seasonInfo) return;

        // Set up modal content
        document.getElementById('modal-season-title').textContent = seasonInfo.title;
        document.getElementById('quiz-question').textContent = seasonInfo.question;

        // Clear previous options and feedback
        const optionsContainer = document.getElementById('quiz-options');
        const feedbackContainer = document.getElementById('quiz-feedback');
        optionsContainer.innerHTML = '';
        feedbackContainer.innerHTML = '';
        feedbackContainer.className = 'quiz-feedback';

        // Create options
        seasonInfo.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.handleAnswer(index, seasonInfo.correctAnswer, season));
            optionsContainer.appendChild(optionElement);
        });

        // Show modal
        document.getElementById('modal-overlay').classList.add('active');
    }

    handleAnswer(selectedIndex, correctIndex, season) {
        const options = document.querySelectorAll('.quiz-option');
        const feedbackContainer = document.getElementById('quiz-feedback');

        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        if (selectedIndex === correctIndex) {
            // Correct answer
            options[selectedIndex].classList.add('correct');
            feedbackContainer.textContent = 'Perfect! 💕';
            feedbackContainer.classList.add('success');

            // Mark season as completed and unlock next
            this.completeSeason(season);

            setTimeout(() => {
                this.hideModal();
                this.showSeasonContent(season);
            }, 1500);
        } else {
            // Wrong answer
            options[selectedIndex].classList.add('incorrect');
            feedbackContainer.textContent = 'Try again! Think about our beautiful memories together 💭';
            feedbackContainer.classList.add('error');

            // Re-enable options after a delay
            setTimeout(() => {
                options.forEach(option => {
                    option.style.pointerEvents = 'auto';
                    option.classList.remove('incorrect');
                });
                feedbackContainer.innerHTML = '';
                feedbackContainer.className = 'quiz-feedback';
            }, 2000);
        }
    }

    completeSeason(season) {
        // Add to completed seasons
        this.setSeasonCompleted(season);

        // Unlock next season
        const seasons = ['spring', 'summer', 'fall', 'winter'];
        const currentIndex = seasons.indexOf(season);
        if (currentIndex < seasons.length - 1) {
            const nextSeason = seasons[currentIndex + 1];
            this.unlockedSeasons.add(nextSeason);
        }

        this.saveProgressToStorage();
    }

    showSeasonContent(season) {
        const seasonScene = document.querySelector(`.garden-scene[data-season="${season}"]`);
        console.log('Season scene found:', seasonScene);
        if (seasonScene) {
            const content = seasonScene.querySelector('.season-content');
            console.log('Season content found:', content);
            if (content) {
                content.classList.remove('hidden');
                console.log('Poem should now be visible for:', season);

                // Hide content after 8 seconds to let them enjoy the poem
                setTimeout(() => {
                    content.classList.add('hidden');
                    console.log('Poem hidden after 12 seconds');
                }, 12000);
            }
        }

        this.updateSeasonIcons();
    }

    hideModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    hasCompletedSeason(season) {
        return localStorage.getItem(`completed_${season}`) === 'true';
    }

    setSeasonCompleted(season) {
        localStorage.setItem(`completed_${season}`, 'true');
    }

    saveProgressToStorage() {
        localStorage.setItem('unlockedSeasons', JSON.stringify([...this.unlockedSeasons]));
        localStorage.setItem('currentSeason', this.currentSeason);
    }

    loadProgressFromStorage() {
        // Load unlocked seasons
        const savedUnlocked = localStorage.getItem('unlockedSeasons');
        if (savedUnlocked) {
            this.unlockedSeasons = new Set(JSON.parse(savedUnlocked));
        }

        // Load current season
        const savedCurrent = localStorage.getItem('currentSeason');
        if (savedCurrent && this.unlockedSeasons.has(savedCurrent)) {
            this.currentSeason = savedCurrent;
        }

        this.updateSeasonIcons();
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnniversaryWebsite();
});

// Add some romantic Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code for a special message
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (!window.konamiProgress) window.konamiProgress = 0;

    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            alert('🎉 Seven years and still discovering new things about each other! 💕');
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});

// Add heart animation on double-click
document.addEventListener('dblclick', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';

    document.body.appendChild(heart);

    setTimeout(() => {
        document.body.removeChild(heart);
    }, 2000);
});

// Add the float up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);