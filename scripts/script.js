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
        body.style.paddingLeft = '240px'; // Extra padding for expanded sidebar
    } else {
        body.style.paddingLeft = '90px'; // Default padding for collapsed sidebar
    }
});