(function () {

	var app = angular.module('store', []);
	app.controller('StoreController', function () {
		this.products = gems;
	});
	var gems = [
		{
			name: 'Dodecahedron',
			price: 2.95,
			description: '. . .',
			canPurchase: true
	},
		{
			name: 'Pentagon Gem',
			price: 5.95,
			description: '. . .',
			canPurchase: true
		}
		
	]
})();