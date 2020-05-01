var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping', {useNewUrlParser: true });

var products = [
new Product({
	productID:1 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" ,
	majorTitle:"Denim shirt" ,
	minorTitle:"Shirt" ,
	price: 120,
	isHot:true ,
	isBest: false 
	}),
new Product({
	productID:2 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Sweatshirt" ,
	price: 139,
	isHot:false,
	isBest: false 
	}),
new Product({
	productID:3 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Grey blouse" ,
	price: 99,
	isHot: false,
	isBest: true 
	}),
new Product({
	productID:4 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" ,
	majorTitle:"Outwear" ,
	minorTitle:"Black jacket" ,
	price: 219,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:5 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" ,
	majorTitle:"Denim shirt" ,
	minorTitle:"Shirt" ,
	price: 120,
	isHot:true ,
	isBest: false 
	}),
new Product({
	productID:6 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" ,
	majorTitle:"Sportwear" ,
	minorTitle:"Sweatshirt" ,
	price: 139,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:7 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Grey blouse" ,
	price: 99,
	isHot:false ,
	isBest: true 
	}),
new Product({
	productID:8 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" ,
	majorTitle:"Outwear" ,
	minorTitle:"Black jacket" ,
	price: 219,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:9 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Grey blouse" ,
	price: 99,
	isHot:false ,
	isBest: true 
	}),
new Product({
	productID:10 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" ,
	majorTitle:"Outwear" ,
	minorTitle:"Black jacket" ,
	price: 219,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:11 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" ,
	majorTitle:"Denim shirt" ,
	minorTitle:"Shirt" ,
	price: 120,
	isHot:true ,
	isBest: false 
	}),
new Product({
	productID:12 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" ,
	majorTitle:"Denim shirt" ,
	minorTitle:"Shirt" ,
	price: 120,
	isHot: true ,
	isBest: false
	}),
new Product({
	productID:13 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Sweatshirt" ,
	price: 139,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:14 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Grey blouse" ,
	price: 99,
	isHot:false ,
	isBest: true 
	}),
new Product({
	productID:15 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" ,
	majorTitle:"Outwear" ,
	minorTitle:"Black jacket" ,
	price: 219,
	isHot:false ,
	isBest: false 
	}),
new Product({
	productID:16 ,
	imagePath:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" ,
	majorTitle:"Sport wear" ,
	minorTitle:"Sweatshirt" ,
	price: 139,
	isHot:false ,
	isBest: false 
	})
];

var done =0;
for(var i =0; i < products.length; i++)
{
	products[i].save(function(err,result)
		{
			done++;
			if(done === products.length)
			{
				exit();
			}
		});
}

function exit(){
	mongoose.connection.close();
}