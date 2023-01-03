$(function () {

    // Adds a listener for click events on the save button.
    const saveButtons = document.querySelectorAll(".saveBtn");

    saveButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Use DOM traversal to get the parent element with the class "time-block"
            const timeBlock = this.closest(".time-block");
            // Get the id of the time-block
            const timeBlockId = timeBlock.id;
            // Get the user input from the description
            const userInput = timeBlock.querySelector(".description").value;
            // Save the user input in local storage using the id as the key
            localStorage.setItem(timeBlockId, userInput);
        });
    });


    // Gets the current hour in 24-hour time using Day.js
    const currentHour = dayjs().hour();
    const timeBlocks = document.querySelectorAll(".time-block");

    timeBlocks.forEach(block => {
        // Get the hour from the id attribute of the time block
        const blockHour = parseInt(block.id);

        if (blockHour < currentHour) {
            // Add the past class if the time block is in the past
            block.classList.add("past");
        } else if (blockHour > currentHour) {
            // Add the future class if the time block is in the future
            block.classList.add("future");
        } else {
            // Add the present class if the time block is the current hour
            block.classList.add("present");
        }
    });


    // Adds code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. 

    window.onload = function () {
        const timeBlock = document.querySelectorAll(".time-block");

        timeBlock.forEach(block => {
            // Get the id of the time-block
            const timeBlockId = block.id;
            // Get the user input from local storage using the id as the key
            const userInput = localStorage.getItem(timeBlockId);
            // If there is user input saved for this time block, set the value of the textarea
            if (userInput) {
                block.querySelector(".description").value = userInput;
            }
        });
    }


    // Displays the current date in the header of the page.
    function updateClock() {
        var now = dayjs();
        var timeString = now.format("MMMM DD,YYYY hh:mm A");
        document.getElementById("date").innerText = timeString
    }
    setInterval(updateClock, 1000);
});
