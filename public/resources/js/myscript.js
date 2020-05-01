
//Global variable for the Array of items
var Arr;
var prevPageNum = 1;

$(document).ready(function() 
{ 
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest()

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'http://localhost:3000/initialdata', true)

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

function changePage(pagenum){
			
			


			//Delete the items first
			$("#hello").empty();
			
			//Load the data of the items
			var htmlString =("<!--Grid row--> "                                     
+"        <div class=\"row wow fadeIn\">  ")
			
			//Add a row for every 4 columns
			for(i = (8*(pagenum-1)); i<(4 +(4*(pagenum-1))); i++){
				  
				htmlString += ("<!--Grid column-->                                                                                                         "
+"          <div class=\"col-lg-3 col-md-6 mb-4\">                                                                                     "
+"                                                                                                                                     "
+"            <!--Card-->                                                                                                              "
+"            <div class=\"card\">                                                                                                     "
+"                                                                                                                                     "
+"              <!--Card image-->                                                                                                      "
+"              <div class=\"view overlay\">                                                                                           "
+"                <img src=\""+ Arr[i].piclocation +"\" class=\"card-img-top\"         "
+"                  alt=\"\">                                                                                                          "
+"                <a>                                                                                                                  "
+"                  <div class=\"mask rgba-white-slight\" onclick=\"toProduct("+Arr[i].idproductitems+")\"></div>                                                                       "
+"                </a>                                                                                                                 "
+"              </div>                                                                                                                 "
+"              <!--Card image-->                                                                                                      "
+"                                                                                                                                     "
+"              <!--Card content-->                                                                                                    "
+"              <div class=\"card-body text-center\">                                                                                  "
+"                <!--Category & Title-->                                                                                              "
+"                <a href=\"\" class=\"grey-text\">                                                                                    "
+"                  <h5>"+Arr[i].item_name_minor +"</h5>                                                                                                     "
+"                </a>                                                                                                                 "
+"                <h5>                                                                                                                 "
+"                  <strong>                                                                                                           "
+"                    <a href=\"\" class=\"dark-grey-text\">"+ Arr[i].item_name_major                                                                
+						(Arr[i].is_hot == 1? "<span class=\"badge badge-pill danger-color\">NEW</span> ": 
						(Arr[i].is_bestseller == 1? "<span class=\"badge badge-pill primary-color\">bestseller</span>  ": "") )
					
+"                    </a>                                                                                                             "
+"                  </strong>                                                                                                          "
+"                </h5>                                                                                                                "
+"                                                                                                                                     "
+"                <h4 class=\"font-weight-bold blue-text\">                                                                            "
+"                  <strong>"+Arr[i].price+"$</strong>                                                                                              "
+"                </h4>                                                                                                                "
+"                                                                                                                                     "
+"              </div>                                                                                                                 "
+"              <!--Card content-->                                                                                                    "
+"                                                                                                                                     "
+"            </div>                                                                                                                   "
+"            <!--Card-->                                                                                                              "
+"                                                                                                                                     "
+"          </div>                                                                                                                     "
+"          <!--Grid column--> ");
			}
			//Adds the end row after 4 items
			htmlString+=("</div> "                                                                                                                      
				+" <!--Grid row-->");
	
			htmlString +=("<!--Grid row--> "                                     
+"        <div class=\"row wow fadeIn\">  ")
			
			//Add a row for every 4 columns
			for(i = (4 + (4*(pagenum-1))); i<(8*pagenum); i++){
				  
				htmlString += ("<!--Grid column-->                                                                                                         "
+"          <div class=\"col-lg-3 col-md-6 mb-4\">                                                                                     "
+"                                                                                                                                     "
+"            <!--Card-->                                                                                                              "
+"            <div class=\"card\">                                                                                                     "
+"                                                                                                                                     "
+"              <!--Card image-->                                                                                                      "
+"              <div class=\"view overlay\">                                                                                           "
+"                <img src=\""+ Arr[i].piclocation +"\" class=\"card-img-top\"         "
+"                  alt=\"\">                                                                                                          "
+"                <a>                                                                                                                  "
+"                  <div class=\"mask rgba-white-slight\"></div>                                                                       "
+"                </a>                                                                                                                 "
+"              </div>                                                                                                                 "
+"              <!--Card image-->                                                                                                      "
+"                                                                                                                                     "
+"              <!--Card content-->                                                                                                    "
+"              <div class=\"card-body text-center\">                                                                                  "
+"                <!--Category & Title-->                                                                                              "
+"                <a href=\"\" class=\"grey-text\">                                                                                    "
+"                  <h5>"+Arr[i].item_name_minor +"</h5>                                                                                                     "
+"                </a>                                                                                                                 "
+"                <h5>                                                                                                                 "
+"                  <strong>                                                                                                           "
+"                    <a href=\"\" class=\"dark-grey-text\">"+ Arr[i].item_name_major                                                                
+						(Arr[i].is_hot == 1? "<span class=\"badge badge-pill danger-color\">NEW</span> ": 
						(Arr[i].is_bestseller == 1? "<span class=\"badge badge-pill primary-color\">bestseller</span>  ": ""))
+"                    </a>                                                                                                             "
+"                  </strong>                                                                                                          "
+"                </h5>                                                                                                                "
+"                                                                                                                                     "
+"                <h4 class=\"font-weight-bold blue-text\">                                                                            "
+"                  <strong>"+Arr[i].price+"$</strong>                                                                                              "
+"                </h4>                                                                                                                "
+"                                                                                                                                     "
+"              </div>                                                                                                                 "
+"              <!--Card content-->                                                                                                    "
+"                                                                                                                                     "
+"            </div>                                                                                                                   "
+"            <!--Card-->                                                                                                              "
+"                                                                                                                                     "
+"          </div>                                                                                                                     "
+"          <!--Grid column--> ");
			}
			//Adds the end row after 4 items
			htmlString+=("</div> "                                                                                                                      
+" <!--Grid row-->");
	

	$("#hello").append(htmlString);

			//Ennable scrolling
			$(".page-link").click(function(){
  			window.scrollTo(0,window.innerHeight / 2);
			});


			//update current page number
			$(("#page"+prevPageNum)).removeClass("page-item active");
			$(("#page"+prevPageNum)).addClass("page-item");

			$(("#page"+pagenum)).removeClass("page-item");
			$(("#page"+pagenum)).addClass("page-item active");

			prevPageNum = pagenum;




//Add the pages dynamically
}


function toProduct(id){
	console.log(id);
	var xhttp = new XMLHttpRequest()


	// Open a new connection, using the GET request on the URL endpoint
	xhttp.open("POST", "product", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("productid="+id);


}



function addNumberofDataPages(arrayLength){


	var htmlString = 
          ("<nav class=\"d-flex justify-content-center wow fadeIn\">"
        +"<ul id =\"pageNums\" class=\"pagination pg-blue\">"
          	+"<li id=\"navNumsPrev\" class=\"page-item disabled\">"
            +"<a class=\"page-link\" href=\"#\" aria-label=\"Previous\">"
             +"<span aria-hidden=\"true\">&laquo;</span>"
              +"<span class=\"sr-only\">Previous</span>"
           +" </a>"
          +"</li>"

          +"<li id=\"page1\" class=\"page-item active\">"
            +"<a class=\"page-link\" onclick=\"changePage(1)\">1"
             +"<span class=\"sr-only\">(current)</span>"
           +" </a>"
          +"</li>");
			
			//Add number of pages based off the items
			for(i = 2; i<= Math.ceil(arrayLength/8); i++)
			{
				
           
           		htmlString += ("<li id=\"page"+i+"\" class=\"page-item\">"
            			+"<a id=\"page"+i+"\" class=\"page-link\" onclick=\"changePage("+i+")\">"+i
           				+"</a>"
           				+"</li>");
        	}

          	htmlString+=("<li class=\"page-item\">"
            +"<a id=\"navNumsNext\" class=\"page-link\" href=\"#\" aria-label=\"Next\">"
              +"<span aria-hidden=\"true\">&raquo;</span>"
              +"<span class=\"sr-only\">Next</span>"
            +"</a>"
          +"</li>"
          +"</ul>"
      		+"</nav>"
      +"<!--Pagination-->"
    +"</div>");

          $(htmlString).insertAfter("#hello");

}