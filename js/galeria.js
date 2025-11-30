// ====================================
// FUNCIONES DE GALERÍA
// ====================================

/**
 * Carga la imagen en el modal
 */
function loadModalImage(button) {
    const img = button.closest('.galeria-overlay').previousElementSibling;
    const modalImg = document.getElementById('modalImage');
    if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }
}

/**
 * Inicializar event listeners para las imágenes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading de imágenes
    const images = document.querySelectorAll('.galeria-img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Permitir cerrar modal con ESC
    const galeriaModal = document.getElementById('galeriaModal');
    if (galeriaModal) {
        galeriaModal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = bootstrap.Modal.getInstance(galeriaModal);
                if (modal) modal.hide();
            }
        });
    }
});

/**
 * Navegación entre imágenes con flechas (opcional)
 */
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galeriaModal');
    
    if (modal) {
        modal.addEventListener('show.bs.modal', function() {
            document.addEventListener('keydown', navigateImages);
        });
        
        modal.addEventListener('hide.bs.modal', function() {
            document.removeEventListener('keydown', navigateImages);
        });
    }
});

function navigateImages(e) {
    const modalImg = document.getElementById('modalImage');
    const allImages = Array.from(document.querySelectorAll('.galeria-img'));
    const currentIndex = allImages.findIndex(img => img.src === modalImg.src);
    
    if (e.key === 'ArrowRight' && currentIndex < allImages.length - 1) {
        modalImg.src = allImages[currentIndex + 1].src;
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        modalImg.src = allImages[currentIndex - 1].src;
    }
}
