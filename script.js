//global variables
var today = moment().format("dddd, MMMM Do YYYY");

var now = moment().format("H A");

// Every hour of a full workday
// 'events' blank so users can fill them in
var fullWorkDay = [
    {
        time: "9 AM",
        events: ""
    },
    {
        time: "10 AM",
        events: ""
    },
    {
        time: "11 AM",
        events: ""
    },
    {
        time: "12 PM",
        events: ""
    },
    {
        time: "1 PM",
        events: ""
    },
    {
        time: "2 PM",
        events: ""
    },
    {
        time: "3 PM",
        events: ""
    },
    {
        time: "4 PM",
        events: ""
    },
    {
        time: "5 PM",
        events: ""
    },
];

//Create local Storage for Event Saving
var plannedWorkDay = JSON.parse(localStorage.getItem("theWorkDay"));
if(plannedWorkDay) {
    fullWorkDay = plannedWorkDay;
}

//Display the current Day
$("#currentDay").text(today);
$("#currentDay").addClass("text-success");

//Add rows to the html for each hour of the work day
//Each row given a unique ID
//Events can be added via the created text areas
fullWorkDay.forEach(function(block, index) {
    var timeLabel = block.time;
    var blockColor = colorTheRow(timeLabel);
    var row = '<div class="time-block" id="' + index + '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' + timeLabel + '</div><textarea class="form-control ' +  blockColor + '">' + block.events + '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    $(".container").append(row);
});

//Rows colored based on time
function colorTheRow(time) {
    var planCurrentDay = moment(now, "H A");
    var planEntry = moment(time, "H A");
    if (planCurrentDay.isBefore(planEntry) === true) {
        return "future";
    } else if (planCurrentDay.isAfter(planEntry) === true) {
        return "past";
    } else {
        return "present";
    }
}

//save user input data to local storage
$(".saveBtn").on("click", function() {
    var blockID = parseInt(
        $(this)
            .closest(".time-block")
            .attr("id")
    );
    var userEntry = $.trim(
        $(this)
            .parent()
            .siblings("textarea")
            .val()
    );
    fullWorkDay[blockID].events = userEntry;

    localStorage.setItem("theWorkDay", JSON.stringify(fullWorkDay));
});

