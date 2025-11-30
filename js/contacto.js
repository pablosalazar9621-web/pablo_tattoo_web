// ====================================
// FUNCIONES DE CONTACTO
// ====================================

/**
 * Inicializar el formulario de contacto
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    // Validación en tiempo real
    setupRealTimeValidation();
});

/**
 * Manejar el envío del formulario
 */
function handleFormSubmit() {
    const form = document.getElementById('contactForm');
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que todos los campos estén llenos
    if (!nombre || !email || !whatsapp || !asunto || !mensaje) {
        showErrorMessage('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Validar email
    if (!isValidEmail(email)) {
        showErrorMessage('Por favor, ingresa un email válido.');
        return;
    }

    // Validar teléfono
    if (!isValidPhone(whatsapp)) {
        showErrorMessage('Por favor, ingresa un número de teléfono válido.');
        return;
    }

    // Si todas las validaciones pasan, mostrar mensaje de éxito
    // En un caso real, aquí enviarías los datos al servidor
    submitForm(nombre, email, whatsapp, asunto, mensaje);
}

/**
 * Enviar el formulario
 */
function submitForm(nombre, email, whatsapp, asunto, mensaje) {
    // Simulación de envío (en producción esto sería una llamada AJAX)
    const contactData = {
        nombre: nombre,
        email: email,
        whatsapp: whatsapp,
        asunto: asunto,
        mensaje: mensaje,
        fecha: new Date().toLocaleDateString('es-ES')
    };

    // Guardar en localStorage para demostración
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push(contactData);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Mostrar mensaje de éxito
    showSuccessMessage();

    // Limpiar formulario
    document.getElementById('contactForm').reset();

    // Ocultar mensaje después de 5 segundos
    setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    if (successMsg) {
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Mostrar mensaje de error
 */
function showErrorMessage(message) {
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    if (errorMsg) {
        errorMsg.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i> ${message}`;
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Validar email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validar teléfono
 */
function isValidPhone(phone) {
    // Aceptar números con + y espacios
    const phoneRegex = /^\+?[\d\s\-()]{9,}$/;
    return phoneRegex.test(phone);
}

/**
 * Configurar validación en tiempo real
 */
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-control-custom, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('focus', function() {
            removeErrorState(this);
        });
    });
}

/**
 * Validar un campo individual
 */
function validateField(field) {
    let isValid = false;

    if (field.id === 'nombre') {
        isValid = field.value.trim().length > 0;
    } else if (field.id === 'email') {
        isValid = isValidEmail(field.value.trim());
    } else if (field.id === 'whatsapp') {
        isValid = isValidPhone(field.value.trim());
    } else if (field.id === 'asunto') {
        isValid = field.value !== '';
    } else if (field.id === 'mensaje') {
        isValid = field.value.trim().length > 10;
    }

    if (isValid) {
        addSuccessState(field);
    } else {
        addErrorState(field);
    }
}

/**
 * Agregar estado de error a un campo
 */
function addErrorState(field) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
}

/**
 * Agregar estado de éxito a un campo
 */
function addSuccessState(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

/**
 * Remover estado de error
 */
function removeErrorState(field) {
    field.classList.remove('is-invalid');
}

/**
 * Formato automático de teléfono
 */
document.addEventListener('DOMContentLoaded', function() {
    const whatsappInput = document.getElementById('whatsapp');
    
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            // Permitir solo números, +, espacios y guiones
            let value = e.target.value;
            value = value.replace(/[^\d\+\s\-()]/g, '');
            e.target.value = value;
        });
    }
});
