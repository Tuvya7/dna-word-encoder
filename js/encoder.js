/* ============================================
   DNA Word Encoder - Encoder Logic
   Beautiful loading, encoding, visualization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initEncoder();
    initLoadingScreen();
});

// ============================================
// DNA Encoding Mapping
// ============================================

const DNA_MAP = {
    '00': 'A',
    '01': 'C',
    '10': 'G',
    '11': 'T'
};

const DNA_REVERSE = {
    'A': '00',
    'C': '01',
    'G': '10',
    'T': '11'
};

const COMPLEMENT = {
    'A': 'T',
    'T': 'A',
    'C': 'G',
    'G': 'C'
};

const BASE_COLORS = {
    'A': 'base-a',
    'T': 'base-t',
    'C': 'base-c',
    'G': 'base-g'
};

// ============================================
// Initialize Loading Screen
// ============================================

function initLoadingScreen() {
    const helixContainer = document.getElementById('helixContainer');
    const particlesContainer = document.getElementById('loadingParticles');
    
    if (!helixContainer) return;
    
    // Create 3D DNA helix rungs with proper sine wave positioning
    const bases = ['A', 'T', 'C', 'G'];
    const numRungs = 14;
    
    for (let i = 0; i < numRungs; i++) {
        const rung = document.createElement('div');
        rung.className = 'helix-rung';
        
        // Calculate position along helix
        const progress = i / numRungs;
        const yPos = progress * 280; // Vertical position
        const phase = progress * Math.PI * 3; // 1.5 full rotations
        
        rung.style.top = `${yPos}px`;
        rung.style.animationDelay = `${-i * 0.15}s`;
        
        // Pick complementary base pairs
        const leftBase = bases[i % 4];
        const rightBase = COMPLEMENT[leftBase];
        
        rung.innerHTML = `
            <div class="helix-nucleotide left" data-base="${leftBase}">${leftBase}</div>
            <div class="helix-connector"></div>
            <div class="helix-nucleotide right" data-base="${rightBase}">${rightBase}</div>
        `;
        
        helixContainer.appendChild(rung);
    }
    
    // Create subtle floating particles
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = bases[Math.floor(Math.random() * 4)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${18 + Math.random() * 12}s`;
            particle.style.fontSize = `${0.8 + Math.random() * 0.4}rem`;
            particlesContainer.appendChild(particle);
        }
    }
}

// ============================================
// Main Encoder Initialization
// ============================================

function initEncoder() {
    const encodeModeBtn = document.getElementById('encodeModeBtn');
    const decodeModeBtn = document.getElementById('decodeModeBtn');
    const encodeInput = document.getElementById('encodeInput');
    const decodeInput = document.getElementById('decodeInput');
    const inputSection = document.getElementById('inputSection');
    const textInput = document.getElementById('textInput');
    const dnaInput = document.getElementById('dnaInput');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const charCount = document.getElementById('charCount');
    const dnaCharCount = document.getElementById('dnaCharCount');
    const resultsSection = document.getElementById('resultsSection');
    const encodeResults = document.getElementById('encodeResults');
    const decodeResults = document.getElementById('decodeResults');
    const resetBtn = document.getElementById('resetBtn');
    const encodedSource = document.getElementById('encodedSource');
    const encodedSourceText = document.getElementById('encodedSourceText');
    
    if (!encodeModeBtn) return;
    
    let currentMode = 'encode';
    
    // Mode Toggle
    encodeModeBtn.addEventListener('click', () => switchMode('encode'));
    decodeModeBtn.addEventListener('click', () => switchMode('decode'));
    
    function switchMode(mode) {
        currentMode = mode;
        
        if (mode === 'encode') {
            encodeModeBtn.classList.add('active');
            decodeModeBtn.classList.remove('active');
            encodeInput.classList.remove('hidden');
            decodeInput.classList.add('hidden');
        } else {
            decodeModeBtn.classList.add('active');
            encodeModeBtn.classList.remove('active');
            decodeInput.classList.remove('hidden');
            encodeInput.classList.add('hidden');
        }
        
        // Show input, hide results
        inputSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
    }
    
    // Character Count
    textInput.addEventListener('input', () => {
        charCount.textContent = textInput.value.length;
    });
    
    dnaInput.addEventListener('input', () => {
        dnaInput.value = dnaInput.value.toUpperCase().replace(/[^ACGT]/g, '');
        dnaCharCount.textContent = dnaInput.value.length;
    });
    
    // Encode Button
    encodeBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            window.DNAUtils.showToast('Please enter some text to encode');
            return;
        }
        
        showLoading('Encoding your message', 'Converting text to biological data', () => {
            const result = encodeText(text);
            displayEncodeResults(result, text);
        });
    });
    
    // Decode Button
    decodeBtn.addEventListener('click', () => {
        const dna = dnaInput.value.trim();
        if (!dna) {
            window.DNAUtils.showToast('Please enter a DNA sequence to decode');
            return;
        }
        
        if (dna.length % 4 !== 0) {
            window.DNAUtils.showToast('DNA sequence length must be a multiple of 4');
            return;
        }
        
        showLoading('Decoding DNA sequence', 'Translating biological data to text', () => {
            const result = decodeDNA(dna);
            displayDecodeResults(result, dna);
        });
    });
    
    // Reset Button
    resetBtn.addEventListener('click', () => {
        textInput.value = '';
        dnaInput.value = '';
        charCount.textContent = '0';
        dnaCharCount.textContent = '0';
        resultsSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        textInput.focus();
    });
    
    // Copy Buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const text = targetEl.textContent;
                const success = await window.DNAUtils.copyToClipboard(text);
                window.DNAUtils.showToast(success ? 'Copied!' : 'Failed to copy');
            }
        });
    });
}

// ============================================
// Encoding Functions
// ============================================

function encodeText(text) {
    let binary = '';
    for (let char of text) {
        const charCode = char.charCodeAt(0);
        const bin = charCode.toString(2).padStart(8, '0');
        binary += bin;
    }
    
    let dna = '';
    for (let i = 0; i < binary.length; i += 2) {
        const pair = binary.substring(i, i + 2);
        dna += DNA_MAP[pair];
    }
    
    let complement = '';
    for (let base of dna) {
        complement += COMPLEMENT[base];
    }
    
    return { text, binary, dna, complement };
}

function decodeDNA(dna) {
    let binary = '';
    for (let base of dna) {
        binary += DNA_REVERSE[base];
    }
    
    let text = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substring(i, i + 8);
        if (byte.length === 8) {
            const charCode = parseInt(byte, 2);
            text += String.fromCharCode(charCode);
        }
    }
    
    return { dna, binary, text };
}

// ============================================
// Display Results
// ============================================

function displayEncodeResults(result, originalText) {
    const resultsSection = document.getElementById('resultsSection');
    const inputSection = document.getElementById('inputSection');
    const encodeResults = document.getElementById('encodeResults');
    const decodeResults = document.getElementById('decodeResults');
    const binaryOutput = document.getElementById('binaryOutput');
    const dnaOutput = document.getElementById('dnaOutput');
    const doubleHelix = document.getElementById('doubleHelix');
    const encodedSource = document.getElementById('encodedSource');
    const encodedSourceText = document.getElementById('encodedSourceText');
    
    // Hide input, show results
    inputSection.classList.add('hidden');
    encodeResults.classList.remove('hidden');
    decodeResults.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Show what was encoded
    encodedSource.style.display = 'block';
    encodedSourceText.textContent = `"${originalText}"`;
    
    // Format binary
    const formattedBinary = result.binary.match(/.{1,8}/g).join(' ');
    binaryOutput.textContent = formattedBinary;
    
    // Display DNA with colored bases
    dnaOutput.innerHTML = '';
    result.dna.split('').forEach((base, i) => {
        const span = document.createElement('span');
        span.className = `base ${BASE_COLORS[base]}`;
        span.textContent = base;
        span.style.animationDelay = `${i * 0.02}s`;
        dnaOutput.appendChild(span);
    });
    
    // Build double helix
    buildDoubleHelix(result.dna, result.complement);
    
    // Scroll to top of results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function displayDecodeResults(result, originalDNA) {
    const resultsSection = document.getElementById('resultsSection');
    const inputSection = document.getElementById('inputSection');
    const encodeResults = document.getElementById('encodeResults');
    const decodeResults = document.getElementById('decodeResults');
    const textOutput = document.getElementById('textOutput');
    const decodedBinaryOutput = document.getElementById('decodedBinaryOutput');
    const encodedSource = document.getElementById('encodedSource');
    const encodedSourceText = document.getElementById('encodedSourceText');
    
    // Hide input, show results
    inputSection.classList.add('hidden');
    decodeResults.classList.remove('hidden');
    encodeResults.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Show what was decoded
    encodedSource.style.display = 'block';
    encodedSourceText.textContent = originalDNA.length > 20 
        ? `${originalDNA.substring(0, 20)}...` 
        : originalDNA;
    document.querySelector('.encoded-source-label').textContent = 'You decoded';
    
    // Display decoded text
    textOutput.textContent = result.text;
    
    // Format binary
    const formattedBinary = result.binary.match(/.{1,8}/g).join(' ');
    decodedBinaryOutput.textContent = formattedBinary;
    
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function buildDoubleHelix(primary, complement) {
    const container = document.getElementById('doubleHelix');
    container.innerHTML = '';
    
    for (let i = 0; i < primary.length; i++) {
        const primaryBase = primary[i];
        const complementBase = complement[i];
        
        const pair = document.createElement('div');
        pair.className = 'helix-pair';
        pair.style.animationDelay = `${i * 0.05}s`;
        
        pair.innerHTML = `
            <span class="helix-index">${i + 1}</span>
            <span class="helix-base primary ${BASE_COLORS[primaryBase]}">${primaryBase}</span>
            <span class="helix-bond"></span>
            <span class="helix-base complement ${BASE_COLORS[complementBase]}">${complementBase}</span>
            <span class="helix-index">${i + 1}</span>
        `;
        
        container.appendChild(pair);
    }
}

// ============================================
// Beautiful Loading Screen
// ============================================

function showLoading(title, subtitle, callback) {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingTitle = document.getElementById('loadingTitle');
    const progressBar = document.getElementById('progressBar');
    
    // Update text
    loadingTitle.textContent = title;
    const subtitleEl = loadingScreen.querySelector('.loading-subtitle');
    if (subtitleEl) subtitleEl.textContent = subtitle;
    
    // Reset and show
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
    loadingScreen.classList.add('active');
    
    // Force reflow
    progressBar.offsetHeight;
    
    // Animate progress bar over 8 seconds
    progressBar.style.transition = 'width 8s cubic-bezier(0.1, 0.05, 0.1, 1)';
    
    requestAnimationFrame(() => {
        progressBar.style.width = '100%';
    });
    
    // Complete after 8 seconds
    setTimeout(() => {
        if (callback) callback();
        
        // Fade out
        setTimeout(() => {
            loadingScreen.classList.remove('active');
        }, 200);
    }, 8000);
}

// ============================================
// Export
// ============================================

window.DNAEncoder = {
    encode: encodeText,
    decode: decodeDNA,
    DNA_MAP,
    COMPLEMENT
};
