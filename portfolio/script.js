// Validasi Gambar & Sistem Placeholder Otomatis
document.querySelectorAll('.cert-img-target').forEach(img => {
    img.onerror = function() {
        // Jika file gambar gagal dimuat (tidak ada di folder), hapus elemen img agar ikon CSS muncul
        this.classList.add('hidden');
    };
});

// Fitur 3D Tilt Card (Miring mengikuti Kursor) hanya aktif di Desktop
const cards = document.querySelectorAll('.dynamic-tilt');
if (window.innerWidth > 992) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardX = e.clientX - cardRect.left - cardRect.width / 2;
            const cardY = e.clientY - cardRect.top - cardRect.height / 2;
            
            // Mengatur rotasi miring
            card.style.transform = `rotateX(${-cardY / 12}deg) rotateY(${cardX / 12}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// Fitur Lightbox (Klik Gambar untuk Membesar)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(cardElement) {
    const imgElement = cardElement.querySelector('.cert-img-target');
    const titleText = cardElement.querySelector('h3').innerText;
    
    // Periksa apakah gambar berstatus tersembunyi (error fallback)
    if (imgElement.classList.contains('hidden')) {
        // Jika tidak ada file gambar asli, lightbox akan membuka versi ikon representatif
        alert(`Gambar fisik untuk "${titleText}" belum dimasukkan ke folder proyek Anda.`);
        return;
    }

    lightbox.style.display = "block";
    lightboxImg.src = imgElement.src;
    lightboxCaption.innerHTML = titleText;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// Nav Menu Aktif saat Scroll Halaman
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Toggle Hamburger Menu Mobile
const menuToggle = document.querySelector('#mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});