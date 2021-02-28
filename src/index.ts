let currentDay = -1;
let weatherImageIndex = 0;
let weatherSpriteIndex = 0;

function setDateTime() {
  const currentTime = tizen.time.getCurrentDateTime();
  const day = (currentTime.getDay() + 6) % 7;
  setTime(currentTime.getHours(), currentTime.getMinutes());
  if (day != currentDay) {
    const date = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const weekdaySprite = document.querySelector<HTMLDivElement>(
      ".weekday-sprite"
    );

    weekdaySprite && updateWeekdaySprite(day, weekdaySprite);
    updateDateDisplay(date);
    updateStackedSprite(month - 1, ".month");
    currentDay = day;
  }
}

function updateWeekdaySprite(
  currentDay: number,
  weekdaySprite: HTMLDivElement
) {
  const spriteWidth = parseInt(
    getComputedStyle(weekdaySprite).width.replace(/px/, "")
  );
  const spriteHeight = parseInt(
    getComputedStyle(weekdaySprite).height.replace(/px/, "")
  );
  const xPos = (currentDay % 3) * -spriteWidth;
  const yPos = Math.floor(currentDay / 3) * -spriteHeight;
  const positionString = `${xPos}px ${yPos}px`;

  weekdaySprite.style.backgroundPosition = positionString;
}

function updateDateDisplay(date: number) {
  const ones = date % 10;
  const tens = Math.floor(date / 10);

  updateStackedSprite(ones, ".date-ones");
  updateStackedSprite(tens, ".date-tens");
}

function updateStackedSprite(spriteIndex: number, id: string) {
  const elementTop = document.querySelector<HTMLDivElement>(id + "-top");
  const elementMid = document.querySelector<HTMLDivElement>(id + "-mid");
  const elementBase = document.querySelector<HTMLDivElement>(id + "-base");
  if (elementBase && elementMid && elementTop) {
    const spriteWidth = parseInt(
      getComputedStyle(elementTop).width.replace(/px/, "")
    );
    const spriteHeight = parseInt(
      getComputedStyle(elementTop).height.replace(/px/, "")
    );

    elementTop.style.backgroundPosition = `${-spriteIndex * spriteWidth}px 0px`;
    elementMid.style.backgroundPosition = `${
      -spriteIndex * spriteWidth
    }px -${spriteHeight}px`;
    elementBase.style.backgroundPosition = `${-spriteIndex * spriteWidth}px -${
      2 * spriteHeight
    }px`;
  }
}

function setTime(hour: number, minutes: number) {
  const todaysWeatherSprite = document.querySelector<HTMLDivElement>(
    ".current-weather-sprite"
  );
  setCurrentTime(hour, minutes);
  todaysWeatherSprite &&
    updateWeatherSprite(todaysWeatherSprite, weatherImageIndex);
}

function setCurrentTime(hour: number, minutes: number) {
  const tempTens = document.querySelector<HTMLDivElement>("#current-temp-tens");
  const tempOnes = document.querySelector<HTMLDivElement>("#current-temp-ones");
  const tempTenths = document.querySelector<HTMLDivElement>(
    "#current-temp-tenths"
  );
  const tempTenths2 = document.querySelector<HTMLDivElement>(
    "#current-temp-tenths2"
  );
  const wth = 72;

  if (tempOnes && tempTens && tempTenths && tempTenths2) {
    tempTens.style.backgroundPosition = `${
      Math.floor(Math.abs(hour) / 10) * -wth
    }px 0px`;
    tempOnes.style.backgroundPosition = `${
      Math.floor(Math.abs(hour) % 10) * -wth
    }px 0px`;
    tempTenths.style.backgroundPosition = `${
      Math.floor(Math.abs(minutes) / 10) * -wth
    }px 0px`;
    tempTenths2.style.backgroundPosition = `${
      Math.floor(Math.abs(minutes) % 10) * -wth
    }px 0px`;
  }
}

function updateWeatherSprite(sprite: HTMLDivElement, condition: number) {
  const spriteWidth = parseInt(
    getComputedStyle(sprite).width.replace(/px/, "")
  );
  const spriteHeight = parseInt(
    getComputedStyle(sprite).height.replace(/px/, "")
  );
  const xPos = -condition * spriteWidth;
  const yPos = -(weatherSpriteIndex * spriteHeight);
  const positionString = `${xPos}px ${yPos}px`;

  sprite.style.backgroundPosition = positionString;
}

function animateWeatherSprite() {
  const todaysWeatherSprite = document.querySelector<HTMLDivElement>(
    ".current-weather-sprite"
  );
  if (todaysWeatherSprite) {
    weatherSpriteIndex = (weatherSpriteIndex + 1) % 3;
    updateWeatherSprite(todaysWeatherSprite, weatherImageIndex);
  }
}

function init() {
  setDateTime();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      setDateTime();
    }
  });

  tizen.time.setTimezoneChangeListener(setDateTime);
  setInterval(() => {
    animateWeatherSprite();
    setDateTime();
  }, 1000);
}

window.onload = init;
