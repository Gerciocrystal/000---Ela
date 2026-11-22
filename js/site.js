(function () {
  "use strict";

  const CONFIG = {
    yourName: "Gercio Narciso",
    herName: "Aaliyah Marcela",
    startDate: "2023-12-01T13:00:00",
    separationDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    futureWeddingPhoto: "./fotos/futuro-casamento.jpg",

    trustPhotos: [
      "./fotos/foto1.jpeg",
      "./fotos/foto2.jpeg",
      "./fotos/foto3.jpeg",
      "./fotos/foto4.jpeg",
      "./fotos/foto5.jpeg",
      "./fotos/foto6.jpeg",
    ],
  };

  const byId = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = byId(id);
    if (el) el.textContent = value;
  };

  function initGate() {
    const gate = byId("gate");
    const enterBtn = byId("enterBtn");
    if (!gate || !enterBtn) return;

    enterBtn.addEventListener("click", function () {
      gate.classList.add("is-open");

      setTimeout(() => initPetals(), 400);
    });
  }

  function initCounter() {
    const start = new Date(CONFIG.startDate);
    const now = new Date();

    const sinceLabel =
      "Desde " +
      start.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    setText("sinceLabel", sinceLabel);

    function updateCounter() {
      const current = new Date();
      const ms = Math.max(0, current - start);
      const totalSeconds = Math.floor(ms / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      let years = current.getFullYear() - start.getFullYear();
      let months = current.getMonth() - start.getMonth();
      let days = current.getDate() - start.getDate();
      let hours = current.getHours() - start.getHours();
      let minutes = current.getMinutes() - start.getMinutes();
      let seconds = current.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        months--;
        const prevMonth = new Date(
          current.getFullYear(),
          current.getMonth(),
          0
        );
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setText("years", Math.max(0, years));
      setText("months", Math.max(0, months));
      setText("days", Math.max(0, days));
      setText("hours", Math.max(0, hours));
      setText("minutes", Math.max(0, minutes));
      setText("seconds", Math.max(0, seconds));
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".tl-item");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initChoiceButtons() {
    const believeBtn = byId("believeBtn");
    const trustBtn = byId("trustBtn");
    const panel = byId("revealPanel");
    const content = byId("revealContent");
    if (!believeBtn || !trustBtn || !panel || !content) return;

    let currentPanel = null;

    function showPanel(type) {
      // Limpa estado anterior
      panel.classList.remove("is-active");
      content.innerHTML = "";
      currentPanel = type;

      setTimeout(function () {
        if (type === "believe") {
          content.innerHTML = `
                <div class="future-panel">
                  <figure class="future-photo">
                    <img src="${CONFIG.futureWeddingPhoto}" alt="Nosso futuro casamento" loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 800 600\\'%3E%3Crect fill=\\'%235c1a2b\\' width=\\'800\\' height=\\'600\\'/%3E%3Ctext x=\\'400\\' y=\\'300\\' font-family=\\'Georgia\\' font-size=\\'28\\' fill=\\'%23e8d5a3\\' text-anchor=\\'middle\\'%3ENosso futuro%3C/text%3E%3C/svg%3E'">
                    <figcaption>Um futuro que eu ainda quero construir contigo</figcaption>
                  </figure>
                  <h3>O futuro nos aguarda</h3>
                  <p class="script">Eu escolho você. Todos os dias.</p>
                  <p>Eu sei que o caminho não será fácil. Sei que a confiança precisa ser reconstruída, e que palavras sozinhas não bastam. Mas eu acredito — com toda a força do meu coração — que ainda podemos ser felizes juntos.</p>
                  <p>Não te prometo perfeição. Te prometo presença. Te prometo esforço. Te prometo que vou lutar por nós, todos os dias, com atitudes que provem o meu amor. Porque você é o meu futuro, Aaliyah.</p>
                  <p style="margin-top:1.5rem; font-family:'Great Vibes',cursive; font-size:1.8rem; color:var(--gold-deep);">Eu te amo.</p>
                </div>
              `;
        } else if (type === "trust") {
          let gridHTML = "";
          CONFIG.trustPhotos.forEach(function (src, i) {
            gridHTML += `
                  <figure>
                    <img src="${src}" alt="Momento ${i + 1}" loading="lazy"
                         onerror="this.parentElement.style.background='linear-gradient(135deg,var(--wine),var(--wine-deep))';this.style.display='none'">
                  </figure>
                `;
          });

          content.innerHTML = `
                <div class="trust-panel">
                  <div class="trust-text">
                    <p>"Porque eu te amo, e por ti sou capaz de enfrentar de tudo. Sei que falhei contigo no passado, mas hoje escolho estar presente, ouvir-te, cuidar de ti e provar todos os dias — com atitudes e não apenas palavras — que o nosso amor vale a pena."</p>
                  </div>
                  <div class="trust-grid">
                    ${gridHTML}
                  </div>
                </div>
              `;
        }

        panel.classList.add("is-active");

        setTimeout(function () {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }, 100);
    }

    believeBtn.addEventListener("click", function () {
      if (currentPanel === "believe") {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      showPanel("believe");
    });

    trustBtn.addEventListener("click", function () {
      if (currentPanel === "trust") {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      showPanel("trust");
    });
  }

  function initPetals() {
    const canvas = byId("petals");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width, height;
    const petals = [];
    const PETAL_COUNT = 24;
    let animationId = null;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createPetal(anywhere) {
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : -20,
        size: 3 + Math.random() * 5,
        speed: 0.3 + Math.random() * 0.7,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        opacity: 0.15 + Math.random() * 0.25,
        color: Math.random() > 0.5 ? "#c9a84c" : "#b84c5e",
      };
    }

    function drawHeart(x, y, size, color, angle, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);
      ctx.bezierCurveTo(
        -size,
        -size * 0.4,
        -size * 0.5,
        -size,
        0,
        -size * 0.45
      );
      ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.4, 0, size * 0.3);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(function (petal) {
        petal.y += petal.speed;
        petal.x += Math.sin(petal.angle) * 0.3;
        petal.angle += petal.spin;

        if (petal.y > height + 20) {
          Object.assign(petal, createPetal(false));
        }

        drawHeart(
          petal.x,
          petal.y,
          petal.size,
          petal.color,
          petal.angle,
          petal.opacity
        );
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(createPetal(true));
    }

    window.addEventListener("resize", resize);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    animate();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGate();
    initCounter();
    initScrollReveal();
    initChoiceButtons();
  });
})();
