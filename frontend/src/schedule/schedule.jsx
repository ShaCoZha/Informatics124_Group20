import React, { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Schedule = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [eventFormVisible, setEventFormVisible] = useState(false);

  useEffect(() => {
    fetchAllCoursesData();
  }, []);

  const fetchAllCoursesData = async () => {
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
      setCoursesData(courses);
      const uniqueTerms = extractUnique(courses, 'terms');
      uniqueTerms.sort(sortTerms); 
      populateDropdown('termDropdown', uniqueTerms);

      populateDropdown('departmentDropdown', extractUnique(courses, 'department'));

      const courseLevels = extractUnique(courses, 'course_level');
      courseLevels.sort(sortCourseLevels); 
      populateDropdown('levelDropdown', courseLevels);

      const geItems = extractUnique(courses, 'ge_list');
      geItems.sort(sortGeList); 
      populateDropdown('geDropdown', geItems);
    }
  }

  const handleDrag = (e) => {
    // Drag handler implementation
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
    setEventFormVisible(false);
  };

  const toggleEventForm = () => {
    setEventFormVisible(!eventFormVisible);
    setFiltersVisible(false);
  };

  const addEvent = () => {
        const name = document.getElementById('eventName').value;
        const startTime = document.getElementById('eventStartTime').value;
        const endTime = document.getElementById('eventEndTime').value;
        const selectedDays = Array.from(document.querySelectorAll(`.${styles.day}.${styles.selected}`)).map(day => day.textContent.trim());
        const scheduleTable = document.querySelector(`.${styles.schedule} table`);
        const color = getRandomColor();

        const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
        const durationMinutes = endMinutes - startMinutes;
        
        selectedDays.forEach(day => {
            const dayIndex = getDayIndex(day);
            const startRow = Math.floor((startMinutes - 390) / 30);
            const durationRows = Math.ceil(durationMinutes / 60);

            if (startRow >= 0 && startRow < scheduleTable.rows.length) {
                const cell = scheduleTable.rows[startRow].cells[dayIndex + 1];
                const eventDiv = document.createElement('div');
                eventDiv.classList.add(styles.eventContent);
                eventDiv.style.backgroundColor = color;
                eventDiv.style.height = `${durationRows * 50}px`;
                eventDiv.style.borderRadius = '8px';
                eventDiv.style.padding = '5px';
                eventDiv.style.position = 'absolute';
                eventDiv.style.width = '100%';
                eventDiv.innerHTML = `<strong>${name}</strong><br>${startTime}-${endTime}<span class="${styles.closeIcon}" onClick={() => removeEvent(eventDiv)}>&times;</span>`;

                cell.innerHTML = '';
                cell.appendChild(eventDiv);
                cell.style.position = 'relative';
                cell.style.padding = '0';
            }
        });
    };

  const extractUnique = (courses, attribute) => {
    const unique = courses.map(course => course[attribute])
                          .flat()
                          .filter((value, index, self) => self.indexOf(value) === index && value);
    return unique.map(item => ({ id: item, name: item }));
  };

  const sortTerms = (a, b) => {
    // Custom sort function for terms
    const termRegex = /(\d{4}) (Summer10wk|Summer2|Summer1|Spring|Winter|Fall)/;
    const matchA = a.name.match(termRegex);
    const matchB = b.name.match(termRegex);
    if (matchA && matchB) {
      const yearDiff = parseInt(matchB[1]) - parseInt(matchA[1]);
      if (yearDiff !== 0) return yearDiff; 

      const termOrder = ['Fall', 'Summer2', 'Summer10wk', 'Summer1', 'Spring', 'Winter'];
      return termOrder.indexOf(matchA[2]) - termOrder.indexOf(matchB[2]);
    }
    return 0; 
  };

  const sortCourseLevels = (a, b) => {
    const order = [
      "Lower Division (1-99)",
      "Upper Division (100-199)",
      "Graduate/Professional Only (200+)"
    ];
    return order.indexOf(a.name) - order.indexOf(b.name);
  };

  const sortGeList = (a, b) => {
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
  };

  const populateDropdown = (dropdownId, items) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';
    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      dropdown.appendChild(option);
    });
  };

  return (
    <body className={styles.ScheduleBody}>
        <Header></Header>
        <div className={styles.container}>
        <div className={styles.schedule}>
            <table>
            <thead>
                <tr>
                <th></th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 29 }).map((_, index) => (
                                    <tr key={index}>
                                        <td>{7 + Math.floor(index / 2)}:{index % 2 === 0 ? '00' : '30'}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
            </tbody>
            </table>
        </div>
        <div className={styles.resizer} onMouseDown={handleDrag}></div>
        <div className={styles['class-search']}>
            <div className={styles['button-container']}>
            <button onClick={toggleFilters}>Search</button>
            <button>Added</button>
            <button onClick={toggleEventForm}>Custom</button>
            </div>
            {filtersVisible && (
                <div id="filters">
                    <div className={styles.filterItem}>
                        <label htmlFor="termDropdown">Term</label>
                        <select id="termDropdown"></select>
                    </div>
                    <div className={styles.filterItem}>
                        <label htmlFor="departmentDropdown">Department</label>
                        <select id="departmentDropdown"></select>
                    </div>
                    <div className={styles.filterItem}>
                        <label htmlFor="levelDropdown">Course Level</label>
                        <select id="levelDropdown"></select>
                    </div>
                    <div className={styles.filterItem}>
                        <label htmlFor="geDropdown">General Education</label>
                        <select id="geDropdown"></select>
                    </div>
                    <button id="searchCourses">Search Courses</button>
                </div>
            )}
                
            {eventFormVisible && (
                <div id="eventForm">
                    <div>
                        <label htmlFor="eventName">Event Name</label>
                        <input type="text" id="eventName" placeholder="Event Name" />
                    </div>
                    <div>
                        <label htmlFor="eventStartTime">Start Time</label>
                        <input type="time" id="eventStartTime" />
                    </div>
                    <div>
                        <label htmlFor="eventEndTime">End Time</label>
                        <input type="time" id="eventEndTime" />
                    </div>
                    <div>
                        <label>Select Days</label>
                        <div className={styles.daysContainer}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                <div
                                    key={day}
                                    className={styles.day}
                                    onClick={(e) => {
                                        e.target.classList.toggle(styles.selected);
                                        toggleDaySelection(e.target);
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={addEvent}>Add Event</button>
                </div>
                )}

        </div>
        </div>
        <Footer></Footer>
    </body>
  );
};

export default Schedule;
