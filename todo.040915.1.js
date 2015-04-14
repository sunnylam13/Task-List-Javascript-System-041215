$(document).ready(function(e) {

////////////////////////////////////////////
///// 		GENERAL THOUGHTS
///////////////////////////////////////////////

// simplicity is best
// the more moving parts the more confusing it gets

///////////////////////////////////////////////

//////////////////////////////////////////////
// GLOBAL VARIABLES

var $editTaskHTML;
var $taskEditTarget;
var $taskItemObject041315;

//////////////////////////////////////////////////
// FUNCTIONS

// don't forget to call the function in EXECUTION CODE area before running

function initV4 () {
	// using Objects
	// we only want to use one array

	// NOTE:  every time we need to work with the name tracker array we call it within the function
	// what we're doing is taking our reference rolodex out of localStorage
	var toDoArray = getToDoArray();
	console.log('To Do Rolodex: ',toDoArray);

	if (toDoArray) {
		$.each(toDoArray, function(index, val) {
			recreateToDo041315a(toDoArray[index]);
		});
	}
}

////////////////////////////////////////////
///// 		BUTTON ADD NEW TO DO
/////////////////////////////////////////////

function addToDoButtonV1 () {
	$('#add-todo').button({
		icons: {
			primary: 'ui-icon-circle-plus'
		}
	}).click(function() {
		// when the add to do button is clicked you will open the #new-todo dialog box
		$('#new-todo').dialog('open');
	});

}

/////////////////////////////////////////////

////////////////////////////////////////////
///// 		NEW TASK FUNCTIONS
/////////////////////////////////////////////

function createNewToDo041315a () {
	// this function is for completely new task items where I can't feed a pre-existing task item object

	// store a reference to the array holding the task record objects
	var toDoArray = getToDoArray();

	// you store the html as a new jQuery created element in var $newTask
	var $newTask = $(createTaskItemObject());

	// access the toDoArray and run the function that converts it from JSON to normal JS
	// var toDoArray = getToDoArray();
	
	// you store the html as a new jQuery created element in var $newTask
	// var $newTask = $(taskHTML);

	// create unique key identifier for to do item
	var currentDate = new Date();
	var time = currentDate.getTime();
	var key = "todo_" + time;

	// get the value/text entered by the user for the todo item
	var taskName = $('#task').val();
	console.log('This is the user to do input: ', taskName);

	// you add error checking
	// you don't want an empty field
	if (taskName === '') {
		return false;
		// exits function
		// dialog remains open
		// nothing else will happen after this
	}

	// also add a unique identifier ID# for later retrieval
	// we want to tag the li which is the item we intend to insert

	$newTask.find('.task').text(taskName).attr('id', key);

	// attach jQuery UI button function and click function
	// I want to attach this method here when I actually create the button because if I tried to do it onload it would fail to initialize until the very first time I clicked the button

	setupButtonV1($newTask,'.edit','ui-icon-wrench','#edit-todo');

	// hide this jQuery object DOM code
	// so you can later reveal it with animations
	$newTask.hide();

	// store the actual jQuery item object into localStorage as well
	// tag this object with the unique key
	// addToLocalStorage(key,taskName);
	// console.log('This task was stored locally: ',taskName);

	// create the taskRecord object
	var taskRecordObj = new taskRecordConstructor(key,taskName,'todo');
	console.log('New Task Record Key: ',taskRecordObj.taskKey);
	console.log('New Task Record Text: ',taskRecordObj.taskValue);
	console.log('New Task Record Status: ',taskRecordObj.taskStatus);
	
	// store task record object signature for later cross-reference and retrieval
	// we're pushing this into our reference rolodex
	toDoArray.push(taskRecordObj);

	// store toDoArray into localStorage (i.e. your reference rolodex)
	addToLocalStorage("toDoArray",JSON.stringify(toDoArray));

	// at this point we'd run a function to actually put the to do into the DOM
	// we've designed it such that the dialog button will do this and the addToDoToDOM041015a function will run this create function instead
	addToDoToDOM041315a(taskRecordObj,$newTask);
	console.log('The task with key %s, text %s and status %s has been added to the DOM.', taskRecordObj.taskKey, taskRecordObj.taskValue, taskRecordObj.taskStatus);
}

function recreateToDo041315a (taskRecordObj) {
	// OBJECT VERSION
	
	// you store the html as a new jQuery created element in var $newTask
	var $newTask = $(createTaskItemObject());

	var toDoArray = getToDoArray();
	
	switch(taskRecordObj.taskStatus) {
		case "todo": 

			// var toDoArray = getToDoArray();

			// this code runs when we re-list all the task items upon reloading the app

			// access the toDoArray and run the function that converts it from JSON to normal JS
			// var toDoArray = getToDoArray();

			// you store the html as a new jQuery created element in var $newTask
			// var $newTask = $(taskHTML);

			// alter the base task to reflect key-value pair from localStorage
			$newTask.find('.task').text(taskRecordObj.taskValue).attr('id', taskRecordObj.taskKey);

			// attach jQuery UI button function and click function
			setupButtonV1($newTask,'.edit','ui-icon-wrench','#edit-todo');

			// hide the task
			$newTask.hide();
			
			// once created it must be added to the DOM
			addToDoToDOM041315a(taskRecordObj,$newTask);
			break;
		case "done":

			// var doneTaskArray = getDoneTaskArray();

			// calling the array in this version is un-necessary because the object has all the data
			// var doneTaskArray = getDoneTaskArray();
			// var $newTask = $(taskHTML);

			$newTask.find('.task').text(taskRecordObj.taskValue).attr('id', taskRecordObj.taskKey);

			// attach jQuery UI button function and click function
			setupButtonV1($newTask,'.edit','ui-icon-wrench','#edit-todo');

			$newTask.hide();
			// console.log($newTask);

			// function to add Done To Do to the DOM
			addToDoToDOM041315a(taskRecordObj,$newTask);
			break;		
	}
}

function addToDoToDOM041315a (taskRecordObj,toDoObj) {
	// OBJECT VERSION
	
	var $newTask = toDoObj;

	switch(taskRecordObj.taskStatus) {
		case "todo":
			// don't forget to assign toDoObj to $newTask
			// var $newTask = toDoObj;
			
			// prepend your (now hidden) jQuery object into the element with id #todo-list
			$('#todo-list').prepend($newTask);

			// select hidden list item, reveal it, apply the effects clip and highlight
			// clip makes it seem to grow
			// highlight makes it flash
			$newTask.show('clip',250).effect('highlight',1000);
			break;
		case "done":
			// var $newTask = toDoObj;
			$('#completed-list').prepend($newTask);
			$newTask.show('clip',250).effect('highlight',1000);
			break;
	}
}

function newToDoDialogBoxV2 () {
	// use OBJECTS
	// IMPLEMENT LOCAL STORAGE
	
	$('#new-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			// create Add Task button
			"Add task": function (event, ui) {
				
				createNewToDo041315a();

				// close the dialog box
				$(this).dialog('close');
			},
			// create the Cancel button
			"Cancel":function () {
				// $(this) refers to itself, the dialog box
				// close the dialog box when clicked
				$(this).dialog('close');
			}
		},
		// PROBLEM/ISSUE:  the dialog box input field remembers the last task you typed... you need to delete the old one first
		// alternatively you could have erased the field as part of the Add Task function
		close:function () {
			// set the value of the #new-todo input field to an empty string which erases the field... whenever the dialog box is closed
			$('#new-todo input').val('');
		}
	});
}

////////////////////////////////////////////


////////////////////////////////////////////
///// 		COMPLETED/FINISHED TASK FUNCTIONS
/////////////////////////////////////////////

// we need a function that adjusts the task item state as completed so that it populates the completed tasks section on page load

function markTasksCompleteV4 () {
	// to mark tasks as complete you need to use event delegation...
	// this is where you set the event listener on an existing parent element that lived in the DOM at pageload... it listens for an event and targets new and old children elements to apply a function to...
	// see JJMM3e: 538/508
	
	// if you want to keep adding additional functions you may need to use callbacks within callbacks
	
	$('#todo-list').on('click', '.done', function() {

		// store a reference to the array
		var toDoArray = getToDoArray();

		// when user clicks the Done box, jQuery only knows about the one span in the list... yet you need to access the entire <li> tag... to do that you need the parent() method
		// hence we want to select the parent of the span which is the li
		// and we specify that in the parent() method as parent('li')
		// we then store this in var $taskItem
		// see explanation on JJMM3e:539/509
		var $taskItem = $(this).parent('li');
		var taskKeyID = $taskItem.find('.task').attr('id');
		console.log('Done Item Key: ',taskKeyID);
		console.log('To Do Rolodex: ', toDoArray);

		// this code is no longer required because I'm storing all data in objects in a single array in localStorage
		// removeFromToDoArray($taskKeyID);
		// addDoneArray($taskKeyID);

		// change the status of the clicked task
		changeTaskStatus(taskKeyID,"done");

		// now we want to hide this element... since it's marked complete
		// we add a callback to actually move the to do item to the Completed list
		$taskItem.slideUp(250,function () {
			// store $(this) in a variable so that you make the browser do the work... you can run changes over and over and store it in this variable instead of calling the jQuery function over and over.
			var $this = $(this);

			// we use detach to remove and not delete the information, it is held elsewhere
			// the result is stored in $this when you apply methods to the jQuery variable
			$this.detach();

			// prepend the to do item in this element
			$('#completed-list').prepend($this);
			// animate the to do item's addition to this list
			$this.slideDown();
		})
	});
}

/////////////////////////////////////////////

////////////////////////////////////////////
///// 		SORTING RELATED FUNCTIONS
/////////////////////////////////////////////

// the function allows us to drag new tasks to completed tasks list

function makeListSortableV2 () {
	$('.sortlist').sortable({
		// this allows you to drag items between acceptable lists that match the selector
		connectWith: '.sortlist',
		cursor: 'pointer',
		// highlights the space in the list where a visitor can drop an item as she drags it around th elist
		placeholder: 'ui-state-highlight',
		// identify which elements on the sortable item won't work as handlers
		cancel: '.delete,.done',
		stop: function (event, ui) {
			updateListLocationV2(event, ui);
		}
	});
}

/////////////////////////////////////////////

////////////////////////////////////////////
///// 		KEYPRESS HANDLER FUNCTIONS
/////////////////////////////////////////////

// so far this doesn't work because I have no way of targeting the keypress of the jQuery UI dialog's button at the moment... worth asking on stack overflow
// for the Add Task dialog 

function addTaskhandleKeyPressV1 (e) {
	if (e.keyCode === 13) {
		$(this).click();
		// $(this).dialog('close');
		// return false;
	}
}

function addTaskhandleKeyPressV2 (e) {

	$addTaskText = $('.ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-button-text').val();

	if ($addTaskText == "Add task") {
		if (e.keyCode === 13) {
				$('.ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-button-text').click();
				// $(this).dialog('close');
				// return false;
			}
	}
}

function addTaskhandleKeyPressV3 (event, ui) {
	if (event.keyCode === 13) {
		createToDo041015b();
		ui.item.dialog('close');
	}
}


/////////////////////////////////////////////



////////////////////////////////////////////
///// 		DELETE TASK FUNCTIONS
//////////////////////////////////////////////

function deleteTasksV4 () {
	// we use event delegation here as well
	// we setup the event listener on the ul parent to watch any events that happen to elements with .delete
	$('.sortlist').on('click', '.delete', function() {

		// add code that removes the item from localStorage
		// don't forget to enable this function in Execution when done
		// find the key of this item
		// turns out this element is the span.delete which means we either need to go to the parent and then to go span.task or we need to use a sibling selector
		var key = $(this).parent('li').find('.task').attr('id');
		console.log('Remove key: ', key);

		removeFromToDoArray(key);
		removeFromDoneArray(key);
	
		// now you actually remove the key's value from localStorage
		removeFromLocalStorage(key);
		console.log('Item Removed: ', key);

		// go up to the parent of 'this' element which must be a 'li'
		// apply a jquery effect
		// once effect is applied, remove 'this' element
		$(this).parent('li').effect('puff',function () {
			$(this).remove();
		})
	});
}

/////////////////////////////////////////////



////////////////////////////////////////////
///// 		EDIT TASK FUNCTIONS
///////////////////////////////////////////////

function editTaskV1 () {
	$('#edit-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			"Confirm": function (event,ui) {
				// need event delegation
				// we need to set this on the span.edit of the task item elements such that when it is pressed

				var $editToDoField = $('#edit-todo input');
				// var $editToDoField = $('#input#edit-task');
				// console.log('$editToDoField', $editToDoField);

				// access and reference the task "id" data you stored and passed along to dialog through setupButtonV1()
				var selectedTaskID = $('#edit-todo').data('opener');
				console.log('Edit Dialog Opener: ',selectedTaskID);
				console.log('Edit Dialog Opener #ID: ','#'+selectedTaskID);

				// target the triggering event...
				// var $taskItem = $('#'+selectedTaskID).parent('li').find('.task');
				// I screwed up because I already have that element's target ID I don't have to go to the parent and find it again
				var $taskItem = $('#'+selectedTaskID);
				console.log('$taskItem', $taskItem);
				// var $taskItem returns an object which means using val() only returns the 1st value, that's no good because I want the value of the text

				// load/extract the selected task text 
				var selectText = $taskItem.val();
				console.log(selectText);

				// place that task text into the input#edit-task field
				// $('input#edit-task').val(selectText);
				$editToDoField.val(selectText);

				// when the input field changes trigger this...
				// function updateField () {
				// 	var finalEditText;

				// 	$editToDoField.on('change', function(event) {

				// 		// the user edits that text field
				// 		// extract entered text value
				// 		var editedText = $editToDoField.val();
				// 		console.log('Edit Text: ', editedText);
						
				// 		// change the selected task text in the DOM
				// 		$taskItem.val(editedText);

				// 		// if I don't return this I will get an editedText = undefined error
				// 		finalEditText = editedText;
				// 	});

				// 	return finalEditText;
				// }
				

				// change the selected task text in localStorage
				// var taskKeyID = selectedTaskID; // acquire unique ID key
				// console.log('Edit Task ID: ', taskKeyID);
				// removeFromLocalStorage(taskKeyID); // remove previous entry
				// addToLocalStorage(taskKeyID,updateField()); // insert updated entry

				// close dialog box once confirmed
				$(this).dialog('close');
			},
			"Cancel": function () {
				$(this).dialog('close');
			}
		}
	}); // end dialog
	
}

/////////////////////////////////////////////


////////////////////////////////////////////
///// 		TASK RETRIEVAL FUNCTIONS
/////////////////////////////////////////////

// we need to be able to retrieve to do's from localStorage
// we will need to re-write the task generating functions to no longer use variables and instead retrieve all stored tasks from within the array in localStorage
// alternatively we could use an JS object to perform the storage

function getToDoArray () {
	// grab the toDoArray out of localStorage
	// toDoArray stores the toDo jQuery object
	var toDoArray = localStorage["toDoArray"];

	// ERROR CHECK
	// check that there's an array that's actually in localStorage to use
	
	if (!toDoArray) {
		// if there's no array create one
		toDoArray = [];
		// use JSON.stringify(ARRAY)
		localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
	} else {
		// else toDoArray exists so you'll need to convert it from json string to array
		toDoArray = JSON.parse(toDoArray);
	}

	// we'll be using this inside other functions
	// return the value so you can use result
	return toDoArray;
}

/////////////////////////////////////////////


////////////////////////////////////////////
///// 		CLEAR STORAGE FUNCTIONS
/////////////////////////////////////////////
// would need to create a clear "to do" item button somewhere and assign the button a function
// could use a button with jQuery UI dialog

function clearStorage () {
	localStorage.clear();
	// force the page to refresh after the storage is cleared instead of having to manually do so
	// if you place the reload in the clearStorageButtonEnable it will constantly erase localStorage
	
	// after the localStorage is cleared, reload the window so the user doesn't have to (and they won't be scratching their head about what to do next)
	// window.reload() doesn't work
	location.reload();
}

function clearAllToDoButtonV1 () {
	$('#clear-all-todo').button({
		icons: {
			primary: 'ui-icon-circle-minus'
		}
	}).click(function() {
		clearStorage();
	});
}

////////////////////////////////////////////


////////////////////////////////////////////
///// 		HELPER FUNCTIONS
/////////////////////////////////////////////

function changeTaskStatus (taskKeyID, setStatus) {
	// store a reference to the array
	var toDoArray = getToDoArray();
	console.log('The array at changeTaskStatus: ',toDoArray);

	// had to be a for loop for a regular array type... all the other methods of each iteration failed
	for (var i = 0; i < toDoArray.length; i++) {
		// you'll throw na error if you use toDoArray.taskKey instead of toDoArray[i].taskKey
		if (toDoArray[i].taskKey == taskKeyID) {
			toDoArray[i].taskStatus = setStatus;
			console.log('The %s item status is now %s', setStatus, toDoArray[i].taskStatus);

			// restore array into localStorage for later retrieval
			addToLocalStorage('toDoArray',JSON.stringify(toDoArray));
		}
	}

	// toDoArray.forEach(function(element, index){
	// 	console.log('The changeTaskStatus forEach loop starts for: ', toDoArray.taskValue);
	// 	if (this.taskKey == taskKeyID) {
	// 		console.log('Change status of ID',taskKeyID);
	// 		this.taskStatus = setStatus;
	// 		console.log('The %s item status is now %s', setStatus, this.taskStatus);

	// 		// restore array into localStorage for later retrieval
	// 		addToLocalStorage('toDoArray',JSON.stringify(toDoArray));
	// 	}
	// });

	// $.each(toDoArray, function(index,val) {
	// 	console.log('The changeTaskStatus $.each loop starts for: ', toDoArray.taskValue);

	// 	// error:  if you use toDoArray.taskKey you will get undefined because you should have selected the object using an index value
	// 	// or use this
	// 	if ($(this).taskKey == taskKeyID) {
	// 		console.log('Change status of ID',taskKeyID);
	// 		$(this).taskStatus = setStatus;
	// 		console.log('The %s item status is now %s', setStatus, $(this).taskStatus);

	// 		// restore array into localStorage for later retrieval
	// 		addToLocalStorage('toDoArray',JSON.stringify(toDoArray));
	// 	}
	// });
	
}

function removeFromLocalStorage (key) {
	localStorage.removeItem(key);
}

function addToLocalStorage (key,item) {
	localStorage.setItem(key,item);
}

function updateListLocationV2 (event,ui) {
	// passing the UI object only works for the Sortable widget situation

	// must figure out a way to change the to do and done arrays to reflect the object's status if it's moved between the To Do and the Completed Lists
	// say it has stopped... determine which list it is on and add it to that rolodex array while removing it from its previous one
	
	// NOTE:  $(this) doesn't work in jQuery UI in these options... you must use the ui object... specifically ui.item in this case

	// find the list ID... is it .completed-list or .todo-list
	var determineList = ui.item.parents('ul').attr('id');
	console.log("The final list ID is: ", determineList);
	
	// grab unique task key
	// ui.item is a jQuery object with several elements, you must run a find() to extract data
	var key = ui.item.find('.task').attr('id');
	console.log('Task Item Key: ',key);

	switch(determineList) {
		case 'completed-list':
			// removeFromToDoArray(key);
			// addDoneArray(key);
			
			// changeArray("todo","remove",key);
			// changeArray("done","add",key);
			
			changeTaskStatus(key,"done");
			console.log('Added to Completed List');

			break;
		case 'todo-list':
			// removeFromDoneArray(key);
			// addToDoArray(key);
			
			// changeArray("done","remove",key);
			// changeArray("todo","add",key);
			
			changeTaskStatus(key, "todo");
			console.log('Added to To Do List');

			break;
	}

	// if (determineList == 'completed-list') {
	// 	// changeTaskStatus(key,"done");
	// 	// store a reference to the array
	// 	var toDoArray = getToDoArray();

	// 	// $.each(toDoArray, function(index, val) {
	// 	// 	var setStatus = "done";
	// 	// 	if (toDoArray.taskKey == key) {
	// 	// 		toDoArray[index].taskStatus = setStatus;
	// 	// 		console.log('The %s item status is now %s', setStatus, toDoArray[index].taskStatus);

	// 	// 		// restore array into localStorage for later retrieval
	// 	// 		localStorage.setItem("toDoArray",JSON.stringify(toDoArray));
	// 	// 	}
	// 	// });
	// 	console.log('Added to Completed List');
	// } else if (determineList == 'todo-list') {
	// 	var setStatus = "todo";
	// 	// changeTaskStatus(key, "todo");
	// 	// $.each(toDoArray, function(index, val) {
	// 	// 	if (toDoArray.taskKey == key) {
	// 	// 		toDoArray[index].taskStatus = setStatus;
	// 	// 		console.log('The %s item status is now %s', setStatus, toDoArray[index].taskStatus);

	// 	// 		// restore array into localStorage for later retrieval
	// 	// 		localStorage.setItem("toDoArray",JSON.stringify(toDoArray));
	// 	// 	}
	// 	// });
	// 	console.log('Added to To Do List');
	// }
}

function setupButtonV1 (jqObj,selector,icon,dialogSelector) {
	// this function was written more for Edit Task ability
	// where selector, icon, dialogSelector is a string
	
	// store a reference of the task item whose .edit the user clicked
	var selectedTaskID = $(selector).parent('li').find('.task').attr('id');

	jqObj.find(selector).button({
		icons: {
			primary: icon
		}
	}).click(function() {
		// when the button is clicked you will open the dialog box selected
		// pass the reference ID of the task item the user clicked to dialog (see http://stackoverflow.com/questions/15486081/how-to-get-the-element-id-from-which-jquery-dialog-is-called)
		$(dialogSelector).dialog('open').data('opener', selectedTaskID);
	});
}

function taskRecordConstructor (taskKey,taskValue,taskStatus) {
	// create a constructor to create an object for each task item
	// this task item is then stored in the rolodex array
	// when taken out of storage the taskRecord will be in an array
	this.taskKey = taskKey;
	this.taskValue = taskValue;
	this.taskStatus = taskStatus;
}

function createTaskItemObject () {
	//////////////////////////////////////////
	///// 		TASK ITEM SKELETON
	///////////////////////////////////////////////
	// jQuery object

	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="edit">Edit</span>';
	taskHTML += '<span class="task">Bake cake</span></li>';

	return taskHTML;
}

/////////////////////////////////////////////


//////////////////////////////////////////////
// EXECUTION CODE


window.onload = function () {

	////////////////////////////////////////////
	///// 		INITIALIZATION
	//////////////////////////////////////////
	// must happen when the window first loads
	// initialization function
	// required for localStorage use
	// appears we must use window.onload
	// reload the locally stored Completed tasks into DOM
	initV4();

	//////////////////////////////////////////

	// editTaskButtonV1b();
	editTaskV1();
}

addToDoButtonV1();
clearAllToDoButtonV1();

newToDoDialogBoxV2();

markTasksCompleteV4();

makeListSortableV2();

deleteTasksV4();

// editTaskButtonV1b();
// editTaskV1();


/////////////////////////////////////////////

}); // end ready

