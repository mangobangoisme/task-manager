// https://www.svgrepo.com/collection/coolicons-line-oval-icons/

import Papa from 'papaparse'

let tasks = [];
const maxProgress = 2;

const categoryColors = {
    "home" : "#2A67E2D9",
    "school" : "#369307D9"
};

const progressColors = ["#949494", "#4165E0", "#3EB74F"];

const dueDateColors = ["#F24236", "#3EB74F", "#E3891E", "#8F56C8", "#FFFFFFBF"];

const tagColors = {
    "test" : "#CF473ABF",
    "tags" : "#369307BF"
};

class Task {
    constructor(name, category, dueDate="", progress=0, tags=[], subtasks=[]) {
        this.name = name;
        this.category = category;
        this.dueDate = new Date(dueDate);
        this.progress = progress;
        this.tags = tags;
        this.subtasks = subtasks;
        
        // let taskIDs = [];
        // for (const task of tasks) {
        //     taskIDs.push(task.id);
        // }
        // let i = 0, idFound = false;
        // while (!idFound) {
        //     if (!taskIDs.includes(i)) {
        //         idFound = true;
        //         this.id = i;
        //         console.log(this.id);
        //     }
        //     i++;
        // }
        
        tasks.push(this);
    }

    drawTask() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "tasklistTask");
        document.getElementById("tasklist" + this.progress).appendChild(wrapper);

        // BUTTON

        const buttonWrapper = document.createElement("span");
        buttonWrapper.setAttribute("class", "taskButtonWrapper");
        wrapper.appendChild(buttonWrapper);

        const completeButton = document.createElement("button");
        completeButton.setAttribute("class", "taskCompleteButton" + this.progress);
        completeButton.style.borderColor = progressColors[this.progress];
        if (this.progress > 0) {
            completeButton.style.backgroundColor = progressColors[this.progress] + "40";
        } else {
            completeButton.style.backgroundColor = "#00000000";
        }
        let taskIndex = tasks.indexOf(this);
        completeButton.setAttribute("onClick", `tasks[${taskIndex}].advance()`)
        buttonWrapper.appendChild(completeButton);

        // LABELS

        const labelWrapper = document.createElement("span");
        labelWrapper.setAttribute("class", "taskLabelWrapper");
        wrapper.appendChild(labelWrapper);

            // TOP LINE

        const topLine = document.createElement("p");
        topLine.setAttribute("class", "taskTopLine");
        labelWrapper.appendChild(topLine);

        const nameLabel = document.createElement("span");
        nameLabel.setAttribute("class", "taskNameLabel");
        nameLabel.innerHTML = this.name;
        topLine.appendChild(nameLabel);

            // BOTTOM LINE

        const bottomLine = document.createElement("p");
        bottomLine.setAttribute("class", "taskBottomLine");
        labelWrapper.appendChild(bottomLine);

        if (this.subtasks.length > 0) {
            const subtaskIcon = document.createElement("img");
            subtaskIcon.setAttribute("class", "taskSubtaskIcon");
            bottomLine.appendChild(subtaskIcon);
            const subtaskLabel = document.createElement("span");
            subtaskLabel.setAttribute("class", "taskSubtaskLabel");
            subtaskLabel.innerHTML = this.subtasks.length + " ";
            bottomLine.appendChild(subtaskLabel);
        }

        let dueDateLabelColor;
        let dueDateLabelStr;
        if (this.dueDate < getDaysInFuture(0)) {
            dueDateLabelColor = dueDateColors[0]
        } else if (this.dueDate < getDaysInFuture(1)) {
            dueDateLabelStr = "Today";
            dueDateLabelColor = dueDateColors[1];
        } else if (this.dueDate < getDaysInFuture(2)) {
            dueDateLabelStr = "Tomorrow";
            dueDateLabelColor = dueDateColors[2];
        } else if (this.dueDate < getDaysInFuture(8)) {
            dueDateLabelStr = new Date(this.dueDate).toLocaleDateString("en-US", {
                weekday: "long"
            });
            dueDateLabelColor = dueDateColors[3];
        } else {
            dueDateLabelStr = new Date(this.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            });
            dueDateLabelColor = dueDateColors[4];
        }

        const dueDateIcon = document.createElement("img");
        dueDateIcon.setAttribute("class", "taskDueDateIcon");
        dueDateIcon.style.backgroundColor = dueDateLabelColor;
        bottomLine.appendChild(dueDateIcon);

        const dueDateLabel = document.createElement("span");
        dueDateLabel.setAttribute("class", "taskDueDateLabel");
        dueDateLabel.innerHTML = dueDateLabelStr;
        dueDateLabel.style.color = dueDateLabelColor;
        bottomLine.appendChild(dueDateLabel);

        const tagList = document.createElement("span");
        tagList.setAttribute("class", "taskTagList");
        for (const tagElement of this.tags) {
            let tagColor = tagColors[tagElement];
            const tagIcon = document.createElement("img");
            tagIcon.setAttribute("class", "taskTagIcon");
            tagIcon.style.backgroundColor = tagColor;
            tagList.appendChild(tagIcon);
            const tagLabel = document.createElement("span");
            tagLabel.setAttribute("class", "taskTagLabel");
            tagLabel.style.color = tagColor;
            tagLabel.innerHTML = tagElement + " ";
            tagList.appendChild(tagLabel);
        }
        bottomLine.appendChild(tagList);

        const categoryLabel = document.createElement("span");
        categoryLabel.setAttribute("class", "taskCategoryLabel");
        bottomLine.appendChild(categoryLabel);

        const categoryColorLabel = document.createElement("img");
        categoryColorLabel.setAttribute("class", "taskCategoryColorLabel");
        categoryColorLabel.style.backgroundColor = categoryColors[this.category];
        categoryLabel.appendChild(categoryColorLabel);

        const categoryNameLabel = document.createElement("span");
        categoryNameLabel.setAttribute("class", "taskCategoryNameLabel");
        categoryNameLabel.innerHTML = this.category + " ";
        categoryLabel.appendChild(categoryNameLabel);

        // DIVIDER LINE

        const dividerWrapper = document.createElement("span");
        dividerWrapper.setAttribute("class", "taskDividerWrapper");
        wrapper.appendChild(dividerWrapper);

        const dividerLine = document.createElement("hr");
        dividerLine.setAttribute("class", "taskDividerLine");
        dividerLine.setAttribute("size", 1);
        dividerWrapper.appendChild(dividerLine);
    }

    advance() {
        console.log(this.name);
        this.progress++;
        if (this.progress == maxProgress) {
            tasks.splice(tasks.indexOf(this), 1);
        }
        drawTasks()
    }

    toString() {
        return `Name: ${this.name}
Due: ${new Date(this.dueDate).toString()}
Progress: ${this.progress}
Tags: ${this.tags}
Subtasks: ${this.subtasks}`
    }
}

window.addEventListener("load", 
    function() {

    }
);

function newTask() {
    let tomorrow = new Date(new Date().toDateString());
    tomorrow.setDate(tomorrow.getDate() + 2);

    new Task("Task 1", "home", new Date("9/27/2024"), 0, ["test", "tags"], [1, 2]);
    new Task("Task 2", "school", tomorrow, 1, ["test", "tags"]);

    console.log(tasks);
    console.log();

    drawTasks();

    console.log();
    console.log(tasks);
}

function drawTasks() {
    for (const section of document.getElementsByClassName("tasklistSection")) {
        section.innerHTML = "";
    }

    // sort tasks by progress descending, then due date ascending
    tasks.sort(function(a, b) {
        let progressTest = b.progress - a.progress;
        if (progressTest == 0) {
            return a.dueDate - b.dueDate;
        }
        return progressTest
    });

    for (const task of tasks) {
        console.log(task);
        task.drawTask();
    }
}

function getDaysInFuture(days) {
    let date = new Date(new Date().toDateString());
    date.setDate(date.getDate() + days);
    return date;
}