(function () {
  let currentDay = -1;
  let weatherImageIndex = 0;
  let weatherSpriteIndex = 0;

  function setDateTime() {
    const currentTime = new Date();
    const day = (currentTime.getDay() + 6) % 7;
    setTime(currentTime.getHours(), currentTime.getMinutes());
    if (day != currentDay) {
      const date = currentTime.getDate();
      const month = currentTime.getMonth() + 1;
      const weekdaySprite = document.querySelector(".weekday-sprite");

      updateWeekdaySprite(day, weekdaySprite);
      updateDateDisplay(date);
      updateStackedSprite(month - 1, ".month", document);
      currentDay = day;
    }
  }

  function updateWeekdaySprite(currentDay, weekdaySprite) {
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

  function updateDateDisplay(date) {
    const ones = date % 10;
    const tens = Math.floor(date / 10);

    updateStackedSprite(ones, ".date-ones", document);
    updateStackedSprite(tens, ".date-tens", document);
  }

  function updateStackedSprite(spriteIndex, idString, obj) {
    const elementTop = obj.querySelector(idString + "-top");
    const elementMid = obj.querySelector(idString + "-mid");
    const elementBase = obj.querySelector(idString + "-base");
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

  function setTime(hour, minutes) {
    const todaysWeatherSprite = document.querySelector(
      ".current-weather-sprite"
    );
    setCurrentTime(hour, minutes);
    updateWeatherSprite(todaysWeatherSprite, weatherImageIndex);
  }

  function setCurrentTime(hour, minutes) {
    const tempTens = document.querySelector("#current-temp-tens");
    const tempOnes = document.querySelector("#current-temp-ones");
    const tempTenths = document.querySelector("#current-temp-tenths");
    const tempTenths2 = document.querySelector("#current-temp-tenths2");
    const wth = 72;
    const remainder = Math.floor(10 * (hour - Math.floor(hour)));

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

  function updateWeatherSprite(sprite, conditionInt) {
    const spriteWidth = parseInt(
      getComputedStyle(sprite).width.replace(/px/, "")
    );
    const spriteHeight = parseInt(
      getComputedStyle(sprite).height.replace(/px/, "")
    );
    const xPos = -conditionInt * spriteWidth;
    const yPos = -(weatherSpriteIndex * spriteHeight);
    const positionString = `${xPos}px ${yPos}px`;

    sprite.style.backgroundPosition = positionString;
  }

  function animateWeatherSprite() {
    const todaysWeatherSprite = document.querySelector(
      ".current-weather-sprite"
    );
    weatherSpriteIndex = (weatherSpriteIndex + 1) % 3;
    updateWeatherSprite(todaysWeatherSprite, weatherImageIndex);
  }

  function init() {
    setDateTime();
    setInterval(animateWeatherSprite, 1000);
    setInterval(setDateTime, 30000);
  }

  window.onload = init;
})();
