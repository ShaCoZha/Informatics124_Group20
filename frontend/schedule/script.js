document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleFilters').addEventListener('click', function() {
        const filters = document.getElementById('filters');
        filters.style.display = (filters.style.display === 'none' || filters.style.display === '') ? 'block' : 'none';
        this.textContent = filters.style.display === 'block' ? 'Hide Filters' : 'Show Filters';
    });
    fetchAllCoursesData(); // Assuming this function is already defined to populate dropdowns
});


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

