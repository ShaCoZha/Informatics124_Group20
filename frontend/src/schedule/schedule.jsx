import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import styles from './schedule.module.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import ScreenshotIcon from './screenshot_icon.svg';

const Schedule = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [addedVisible, setAddedVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courseLevels, setCourseLevels] = useState([]);
  const [geList, setGeList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidthLeft, setStartWidthLeft] = useState(0);
  const [startWidthRight, setStartWidthRight] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const scheduleRef = useRef(null);
  const boxHeight = 20; // Height of each box in pixels

  useEffect(() => {
    fetchAllCoursesData();
    window.addEventListener('resize', updateBoxSizes);
    return () => window.removeEventListener('resize', updateBoxSizes);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const newLeftWidth = startWidthLeft + e.clientX - startX;
        const newRightWidth = startWidthRight - (e.clientX - startX);

        if (newLeftWidth > 200 && newRightWidth > 200) {
          document.querySelector(`.${styles.schedule}`).style.width = newLeftWidth + 'px';
          document.querySelector(`.${styles.classSearch}`).style.width = newRightWidth + 'px';
          updateBoxSizes();
        }
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
    };

    if (resizing) {
      document.documentElement.addEventListener('mousemove', handleMouseMove);
      document.documentElement.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.documentElement.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, startX, startWidthLeft, startWidthRight]);

  const updateBoxSizes = () => {
    const scheduleTable = document.querySelector(`.${styles.schedule} table`);
    const rows = scheduleTable.rows;

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      for (let j = 1; j < cells.length; j++) { // Skip the first cell as it is the time label
        const cell = cells[j];
        const eventDiv = cell.querySelector(`.${styles.eventContent}`);
        if (eventDiv) {
          eventDiv.style.width = `${cell.clientWidth}px`;
        }
      }
    }
  };

  const toggleVisibility = (setVisible) => {
    setVisible((prev) => !prev);
  };

  const addEvent = () => {
    const name = document.getElementById('eventName').value;
    const startTime = document.getElementById('eventStartTime').value;
    const endTime = document.getElementById('eventEndTime').value;
    const selectedDays = Array.from(document.querySelectorAll(`.${styles.day}.${styles.selected}`)).map(day => day.textContent.trim());
    const scheduleTable = document.querySelector(`.${styles.schedule} table`);
    const color = getRandomColor();

    selectedDays.forEach(day => {
      const dayIndex = getDayIndex(day);
      const startRow = getTimeRowIndex(startTime);
      const endRow = getTimeRowIndex(endTime);
      const durationRows = endRow - startRow;

      if (startRow >= 0 && startRow < scheduleTable.rows.length) {
        const cell = scheduleTable.rows[startRow + 1].cells[dayIndex + 1]; // +1 to skip the time label column
        const eventDiv = document.createElement('div');
        eventDiv.classList.add(styles.eventContent);
        eventDiv.style.backgroundColor = color;
        eventDiv.style.height = `${calculateHeightInPx(startTime, endTime)}px`; // Set height based on duration
        eventDiv.style.borderRadius = '8px'; // Rounded corners
        eventDiv.style.padding = '5px';
        eventDiv.style.position = 'absolute';
        eventDiv.style.width = `${cell.clientWidth}px`; // Set width based on the cell width
        eventDiv.innerHTML = `<strong>${name}</strong>${startTime} - ${endTime}`;

        // Clear any existing content and append new event
        cell.innerHTML = '';
        cell.appendChild(eventDiv);
        cell.style.position = 'relative';
        cell.style.padding = '0'; // Remove padding to fit event div properly

        // Update the event in the state
        setEvents((prevEvents) => {
          const existingEventIndex = prevEvents.findIndex(event => event.name === name);
          if (existingEventIndex !== -1) {
            prevEvents[existingEventIndex].elements.push(eventDiv);
            return [...prevEvents];
          } else {
            return [
              ...prevEvents,
              { name, startTime, endTime, days: selectedDays, color, elements: [eventDiv] }
            ];
          }
        });
      }
    });
  };

  const calculateHeightInPx = (start, end) => {
    const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
    return (endMinutes - startMinutes) / 30 * (boxHeight + 3);
  };

  const removeEvent = (eventToRemove) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event !== eventToRemove);
      eventToRemove.elements.forEach(element => element.remove()); // Remove all event rectangles
      return updatedEvents;
    });
  };

  const getDayIndex = (dayName) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return days.indexOf(dayName);
  };

  const getTimeRowIndex = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 7) * 2 + (minutes === 30 ? 1 : 0);
  };

  const calculateDuration = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    return (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  };

  const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    const s = 70 + Math.floor(Math.random() * 30); // Keep saturation high
    const l = 50 + Math.floor(Math.random() * 10); // Keep lightness moderate to avoid too light colors
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

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
      const uniqueTerms = extractUnique(courses, 'terms').sort(sortTerms);
      setCourses(courses);
      setTerms(uniqueTerms);
      setDepartments(extractUnique(courses, 'department'));
      setCourseLevels(extractUnique(courses, 'course_level').sort(sortCourseLevels));
      setGeList(extractUnique(courses, 'ge_list').sort(sortGeList));
    }
  };

  const extractUnique = (courses, attribute) => {
    const unique = courses.map(course => course[attribute])
      .flat() // Flatten in case of arrays like terms
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
      if (yearDiff !== 0) return yearDiff; // Different years

      // Order for terms within the same year
      const termOrder = ['Fall', 'Summer2', 'Summer10wk', 'Summer1', 'Spring', 'Winter'];
      return termOrder.indexOf(matchA[2]) - termOrder.indexOf(matchB[2]);
    }
    return 0; // In case of no matches (unlikely), consider equal
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
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = [...prevSelectedDays];
      if (newSelectedDays.includes(day)) {
        const index = newSelectedDays.indexOf(day);
        newSelectedDays.splice(index, 1);
      } else {
        newSelectedDays.push(day);
      }
      return newSelectedDays;
    });
  };

  const initializeEventListeners = () => {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('close-icon')) {
        removeEvent(e.target);
      }
    });
  };

  const fetchCourseDetails = async (courseId) => {
    const response = await fetch('https://api.peterportal.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            course(id: "${courseId}") {
              section {
                id
                section_code
                section_type
                instructor
                days
                start_time
                end_time
                building
                room
                max_capacity
              }
            }
          }
        `
      })
    });

    const data = await response.json();
    if (data && data.data && data.data.course) {
      setSearchResults(data.data.course.section);
    }
  };

  const handleSearch = (courseId) => {
    fetchCourseDetails(courseId);
    setSearchQuery(""); // Clear the search query
    setFilteredCourses([]); // Clear the filtered courses
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  };

  const captureScreenshot = async () => {
    const element = document.querySelector(`.${styles.schedule}`);
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'schedule.png';
    link.click();
  };

  useEffect(() => {
    initializeEventListeners();
  }, []);

  return (
    <div className={styles.scheduleBody}>
      <Header />
      <div className={styles.container}>
        <div className={styles.schedule} ref={scheduleRef}>
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
              {Array.from({ length: 16 }, (_, i) => (
                <React.Fragment key={i}>
                  <tr key={`${i}-hour`}><td>{7 + i}:00</td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr key={`${i}-half-hour`}><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={styles.resizer}
          onMouseDown={(e) => {
            setStartX(e.clientX);
            setStartWidthLeft(document.querySelector(`.${styles.schedule}`).offsetWidth);
            setStartWidthRight(document.querySelector(`.${styles.classSearch}`).offsetWidth);
            setResizing(true);
          }}
        ></div>
        
        <div className={styles.classSearch}>
          <div className={styles.buttonContainer}>
            <button onClick={captureScreenshot} className={styles.screenshotButton}>
              <img src={ScreenshotIcon} alt="Screenshot" className={styles.screenshotIcon}/>
            </button>
            <button id="toggleFilters" onClick={() => {
              setSearchVisible(!searchVisible);
              setFiltersVisible(!filtersVisible);
              setEventFormVisible(false);
            }}>Search</button>

            <button onClick={() => {
              setAddedVisible(!addedVisible);
              setSearchVisible(false);
              setFiltersVisible(false);
              setEventFormVisible(false);
            }}>Added</button>

            <button id="addEventsButton" onClick={() => {
              setEventFormVisible(!eventFormVisible);
              setFiltersVisible(false);
              setSearchVisible(false);
              setAddedVisible(false);
            }}>Custom</button>
          </div>

          {filtersVisible && (
            <div id="filters" className={styles.filters}>
              <div className={styles.filterItem}>
                <label htmlFor="termDropdown">Term</label>
                <select id="termDropdown">
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterItem}>
                <label htmlFor="departmentDropdown">Department</label>
                <select id="departmentDropdown">
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterItem}>
                <label htmlFor="levelDropdown">Course Level</label>
                <select id="levelDropdown">
                  {courseLevels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterItem}>
                <label htmlFor="geDropdown">General Education</label>
                <select id="geDropdown">
                  {geList.map((ge) => (
                    <option key={ge.id} value={ge.id}>{ge.name}</option>
                  ))}
                </select>
              </div>

              <button id="searchCourses" style={{ display: 'none' }}>Search Courses</button>
            </div>
          )}

          {searchVisible && (
            <div className={styles.searchContainer}>
              <label htmlFor="searchDropdown">Search</label>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search course"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              {filteredCourses.length > 0 && (
                <ul className={styles.dropdown}>
                  {filteredCourses.map(course => (
                    <li key={course.id} onClick={() => handleSearch(course.id)}>
                      {course.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {searchResults.length > 0 && (
            <table className={styles.searchResultsTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Section Code</th>
                  <th>Section Type</th>
                  <th>Instructor</th>
                  <th>Days</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Building</th>
                  <th>Room</th>
                  <th>Max Capacity</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((section, index) => (
                  <tr key={index}>
                    <td>{section.id}</td>
                    <td>{section.section_code}</td>
                    <td>{section.section_type}</td>
                    <td>{section.instructor}</td>
                    <td>{section.days}</td>
                    <td>{section.start_time}</td>
                    <td>{section.end_time}</td>
                    <td>{section.building}</td>
                    <td>{section.room}</td>
                    <td>{section.max_capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {eventFormVisible && (
            <div id="eventForm" className={styles.eventForm}>
              <div>
                <label htmlFor="eventName">Event Name</label>
                <input type="text" id="eventName" name="eventName" placeholder="Event Name" />
              </div>

              <div>
                <label htmlFor="eventStartTime">Start Time</label>
                <input type="time" id="eventStartTime" name="eventStartTime" placeholder="Start Time" />
              </div>

              <div>
                <label htmlFor="eventEndTime">End Time</label>
                <input type="time" id="eventEndTime" name="eventEndTime" placeholder="End Time" />
              </div>

              <div>
                <label>Select Days</label>
                <div className={styles.daysContainer}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                    <div
                      key={day}
                      className={`${styles.day} ${selectedDays.includes(day) ? styles.selected : ''}`}
                      onClick={() => toggleDaySelection(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={addEvent}>Add Event</button>
            </div>
          )}

          {addedVisible && (
            <table className={styles.addedEventsTable}>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Times</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} style={{ backgroundColor: event.color }}>
                    <td>{event.name}</td>
                    <td>{`${event.days.join(', ')} ${event.startTime} - ${event.endTime}`}</td>
                    <td>
                      <button onClick={() => removeEvent(event)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
