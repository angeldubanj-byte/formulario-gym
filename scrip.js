
/* ========================================
   GYMPRO
   PARTÍCULAS EN MOVIMIENTO
   ======================================== */


/* ========================================
   CREAR CANVAS
   ======================================== */

const canvas = document.createElement("canvas");

canvas.id = "particlesCanvas";

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");


/* ========================================
   CONFIGURACIÓN
   ======================================== */

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 140
};


/* ========================================
   AJUSTAR TAMAÑO
   ======================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    createParticles();
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ========================================
   MOUSE
   ======================================== */

window.addEventListener("mousemove", function(event) {

    mouse.x = event.clientX;

    mouse.y = event.clientY;

});


window.addEventListener("mouseout", function() {

    mouse.x = null;

    mouse.y = null;

});


/* ========================================
   CREAR PARTÍCULAS
   ======================================== */

function createParticles() {

    particles = [];

    const cantidad = Math.min(
        100,
        Math.floor(
            (window.innerWidth * window.innerHeight) / 12000
        )
    );


    for (let i = 0; i < cantidad; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 2.5 + 0.8,

            speedX:
                (Math.random() - 0.5) * 0.6,

            speedY:
                (Math.random() - 0.5) * 0.6,

            opacity:
                Math.random() * 0.5 + 0.2

        });
    }
}


/* ========================================
   DIBUJAR PARTÍCULA
   ======================================== */

function drawParticle(particle) {

    ctx.beginPath();

    ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        `rgba(255, 255, 255, ${particle.opacity})`;

    ctx.fill();
}


/* ========================================
   ACTUALIZAR PARTÍCULAS
   ======================================== */

function updateParticles() {

    particles.forEach(function(particle) {

        particle.x += particle.speedX;

        particle.y += particle.speedY;


        /* Rebote horizontal */

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {

            particle.speedX *= -1;
        }


        /* Rebote vertical */

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {

            particle.speedY *= -1;
        }


        /* ==================================
           INTERACCIÓN CON EL MOUSE
           ================================== */

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                particle.x - mouse.x;

            const dy =
                particle.y - mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < mouse.radius &&
                distance > 0
            ) {

                const force =
                    (mouse.radius - distance)
                    / mouse.radius;

                particle.x +=
                    (dx / distance)
                    * force
                    * 1.2;

                particle.y +=
                    (dy / distance)
                    * force
                    * 1.2;
            }
        }

    });
}


/* ========================================
   UNIR PARTÍCULAS
   ======================================== */

function connectParticles() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 110) {

                const opacity =
                    (1 - distance / 110)
                    * 0.20;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }
        }
    }
}


/* ========================================
   ANIMACIÓN PRINCIPAL
   ======================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    updateParticles();

    connectParticles();


    particles.forEach(function(particle) {

        drawParticle(particle);

    });


    requestAnimationFrame(animate);
}


animate();


/* ========================================
   MENSAJES MOTIVACIONALES
   ======================================== */

const motivationalMessages = [

    "¡Buena repetición! 💪",

    "¡Un paso más cerca de tu meta! 🎯",

    "¡Sigue así! 🔥",

    "¡Excelente trabajo! 💪",

    "¡Tu esfuerzo cuenta! 👊",

    "¡No pares ahora! 🚀",

    "¡Vamos por ese objetivo! 🏆",

    "¡Cada día más fuerte! 💪"

];


/* ========================================
   MOSTRAR MENSAJE
   ======================================== */

function showMotivationalMessage() {

    const message =
        motivationalMessages[
            Math.floor(
                Math.random()
                * motivationalMessages.length
            )
        ];


    const notification =
        document.createElement("div");

    notification.className =
        "motivational-message";

    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(function() {

        notification.classList.add("show");

    }, 50);


    setTimeout(function() {

        notification.classList.remove("show");


        setTimeout(function() {

            notification.remove();

        }, 400);

    }, 2200);
}


/* ========================================
   VALIDACIÓN DE CAMPOS
   ======================================== */

const form =
    document.querySelector("form");


if (form) {

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(function(field) {

        field.addEventListener(
            "change",
            function() {

                if (
                    field.checkValidity()
                ) {

                    showMotivationalMessage();

                }

            }
        );

    });
}

