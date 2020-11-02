// Storage Controller

// Item Controller
const ItemCtrl = (function () {

	// Item Constructor
	const Item = function (id, name, calories) {

		this.id = id;
		this.name = name;
		this.calories = calories;

	}

	// Data Structure
	const data = {

		items: [
			// {

			// 	id: 0,
			// 	name: 'Steak Dinner',
			// 	calories: 1200

			// },

			// {

			// 	id: 1,
			// 	name: 'Cookies',
			// 	calories: 700

			// },

			// {

			// 	id: 2,
			// 	name: 'Baked Beans',
			// 	calories: 400

			// }

		],
		currentItem: null,
		totalCalories: 0


	}


	// Public methods
	return {

		getItems: function () {

			return data.items;

		},

		addItem: function (name, calories) {

			let ID;
			// Autogenerate ID
			if (data.items.length > 0) {

				ID = data.items[data.items.length - 1].id + 1;

			} else {

				ID = 0;

			}

			// Convert calories value to a number
			calories = parseInt(calories);

			// Create a new Item
			const newItem = new Item(ID, name, calories);

			// Add to the items array
			data.items.push(newItem);

			return newItem;


		},

		getItemById: function (id) {

			let match = 0;

			// Loop through the items
			data.items.forEach(function (item) {

				if (item.id === id) {

					match = item;

				}

			});

			return match;

		},

		updateItem: function (name, calories) {

			// Convert calories to number
			calories = parseInt(calories);

			let match = null;

			data.items.forEach(function (item) {

				if (item.id === data.currentItem.id) {

					item.name = name;
					item.calories = calories;

					match = item;

				}

			});

			return match;


		},

		setCurrentItem: function (item) {

			data.currentItem = item;

		},

		getCurrentItem: function () {

			return data.currentItem;

		},

		getTotalCalories: function () {

			let total = 0;

			// Loop through the items and obtain the total calories
			data.items.forEach(function (item) {

				total += item.calories;

			});

			// Add total calories value to the data structure
			data.totalCalories = total;

			// Return total
			return data.totalCalories;

		},

		logData: function () {

			return data;

		}

	}

})();



// UI Controller
const UICtrl = (function () {


	const UISelectors = {

		itemList: '#item-list',
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		mealItem: '#meal',
		caloriesItem: '#calorie',
		totalCal: '.total-calories'

	}


	// Public methods
	return {

		getItemInput: function () {

			return {

				name: document.querySelector(UISelectors.mealItem).value,
				calories: document.querySelector(UISelectors.caloriesItem).value

			};

		},

		populateItemList: function (items) {

			let html = '';

			items.forEach(item => {

				html += `

				<li class="collection-item" id="${item.id}">
				<strong>${item.name}:</strong> <em>${item.calories} calories</em>

				<a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
				</li>

				`;

			});

			// Insert the generated list
			document.querySelector(UISelectors.itemList).innerHTML = html;

		},

		addListItem: function (item) {

			// Display the list
			document.querySelector(UISelectors.itemList).style.display = 'block';

			// Create a list
			const li = document.createElement('li');
			// Add class
			li.className = 'collection-item';
			// Add ID
			li.id = `item-${item.id}`;
			// Add HTML
			li.innerHTML = `
			
				<strong>${item.name}:</strong> <em>${item.calories} calories</em>

				<a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>

			`;

			// Insert list item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

		},

		updateListItem: function (item) {

			console.log(item);
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Convert NodeList into array
			listItems = Array.from(listItems);

			listItems.forEach(function (listItem) {

				const itemID = listItem.getAttribute('id');

				if (itemID === `item-${item.id}`) {

					document.querySelector(`#${itemID}`).innerHTML = `
					
						<strong>${item.name}:</strong> <em>${item.calories} calories</em>

						<a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>

					`;

				}

			});

		},

		clearInputFields: function () {

			document.querySelector(UISelectors.mealItem).value = '';
			document.querySelector(UISelectors.caloriesItem).value = '';

		},

		addItemToForm: function () {

			document.querySelector(UISelectors.mealItem).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.caloriesItem).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();

		},

		hideList: function () {

			document.querySelector(UISelectors.itemList).style.display = 'none';

		},

		showTotalCalories: function (total) {

			document.querySelector(UISelectors.totalCal).textContent = total;

		},

		clearEditState: function () {

			UICtrl.clearInputFields();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';

		},

		showEditState: function () {

			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';

		},


		getSelectors: function () {

			return UISelectors;

		}

	}

})();



// App Controller
const App = (function (ItemCtrl, UICtrl) {

	// Load Event Listeners
	const loadEventListeners = function () {

		let UISelectors = UICtrl.getSelectors();

		// Add Item Event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

		// Disable default submit event on Enter
		document.addEventListener('keypress', function (e) {

			if (e.keyCode === 13 || e.which === 13) {


				e.preventDefault();

				return false;

			}

		});

		// Edit Icon Click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		// Update Item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

	}

	// Add Item submit
	const itemAddSubmit = function (e) {

		// Obtain form input from UI Controller
		const input = UICtrl.getItemInput();

		if (input.name !== '' && input.calories !== '') {

			// Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);

			// Add item to the UI List
			UICtrl.addListItem(newItem);


			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// Display total calories in the UI
			UICtrl.showTotalCalories(totalCalories);

			// Clear the input fields
			UICtrl.clearInputFields();

		} else {

			alert('Input a meal item and its calorie value');

		}


		e.preventDefault();

	}

	// Item edit state
	const itemEditClick = function (e) {

		if (e.target.classList.contains('edit-item')) {

			// Get the list item's ID (item-0, etc)
			const listId = e.target.parentNode.parentNode.id;

			// Split element's ID value into an array
			const listIdArray = listId.split('-');

			// Obtain the actual ID
			const id = parseInt(listIdArray[1]);

			// Get item from data structure using the obtained value
			const itemToEdit = ItemCtrl.getItemById(id);

			// Set the current item to that of the selected data
			ItemCtrl.setCurrentItem(itemToEdit);

			// Add the obtained item to the form input
			UICtrl.addItemToForm();


		} else {

		}

		e.preventDefault();

	}


	// Update item on submit
	const itemUpdateSubmit = function (e) {

		// Get item input
		const input = UICtrl.getItemInput();

		// Update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		// Update UI
		UICtrl.updateListItem(updatedItem);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// Display total calories in the UI
		UICtrl.showTotalCalories(totalCalories);

		UICtrl.clearEditState();

		e.preventDefault();

	}


	// Public methods
	return {

		init: function () {

			// Set Initial state / Clear Edit state
			UICtrl.clearEditState();

			// Fetch items from the Data Structure
			const items = ItemCtrl.getItems();

			// Check if any items exist in the list
			if (items.length == 0) {

				UICtrl.hideList();

			} else {

				// Populate list with items
				UICtrl.populateItemList(items);

			}

			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// Display total calories in the UI
			UICtrl.showTotalCalories(totalCalories);


			// Load Event Listeners
			loadEventListeners();

		}

	}

})(ItemCtrl, UICtrl);


// Initialise App
App.init();