export function initVideoSync() {
  const video = document.getElementById('hero-video');
  const heroContent = document.querySelector('.hero__content');
  if (!video || !heroContent) return;

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    try {
      video.pause();
      // Hold on the final rendered frame (Earth-from-space). Seeking a hair
      // before duration keeps the frame visible across browsers that otherwise
      // clear the surface when `ended` fires.
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.max(0, video.duration - 0.1);
      }
    } catch {}
    heroContent.classList.add('hero__content--revealed');
  };

  video.play().catch(() => {
    document.addEventListener('click', () => video.play(), { once: true });
  });

  video.addEventListener('ended', reveal);
  video.addEventListener('timeupdate', () => {
    if (!revealed && video.duration && video.currentTime >= video.duration - 0.25) reveal();
  });
  video.addEventListener('error', reveal);

  setTimeout(reveal, 17000);
}
