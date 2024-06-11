import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import styles from './schedule.module.css';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import ScreenshotIcon from './screenshot_icon.svg';
import TrashIcon from './trash_icon.svg';
import PlusIcon from './plus_icon.svg';
import TrashIcon1 from './trash_icon1.svg';
import ReturnIcon from './return_icon.svg';

const Schedule = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [addedVisible, setAddedVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidthLeft, setStartWidthLeft] = useState(0);
  const [startWidthRight, setStartWidthRight] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("Select a term");
  const [selectedDepartment, setSelectedDepartment] = useState("Select a department");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [addedCourses, setAddedCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const scheduleRef = useRef(null);
  const resizerRef = useRef(null);
  const boxHeight = 20;

  useEffect(() => {
    fetchAllCoursesData();
    window.addEventListener('resize', updateBoxSizes);
    resetResizerPosition();
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

  const resetResizerPosition = () => {
    const containerWidth = document.querySelector(`.${styles.container}`).offsetWidth;
    const middle = containerWidth / 2;
    const scheduleWidth = middle - resizerRef.current.offsetWidth / 2;
    const classSearchWidth = middle - resizerRef.current.offsetWidth / 2;

    document.querySelector(`.${styles.schedule}`).style.width = `${scheduleWidth}px`;
    document.querySelector(`.${styles.classSearch}`).style.width = `${classSearchWidth}px`;
  };

  const updateBoxSizes = () => {
    const scheduleTable = document.querySelector(`.${styles.schedule} table`);
    const rows = scheduleTable.rows;

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      for (let j = 1; j < cells.length; j++) { 
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
    addEventToSchedule(name, `${startTime}-${endTime}`, selectedDays);
  };

  const convertTime12to24 = (time) => {
    if (!time.includes('p')) {
      return time.split('-').map(t => t.trim());
    }

    const [timePart, modifier] = time.trim().split(/([ap])/);
    let [start, end] = timePart.split('-').map(t => t.trim());
    let [startHours, startMinutes] = start.split(':');
    let [endHours, endMinutes] = end.split(':');

    if (modifier === 'p') {
      if (parseInt(startHours, 10) < 12 && parseInt(startHours, 10) < 10) {
        startHours = String(parseInt(startHours, 10) + 12);
      }
      if (parseInt(endHours, 10) < 12 && parseInt(endHours, 10) < 10) {
        endHours = String(parseInt(endHours, 10) + 12);
      }
    }

    return [`${startHours}:${startMinutes}`, `${endHours}:${endMinutes}`];
  };

  const parseDays = (days) => {
    const dayMap = {
      M: 'Mon',
      Tu: 'Tue',
      W: 'Wed',
      Th: 'Thu',
      F: 'Fri',
    };
    const parsedDays = [];

    if (days.includes('MWF')) {
      parsedDays.push('Mon', 'Wed', 'Fri');
    } else if (days.includes('TuTh')) {
      parsedDays.push('Tue', 'Thu');
    } else if (days.includes('MW')) {
      parsedDays.push('Mon', 'Wed');
    } else {
      for (const [key, value] of Object.entries(dayMap)) {
        if (days.includes(key)) {
          parsedDays.push(value);
        }
      }
    }

    return parsedDays;
  };

  const addEventToSchedule = (name, time, days, fromCourseTable = false, department = '') => {
    const scheduleTable = document.querySelector(`.${styles.schedule} table`);
    const color = getRandomColor();

    let parsedDays = days;
    let start24HourTime = time.split('-')[0].trim();
    let end24HourTime = time.split('-')[1].trim();
    let sectionType = '';

    if (fromCourseTable) {
      parsedDays = parseDays(days);
      [start24HourTime, end24HourTime] = convertTime12to24(time);
      const [courseNumber, type] = name.split(' ');
      name = `${department} ${courseNumber}`;
      sectionType = type;
    }

    parsedDays.forEach(day => {
      const dayIndex = getDayIndex(day);
      const startRow = getTimeRowIndex(start24HourTime);
      const endRow = getTimeRowIndex(end24HourTime);
      const durationRows = endRow - startRow;

      if (startRow >= 0 && startRow < scheduleTable.rows.length) {
        const cell = scheduleTable.rows[startRow + 1].cells[dayIndex + 1];
        const eventDiv = document.createElement('div');
        eventDiv.classList.add(styles.eventContent);
        eventDiv.style.backgroundColor = color;
        eventDiv.style.height = `${calculateHeightInPx(start24HourTime, end24HourTime)}px`;
        eventDiv.style.borderRadius = '8px';
        eventDiv.style.padding = '5px';
        eventDiv.style.position = 'absolute';
        eventDiv.style.width = `${cell.clientWidth}px`;
        eventDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; width: 100%; font-size: 12px; color: black;">
            <strong style="text-align: left;">${name}</strong>
            <strong style="text-align: right;">${sectionType}</strong>
          </div>
          <div style="font-size: 10px; color: black;">${start24HourTime} - ${end24HourTime}</div>
        `;

        cell.innerHTML = '';
        cell.appendChild(eventDiv);
        cell.style.position = 'relative';
        cell.style.padding = '0';

        setEvents((prevEvents) => {
          const existingEventIndex = prevEvents.findIndex(event => event.name === name);
          if (existingEventIndex !== -1) {
            prevEvents[existingEventIndex].elements.push(eventDiv);
            return [...prevEvents];
          } else {
            return [
              ...prevEvents,
              { name, startTime: start24HourTime, endTime: end24HourTime, days: parsedDays, color, elements: [eventDiv] }
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
      const updatedEvents = prevEvents.filter((event) => event.name !== eventToRemove.name);
      eventToRemove.elements.forEach(element => element.remove());
      return updatedEvents;
    });
  };

  const removeAllEvents = () => {
    setEvents((prevEvents) => {
      prevEvents.forEach(event => event.elements.forEach(element => element.remove()));
      return [];
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
    const s = 70 + Math.floor(Math.random() * 30);
    const l = 50 + Math.floor(Math.random() * 10);
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
    }
  };

  const extractUnique = (courses, attribute) => {
    const unique = courses.map(course => course[attribute])
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index && value);
    return unique.map(item => ({ id: item, name: item }));
  };

  const sortTerms = (a, b) => {
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

  const fetchCourseDetails = async () => {
    const response = await fetch('https://api.peterportal.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetCourseDetails($year: Float!, $quarter: String!, $department: String!, $course_number: String!) {
            schedule(
              year: $year,
              quarter: $quarter,
              department: $department,
              course_number: $course_number
            ) {
              course {
                id
                title
                department
              }
              section {
                code
                type
              }
              meetings {
                days
                time
              }
            }
          }
        `,
        variables: {
          year: 2024,
          quarter: selectedTerm,
          department: selectedDepartment,
          course_number: searchQuery
        }
      })
    });

    const data = await response.json();
    if (data && data.data && data.data.schedule) {
      setSearchResults(data.data.schedule);
      const course = {
        id: searchQuery,
        title: data.data.schedule[0]?.course.title,
        department: selectedDepartment
      };
      setSelectedCourse(course);
      setReturnVisible(true);
    }
  };

  const handleSearch = () => {
    if (selectedTerm === 'Select a term' || selectedDepartment === 'Select a department' || !searchQuery) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return;
    }
    fetchCourseDetails();
    setSearchQuery("");
    setFiltersVisible(false);
    setSearchVisible(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
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

  const handleReturn = () => {
    setSelectedCourse(null);
    setSearchResults([]);
    setReturnVisible(false);
    setSearchVisible(false);
    setAddedVisible(false);
    setEventFormVisible(false);
  };

  const handlePlusClick = (offering, course) => {
    addEventToSchedule(
      `${course.id} ${offering.section.type}`,
      offering.meetings[0]?.time,
      offering.meetings[0]?.days,
      true,
      course.department
    );
    setAddedCourses((prev) => [
      ...prev,
      { offering, course }
    ]);
  };

  const handleTrashClick = ({ offering, course }) => {
    removeEvent({ name: `${course.id} ${offering.section.type}` });
    setAddedCourses((prev) =>
      prev.filter((c) => c.offering.section.code !== offering.section.code)
    );
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
          ref={resizerRef}
          onMouseDown={(e) => {
            setStartX(e.clientX);
            setStartWidthLeft(document.querySelector(`.${styles.schedule}`).offsetWidth);
            setStartWidthRight(document.querySelector(`.${styles.classSearch}`).offsetWidth);
            setResizing(true);
          }}
        ></div>

        <div className={styles.functionContainer}>
          <button onClick={captureScreenshot} className={styles.screenshotButton}>
            <img src={ScreenshotIcon} alt="Screenshot" className={styles.screenshotIcon}/>
            <span className={styles.tooltip}>Get a screenshot of schedule</span>
          </button>
          <button onClick={removeAllEvents} className={styles.trashButton}>
            <img src={TrashIcon} alt="Remove All" className={styles.trashIcon}/>
            <span className={styles.tooltip}>Clear schedule</span>
          </button>
          {returnVisible && (
            <button onClick={handleReturn} className={styles.returnButton}>
              <img src={ReturnIcon} alt="Return" className={styles.returnIcon}/>
              <span className={styles.tooltip}>Return to search</span>
            </button>
          )}
        </div>

        <div className={styles.classSearch}>
          {!returnVisible && (
            <div className={styles.buttonContainer}>
              <button id="toggleFilters" onClick={() => {
                setSearchVisible(true);
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
          )}

          {searchVisible && (
            <div id="filters" className={styles.filters}>
              <div className={styles.filterLabel}>Term</div>
              <div className={styles.filterItem}>
                <select id="termDropdown" onChange={(e) => setSelectedTerm(e.target.value)} className={styles.fullWidth}>
                  <option>Select a term</option>
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterLabel}>Department</div>
              <div className={styles.filterContainer}>
                <div className={styles.filterItem}>
                  <select id="departmentDropdown" onChange={(e) => setSelectedDepartment(e.target.value)} className={styles.fullWidth}>
                    <option>Select a department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.filterItem}>
                <input
                  type="text"
                  id="courseNumber"
                  className={styles.fullWidth}
                  placeholder="Course Number(s)"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>

              <div className={styles.searchButtonContainer}>
                <button onClick={handleSearch} className={styles.courseSearchButton}>
                  Search
                </button>
              </div>
            </div>
          )}

          {selectedCourse && (
            <table className={styles.courseTable}>
              <thead>
                <tr>
                  <th colSpan="4" style={{ textAlign: 'center' }}>
                    {selectedCourse.department} {selectedCourse.id} - {selectedCourse.title}
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Times</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((offering, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center' }}>
                      <img
                        src={PlusIcon}
                        alt="Add"
                        className={`${styles.plusIcon} ${styles.plusIconHover}`}
                        onClick={() => handlePlusClick(offering, selectedCourse)}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>{offering.section.code}</td>
                    <td style={{ textAlign: 'center' }}>{offering.section.type}</td>
                    <td style={{ textAlign: 'center' }}>{offering.meetings.map(meeting => `${meeting.days} ${meeting.time}`).join(', ')}</td>
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
            <>
              {events.map((event, index) => (
                <table key={index} className={styles.addedEventsTable}>
                  <thead>
                    <tr>
                      <th colSpan="4" style={{ textAlign: 'center' }}>
                        {event.name}
                      </th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Times</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <img
                          src={TrashIcon1}
                          alt="Remove"
                          className={`${styles.trashIcon1} ${styles.trashIconHover}`}
                          onClick={() => removeEvent(event)}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>{event.elements[0]?.dataset.sectionCode || ''}</td>
                      <td style={{ textAlign: 'center' }}>{event.type}</td>
                      <td style={{ textAlign: 'center' }}>
                        {event.days.join(', ')} {event.startTime} - {event.endTime}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}

              {addedCourses.reduce((acc, { offering, course }) => {
                const existingCourse = acc.find(item => item.course.id === course.id);
                if (existingCourse) {
                  existingCourse.offerings.push(offering);
                } else {
                  acc.push({ course, offerings: [offering] });
                }
                return acc;
              }, []).map(({ course, offerings }, index) => (
                <table key={index} className={styles.addedEventsTable}>
                  <thead>
                    <tr>
                      <th colSpan="4" style={{ textAlign: 'center' }}>
                        {course.department} {course.id} - {course.title}
                      </th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Times</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerings.map((offering, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>
                          <img
                            src={TrashIcon1}
                            alt="Remove"
                            className={`${styles.trashIcon1} ${styles.trashIconHover}`}
                            onClick={() => handleTrashClick({ offering, course })}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>{offering.section.code}</td>
                        <td style={{ textAlign: 'center' }}>{offering.section.type}</td>
                        <td style={{ textAlign: 'center' }}>{offering.meetings.map(meeting => `${meeting.days} ${meeting.time}`).join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
      {showPopup && (
        <div className={styles.popup}>
          Please provide all of the following: Term, Department, and Course Number
        </div>
      )}
    </div>
  );
};

export default Schedule;
