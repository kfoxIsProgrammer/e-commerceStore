var Arr;

$(document).ready(function() 
{ 
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest()

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'http://localhost:3000/initialproductdata', true)

		request.onload = function() 
		{
  
			 Arr = JSON.parse(request.response);

			//Add the number of pages and which page to start on
			addNumberofDataPages(Arr.length);
			changePage(1);
		}

	// Send request
	request.send()

});