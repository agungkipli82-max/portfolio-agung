/* ==========================================================
   PORTFOLIO JAVASCRIPT
   Agung Bagus Prianto
   ========================================================== */


/* ==========================================================
   01. MOBILE MENU
   ========================================================== */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.querySelector(".nav-menu");


/*
    Ketika tombol menu HP diklik,
    menu akan muncul / disembunyikan.
*/

if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("active");

        }
    );

}



/* ==========================================================
   02. CLOSE MOBILE MENU
   ========================================================== */


/*
    Ketika link navigasi diklik,
    menu HP akan otomatis ditutup.
*/

const navLinks =
    document.querySelectorAll(".nav-menu a");


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("active");

            }
        );

    }
);



/* ==========================================================
   03. 3D PROFILE CARD
   ========================================================== */

const profileCard =
    document.getElementById("profileCard");


/*
    Efek ini membuat kartu profil
    sedikit mengikuti gerakan mouse.

    Kalau ingin mematikan efek 3D,
    bagian ini bisa dihapus/dinonaktifkan.
*/

if (profileCard) {

    profileCard.addEventListener(
        "mousemove",
        (event) => {


            const card =
                profileCard.querySelector(
                    ".profile-card"
                );


            if (!card) {
                return;
            }


            const rectangle =
                profileCard.getBoundingClientRect();


            const centerX =
                rectangle.left +
                rectangle.width / 2;


            const centerY =
                rectangle.top +
                rectangle.height / 2;


            const mouseX =
                event.clientX -
                centerX;


            const mouseY =
                event.clientY -
                centerY;


            const rotateX =
                -(mouseY / 18);


            const rotateY =
                mouseX / 18;


            card.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
                `;

        }
    );



    profileCard.addEventListener(
        "mouseleave",
        () => {

            const card =
                profileCard.querySelector(
                    ".profile-card"
                );


            if (!card) {
                return;
            }


            card.style.transform =
                "rotateX(0deg) rotateY(0deg)";

        }
    );

}



/* ==========================================================
   04. 3D SKILL & PROJECT CARDS
   ========================================================== */

const tiltCards =
    document.querySelectorAll(".tilt-card");


/*
    Semua card dengan class
    "tilt-card" akan mendapatkan
    efek 3D saat mouse bergerak.
*/

tiltCards.forEach(
    (card) => {


        card.addEventListener(
            "mousemove",
            (event) => {


                const rectangle =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rectangle.left;


                const y =
                    event.clientY -
                    rectangle.top;


                const centerX =
                    rectangle.width / 2;


                const centerY =
                    rectangle.height / 2;


                const rotateX =
                    -(y - centerY) / 20;


                const rotateY =
                    (x - centerX) / 20;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );



        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(800px) rotateX(0deg) rotateY(0deg)";

            }
        );

    }
);



/* ==========================================================
   05. SCROLL REVEAL
   ========================================================== */


/*
    Section akan muncul perlahan
    ketika masuk ke layar.
*/

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {


            entries.forEach(
                (entry) => {


                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                }
            );

        },
        {

            threshold: 0.12

        }
    );



revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



/* ==========================================================
   06. CONSOLE MESSAGE
   ========================================================== */


/*
    Pesan ini hanya untuk memastikan
    JavaScript berhasil berjalan.

    Bisa dicek dengan:
    Chrome → F12 → Console
*/

console.log(
    "Agung Portfolio JavaScript berhasil dijalankan."
);


/* =========================================
   PHOTO LIGHTBOX / FOTO DOKUMENTASI
   ========================================= */

const documentationImages = document.querySelectorAll("#projects img");

const lightbox = document.createElement("div");

lightbox.id = "photoLightbox";

lightbox.innerHTML = `
    <button id="closeLightbox" aria-label="Tutup foto">
        ×
    </button>

    <img id="lightboxImage" src="" alt="Dokumentasi">

    <div id="lightboxCaption"></div>
`;

document.body.appendChild(lightbox);


const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");


documentationImages.forEach((image) => {

    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = image.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closePhotoLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


closeLightbox.addEventListener(
    "click",
    closePhotoLightbox
);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closePhotoLightbox();
    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closePhotoLightbox();
    }

});


/* =========================================
   LIGHTBOX STYLE
   ========================================= */

const lightboxStyle = document.createElement("style");

lightboxStyle.textContent = `

#photoLightbox {

    position: fixed;

    inset: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.92);

    display: flex;

    align-items: center;
    justify-content: center;

    flex-direction: column;

    padding: 30px;

    box-sizing: border-box;

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transition:
        opacity 0.3s ease,
        visibility 0.3s ease;

    z-index: 99999;

}


#photoLightbox.active {

    opacity: 1;

    visibility: visible;

    pointer-events: auto;

}


#lightboxImage {

    max-width: 90vw;

    max-height: 82vh;

    width: auto;

    height: auto;

    object-fit: contain;

    border-radius: 12px;

    box-shadow:
        0 0 40px rgba(0, 255, 170, 0.25);

    transform: scale(0.85);

    transition: transform 0.3s ease;

}


#photoLightbox.active #lightboxImage {

    transform: scale(1);

}


#closeLightbox {

    position: absolute;

    top: 25px;
    right: 30px;

    width: 48px;
    height: 48px;

    border: 1px solid rgba(0, 255, 170, 0.5);

    border-radius: 50%;

    background: rgba(0, 0, 0, 0.5);

    color: white;

    font-size: 32px;

    line-height: 1;

    cursor: pointer;

    z-index: 100000;

}


#closeLightbox:hover {

    transform: scale(1.1);

}


#lightboxCaption {

    margin-top: 15px;

    color: white;

    text-align: center;

    font-size: 15px;

    letter-spacing: 0.5px;

}


@media (max-width: 600px) {

    #lightboxImage {

        max-width: 95vw;

        max-height: 75vh;

    }

    #closeLightbox {

        top: 15px;

        right: 15px;

    }

}

`;

document.head.appendChild(lightboxStyle);