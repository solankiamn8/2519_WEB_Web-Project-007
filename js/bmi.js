// bmi.js - BMI Calculations
export const calculateBMI = (height, weight) => {
    return (weight / ((height / 100) ** 2)).toFixed(1);
  };
  
  export const calculateCaloriesToTarget = (currentBMI, targetBMI, height) => {
    const currentWeight = currentBMI * ((height / 100) ** 2);
    const targetWeight = targetBMI * ((height / 100) ** 2);
    const kgToLose = currentWeight - targetWeight;
    return kgToLose * 7700; // 7700 calories ≈ 1kg
  };
  
  export const estimateDaysToTarget = (caloriesToTarget, dailyDeficit) => {
    return Math.ceil(caloriesToTarget / dailyDeficit);
  };