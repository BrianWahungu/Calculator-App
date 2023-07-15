const gradeForm = document.getElementById('grade-form');
const gradeResultDiv = document.getElementById('grade-result');
gradeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const mark = parseInt(document.getElementById('mark').value);
  const grade = calculateGrade(mark);
  gradeResultDiv.textContent = "Grade: " + grade;
});

const speedForm = document.getElementById('speed-form');
const speedResultDiv = document.getElementById('speed-result');
speedForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const speed = parseInt(document.getElementById('speed').value);
  const points = calculateDemeritPoints(speed);
  if (points === "License suspended") {
    speedResultDiv.textContent = points;
  } else {
    speedResultDiv.textContent = "Points: " + points;
  }
});

const salaryForm = document.getElementById('salary-form');
const salaryResultDiv = document.getElementById('salary-result');
salaryForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const basicSalary = parseFloat(document.getElementById('basic-salary').value);
  const benefits = parseFloat(document.getElementById('benefits').value);
  const netSalary = calculateNetSalary(basicSalary, benefits);
  salaryResultDiv.textContent = "Net Salary: " + netSalary.toFixed(2);
});

function calculateGrade(mark) {
  if (mark > 79) {
    return 'A';
  } else if (mark >= 60 && mark <= 79) {
    return 'B';
  } else if (mark >= 50 && mark <= 59) {
    return 'C';
  } else if (mark >= 40 && mark <= 49) {
    return 'D';
  } else {
    return 'E';
  }
}

function calculateDemeritPoints(speed) {
  if (speed < 70) {
    return 0;
  } else {
    const demeritPoints = Math.floor((speed - 70) / 5);
    if (demeritPoints > 12) {
      return "License suspended";
    } else {
      return demeritPoints;
    }
  }
}

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;
  const payee = calculatePayee(grossSalary);
  const nhifDeductions = calculateNHIFDeductions(grossSalary);
  const nssfDeductions = calculateNSSFdeductions(grossSalary);
  return grossSalary - payee - nhifDeductions - nssfDeductions;
}

function calculatePayee(salary) {
  if (salary <= 24000) {
    return 0;
  } else if (salary <= 32333) {
    return (salary - 24000) * 0.1;
  } else if (salary <= 40385) {
    return (salary - 32333) * 0.15 + 833.3;
  } else if (salary <= 72833) {
    return (salary - 40385) * 0.2 + 2083.3;
  } else if (salary <= 100000) {
    return (salary - 72833) * 0.25 + 5833.3;
  } else {
    return (salary - 100000) * 0.3 + 10416.6;
  }
}

function calculateNHIFDeductions(salary) {
  if (salary < 6000) {
    return 150;
  } else if (salary < 8000) {
    return 300;
  } else if (salary < 12000) {
    return 400;
  } else if (salary < 15000) {
    return 500;
  } else if (salary < 20000) {
    return 600;
  } else if (salary < 25000) {
    return 750;
  } else if (salary < 30000) {
    return 850;
  } else if (salary < 35000) {
    return 900;
  } else if (salary < 40000) {
    return 950;
  } else if (salary < 45000) {
    return 1000;
  } else if (salary < 50000) {
    return 1100;
  } else {
    return 1200;
  }
}

function calculateNSSFdeductions(salary) {
  return salary * 0.06;
}
