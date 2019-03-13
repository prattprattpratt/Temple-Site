window.onload = () => {

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', switchImgTab);
  });

  function switchImgTab(ev) {
    const clickedTab = ev.target;
    if (!clickedTab.classList.contains('active')) {
      document.querySelector('.tab.active').classList.remove('active');
      clickedTab.classList.add('active'); 

      const oldImage = document.querySelector('.temple-image.active');
      console.log(oldImage);
      const number = clickedTab.classList[1].split('-')[1];
      const newImage = document.querySelector(`.image-${number}`);

      if (newImage.classList.contains('right')) {
        oldImage.classList.add('left');
        newImage.classList.remove('right');
      } else if (newImage.classList.contains('left')) {
        oldImage.classList.add('right');
        newImage.classList.remove('left');
      }

      oldImage.classList.remove('active');
      newImage.classList.add('active');
    }
  }

}