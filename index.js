// Your code here

function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}


function createEmployeeRecords(employeesData) {
  return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}


function createTimeInEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employee;
}


function createTimeOutEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employee;
}


function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100; 
}


function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}


function allWagesFor(employee) {
  return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
    return totalWages + wagesEarnedOnDate(employee, timeInEvent.date);
  }, 0);
}


function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}


const ultronData = [
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150]
];


const employees = createEmployeeRecords(ultronData);
console.log(employees);


createTimeInEvent(employees[0], "2024-04-28 0800");
createTimeOutEvent(employees[0], "2024-04-28 1700");
console.log(employees[0]);


console.log(hoursWorkedOnDate(employees[0], "2024-04-28"));


console.log(wagesEarnedOnDate(employees[0], "2024-04-28"));


console.log(allWagesFor(employees[0]));


console.log(calculatePayroll(employees));
