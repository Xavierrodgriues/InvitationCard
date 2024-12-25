const cards = document.querySelectorAll('.card');
let currentCard = 0;

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (index === currentCard) {
      // Animate current card to the back
      gsap.to(card, {
        duration: 1,
        scale: 0.6,
        y: 100,
        opacity: 0,
        zIndex: 1,
        ease: "power3.inOut"
      });

      // Move to the next card or loop back to the first
      currentCard = (currentCard + 1) % cards.length;
      const nextCard = cards[currentCard];

      // Animate the next card to the front
      gsap.to(nextCard, {
        duration: 1,
        scale: 1,
        y: 0,
        opacity: 1,
        zIndex: 3,
        ease: "power3.inOut"
      });

      // Adjust z-index for other cards
      cards.forEach((otherCard, i) => {
        if (i !== currentCard) {
          gsap.set(otherCard, {
            zIndex: i < currentCard ? 1 : 2,
          });
        }
      });

      // After the last page is clicked, show a popup
      if (currentCard === 0) {
        Swal.fire({
          title: 'See You at the Party!',
          text: 'We are looking forward to seeing you there! 🎉',
          icon: 'success',
          confirmButtonText: 'Got it!',
          backdrop: true,
          customClass: {
            popup: 'animated bounceInUp'
          }
        });
      }
    }
  });
});
