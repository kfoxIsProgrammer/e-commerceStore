module.exports = function Cart(oldCart){
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0 ;
	this.totalPrice = oldCart.totalPrice || 0;

	this.add = function(item, id, itemqty){
		var storedItem = this.items[id]
		if(!storedItem){
			storedItem = this.items[id] = {item: item, qty: 0, price: 0};
		}
		storedItem.qty += parseInt(itemqty);
		storedItem.price = parseInt(storedItem.item.price) * parseInt(storedItem.qty);
		this.totalQty += parseInt(itemqty);
		this.totalPrice += (parseInt(storedItem.item.price) * parseInt(storedItem.qty));	
	};

	this.reduceByOne = function(id){
		this.items[id].qty--;
		this.items[id].price -= this.items[id].item.price;
		this.totalQty--;
		this.totalPrice -= this.items[id].item.price;

		if(this.items[id].qty <=0){
			delete this.items[id];
		}
	};

	this.removeItem = function(id){
		console.log(id); 
		this.totalQty -= this.items[id].qty;
		this.totalPrice -= this.items[id].price;
		delete this.items[id];
	};

	this.generateArray = function(){
		var arr = [];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	};
};