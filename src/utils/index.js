export const parseSpeed = (value, unit) => {
  if (unit === "metric") {
    return { value: toMinutesPerKilometer(value), unit: "min/km" };
  } else {
    return { value: toMinutesPerMile(value), unit: "min/mi" };
  }
};

export const parseTime = (value) => {
  let result = "";
  let timeRemainder = value;
  const hours = toTimeString(Math.floor(timeRemainder / 3600));
  timeRemainder -= hours * 3600;
  const minutes = toTimeString(Math.floor(timeRemainder / 60));
  timeRemainder -= minutes * 60;
  const seconds = toTimeString(Math.floor(timeRemainder));
  if (hours !== "00") result += `${hours}h `;
  result += `${minutes}m ${seconds}s`;
  return { value: result };
};

export const parseDistance = (value, unit) => {
  if (unit === "metric") {
    return { value: toKilometers(value), unit: "km" };
  } else {
    return { value: toMiles(value), unit: "mi" };
  }
};

export const parseElevation = (value, unit) => {
  if (unit === "metric") {
    return { value: toMeters(value), unit: "m" };
  } else {
    return { value: toFeet(value), unit: "ft" };
  }
};

export const toTimeString = (value) => {
  if (`${value}`.length === 1) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
};

export const toMinutesPerKilometer = (value) => {
  let result = "0";
  if (value && value !== 0) {
    const spk = Math.round(1 / (value / 1000));
    const minutes = Math.floor(spk / 60);
    const seconds = toTimeString(Math.floor(spk - minutes * 60));
    result = `${minutes}:${seconds}`;
  }
  return result;
};

export const toMinutesPerMile = (value) => {
  let result = "0";
  if (value && value !== 0) {
    const spm = Math.round(1 / (value * 0.000621371));
    const minutes = Math.floor(spm / 60);
    const seconds = toTimeString(Math.floor(spm - minutes * 60));
    result = `${minutes}:${seconds}`;
  }
  return result;
};

function toFeet(value) {
  return Number(Math.round(value * 3.28084)).toLocaleString();
}

function toMiles(value) {
  return Number(Math.round(value * 0.00621371) / 10).toLocaleString();
}

function toKilometers(value) {
  return Number(Math.round(value / 100) / 10).toLocaleString();
}

function toMeters(value) {
  return Number(Math.round(value)).toLocaleString();
}
