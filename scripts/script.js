function performSearch() {
    const searchText = document.getElementById('search-bar').value;
    if (searchText.trim() !== '') {
        const encodedSearchText = encodeURIComponent(searchText);
        window.location.href = `https://www.youtube.com/results?search_query=${encodedSearchText}`;
    }
}

document.getElementById('search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});


function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
   
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-toggle-icon');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeIcon.textContent = '☀️'; 
        themeIcon.style.filter = 'none';
    } else {
        themeIcon.textContent = '🌙';
        themeIcon.style.filter = 'none';
    }
}

// Set theme on page load based on localStorage or system preference
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    updateThemeIcon();
    
    // Set initial padding based on sidebar state
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('expanded')) {
        document.body.style.paddingLeft = '240px';
    } else {
        document.body.style.paddingLeft = '90px';
    }
});

document.querySelector('.menu-button').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('expanded');
    
    // Adjust body padding based on sidebar state
    const body = document.body;
    if (sidebar.classList.contains('expanded')) {
        body.style.paddingLeft = '240px'; // Padding for expanded sidebar
    } else {
        body.style.paddingLeft = '90px'; // Default padding for collapsed sidebar
    }
});

// Handle voice search
document.querySelector('.voice-search-button').addEventListener('click', function() {
    const modal = document.getElementById('voice-search-modal');
    const transcript = document.getElementById('voice-transcript');
    modal.classList.add('active');
    transcript.textContent = "Speak now...";

    // Start voice recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        // Configure recognition
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onspeechend = function() {
            recognition.stop();
        };

        // Handle both interim and final results
        recognition.onresult = function(event) {
            // Get real-time speech results
            const currentTranscript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
                
            // Display the transcription
            transcript.textContent = currentTranscript || "Speak now...";
            
            // Check if the result is final
            const isFinal = event.results[0].isFinal;
            
            if (isFinal) {
                // Perform search with the recognized text
                console.log('Final transcript:', currentTranscript);
                const encodedSearchText = encodeURIComponent(currentTranscript);
                window.location.href = `https://www.youtube.com/results?search_query=${encodedSearchText}`;
            }
        };

        recognition.onerror = function(event) {
            transcript.textContent = "Error: " + event.error;
        };

        // Start recognition
        recognition.start();
        window.recognitionInstance = recognition;
    } else {
        alert('This browser does not support voice recognition.');
    }
});

// Close button
document.getElementById('close-voice-search').addEventListener('click', function() {
    const modal = document.getElementById('voice-search-modal');
    modal.classList.remove('active');
    
    // Stop voice recognition if active
    if (window.recognitionInstance) {
        window.recognitionInstance.stop();
    }
});