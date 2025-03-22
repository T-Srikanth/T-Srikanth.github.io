document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.video-container');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const videos = document.querySelectorAll('video');
  
  // Try to force video loading and play
  videos.forEach(video => {
      // Force load
      video.load();
      
      // Try to play when loaded
      video.addEventListener('loadeddata', function() {
          video.play().catch(e => {
              console.log('Video play failed:', e);
          });
      });
      
      // Error handling for video
      video.addEventListener('error', function() {
          console.log('Video error:', video.error);
      });
      
      // Make sure the videos stay in sync
      video.addEventListener('play', function() {
          videos.forEach(v => {
              if (v !== video) {
                  v.currentTime = video.currentTime;
              }
          });
      });
  });
  
  // Set up the scroll event listener
  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate and apply the transform to move the video container up
      const moveAmount = Math.min(windowHeight, scrollPosition);
      videoContainer.style.transform = `translateY(-${moveAmount}px)`;
      
      // Hide scroll indicator when scrolling starts
      if (scrollPosition > 50) {
          scrollIndicator.style.opacity = 0;
      } else {
          scrollIndicator.style.opacity = 0.8;
      }
  });
});