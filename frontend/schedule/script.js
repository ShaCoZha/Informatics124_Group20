document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleFilters').addEventListener('click', function() {
        const filters = document.getElementById('filters');
        filters.style.display = (filters.style.display === 'none' || filters.style.display === '') ? 'block' : 'none';
        this.textContent = filters.style.display === 'block' ? 'Hide Filters' : 'Show Filters';
    });

    document.getElementById('addEventsButton').addEventListener('click', function() {
        const eventForm = document.getElementById('eventForm');
        eventForm.style.display = (eventForm.style.display === 'none' || eventForm.style.display === '') ? 'block' : 'none';
    });

    fetchAllCoursesData(); // Assuming this function is already defined to populate dropdowns
});

function addEvent() {
    const name = document.getElementById('eventName').value;
    const startTime = document.getElementById('eventStartTime').value;
    const endTime = document.getElementById('eventEndTime').value;
    const selectedDays = Array.from(document.querySelectorAll('.day.selected')).map(day => day.textContent.trim());
    const scheduleTable = document.querySelector('.schedule table');
    const color = getRandomColor();

    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
    const durationMinutes = endMinutes - startMinutes;
    
    selectedDays.forEach(day => {
        const dayIndex = getDayIndex(day);
        const startRow = Math.floor((startMinutes - 420) / 30); // Convert start time to row index, 420 minutes offset for 7:00 AM start
        const durationRows = Math.ceil(durationMinutes / 30); // Calculate the number of 30-min rows to span

        if (startRow >= 0 && startRow < scheduleTable.rows.length) {
            const cell = scheduleTable.rows[startRow].cells[dayIndex + 1]; // +1 to skip the time label column
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event-content');
            eventDiv.style.backgroundColor = color;
            eventDiv.style.height = `${durationRows * 50}px`; // Set height based on duration
            eventDiv.style.borderRadius = '8px'; // Rounded corners
            eventDiv.style.padding = '5px';
            eventDiv.style.position = 'absolute';
            eventDiv.style.width = '100%';
            eventDiv.innerHTML = `<strong>${name}</strong><br>${startTime}-${endTime}<span class="close-icon" onclick="removeEvent(this, '${color}')">&times;</span>`;

            // Clear any existing content and append new event
            cell.innerHTML = '';
            cell.appendChild(eventDiv);
            cell.style.position = 'relative';
            cell.style.padding = '0'; // Remove padding to fit event div properly
        }
    });
}



function removeEvent(closeIcon, color) {
    const eventCells = document.querySelectorAll('.event-cell');
    eventCells.forEach(cell => {
        const eventContent = cell.querySelector('.event-content');
        if (eventContent && eventContent.style.backgroundColor === color) {
            cell.innerHTML = ''; // Clear the cell
            cell.classList.remove('event-cell');
        }
    });
}


function getDayIndex(dayName) {
    // Map day names to their respective column indices
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return days.indexOf(dayName);
}

function getRandomColor() {
    const h = Math.floor(Math.random() * 360);
    const s = 70 + Math.floor(Math.random() * 30); // Keep saturation high
    const l = 50 + Math.floor(Math.random() * 10); // Keep lightness moderate to avoid too light colors
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function toggleDaySelection(element) {
    element.classList.toggle('selected');
    element.style.backgroundColor = element.classList.contains('selected') ? '#007bff' : '';
    element.style.color = element.classList.contains('selected') ? 'white' : '';
}

async function fetchAllCoursesData() {
    const response = await fetch('https://api.peterportal.org/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    allCourses {
                        id
                        title
                        department
                        terms
                        course_level
                        ge_list
                    }
                }
            `
        })
    });

    const data = await response.json();
    if (data && data.data && data.data.allCourses) {
        const courses = data.data.allCourses;
        const uniqueTerms = extractUnique(courses, 'terms');
        uniqueTerms.sort(sortTerms); // Sort terms based on custom logic
        populateDropdown('termDropdown', uniqueTerms);

        populateDropdown('departmentDropdown', extractUnique(courses, 'department'));

        const courseLevels = extractUnique(courses, 'course_level');
        courseLevels.sort(sortCourseLevels); // Sort course levels based on custom order
        populateDropdown('levelDropdown', courseLevels);

        const geItems = extractUnique(courses, 'ge_list');
        geItems.sort(sortGeList); // Sort GE list based on custom order
        populateDropdown('geDropdown', geItems);
    }
}

function extractUnique(courses, attribute) {
    const unique = courses.map(course => course[attribute])
                          .flat() // Flatten in case of arrays like terms
                          .filter((value, index, self) => self.indexOf(value) === index && value);
    return unique.map(item => ({ id: item, name: item }));
}

function sortTerms(a, b) {
    // Custom sort function for terms
    const termRegex = /(\d{4}) (Summer10wk|Summer2|Summer1|Spring|Winter|Fall)/;
    const matchA = a.name.match(termRegex);
    const matchB = b.name.match(termRegex);
    if (matchA && matchB) {
        const yearDiff = parseInt(matchB[1]) - parseInt(matchA[1]);
        if (yearDiff !== 0) return yearDiff; // Different years

        // Order for terms within the same year
        const termOrder = ['Fall','Summer2', 'Summer10wk' , 'Summer1', 'Spring', 'Winter'];
        return termOrder.indexOf(matchA[2]) - termOrder.indexOf(matchB[2]);
    }
    return 0; // In case of no matches (unlikely), consider equal
}

function sortCourseLevels(a, b) {
    const order = [
        "Lower Division (1-99)",
        "Upper Division (100-199)",
        "Graduate/Professional Only (200+)"
    ];
    return order.indexOf(a.name) - order.indexOf(b.name);
}

function sortGeList(a, b) {
    // Predefined order for GE categories
    const order = [
        "GE Ia: Lower Division Writing",
        "GE Ib: Upper Division Writing",
        "GE II: Science and Technology",
        "GE III: Social & Behavioral Sciences",
        "GE IV: Arts and Humanities",
        "GE Va: Quantitative Literacy",
        "GE Vb: Formal Reasoning",
        "GE VI: Language Other Than English",
        "GE VII: Multicultural Studies",
        "GE VIII: International/Global Issues"
    ];
    return order.indexOf(a.name) - order.indexOf(b.name);
}

function populateDropdown(dropdownId, items) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; // Clear existing options
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}