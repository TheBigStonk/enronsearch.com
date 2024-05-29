// Add a click event listener to the button on DOM Load
window.addEventListener("DOMContentLoaded", (event) => {
    const queryButton = document.getElementById('queryButton');

    queryButton.addEventListener('click', function () {
        handleQueryPress();
    });
});

// No need to wait DOM Load to to check a keydown EL
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleQueryPress();
    }
});

function handleQueryPress() {
    // Remove the results window if it already exists
    const resultsWindow = document.getElementById('resultsWindow');
    if (resultsWindow) {
        resultsWindow.remove();
    }

    // Get query value from DOM and parse to fetchQuery function
    searchQuery = document.getElementById('searchQuery').value;
    fetchQuery(searchQuery).then(response => {
        alert(JSON.stringify(response));
    }).catch(error => {
        console.error('Error fetching query:', error);
        alert('Error fetching query');
    });
}

// Main function to query the server
async function fetchQuery(searchQuery) {
    try {
        const response = await fetch(`https://localhost:7151/EmailSearch?searchQuery=${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch query failed', error);
        return { error: 'Fetch query failed' };
    }
}