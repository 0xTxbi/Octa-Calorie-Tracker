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
			{

				id: 0,
				name: 'Steak Dinner',
				calories: 1200

			},

			{

				id: 1,
				name: 'Cookies',
				calories: 700

			},

			{

				id: 2,
				name: 'Baked Beans',
				calories: 400

			}

		],
		currentItem: null,
		totalCalories: 0


	}


	// Public methods
	return {

		logData: function () {

			return data;

		},

		getItems: function () {

			return data.items;

		}

	}

})();



// UI Controller
const UICtrl = (function () {


	const UISelectors = {

		itemList: '#item-list'

	}


	// Public methods
	return {

		populateItemList: function(items) {

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

		}

	}

})();



// App Controller
const App = (function (ItemCtrl, UICtrl) {


	// Public methods
	return {

		init: function () {

			// Fetch items from the Data Structure
			const items = ItemCtrl.getItems();
			console.log(items);

			// Populate list with items
			UICtrl.populateItemList(items);

		}

	}

})(ItemCtrl, UICtrl);


// Initialise App
App.init();