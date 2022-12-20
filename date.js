import moment from 'moment-timezone'
// Q1

const formatAnyInputToStandardDate = (date) =>{
    return moment(date, ['DD/MM/YYYY', 'MM/DD/YYYY', 'MM of YYYY', 'ddd, DD MMM YYYY']).format('MM/DD/YYYY');
}

//Q2

const getFirstMondayOfYear = (year) =>{
    // Create a moment to Jan st of the year.
    const dateMoment = moment([year, 0, 1])

    // Check if Jan 1st is monday. If not, add 6 days so it goes into the next week and grab the monday.
    if (dateMoment.weekday() != 1) dateMoment.add(6, 'd')
    dateMoment.weekday(1)

    return dateMoment.format('MM/DD/YYYY')

}

//Q3

const getLastMondayOfYear = (year) =>{
    // Create a moment to Jan st of the year.
    const dateMoment = moment([year, 11, 31])

    dateMoment.isoWeekday(1)

    return dateMoment.format('MM/DD/YYYY')


}

//Q4
const differenceBetweenTwoDates = (date1, time1, date2, time2) =>{
    
    //parse the dates into moments object.
    const firstDate = moment(`${date1} ${time1}`, ['MM/DD/YYYY HH:mm'])
    const secondDate = moment(`${date2} ${time2}`, ['MM/DD/YYYY HH:mm'])

    // Get the duration of the difference of both dates.
    const difference = moment.duration(firstDate.diff(secondDate))

    return `${difference.years()} Years, ${difference.months()} Months, ${difference.days()} Days, ${Math.abs(difference.hours())} Hours, and ${Math.abs(difference.minutes())} minute`
}

/* console.log(differenceBetweenTwoDates("03/01/2022", "13:03", "03/01/2022", "15:04")) */

//Q5

const returnClosestDate = () =>{
    // Amount of dates to generate. This scenario will be 2.
    const AmountOfDatesToGenerate = 2
    const currentDate = moment()
    let Dates = []

    //Generate number between interval.
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Loop through the amount of dates to create. Generate them and add them to the array.
    for (let i = 0; i < AmountOfDatesToGenerate; i++) {

        const randomYear = getRandomInt(1971, 2037)
        const randomMonth = getRandomInt(1, 12)

        const randomDate = moment(`${randomMonth.toString().padStart(2, '0')}/${randomYear}`, ['MM/YYYY']);

        console.log(`[DEBUG] Random Date ${i + 1}:`, randomDate.format('MM/DD/YYYY'))

        Dates.push(randomDate)

    }
    
    // Create as moment date, as big as possible.
    let closerDate = moment(Number.MAX_SAFE_INTEGER.toString(), 'YYYY')

    // Loop through the available dates and set closerDate to whomever is smaller.
    for (let i = 0; i < Dates.length; i++){
        if(Math.abs(Dates[i].diff(currentDate, 'minutes')) < Math.abs(closerDate.diff(currentDate, 'minutes'))){
            closerDate = Dates[i]
        }
    }

    return closerDate.format('DD/MM/YYYY')
}

/* console.log(returnClosestDate()) */

//Q6

const countdownMiami = () =>{
    // Create a moment date object from my time.
    const time =  moment().tz();
    // Create a moment date object from Miami's timezone.
    const startYeyearStart = moment.tz("2026-01-01T00:00:00", "America/New_York");

    // Get the difference and the duration
    const difference = startYeyearStart.diff(time)
    const timeLeft = moment.duration(difference)

    // We use asMonths here to get the entire duration in months and then floor that number.
    // Because if we would have used duration, it would have returned the months left after the years were counted.
    const months = Math.floor(timeLeft.asMonths())
    const days = timeLeft.days()
    const hours = timeLeft.hours()
    const minutes = timeLeft.minutes()
    const seconds = timeLeft.seconds()

    return `Months: ${months}, Days: ${days}, Hours: ${hours},  Minutes: ${minutes}, Seconds: ${seconds}`
}

/* console.log(countdownMiami()) */


//Q7

const countdownQatar = () =>{
    const time =  moment();

    const startYeyearStart = moment.tz("2026-01-01T00:00:00", "Asia/Qatar");

    const difference = startYeyearStart.diff(time)
    const timeLeft = moment.duration(difference)

    const months = Math.floor(timeLeft.asMonths())
    const days = timeLeft.days()
    const hours = timeLeft.hours()
    const minutes = timeLeft.minutes()
    const seconds = timeLeft.seconds()

    return `Months: ${months}, Days: ${days}, Hours: ${hours},  Minutes: ${minutes}, Seconds: ${seconds}`
}

/* console.log(countdownQatar()) */

//Q8

const timezoneHourDifference = (dateAndtime, timezone1, timezone2) =>{

    // Create a moment object with the input timezones and time.
    const timezoneOne = moment(dateAndtime, "MM/DD/YYYY hh:mm A").tz(timezone1)
    const timezoneTwo = moment(dateAndtime, "MM/DD/YYYY hh:mm A").tz(timezone2)

    // Rest the hours difference and then we use Math.abs incase the number is negative, we convert it to a positive number.
    return Math.abs(timezoneOne.hour() - timezoneTwo.hour())
}

/* console.log(timezoneHourDifference("03/22/2022 03:45pm","Asia/Shanghai","America/Los_Angeles")) */

//Q9

const getAllSpecificDays = (year, month, dayOfWeek) =>{
    let days = []

    //Get the moment object for the first day of the month.
    const firstDayOfTheMonth = moment({year: year, month: month - 1})

    //Get the int value of the date i'm trying to look for.
    const targetDayInt = moment().day(dayOfWeek).day(); // 2

    //Check the month of the first "day" of that week. 
    const monthSearching = firstDayOfTheMonth.isoWeekday(targetDayInt).month()

    //If the day picked is in the previous month; hop to the next week to grab the first one of the month.
    if(monthSearching != (month - 1)) firstDayOfTheMonth.add(7, 'days')

    //Grab the first day where to start to look for.
    let currentDay = firstDayOfTheMonth.isoWeekday(targetDayInt)

    while (currentDay.month() === (month - 1)) {
        days.push(currentDay.format('M/D/YYYY'))
        currentDay = currentDay.add(7, 'days')
    }

    return days

}

/* console.log(getAllSpecificDays(2022, 3, 'Tuesday')) */

//Q10

function getWeekOfYear(date) {
    
    // Mark the new start of the year to March 1st.
    const startOfYearDate = moment([date.year(), 2, 1])

    // Get the week number of the year.
    const checkDate = date; // June 15, 2022

    // Get the difference of weeks between the two dates. 
    // If the result is negative it means that it's a "previous" date.
    let weekOfYear = checkDate.week() - startOfYearDate.week()

    //If it's a previous date, then we must get the entire years weeks and then substract the negative weeks valu8es.
    if(weekOfYear < 0) weekOfYear = checkDate.weeksInYear() + weekOfYear

    return weekOfYear + 1
  } 


console.log(getWeekOfYear(moment()))
