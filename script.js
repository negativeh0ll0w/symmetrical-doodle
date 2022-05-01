
var tasks = {};

var taskEl = $(".time-block");
var saveBtn = $(".bi");
var taskText = $(".description")

function auditTask(taskEl) {
    // get time from task element
    var time = $(taskEl).find(".hour").text().trim();
    console.log(time);
    // remove any old classes from element
    $(taskEl).removeClass("past present future");
  
    // apply new class depending on what time it is
    if (moment().isBefore(time)) {
      $(taskEl).addClass("future");
    } else if (Math.floor(Math.abs(moment().diff(time, "hours"))) < 1) {
      $(taskEl).addClass("present");
    } else if (moment().isAfter(time)) {
        $(taskEl).addClass("past");
      } 
  };

// create input box
taskText.on("click", function(event){
    var block = event.target;
    var input = document.createElement("textarea");
    input.classList.add("input-box");
    block.append(input);
    input.text = this.text;
    input.focus();
    // save button
    saveBtn.on("click", function(event) {
      console.log("save task");
      console.log(input);
      console.log(input.value);
      taskText.value = input.value;
      event.target.remove(input);
      var newbtn = document.createElement("i");
      newbtn.classList.add("bi", "bi-save2");
      block.appendChild(newbtn);
      var newText = document.createElement("div");
      newText.classList.add("description");
      block.appendChild(newText);
      newText.textContent = input.value;
      console.log(newText.textContent);
      block.textContent = input.value;
      saveTasks();
  });
})



  // save tasks 
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
// load tasks
  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
      tasks = { };
    }
    $.each(tasks, function(arr) {
      arr.forEach(function(task) {
        createTask(task.text, task.hour);
      });
    });
  };

  auditTask();