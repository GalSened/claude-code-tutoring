export function initVideoSync() {
  const video = document.getElementById('hero-video');
  if (!video) return;

  // Ensure video plays (browsers may block autoplay)
  video.play().catch(() => {
    // Autoplay blocked — show poster, video will play on first interaction
    document.addEventListener('click', () => video.play(), { once: true });
  });
}
