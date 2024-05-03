document.addEventListener("DOMContentLoaded", function() {
    const pathPrefix = determinePath();
    // Adjust the path to point to the new location of the HTML components
    loadComponent(pathPrefix + "global_styles/navbar.html", "navbar");
    loadComponent(pathPrefix + "global_styles/footer.html", "footer");
});

function determinePath() {
    const location = window.location.pathname;
    const directoriesNeedingAdjustment = ['/feedback/', '/about/', '/home/', '/login/', '/profile/', '/profile_change/', '/register/', '/chatroom/'];

    // Check if the current location includes any of the specified directories
    if (directoriesNeedingAdjustment.some(dir => location.includes(dir))) {
        return '../../'; // Adjusting because the depth has increased
    } else {
        return './'; // No change needed for root or same level directory access
    }
}

function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Failed to load the component:', error);
        });
}
