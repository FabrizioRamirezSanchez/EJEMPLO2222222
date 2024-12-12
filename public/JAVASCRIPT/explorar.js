const images = document.querySelectorAll('.carousel-container img');
const totalImages = images.length;
const angle = 360 / totalImages;

images.forEach((img, index) => {
  const rotateY = angle * index;
  img.style.transform = `rotateY(${rotateY}deg) translateZ(400px)`;
});
