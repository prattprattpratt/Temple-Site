window.onload = () => {
  let activeTempleNumber = 2;
  let activeTempleElement = document.getElementsByClassName('temple-2')[0];
  let goToTempleInterval = -1;
  let intervals = [];
  let goToTempleCounter = 0;

  document.addEventListener("mousemove", ev => {
    setCursorLeftOrRight(ev);
  });

  document.addEventListener("click", ev => {
    switchTemples(ev);
  });

  const numDivs = 10;
  const colors = ['#1a93fe', '#F72781', '#30d0ac', '#F2DE00', '#9A1EFF'];
  const explodingCards = document.querySelectorAll('.temple-title');
  const explosion = document.getElementsByClassName('explosion')[0];

  explodingCards.forEach(card => {
    for (let i = 0; i < numDivs; i++) {
      console.log('duplicating');
      let duplicate = explosion.cloneNode();
      duplicate.style.background = colors[(i + 1) % colors.length];
      duplicate.style.animationDelay = `${(i + 1) * 100}ms`;
      card.appendChild(duplicate);
    }
  });

  const explosions = document.getElementsByClassName('explosion');

  explodingCards.forEach(explodingCard => {
    explodingCard.addEventListener("mousedown", ev => {
      [].forEach.call(explosions, explosion => {
        explosion.style.left = `${ev.clientX - explodingCard.offsetLeft}px`;
        explosion.style.top = `${ev.clientY - explodingCard.offsetTop}px`;
      });

      if (goToTempleInterval !== -1) {
        clearInterval(goToTempleInterval);
      }
      goToTempleInterval = window.setInterval(incrementTempleCounter, 100);
    });
  });

  explodingCards.forEach(explodingCard => {
    explodingCard.addEventListener("mouseup", ev => {
      console.log('mouseup');
      if (goToTempleInterval !== -1) {
        clearInterval(goToTempleInterval);
        goToTempleInterval = window.setInterval(decrementTempleCounter, 100);
        intervals.push(goToTempleInterval);
      }
    });
  });

  explodingCards.forEach(explodingCard => {
    explodingCard.addEventListener("mousemove", ev => {
      [].forEach.call(explosions, explosion => {
        explosion.style.left = `${ev.clientX - explodingCard.offsetLeft}px`;
        explosion.style.top = `${ev.clientY - explodingCard.offsetTop}px`;
      })
    });
  });


  const updateActiveTemple = isRight => {
    activeTempleElement.classList.remove('active');

    if (isRight) {
      activeTempleNumber = Math.min(activeTempleNumber + 1, 3);
      activeTempleElement.classList.add('left');
    } else {
      activeTempleNumber = Math.max(activeTempleNumber - 1, 1);
      activeTempleElement.classList.add('right');
    }

    activeTempleElement = document.getElementsByClassName(`temple-${activeTempleNumber}`)[0];
    activeTempleElement.classList.remove('left', 'right');
    activeTempleElement.classList.add('active');
  }

  const setCursorLeftOrRight = ev => {
    if (!ev.target.classList.contains('temple-title')) {
      const halfWay = window.innerWidth / 2;
      const mouseX = ev.clientX;

      const body = document.getElementsByTagName('body')[0];
      if (mouseX < halfWay) {
        !body.classList.contains('left') && body.classList.add('left');
        body.classList.contains('right') && body.classList.remove('right');
      } else {
        body.classList.contains('left') && body.classList.remove('left');
        !body.classList.contains('right') && body.classList.add('right');
      }
    }
  }

  const switchTemples = ev => {
    if (
      ev.target.classList.contains('temple-title') ||
      ev.target.classList.contains('explosion')
    ) {
      return;
    }

    const body = document.getElementsByTagName('body')[0];
    const isRight = body.classList.contains('right');

    updateActiveTemple(isRight);
  }

  const incrementTempleCounter = () => {
    goToTempleCounter += 100;
    console.log(`incrementing count is now ${goToTempleCounter}`);
    if (goToTempleCounter === 2000) {
      clearInterval(goToTempleInterval);
      goToTempleDetail();
    }
  }

  const decrementTempleCounter = () => {
    goToTempleCounter -= 100;
    console.log(`decrementing count is now ${goToTempleCounter}`);

    if (goToTempleCounter <= 0) {
      console.log('clearing decrements');
      intervals.forEach(interval => {
        clearInterval(interval);
      });
    }
  }

  const goToTempleDetail = () => {
    const templeTitle = document.querySelector('.temple-title:active');
    templeTitle.classList.add('full-size');

    window.setTimeout(() => {
      const pathParts = window.location.pathname.split('/');
      pathParts.pop();
      pathParts.push('detail.html');

      window.location = pathParts.join('/');
    }, 1000);
  }

}