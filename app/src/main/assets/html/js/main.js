//Methods
function saveEventName(){
    var txtDate = FormatStringDate($("#txtDate").val());
    localStorage.eventDate = txtDate;
    
    localStorage.eventName = $("#txtName").val();
}


//Utils
function updateDateDiffByDate(time1) {
    var calcNewYear = setInterval(function(){
         date_future = new Date();
         date_now = new Date(time1);

         seconds = Math.floor((date_future - (date_now))/1000);
         minutes = Math.floor(seconds/60);
         hours = Math.floor(minutes/60);
         days = Math.floor(hours/24);
         
         hours = hours-(days*24);
         minutes = minutes-(days*24*60)-(hours*60);
         seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

         var text =  $("#time").text();
         text = text.replace("#days", days);
         text = text.replace("#event",localStorage.eventName);

         $("#time").text(text);
     },1000);
 }

 function FormatStringDate(date) {
    var day  = date.split("-")[2];
    var month  = date.split("-")[1];
    var year  = date.split("-")[0];
  
    return year + '-' + month + '-' + day;
  }