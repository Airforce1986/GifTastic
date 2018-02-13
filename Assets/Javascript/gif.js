// 1- Create array to hold subjetcs
var topics = ["Will Ferrell", "Dave Chappell" , "Dane Cook"]
var i = topics.length -3;
var authKey = "&api_key=OaiQQbYcRLiVSzEmCh9q7A2CsivW9DPf";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 

//2 - Call function createBtn to initialize buttons

createBtn();
function createBtn(){          
     for (i; i < topics.length; i++) {
        var btn = $('<button/>',
        {
          text: topics[i],
          id: 'btnComedians',
          class: 'buttonsApp',
          'data-comedian': topics[i]
        })
        $("#comedians").append(btn);
        }
     }
// 3 - Attach on click event to submit button to populate the array topics
$("#submit").on("click", function(event) {
     event.preventDefault();          
     var topicValues = $("#topics").val();     
     if(topicValues!= ''){
        topics.push(topicValues);   
        $('#msg').text("");
        createBtn();   
        $("button").on("click", appendApi);     
     }
     else{
         $('#msg').text("Please add a topic");
         return;
     }     
});

//4 - When click on button call API Giphy  
 $("button").on("click", appendApi); 

function appendApi(){
// 5 - Empty Div everytime the button is clicked    
    $('#gifs-appear-here').empty();
    var comedian = $(this).attr("data-comedian");
    var limit = 10;
    var localURL = queryURL +
        comedian + authKey;

// 6- Call Api

    $.ajax({
      url: localURL,
      method: "GET"
      }).done(function(response) {                
      var results = response.data;
      for (var i = 0; i < results.length; i++) {

 // 7 - Loop through results  and create a img node and attach on click event                   

      var imgResponse = response.data[i].images.fixed_height.url;
      var stillImage = response.data[i].images.fixed_height_still.url;
      var still = response.data[i].images.fixed_height_still.url;
      var rating = response.data[i].rating;                                                                        
      var img = $('<img />', 
       {
       id: 'imgApi',
       src: stillImage,
       'data-animate': imgResponse,
       'data-still': still,
       'data-rating': rating,
        width: 250,        
        on: {
        click: function() {
        $(this).attr('src', $(this).data('animate')).click(function() {
        $(this).attr('src', $(this).data('still'));
                    });
                }                 
            }
         }).appendTo($('#gifs-appear-here'));
         $("#gifs-appear-here").append("<p class='rating'> Rating: "+ rating +"</p>");
            }
        });
}
