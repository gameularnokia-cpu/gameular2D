// ============================================
// SNAKE GAME - JavaScript
// ============================================

// Canvas & Context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// UI Elements
const menu = document.getElementById('menu');
const gameArea = document.getElementById('game-area');
const gameOverOverlay = document.getElementById('game-over-overlay');
const currentScoreEl = document.getElementById('current-score');
const highScoreEl = document.getElementById('high-score');
const menuHighScoreEl = document.getElementById('menu-high-score');
const finalScoreEl = document.getElementById('final-score');
const finalHighScoreEl = document.getElementById('final-high-score');

// Game State
let snake = [];
let direction = {x: 0, y: 0};
let nextDirection = {x: 0, y: 0};
let food = [];
let obstacles = [];
let score = 0;
let highScore = 0;
let gameRunning = false;
let gameLoop;
let level = 1;
let speed = 150;
let isPaused = false;

// Grid Settings
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreEl.textContent = highScore;
        menuHighScoreEl.textContent = highScore;
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial draw
    draw();
}

function setupEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch controls
    document.getElementById('btn-up').addEventListener('click', () => changeDirection(0, -1));
    document.getElementById('btn-down').addEventListener('click', () => changeDirection(0, 1));
    document.getElementById('btn-left').addEventListener('click', () => changeDirection(-1, 0));
    document.getElementById('btn-right').addEventListener('click', () => changeDirection(1, 0));
    
    // Prevent default touch behavior
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.click();
        });
    });
}

// ============================================
// GAME CONTROL FUNCTIONS
// ============================================

function startGame(selected
