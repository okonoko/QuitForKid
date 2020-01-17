// simple class to store the basic information about the user, but it is used to store the info about the days on which the user
//did or did not smoke from the registration day
function User(){
    this.userName = "admin";
    this.password = "admin";
    this.email = "";
    this.name = "";
    this.surname = "";
    this.adress = "";
    this.telephonenr = "";
    this.January = new Array();
    this.February = new Array();
    this.March = new Array();
    this.April = new Array()
    this.May = new Array(1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1);
    this.June = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
    this.July = new Array();
    this.August = new Array();
    this.September = new Array();
    this.October = new Array();
    this.November = new Array();
    this.December = new Array();
    //Getter to retrive User given month
    this.getMonth = function(month){
        switch(month){
            case "January":
                return this.January;
            case "February":
                return this.February;
            case "March":
                return this.March;
            case "April":
                return this.April;
            case "May":
                return this.May;
            case "June":
                return this.June;
            case "July":
                return this.July;
            case "August":
                return this.August;
            case "September":
                return this.September;
            case "October":
                return this.October;
            case "November":
                return this.November;
            case "December":
                return this.December;
        }
    }
}
//global variables to be used in our code
//constructor of our user instance
let user = new User(); 
//array of months used for obtaining current date
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
//counter used in month
var counter = 1;
//streak counter
var streak = 0;
//simple login validator
function loginValidation(){
    var un = document.forms["login-form"]["usr"].value;
    var pw = document.forms["login-form"]["pword"].value;
    if ((un == user.userName) && (pw == user.password)) {
        return true;
    }
    else {
        alert ("Login was unsuccessful, please check your username and password");
        return false;
    }
}
//this function is called on start of our page. Normaly it will setup the calndar for given user, but in our case it use the
//hardcoded user class above
function setUpCalendar(){
    //variable date which will be used to get the current date
    var date = new Date();
    var cMonth = months[date.getMonth()];
    setMonth(months[date.getMonth() - 1], true);
    document.getElementById("1_week").style.opacity = 0.5;
    document.getElementById("2_week").style.opacity = 0.5;
    document.getElementById("3_week").style.opacity = 0.5;
    document.getElementById("month").style.opacity = 0.5;
    document.getElementById("current").innerHTML = cMonth;
    fillMonth(cMonth);
    counter = 17;
    //counter = date.getDate();
    for(var i = 0; i < months.length; i++){
        if(months[i].length > 0){
            var tmpM = user.getMonth(months[i]);
            for (var y = 0; y < tmpM.length; y++){
                if(tmpM[y] == 1){
                    streak++;
                    giveAward(streak);
                }
                else{
                    streak = 0;
                    resetAwards();
                }
            }
        }
    }
    document.getElementById("counter").innerHTML = streak + " Days";
}
//function to mark calendar day with green color if the user didn't smoke on thet day
function changeColorGreen(){
    //retrive the current month from the webpage to know what to edit
    var month = document.getElementById("current").textContent;
    //simple validator to check if the month should change with next press of the button
    if((counter == 32) || ((counter == 30 && (month == "February"))) || (counter == 31 && (month == "April")) || (counter == 31 && (month == "June")) || (counter == 31 && (month == "September")) || (counter == 31 && (month == "November"))){
        nextMonth();
    }

    else{
        //increment the streak if user didn't smoke
        streak++;
        //add 0 to the array of given month, to know if user smoked and set up the calendar
        user.getMonth(month).push(1);
        document.getElementById(counter.toString()).style.backgroundColor = "#27C5FF";
        document.getElementById("counter").innerHTML = streak + " Days";
        giveAward(streak);
        counter++;
    }
}
//function to mark calendar day with red color if the user did smoke on thet day
function changeColorRed(){
    //retrive the current month from the webpage to know what to edit
    var month = document.getElementById("current").textContent;
    //simple if statement to check if the month should change with next press of the button
    if((counter == 32) || ((counter == 30 && (month == "February"))) || (counter == 31 && (month == "April")) || (counter == 31 && (month == "June")) || (counter == 31 && (month == "September")) || (counter == 31 && (month == "November"))){
        nextMonth();
    }
    else{
        //setting the streak to 0 if the user smoked
        streak = 0;
        //add 0 to the array of given month, to know if user smoked and setup the calendar
        user.getMonth(month).push(0);
        document.getElementById(counter.toString()).style.backgroundColor = "red";
        document.getElementById("counter").innerHTML = streak + " Days";
        resetAwards();
        counter++;
    }
}
//show awards on screen based on the amount of days the user didn't smoke in a row
function giveAward(streak){
    switch (streak){
        case 7:
            document.getElementById("x").innerHTML = "1 WEEK";
            document.getElementById("1_week").style.opacity = 1.0;
            break;
        case 14:
            document.getElementById("y").innerHTML = "2 WEEKS";
            document.getElementById("2_week").style.opacity = 1.0;
            break;
        case 21:
            document.getElementById("w").innerHTML = "3 WEEKS";
            document.getElementById("3_week").style.opacity = 1.0;
            break;
        case 31:
            document.getElementById("z").innerHTML = "1 MONTH";
            document.getElementById("month").style.opacity = 1.0;
            break;
    }
}
//reseting the award sheet when the user smoke on given day
function resetAwards(){
    document.getElementById("x").innerHTML = "";
    document.getElementById("y").innerHTML = "";
    document.getElementById("w").innerHTML = "";
    document.getElementById("z").innerHTML = "";
}
//switch displayed month to next one
function nextMonth(){   
    var month = document.getElementById("current").textContent;
    var nMonth = setMonth(month, true);
    document.getElementById("current").innerHTML = nMonth;
    clearMonth();
    fillMonth(nMonth);
}
//switch displayed month on calendar to previous
function previousMonth(){
    var month = document.getElementById("current").textContent;
    var pMonth = setMonth(month, false);
    document.getElementById("current").innerHTML = pMonth;
    clearMonth();
    fillMonth(pMonth);
}
//function used when user want to display one of months which she or he has already filled with smoke and non-smoke days
function fillMonth(month){
    var tmpMonth = user.getMonth(month);
    var date = new Date();
    var cMonth = months[date.getMonth()];
    for(var i = 0; i < tmpMonth.length; i++){
        var x = tmpMonth[i];
        i++;
        if(x == 1){
            document.getElementById(i.toString()).style.backgroundColor = "#27C5FF";
        }else{
            document.getElementById(i.toString()).style.backgroundColor = "red";
        }
        i--;
    }
    if(month == cMonth){
        
    }
    counter = tmpMonth.length + 1;
}
//function which clears the calendar in order to prepare it for possible fill  
function clearMonth(){
    for (var i = 1; i < 32; i++){
        document.getElementById(i.toString()).style.backgroundColor = "#fff";
    }
    counter = 1;
}

function hamburgerDrop() {
    var x = document.getElementById("menu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
//function used to determine next or previous month and adjust the displayed calendar if need (change amount of days etc)
function setMonth(month, next){
    switch(month){
        case "January":
            if(next){
                document.getElementById("31").innerHTML = "";
                document.getElementById("30").innerHTML = "";
                document.getElementById("29").innerHTML = "";
                return "February";
            }
            else{
                return "December";
            }
        case "February":
            if(next){
                document.getElementById("31").innerHTML = "31";
                document.getElementById("30").innerHTML = "30";
                document.getElementById("29").innerHTML = "29";
                return "March";
            }
            else{
                document.getElementById("31").innerHTML = "31";
                document.getElementById("30").innerHTML = "30";
                document.getElementById("29").innerHTML = "29";
                return "January";
            }
        case "March":
            if(next){
                document.getElementById("31").innerHTML = "";
                return "April";
            }
            else{
                document.getElementById("31").innerHTML = "";
                document.getElementById("30").innerHTML = "";
                document.getElementById("29").innerHTML = "";
                return "February";
            }
        case "April":
            if(next){
                document.getElementById("31").innerHTML = "31";
                return "May";
            }
            else{
                document.getElementById("31").innerHTML = "31";
                return "March";
            }
        case "May":
            if(next){
                document.getElementById("31").innerHTML = "";
                return "June";
            }
            else{
                document.getElementById("31").innerHTML = "";
                return "April";
            }
        case "June":
            if(next){
                document.getElementById("31").innerHTML = "31";
                return "July";
            }
            else{
                document.getElementById("31").innerHTML = "31";
                return "May";
            }
        case "July":
            if(next){
                return "August";
            }
            else{
                document.getElementById("31").innerHTML = "";
                return "June";
            }
        case "August":
            if(next){
                document.getElementById("31").innerHTML = "";
                return "September";
            }
            else{
                return "July";
            }
        case "September":
            if(next){
                document.getElementById("31").innerHTML = "31";
                return "October";
            }
            else{
                document.getElementById("31").innerHTML = "31";
                return "August";
            }
        case "October":
            if(next){
                document.getElementById("31").innerHTML = "";
                return "November";
            }
            else{
                document.getElementById("31").innerHTML = "";
                return "September";
            }
        case "November":
            if(next){
                document.getElementById("31").innerHTML = "31";
                return "December";
            }
            else{
                document.getElementById("31").innerHTML = "31";
                return "October";
            }
        case "December":
            if(next){
                return "January";
            }
            else{
                document.getElementById("31").innerHTML = "";
                return "November";
            }
    }
}