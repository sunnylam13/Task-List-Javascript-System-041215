$(document).ready(function(e) {

//////////////////////////////////////////////
// GLOBAL VARIABLES

var $editTaskHTML;
var $taskEditTarget;

//////////////////////////////////////////////////
// FUNCTIONS

// don't forget to call the function in EXECUTION CODE area before running


function init () {
	
	// NOTE:  every time we need to work with the name tracker array we call it within the function
	// what we're doing is taking our reference rolodex out of localStorage
	var toDoArray = getToDoArray();
	console.log('To Do Rolodex: ',toDoArray);

	for (var i = 0; i < toDoArray.length; i++) {
		// retrieve the unique key name of the to do item from the array
		var key = toDoArray[i];
		console.log('To Do Key: ', key);

		console.log('To Do Value: ', localStorage[key]);

		// use the unique key to locate the stored task name in local storage and stick in var value
		// because we're not storing an actual jQuery object but a string we don't need to use JSON parse
		// var value = JSON.parse(localStorage[key]);
		var value = localStorage[key];

		console.log('To Do Name: ', value);

		// create all the unfinished to do items
		// add the to do item back into the DOM
		// addToDoToDOM041015a(key,value);

		// using createToDo041015a() optional args
		// createToDo041015a(key,value);
		createToDo041015b(key,value);
	}
}

function initV2 () {
	
	// NOTE:  every time we need to work with the name tracker array we call it within the function
	// what we're doing is taking our reference rolodex out of localStorage
	var toDoArray = getToDoArray();
	console.log('To Do Rolodex: ',toDoArray);

	if (toDoArray) {
		for (var i = 0; i < toDoArray.length; i++) {
			// retrieve the unique key name of the to do item from the array
			var key = toDoArray[i];
			console.log('To Do Key: ', key);

			console.log('To Do Value: ', localStorage[key]);

			// use the unique key to locate the stored task name in local storage and stick in var value
			// because we're not storing an actual jQuery object but a string we don't need to use JSON parse
			// var value = JSON.parse(localStorage[key]);
			var value = localStorage[key];

			console.log('To Do Name: ', value);

			// create all the unfinished to do items
			// add the to do item back into the DOM
			// addToDoToDOM041015a(key,value);

			// using createToDo041015a() optional args
			// createToDo041015a(key,value);
			createToDo041015b(key,value);
		}
	}
}

function initDoneTasksV1 () {
	// for completed tasks
	
	var doneTaskArray = getDoneTaskArray();
	console.log('Done Task Rolodex: ',doneTaskArray);

	// what do you do if doneTaskArray is empty?
	// This screws things up by default
	// use the condition that it must be >1 before it runs the code

	if (doneTaskArray) {
		for (var i = 0; i < doneTaskArray.length; i++) {
			var key = doneTaskArray[i];
			console.log('Done Task Key: ', key);

			console.log('To Do Value: ', localStorage[key]);

			var value = localStorage[key];

			// create all the completed to do items
			createDoneToDo041115a(key,value);
		}

		// if you leave this outside the for loop you won't create anything for each item
		// create all the completed to do items
		// createDoneToDo041115a(key,value);
	} else {
		return;
	}

	// for (var i = 0; i < doneTaskArray.length; i++) {
	// 	var key = doneTaskArray[i];
	// 	console.log('Done Task Key: ', key);

	// 	console.log('To Do Value: ', localStorage[key]);

	// 	var value = localStorage[key];
	// }

	// create all the completed to do items
	// createDoneToDo041115a(key,value);
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

function createToDo041015a () {

	// apparently the way this function is written, it can only be used to create a new to do item unless you give it the ability to take arguments like key, value and write conditionals that set var key and var taskname 

	// this would be used within addToDoToDOM041015a() for example in this situation
	// actually we use this with the dialog function "Add Task"
	
	// access the toDoArray
	var toDoArray = getToDoArray();

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

	// you could have used one line however it would have been hard to read
	// this is a better practice
	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="task">Bake cake</span></li>';

	// you store the html as a new jQuery created element in var $newTask
	// this is a new DOM element
	// also turns this string into a jQuery object so you can apply regular jQuery functions on it
	// the $ in front of $newTask denotes that it holds a jQuery object
	var $newTask = $(taskHTML);

	// search through the jQuery object stored in $newTask
	// find the element with class .task
	// change the text to match var taskName
	// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
	// using text() acts as a safety filter
	// $newTask.find('.task').text(taskName);
	

	// also add a unique identifier ID# for later retrieval
	// we want to tag the li which is the item we intend to insert
	// $newTask.find('li').attr('id', key);


	$newTask.find('.task').text(taskName).attr('id', key);


	// more efficient combination
	// since li is the parent I don't have to use .end() to reset anything before using find('.task')
	// $newTask.find('li').attr('id', key).find('.task').text(taskName);

	// hide this jQuery object DOM code
	// so you can later reveal it with animations
	$newTask.hide();

	
	// store unique key signature for later cross-reference and retrieval
	// we're pushing this into our reference rolodex
	toDoArray.push(key);

	// store the actual jQuery item object into localStorage as well
	// tag this object with the unique key
	// Uncaught TypeError: Converting circular structure to JSON
	// You should not convert a DOM element to JSON directly. http://stackoverflow.com/questions/21234436/uncaught-typeerror-converting-circular-structure-to-json
	// which means wha I should store is the text() extraction
	// what we really want to do is store the task name into localStorage so we can regenerate the task item upon window load
	localStorage.setItem(key,taskName);
	// having issues storing the value associated with the key
	console.log('This task was stored locally: ',taskName);

	// store toDoArray into localStorage (i.e. your reference rolodex)
	localStorage.setItem("toDoArray",JSON.stringify(toDoArray));

	// at this point we'd run a function to actually put the to do into the DOM
	// because key anv 
	// addToDoToDOM041015a();
	// we've designed it such that the dialog button will do this and the addToDoToDOM041015a function will run this create function instead
	addToDoToDOM041015a(key,$newTask);

}

function createToDo041015b (keyID,valueID) {

	// apparently the way this function is written, it can only be used to create a new to do item unless you give it the ability to take arguments like key, value and write conditionals that set var key and var taskname 

	// this would be used within addToDoToDOM041015a() for example in this situation
	// actually we use this with the dialog function "Add Task"
	
	// access the toDoArray
	var toDoArray = getToDoArray();

	// you could have used one line however it would have been hard to read
	// this is a better practice
	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="task">Bake cake</span></li>';

	// you store the html as a new jQuery created element in var $newTask
	// this is a new DOM element
	// also turns this string into a jQuery object so you can apply regular jQuery functions on it
	// the $ in front of $newTask denotes that it holds a jQuery object
	var $newTask = $(taskHTML);

	// check if arguments were supplied
	// keyID != null && valueID != null
	if ((!keyID) && (!valueID)) {
		
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

		// search through the jQuery object stored in $newTask
		// find the element with class .task
		// change the text to match var taskName
		// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
		// using text() acts as a safety filter
		// $newTask.find('.task').text(taskName);
		

		// also add a unique identifier ID# for later retrieval
		// we want to tag the li which is the item we intend to insert
		// $newTask.find('li').attr('id', key);


		$newTask.find('.task').text(taskName).attr('id', key);


		// more efficient combination
		// since li is the parent I don't have to use .end() to reset anything before using find('.task')
		// $newTask.find('li').attr('id', key).find('.task').text(taskName);

		// hide this jQuery object DOM code
		// so you can later reveal it with animations
		$newTask.hide();

		
		// store unique key signature for later cross-reference and retrieval
		// we're pushing this into our reference rolodex
		toDoArray.push(key);

		// store the actual jQuery item object into localStorage as well
		// tag this object with the unique key
		// Uncaught TypeError: Converting circular structure to JSON
		// You should not convert a DOM element to JSON directly. http://stackoverflow.com/questions/21234436/uncaught-typeerror-converting-circular-structure-to-json
		// which means wha I should store is the text() extraction
		// what we really want to do is store the task name into localStorage so we can regenerate the task item upon window load
		localStorage.setItem(key,taskName);
		// having issues storing the value associated with the key
		console.log('This task was stored locally: ',taskName);

		// store toDoArray into localStorage (i.e. your reference rolodex)
		localStorage.setItem("toDoArray",JSON.stringify(toDoArray));

		// at this point we'd run a function to actually put the to do into the DOM
		// because key anv 
		// addToDoToDOM041015a();
		// we've designed it such that the dialog button will do this and the addToDoToDOM041015a function will run this create function instead
		addToDoToDOM041015a(key,$newTask);

	} else {
		
		// alter the base task to reflect key-value pair from localStorage
		$newTask.find('.task').text(valueID).attr('id', keyID);
		// hide the task
		$newTask.hide();
		// once created it must be added to the DOM
		addToDoToDOM041015a(key,$newTask);
	}

}

function createToDo041015c (keyID,valueID) {

	// in this version we add the ability to Edit the task within each item

	// apparently the way this function is written, it can only be used to create a new to do item unless you give it the ability to take arguments like key, value and write conditionals that set var key and var taskname 

	// this would be used within addToDoToDOM041015a() for example in this situation
	// actually we use this with the dialog function "Add Task"
	
	// access the toDoArray
	var toDoArray = getToDoArray();

	// you could have used one line however it would have been hard to read
	// this is a better practice
	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="edit">Edit</span>';
	taskHTML += '<span class="task">Bake cake</span></li>';

	// you store the html as a new jQuery created element in var $newTask
	// this is a new DOM element
	// also turns this string into a jQuery object so you can apply regular jQuery functions on it
	// the $ in front of $newTask denotes that it holds a jQuery object
	var $newTask = $(taskHTML);

	// check if arguments were supplied for creating a new task item
	// keyID != null && valueID != null
	if ((!keyID) && (!valueID)) {
		
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

		// search through the jQuery object stored in $newTask
		// find the element with class .task
		// change the text to match var taskName
		// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
		// using text() acts as a safety filter
		// $newTask.find('.task').text(taskName);
		

		// also add a unique identifier ID# for later retrieval
		// we want to tag the li which is the item we intend to insert
		// $newTask.find('li').attr('id', key);


		$newTask.find('.task').text(taskName).attr('id', key);


		// more efficient combination
		// since li is the parent I don't have to use .end() to reset anything before using find('.task')
		// $newTask.find('li').attr('id', key).find('.task').text(taskName);

		// hide this jQuery object DOM code
		// so you can later reveal it with animations
		$newTask.hide();

		
		// store unique key signature for later cross-reference and retrieval
		// we're pushing this into our reference rolodex
		toDoArray.push(key);

		// store the actual jQuery item object into localStorage as well
		// tag this object with the unique key
		// Uncaught TypeError: Converting circular structure to JSON
		// You should not convert a DOM element to JSON directly. http://stackoverflow.com/questions/21234436/uncaught-typeerror-converting-circular-structure-to-json
		// which means wha I should store is the text() extraction
		// what we really want to do is store the task name into localStorage so we can regenerate the task item upon window load
		// localStorage.setItem(key,taskName);
		addToLocalStorage(key,taskName);
		// having issues storing the value associated with the key
		console.log('This task was stored locally: ',taskName);

		// store toDoArray into localStorage (i.e. your reference rolodex)
		// localStorage.setItem("toDoArray",JSON.stringify(toDoArray));
		addToLocalStorage("toDoArray",JSON.stringify(toDoArray));

		// at this point we'd run a function to actually put the to do into the DOM
		// because key anv 
		// addToDoToDOM041015a();
		// we've designed it such that the dialog button will do this and the addToDoToDOM041015a function will run this create function instead
		addToDoToDOM041015a(key,$newTask);

	} else {
		
		// alter the base task to reflect key-value pair from localStorage
		$newTask.find('.task').text(valueID).attr('id', keyID);
		// hide the task
		$newTask.hide();
		// once created it must be added to the DOM
		addToDoToDOM041015a(key,$newTask);
	}

}

function addToDoToDOM041015a (key,toDoObj) {

	// don't forget to assign toDoObj to $newTask
	var $newTask = toDoObj;

	// createToDo041015a();

	// prepend your (now hidden) jQuery object into the element with id #todo-list
	$('#todo-list').prepend($newTask);

	// select hidden list item, reveal it, apply the effects clip and highlight
	// clip makes it seem to grow
	// highlight makes it flash
	$newTask.show('clip',250).effect('highlight',1000);

	// close the dialog box
	// $(this).dialog('close');
}

function newToDoDialogBoxV1 () {
	$('#new-todo').dialog({
		// modal requires the user to close box before they can do anything else
		modal: true,
		// prevents dialog from appearing as soon as page loads
		// we want the dialog hidden until the button to create a new to do is clicked
		autoOpen: false,
		// we need to add buttons that make it crystal clear what the user can do to dismiss the dialog
		buttons: {
			// create Add Task button
			"Add task": function () {
				// get the value/text entered by the user for the todo item
				var taskName = $('#task').val();

				// you add error checking
				// you don't want an empty field
				if (taskName === '') {
					return false;
					// exits function
					// dialog remains open
					// nothing else will happen after this
				}

				// you could have used one line however it would have been hard to read
				// this is a better practice
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task">Bake cake</span></li>';

				// you store the html as a new jQuery created element in var $newTask
				// this is a new DOM element
				// also turns this string into a jQuery object so you can apply regular jQuery functions on it
				// the $ in front of $newTask denotes that it holds a jQuery object
				var $newTask = $(taskHTML);

				// search through the jQuery object stored in $newTask
				// find the element with class .task
				// change the text to match var taskName
				// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
				// using text() acts as a safety filter
				$newTask.find('.task').text(taskName);

				// hide this jQuery object DOM code
				// so you can later reveal it with animations
				$newTask.hide();
				// prepend your (now hidden) jQuery object into the element with id #todo-list
				$('#todo-list').prepend($newTask);

				// select hidden list item, reveal it, apply the effects clip and highlight
				// clip makes it seem to grow
				// highlight makes it flash
				$newTask.show('clip',250).effect('highlight',1000);

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

function newToDoDialogBoxV1b () {
	$('#new-todo').dialog({
		// modal requires the user to close box before they can do anything else
		modal: true,
		// prevents dialog from appearing as soon as page loads
		// we want the dialog hidden until the button to create a new to do is clicked
		autoOpen: false,
		// we need to add buttons that make it crystal clear what the user can do to dismiss the dialog
		buttons: {
			// create Add Task button
			"Add task": function () {
				// get the value/text entered by the user for the todo item
				var taskName = $('#task').val();

				// you add error checking
				// you don't want an empty field
				if (taskName === '') {
					return false;
					// exits function
					// dialog remains open
					// nothing else will happen after this
				}

				// you could have used one line however it would have been hard to read
				// this is a better practice
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="edit">Edit</span>';
				taskHTML += '<span class="task">Bake cake</span></li>';

				// you store the html as a new jQuery created element in var $newTask
				// this is a new DOM element
				// also turns this string into a jQuery object so you can apply regular jQuery functions on it
				// the $ in front of $newTask denotes that it holds a jQuery object
				var $newTask = $(taskHTML);

				// search through the jQuery object stored in $newTask
				// find the element with class .task
				// change the text to match var taskName
				// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
				// using text() acts as a safety filter
				$newTask.find('.task').text(taskName);

				// hide this jQuery object DOM code
				// so you can later reveal it with animations
				$newTask.hide();
				// prepend your (now hidden) jQuery object into the element with id #todo-list
				$('#todo-list').prepend($newTask);

				// select hidden list item, reveal it, apply the effects clip and highlight
				// clip makes it seem to grow
				// highlight makes it flash
				$newTask.show('clip',250).effect('highlight',1000);

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

function newToDoDialogBoxV1c () {
	// IMPLEMENT LOCAL STORAGE
	// use createToDo041015a()
	
	$('#new-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			// create Add Task button
			"Add task": function (event) {

				// the code would be better served by taking the code and storing it in another function

				// need to supply 2 args, key and toDoObj
				// addToDoToDOM041015a();
				
				// you supply no args to this function because within it, it generates the key:value pair that runs addToDoToDOM041015a()
				// createToDo041015a();
				createToDo041015b();


				// $(this).click(function(event) {
				// 	// press Enter to also enter an item
				// 	// addTaskhandleKeyPressV1(event);
				// 	addTaskhandleKeyPressV2(event);
				// });

				// press Enter to also enter an item
				// addTaskhandleKeyPressV1(event);
				// addTaskhandleKeyPressV2(event);
				// addTaskhandleKeyPressV3(event);

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

function newToDoDialogBoxV2 () {

	// this version tries to add the ability to press Enter to enter the new task

	$('#new-todo').dialog({
		// modal requires the user to close box before they can do anything else
		modal: true,
		// prevents dialog from appearing as soon as page loads
		// we want the dialog hidden until the button to create a new to do is clicked
		autoOpen: false,
		// we need to add buttons that make it crystal clear what the user can do to dismiss the dialog
		buttons: {
			// create Add Task button
			"Add task": function (evt) {

				function addTaskSystemV1 () {
					// get the value/text entered by the user for the todo item
					var taskName = $('#task').val();

					// you add error checking
					// you don't want an empty field
					if (taskName === '') {
						return false;
						// exits function
						// dialog remains open
						// nothing else will happen after this
					}

					// you could have used one line however it would have been hard to read
					// this is a better practice
					var taskHTML = '<li><span class="done">%</span>';
					taskHTML += '<span class="delete">x</span>';
					taskHTML += '<span class="task">Bake cake</span></li>';

					// you store the html as a new jQuery created element in var $newTask
					// this is a new DOM element
					// also turns this string into a jQuery object so you can apply regular jQuery functions on it
					// the $ in front of $newTask denotes that it holds a jQuery object
					var $newTask = $(taskHTML);

					// search through the jQuery object stored in $newTask
					// find the element with class .task
					// change the text to match var taskName
					// if you tried to do this above with var taskHTML it's possible to break the code if someone enters something like <script>alert('ha,ha,ha)</script>
					// using text() acts as a safety filter
					$newTask.find('.task').text(taskName);

					// hide this jQuery object DOM code
					// so you can later reveal it with animations
					$newTask.hide();
					// prepend your (now hidden) jQuery object into the element with id #todo-list
					$('#todo-list').prepend($newTask);

					// select hidden list item, reveal it, apply the effects clip and highlight
					// clip makes it seem to grow
					// highlight makes it flash
					$newTask.show('clip',250).effect('highlight',1000);

					// close the dialog box
					$(this).dialog('close');
				}

				// custom code I added
				// add ability to add task by pressing enter
				if (evt.keyCode === 13) {
					addTaskSystemV1();
					return false;
				} else {
					addTaskSystemV1();
				}
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

function markTasksCompleteV1 () {
	// to mark tasks as complete you need to use event delegation...
	// this is where you set the event listener on an existing parent element that lived in the DOM at pageload... it listens for an event and targets new and old children elements to apply a function to...
	// see JJMM3e: 538/508
	
	$('#todo-list').on('click', '.done', function() {
		// when user clicks the Done box, jQuery only knows about the one span in the list... yet you need to access the entire <li> tag... to do that you need the parent() method
		// hence we want to select the parent of the span which is the li
		// and we specify that in the parent() method as parent('li')
		// we then store this in var $taskItem
		// see explanation on JJMM3e:539/509
		var $taskItem = $(this).parent('li');

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

function markTasksCompleteV2 () {
	// to mark tasks as complete you need to use event delegation...
	// this is where you set the event listener on an existing parent element that lived in the DOM at pageload... it listens for an event and targets new and old children elements to apply a function to...
	// see JJMM3e: 538/508
	
	$('#todo-list').on('click', '.done', function() {
		// when user clicks the Done box, jQuery only knows about the one span in the list... yet you need to access the entire <li> tag... to do that you need the parent() method
		// hence we want to select the parent of the span which is the li
		// and we specify that in the parent() method as parent('li')
		// we then store this in var $taskItem
		// see explanation on JJMM3e:539/509
		var $taskItem = $(this).parent('li');

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

			////////////////////////////////////////////
			///// 		LOCAL STORAGE CHANGES
			////////////////////////////////////////
			
			// in this version we want to delete the task from toDoArray and add it to a doneTaskArray or something along those lines
			// find key
			var key = $(this).parent('li').find('.task').attr('id');
			console.log('Done Task Key to Add: ', key);
			
			// add to doneTaskArray
			var doneTaskArray = getDoneTaskArray();
			doneTaskArray = doneTaskArray.push(key);
			console.log('Completed Rolodex: ', doneTaskArray);
			
			// delete from toDoArray
			var toDoArray = getToDoArray();
			toDoArray = toDoArray.splice((toDoArray.indexOf(key)), 1);
			console.log('To Do Rolodex Updated: ', toDoArray);

			///////////////////////////////////////////////
			

		})
	});
}

function markTasksCompleteV3 () {
	// to mark tasks as complete you need to use event delegation...
	// this is where you set the event listener on an existing parent element that lived in the DOM at pageload... it listens for an event and targets new and old children elements to apply a function to...
	// see JJMM3e: 538/508
	
	// if you want to keep adding additional functions you may need to use callbacks within callbacks
	
	$('#todo-list').on('click', '.done', function() {
		// when user clicks the Done box, jQuery only knows about the one span in the list... yet you need to access the entire <li> tag... to do that you need the parent() method
		// hence we want to select the parent of the span which is the li
		// and we specify that in the parent() method as parent('li')
		// we then store this in var $taskItem
		// see explanation on JJMM3e:539/509
		var $taskItem = $(this).parent('li');
		var $taskKeyID = $taskItem.find('.task').attr('id');
		console.log('Done Item Key: ',$taskKeyID);

		removeFromToDoArray($taskKeyID);
		addDoneArray($taskKeyID);

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

function createDoneToDo041115a (keyID,valueID) {
	// similar to the createToDo functions
	var doneTaskArray = getDoneTaskArray();

	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="task">Bake cake</span></li>';
	var $doneTask = $(taskHTML);

	$doneTask.find('.task').text(valueID).attr('id', keyID);
	$doneTask.hide();
	console.log($doneTask);

	// function to add Done To Do to the DOM
	addDoneToDoToDOM041115a(keyID,$doneTask);
}

function addDoneToDoToDOM041115a (key,doneDoObj) {
	var $doneTask = doneDoObj;
	$('#completed-list').prepend($doneTask);
	$doneTask.show('clip',250).effect('highlight',1000);
}

/////////////////////////////////////////////

////////////////////////////////////////////
///// 		MAKE LISTS SORTABLE FUNCTIONS
/////////////////////////////////////////////

// the function allows us to drag new tasks to completed tasks list
// must figure out a way to classify an object moved to the new to do to completed to do

function makeListSortableV1 () {
	$('.sortlist').sortable({
		// this allows you to drag items between acceptable lists that match the selector
		connectWith: '.sortlist',
		cursor: 'pointer',
		// highlights the space in the list where a visitor can drop an item as she drags it around th elist
		placeholder: 'ui-state-highlight',
		// identify which elements on the sortable item won't work as handlers
		cancel: '.delete,.done'
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

function addTaskhandleKeyPressV3 (e) {
	if (e.keyCode === 13) {
		createToDo041015b();
		$(this).dialog('close');
	}
}


/////////////////////////////////////////////



////////////////////////////////////////////
///// 		DELETE TASK FUNCTIONS
//////////////////////////////////////////////

function deleteTasksV1 () {
	// we use event delegation here as well
	// we setup the event listener on the ul parent to watch any events that happen to elements with .delete
	$('.sortlist').on('click', '.delete', function() {

		// go up to the parent of 'this' element which must be a 'li'
		// apply a jquery effect
		// once effect is applied, remove 'this' element
		$(this).parent('li').effect('puff',function () {
			$(this).remove();
		})
	});
}

function deleteTasksV2 () {
	// we need the ability to not only delete visible tasks... we also need to delete the item from localStorage

	// we use event delegation here as well
	// we setup the event listener on the ul parent to watch any events that happen to elements with .delete
	$('.sortlist').on('click', '.delete', function() {

		// add code that removes the item from localStorage
		// don't forget to enable this function in Execution when done
		// find the key of this item
		// turns out this element is the span.delete which means we either need to go to the parent and then to go span.task or we need to use a sibling selector
		var key = $(this).parent('li').find('.task').attr('id');
		console.log('Remove key: ', key);

		// remove item from the rolodex array
		var toDoArray = getToDoArray();
		var index = toDoArray.indexOf(key);
		toDoArray.splice(index, 1);
		// store this changed rolodex back into localStorage
		localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
		
		// now you actually remove the key's value from localStorage
		localStorage.removeItem(key);
		console.log('Item Removed: ', key);

		// make it disappear visually after key has been removed
		// go up to the parent of 'this' element which must be a 'li'
		// apply a jquery effect
		// once effect is applied, remove 'this' element
		$(this).parent('li').effect('puff',function () {
			$(this).remove();
		})

		
	});

	
}

function deleteTasksV3 () {
	// this version must account for the difference between new to do items and completed to do items... by referencing the tracking/rolodex arrays

	// we need the ability to not only delete visible tasks... we also need to delete the item from localStorage

	// we use event delegation here as well
	// we setup the event listener on the ul parent to watch any events that happen to elements with .delete
	$('.sortlist').on('click', '.delete', function() {

		// make it disappear visually after key has been removed
		// go up to the parent of 'this' element which must be a 'li'
		// apply a jquery effect
		// once effect is applied, remove 'this' element
		$(this).parent('li').effect('puff',function () {
			$(this).remove();
		})


		// add code that removes the item from localStorage
		// don't forget to enable this function in Execution when done
		// find the key of this item
		// turns out this element is the span.delete which means we either need to go to the parent and then to go span.task or we need to use a sibling selector
		var key = $(this).parent('li').find('.task').attr('id');
		console.log('Remove key: ', key);


		// var toDoArray = getToDoArray();
		// var toDoindex = toDoArray.indexOf(key);
		// if (toDoindex != -1) {
		// 	// remove item from the toDoArray rolodex array
		// 	// could have written a function to handle this
		// 	toDoArray = toDoArray.splice(toDoindex, 1);
		// 	// store this changed rolodex back into localStorage
		// 	localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
		// }

		var toDoArray = getToDoArray();
		var toDoindex = toDoArray.indexOf(key);
		// remove item from the toDoArray rolodex array
		// could have written a function to handle this
		toDoArray = toDoArray.splice(toDoindex, 1);
		// store this changed rolodex back into localStorage
		localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
		console.log('To Do Rolodex: ', toDoArray);

		// var doneTaskArray = getDoneTaskArray();
		// var doneTaskIndex = doneTaskArray.indexOf(key);
		// if (doneTaskIndex != -1) {
		// 	// remove item from the doneTaskArray rolodex array
		// 	doneTaskArray = doneTaskArray.splice(doneTaskIndex, 1);
		// 	localStorage.setItem("doneTaskArray",JSON.stringify(doneTaskArray));
		// }

		var doneTaskArray = getDoneTaskArray();
		var doneTaskIndex = doneTaskArray.indexOf(key);
		// remove item from the doneTaskArray rolodex array
		doneTaskArray = doneTaskArray.splice(doneTaskIndex, 1);
		localStorage.setItem("doneTaskArray",JSON.stringify(doneTaskArray));
		console.log('Done Tasks Rolodex: ', doneTaskArray);

		// now you actually remove the key's value from localStorage
		localStorage.removeItem(key);
		console.log('Item Removed: ', key);
		
	});

	
}

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

function editTaskButtonV1 () {
	$('span.edit').button({
		icons: {
			primary: 'ui-icon-wrench'
		}
	}).click(function() {
		$('#edit-todo').dialog('open');
		// find the span.task and extract its text into var editTaskHTML for later use with the Edit dialog
		// $taskEditTarget;
		// $editTaskHTML = $(this).parents('li').filter(.task).text();
		// $(this).parents('li').filter('.task').css('background', 'red');
		// $(this).parents('li').filter('.task').css('background', 'red');
		// console.log($(this).parents('li').filter('.task').css('background', 'red'));
		// console.log($editTaskHTML);
		// console.log($(this).parents('li').filter('span.task'));
		$taskEditTarget = $(this).parents('li').filter(function (index) {
			// since span.task is the 4th child of the li it is n = 3
			return index === 3;
		}).css('background', 'red');
		// diagnostics
		console.log($taskEditTarget);
		console.log($taskEditTarget.text());
	});
}

function editTaskButtonV1b () {

	// the tasks are being dynamically generated so setting the click function on span.edit before any exist won't work
	// we need event delegation here

	$('#todo-list').on('click', '.edit', function () {

		// don't try to chain these after the .on() method... it screws things up
		// you must use on() method's callback function to use these
		$('span.edit').button({
			icons: {
				primary: 'ui-icon-wrench'
			}
		}).click(function() {
			$('#edit-todo').dialog('open');
			// find the span.task and extract its text into var editTaskHTML for later use with the Edit dialog
			
			// $taskEditTarget;
			// $editTaskHTML;

			// this works
			// $(this).parents('li').css('background', 'red');


			// $taskEditTarget = $(this).parents('li').filter(function (index) {
			// 	// since span.task is the 4th child of the li it is n = 3
			// 	return index === 3;
			// });
			// console.log($taskEditTarget);


			// $taskEditTarget = $(this).parents('li').filter('.task');
			// console.log($taskEditTarget);

			// $taskEditTarget = $(this).parents('li').filter(function (index) {
			// 	// since span.task is the 4th child of the li it is n = 3
			// 	return index === 3;
			// }).css('background', 'red');


			// $editTaskHTML = $(this).parents('li').filter(.task).text();
			// $(this).parents('li').filter('.task').css('background', 'red');
			// $(this).parents('li').filter('.task').css('background', 'red');
			// $(this).parents('li').css('background', 'red')
			// console.log($(this).parents('li').filter('.task').css('background', 'red'));
			// console.log($editTaskHTML);
			// console.log($(this).parents('li').filter('span.task'));
			
			// $editTaskHTML = $($(this)+'.task').text();
			// $taskEditTarget = $($(this)+'.task');
			// diagnostics
			// console.log($taskEditTarget);
			// console.log($taskEditTarget.text());
		});

		// you need this to initialize it otherwise it won't format
		$('span.edit').click();

	});

}

function editTaskV1 () {
	$('#edit-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			"Confirm": function () {
				// add Edit button to each task item
				var editTaskHTML = '<span class="edit">Edit</span>';
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

function getDoneTaskArray () {
	// we need a done task rolodex or tracker so we can re-populate the Completed Task list later on
	
	var doneTaskArray = localStorage["doneTaskArray"];

	// ERROR CHECK
	// check that there's an array that's actually in localStorage to use
	
	if (!doneTaskArray) {
		// if there's no array create one
		doneTaskArray = [];
		// use JSON.stringify(ARRAY)
		localStorage.setItem("doneTaskArray", JSON.stringify(doneTaskArray));
	} else {
		// else doneTaskArray exists so you'll need to convert it from json string to array
		doneTaskArray = JSON.parse(doneTaskArray);
	}

	// we'll be using this inside other functions
	// return the value so you can use result
	return doneTaskArray;
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
	// window.reload();
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

function removeFromToDoArray (key) {
	// store a reference to the array
	var toDoArray = getToDoArray(); // you screwed up previously by not using this function to convert the array from JSON string to true JS array
	console.log(toDoArray);
	// find index for targeting
	var index = toDoArray.indexOf(key);
	console.log('ToDoItem Index: ',index);

	// remove only 1 element
	toDoArray.splice(index, 1);

	// restore array into localStorage for later retrieval
	localStorage.setItem("toDoArray",JSON.stringify(toDoArray));
}

function addToDoArray (key) {
	// store a reference to the array
	var toDoArray = getToDoArray();

	// push value into array
	toDoArray.push(key);

	// restore array into localStorage for later retrieval
	localStorage.setItem("toDoArray",JSON.stringify(toDoArray));
}

function removeFromDoneArray (key) {
	// store a reference to the array
	var doneTaskArray = getDoneTaskArray();
	console.log(doneTaskArray);
	// find index for targeting
	var index = doneTaskArray.indexOf(key);
	// remove only 1 element
	doneTaskArray.splice(index, 1);

	// then re-store doneTaskArray back into localStorage
	localStorage.setItem("doneTaskArray",JSON.stringify(doneTaskArray));
}

function addDoneArray (key) {
	// store a reference to the array
	var doneTaskArray = getDoneTaskArray();

	// push value into array
	doneTaskArray.push(key);

	// then re-store doneTaskArray back into localStorage
	localStorage.setItem("doneTaskArray",JSON.stringify(doneTaskArray));
}

function removeFromLocalStorage (key) {
	localStorage.removeItem(key);
}

function addToLocalStorage (key,item) {
	localStorage.setItem(key,item);
}

/////////////////////////////////////////////


//////////////////////////////////////////////
// EXECUTION CODE

// initialization function
// required for localStorage use
// enable if using: newToDoDialogBoxV1c()
// init();
// appears we must use window.onload
window.onload = function () {
	// init();
	initV2();
	initDoneTasksV1();
}

addToDoButtonV1();
clearAllToDoButtonV1();

// newToDoDialogBoxV1();
// newToDoDialogBoxV1b();
newToDoDialogBoxV1c();
// newToDoDialogBoxV2();

// markTasksCompleteV1();
// markTasksCompleteV2();
markTasksCompleteV3();

makeListSortableV1();

// deleteTasksV1();
// deleteTasksV2();
// deleteTasksV3();
deleteTasksV4();

// editTaskButtonV1();
editTaskButtonV1b();

editTaskV1();

/////////////////////////////////////////////

}); // end ready

