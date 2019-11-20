/* global $ */

$(document).ready(function()
{
    $(".favoriteIcon").on("click", function()
    {
        
        var description = $(this).parent().parent().find('span:first').text();
        var imageURL = $(this).prev().attr("src");
        var price = $(this).parent().next('span').text();
        var productID = $(this).parent().next('span').next('span').text();
        
        if ($(this).attr("src") == "img/favorite.png")
        {
            $(this).attr("src","img/favorite_on.png");
            console.log(description);
            updateFavorite("add", parseInt(productID.replace("(","")), imageURL, description, parseFloat(price.replace("$","")));
        }
        else
        {
            $(this).attr("src","img/favorite.png");
            //updateFavorite("delete", productID);
        }
        
    }); //favorite onClick  
    
    $(".keywordLink").on("click", function()
    {
        $.ajax(
        {
            method: "GET",
            url:    "/api/displayFavorites",
            data:   { 
                        "keyword": $(this).text().trim(),
                    },
            success: function(rows, status)
                    {
                        //clear the previous results
                        $("#favorites").html("");
                        
                        //add favorite images
                        rows.forEach(function(row, i)
                        {
                            //add BR every four images
                            (i%3==0 & i!=0)?$("#favorites").append('<br>'):$("#favorites").append('');
                            $("#favorites").append("<div class='itemContainer'>"
                                + "<span class=  'description' id='description'>" + row.description + "</span>"
                                + "<div class = 'imageContainer'>"
                                + "<img class= 'image' src='" + row.imageURL + "' width='200' height='200'>"
                                + "<img class= 'favoriteIcon' src='img/favorite_on.png'>"
                                + "</div>"
                                + "<span class= 'itemPrice' id='itemPrice'>&dollar;" + row.price + "<br></span>"
                                + "<span class= 'productID' id='productID'>(" + row.productID + ")</span>"
                                + "</div>"
                            );
                        });
                        
                        //add listener to dynamic content
                        $(".favoriteIcon").on("click", function()
                                {
                                    var description = $(this).parent().parent().find('span:first').text();
                                    var imageURL = $(this).prev().attr("src");
                                    var price = $(this).parent().next('span').text();
                                    var productID = $(this).parent().next('span').next('span').text();
        
                                    if ($(this).attr("src") == "img/favorite_on.png")
                                    {
                                        $(this).attr("src","img/favorite.png");
                                        updateFavorite("delete", productID);
                                    }
                                    else
                                    {
                                        $(this).attr("src","img/favorite_on.png");
                                        updateFavorite("add", parseInt(productID.replace("(","")), imageURL, description, parseFloat(price.replace("$","")));
                                    }
                                    
                        }); //favorite onClick  
                    }
        });
        
    }); //keywordLink onClick 
    
    function updateFavorite(action, productID, imageURL, description, price)
    {
        $.ajax(
        {
            method: "GET",
            url:    "/api/updateFavorites",
            data:   {
                        "productID": productID,
                        "imageURL": imageURL,
                        "description": description,
                        "price": price,
                        "keyword": $("#keyword").val(),
                        "action": action
                    }
        });
    }
    
}); //document ready

