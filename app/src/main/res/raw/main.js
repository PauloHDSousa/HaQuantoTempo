var dateUpdateInterval;
var cleanText;

//Init
$(document).ready(function(){

    var eventDate, eventName, eventHour;
    
    eventDate = localStorage.eventDate;
    eventName = localStorage.eventName;
    eventHour = localStorage.eventHour; 

    if(eventName == undefined || eventDate == undefined || eventHour == undefined) 
        return;

    updateDateDiffByDate();

    $("#txtDate").val(eventDate);
    $("#txtHour").val(eventHour);
    $("#txtName").val(eventName);
});

//Methods
function saveEventData(errorMessage){
    
    var date,name,hour;

    date = $("#txtDate").val();
    name = $("#txtName").val();
    hour = $("#txtHour").val();

    if(date == '' || name == '' || hour == ''){
        alert(errorMessage);
        return;
    }



    localStorage.eventDate = FormatStringDate(date);
    localStorage.eventName = name;
    localStorage.eventHour = hour;
    
    //Update main Text
    updateDateDiffByDate();
}

function updateDateDiffByDate() {

    
    if(dateUpdateInterval != null)
        clearInterval(dateUpdateInterval);

    if(cleanText == undefined)
        cleanText =  $("#mainText").val();

    var date, hour;
    date = localStorage.eventDate.replace(/-/g,"/");
    hour = localStorage.eventHour;

    var eventDate = "{0} {1}".format(date, hour);

    dateUpdateInterval = setInterval(function(){
         date_future = new Date();
         date_now = new Date(eventDate);

         seconds = Math.floor((date_future - (date_now))/1000);
         minutes = Math.floor(seconds/60);
         hours = Math.floor(minutes/60);
         days = Math.floor(hours/24);
         
         hours = hours-(days*24);
         minutes = minutes-(days*24*60)-(hours*60);
         seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

         var text =  cleanText;

         text = text.replace("#days", days);
         text = text.replace("#hours",hours);
         text = text.replace("#minutes",minutes);
         text = text.replace("#seconds",seconds);

         text = text.replace("#event", localStorage.eventName);

         $("#time").text(text);
         
     },1000);
 }

//Utils
 function FormatStringDate(date) {
    var day    = date.split("-")[2];
    var month  = date.split("-")[1];
    var year   = date.split("-")[0];
  
    return year + '-' + month + '-' + day;
  }


  //it's not necessary, but appreciated.
  if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}