function reverseStr(str){
  var listOfChars = str.split(''); // ['h', 'e', 'l', 'l', 'o']
  var reverseListOfChars = listOfChars.reverse();
  
  var reversedStr = reverseListOfChars.join('');

//return str.split('').reverse().join('');

  return reversedStr;
}

function isPalindrome(str){
  var reverse = reverseStr(str);

  return str === reverse;
}

function convertDateToStr(date){
  var dateStr = { 
    day:'', 
    month:'', 
    year:''
  };

  if(date.day < 10){
    dateStr.day = '0' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }
  if(date.month < 10){
    dateStr.month = '0' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }
  
  dateStr.year = date.year.toString();

  return dateStr
}  
  
var date = {
  day: 5,
  month: 9,
  year: 2020
}

function getAllDateFormats(date){
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for(var i = 0; i < listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      flag = true;
      break;
    }
  }
  return flag;
}

// check for leap year
function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}

// gets next date
function getNextDate(date){
  var day = date.day + 1; // increment the day
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(month === 2){// check for February
    // check for leap year
    if(isLeapYear(year)){
      if(day > 29){
        day = 1;
        month++; // increment the month
    }
  }
    else{
      if(day > 28){
          day = 1;
          month++;
        }
      }
  }
  // check for other months
  else {
    // check if the day exceeds the max days in month
    if(day > daysInMonth[month - 1]){
      day=1;
      month++;
    }
  }

  // increment the year if its 31st Dec of that year
  if(month > 12){
        month = 1;
        year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
    return [ctr, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day == 0) {
        if (month - 1 == 2) {
            month = month - 1;
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            if (daysInAMonth[month - 2] == 31) {
                day = 31;
                month = month - 1;
            } else {
                day = 30;
                month = month - 1;
            }
        }
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date) {
    var pctr = 0;
    var previousDate = getPreviousDate(date)

    while (1) {
        pctr = pctr + 1;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [pctr, previousDate];
}

var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(e){
  var finalDate = [];
  
  var bdayStr = dateInputRef.value; // 2020-10-11
  
  if(bdayStr !== ''){
    var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };
    
    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if(isPalindrome){
       resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
    }
    else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      //console.log(ctr, nextDate)
      var [pctr, previousDate] = getPreviousPalindromeDate(date);
      //console.log(ptr)
      if(ctr < pctr){
        finalctr = ctr;
        finalDate = nextDate;
        dateState = 'next';
        dateStateTense = 'is';
        //console.log('flag');
      }
      else {
        finalctr = pctr;
        finalDate = previousDate;
        dateState = 'previous';
        dateStateTense = 'was';
      }

      resultRef.innerText = 'The' + ' ' + dateState + ' ' + 'palindrome date' + ' ' + dateStateTense + ' ' + finalDate.day + '-' + finalDate.month + '-' + finalDate.year + ', you missed it by' + ' ' + finalctr + ' days! 😔';
    }
  }
}

showBtnRef.addEventListener('click', clickHandler);

