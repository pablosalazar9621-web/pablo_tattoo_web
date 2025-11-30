// ====================================
// FUNCIONES DE VIDEOS
// ====================================

/**
 * Reproduce un video en el modal
 */
function playVideo(videoSrc) {
    const modalVideo = document.getElementById('modalVideo');
    const videoModal = document.getElementById('videoModal');
    
    if (modalVideo && videoSrc) {
        modalVideo.src = videoSrc;
        modalVideo.play();
        
        // Cerrar modal al terminar el video
        modalVideo.addEventListener('ended', function() {
            const modal = bootstrap.Modal.getInstance(videoModal);
            if (modal) modal.hide();
        }, { once: true });
    }
}

/**
 * Detener video cuando se cierra el modal
 */
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    
    if (videoModal) {
        videoModal.addEventListener('hide.bs.modal', function() {
            const modalVideo = document.getElementById('modalVideo');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        });
    }

    // Obtener duración de los videos
    getVideoDurations();
});

/**
 * Obtener y mostrar la duración de los videos
 */
function getVideoDurations() {
    const videos = document.querySelectorAll('.video-preview');
    
    videos.forEach((video, index) => {
        video.addEventListener('loadedmetadata', function() {
            const duration = formatTime(video.duration);
            const durationElement = document.getElementById(`duration-${index + 1}`);
            if (durationElement) {
                durationElement.textContent = duration;
            }
        });
    });
}

/**
 * Formatear tiempo en MM:SS
 */
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Permitir reproducción de preview al hover (opcional)
 */
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-preview');
    
    videos.forEach(video => {
        const container = video.closest('.video-container');
        
        if (container) {
            container.addEventListener('mouseenter', function() {
                // Opcional: mostrar primer frame del video
                video.load();
            });
            
            container.addEventListener('mouseleave', function() {
                // Pausar el video cuando se va el mouse
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});
