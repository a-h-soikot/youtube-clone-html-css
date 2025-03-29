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