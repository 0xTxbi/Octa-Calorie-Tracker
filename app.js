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
		addBtn: '.add-btn',
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

		clearInputFields: function () {

			document.querySelector(UISelectors.mealItem).value = '';
			document.querySelector(UISelectors.caloriesItem).value = '';

		},

		hideList: function () {

			document.querySelector(UISelectors.itemList).style.display = 'none';

		},

		showTotalCalories: function (total) {

			document.querySelector(UISelectors.totalCal).textContent = total;

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

	// Public methods
	return {

		init: function () {

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