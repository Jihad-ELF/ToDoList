const TodayDate = () => {
    const today = new Date();
    //const formattedDate = today.toLocaleDateString(); // Format the date as a string
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = monthNames[today.getMonth()]; // Get the name of the month
    const day: number = today.getDate(); // Get the day of the month
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }); // Get the full name of the day of the week
    const year = today.getFullYear(); // Get the year
  
    return {month, day, dayName, year };
  };
  

  export default TodayDate;

