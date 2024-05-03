document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const department = document.querySelector('[name="department"]').value;
    const courseCode = document.querySelector('[name="courseCode"]').value;
    // Here, you would typically make an API call or some data processing
    console.log(`Searching for courses in ${department} with code ${courseCode}`);
    // Update your results section based on fetched data
});


document.addEventListener('DOMContentLoaded', function() {
    const resizer = document.querySelector('.resizer');
    const leftSide = document.querySelector('.schedule');
    const rightSide = document.querySelector('.class-search');
    let isResizing = false;

    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    });

    function handleMouseMove(e) {
        if (isResizing) {
            const containerOffsetLeft = document.querySelector('.container').offsetLeft;
            const newLeftWidth = e.clientX - containerOffsetLeft;
            leftSide.style.width = `${newLeftWidth}px`;
            rightSide.style.width = `calc(100% - ${newLeftWidth}px - 5px)`; // Account for resizer width
        }
    }

    function stopResize(e) {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    }
});
