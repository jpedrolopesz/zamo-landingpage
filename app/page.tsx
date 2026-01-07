"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    // Registrar plugin GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Inicializar Lenis com configuração correta
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Integração Lenis com GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth step function
    const smoothStep = (p: number) => p * p * (3 - 2 * p);

    // ====== HERO ANIMATION ======
    const heroTrigger = ScrollTrigger.create({
      trigger: ".hero-bodak",
      start: "top top",
      end: "75% top",
      scrub: 1,
      markers: false, // Mude para true para debug
      onUpdate: (self) => {
        const progress = self.progress;

        const heroCardsContainerOpacity = gsap.utils.interpolate(
          1,
          0.5,
          smoothStep(progress),
        );
        gsap.set(".bodak-cards", {
          opacity: heroCardsContainerOpacity,
        });

        ["#hero-card-1", "#hero-card-2", "#hero-card-3"].forEach(
          (cardId, index) => {
            const delay = index * 0.1;
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - delay) / (1 - delay),
            );

            const y = gsap.utils.interpolate(0, 250, smoothStep(cardProgress));
            const scale = gsap.utils.interpolate(
              1,
              0.75,
              smoothStep(cardProgress),
            );

            let x = 0;
            let rotation = 0;

            if (index === 0) {
              x = gsap.utils.interpolate(0, 90, smoothStep(cardProgress));
              rotation = gsap.utils.interpolate(
                0,
                -15,
                smoothStep(cardProgress),
              );
            } else if (index === 2) {
              x = gsap.utils.interpolate(0, -90, smoothStep(cardProgress));
              rotation = gsap.utils.interpolate(
                0,
                15,
                smoothStep(cardProgress),
              );
            }

            gsap.set(cardId, {
              y: `${y}%`,
              x: `${x}%`,
              rotation: rotation,
              scale: scale,
            });
          },
        );
      },
    });
    gsap.set(".cards", { autoAlpha: 0 });

    // ====== SERVICES PIN ======
    const servicesPin = ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      pinSpacing: true,
      markers: false, // Mude para true para debug
    });

    const cardsVisibility = ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      onEnter: () => gsap.set(".cards", { autoAlpha: 1 }),
      onEnterBack: () => gsap.set(".cards", { autoAlpha: 1 }),
      onLeave: () => gsap.set(".cards", { autoAlpha: 0 }),
      onLeaveBack: () => gsap.set(".cards", { autoAlpha: 0 }),
    });

    // ====== CARDS ANIMATION ======
    const cardsAnimation = ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      scrub: 1,
      markers: false, // Mude para true para debug
      onUpdate: (self) => {
        const progress = self.progress;

        // Animar header
        const headerProgress = gsap.utils.clamp(0, 1, progress / 0.1);
        const headerY = gsap.utils.interpolate(
          400,
          0,
          smoothStep(headerProgress),
        );

        gsap.set(".services-header", {
          y: `${headerY}%`,
        });

        // Animar cards
        //
        //
        ["#card-1", "#card-2", "#card-3"].forEach((cardId, index) => {
          const card = document.querySelector(cardId);
          const innerCard = document.querySelector(
            `${cardId} .flip-card-inner`,
          );

          if (!card || !innerCard) return;

          const delay = index * 0.1;
          const cardProgress = gsap.utils.clamp(
            0,
            1,
            (progress - delay) / (1 - delay),
          );

          // Calcular Y
          let y;
          if (cardProgress < 0.3) {
            const normalizedProgress = cardProgress / 0.3;
            y = gsap.utils.interpolate(-100, 0, smoothStep(normalizedProgress));
          } else {
            y = 0;
          }

          // Calcular Scale
          let scale;
          if (cardProgress < 0.3) {
            const normalizedProgress = cardProgress / 0.3;
            scale = gsap.utils.interpolate(
              0.25,
              1,
              smoothStep(normalizedProgress),
            );
          } else {
            scale = 1;
          }

          // Calcular Opacity
          let opacity;
          if (cardProgress < 0.2) {
            const normalizedProgress = cardProgress / 0.2;
            opacity = smoothStep(normalizedProgress);
          } else {
            opacity = 1;
          }

          // Calcular X e Rotation
          let x, rotate, rotationY;
          if (cardProgress < 0.3) {
            // Posição inicial
            x = index === 0 ? 100 : index === 1 ? 0 : -100;
            rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
            rotationY = 0;
          } else if (cardProgress < 0.7) {
            // Movimento para o centro
            const normalizedProgress = (cardProgress - 0.3) / 0.4;
            x = gsap.utils.interpolate(
              index === 0 ? 100 : index === 1 ? 0 : -100,
              0,
              smoothStep(normalizedProgress),
            );
            rotate = gsap.utils.interpolate(
              index === 0 ? -5 : index === 1 ? 0 : 5,
              0,
              smoothStep(normalizedProgress),
            );
            rotationY = 0;
          } else if (cardProgress < 1) {
            // Flip do card
            const normalizedProgress = (cardProgress - 0.7) / 0.3;
            x = 0;
            rotate = 0;
            rotationY = smoothStep(normalizedProgress) * 180;
          } else {
            // Estado final
            x = 0;
            rotate = 0;
            rotationY = 180;
          }

          gsap.set(card, {
            opacity: opacity,
            y: `${y}%`,
            x: `${x}%`,
            rotate: rotate,
            scale: scale,
          });

          gsap.set(innerCard, {
            rotationY: rotationY,
          });
        });
      },
    });

    // Cleanup
    return () => {
      heroTrigger.kill();
      servicesPin.kill();
      cardsVisibility.kill();

      cardsAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <nav className="nav-bodak">
        <a className="logo-pill" href="#">
          TODO: Site Logo
        </a>

        <div className="nav-pills">
          <a className="nav-pill is-active" href="#hoje">
            Home
          </a>
          <a className="nav-pill" href="#process">
            TODO
          </a>
          <a className="nav-pill" href="#preco">
            TODO
          </a>
        </div>

        <a className="nav-pill nav-pill--right" href="#feed">
          Feed
        </a>
      </nav>

      <section className="hero-bodak">
        <div className="hero-main">
          {/* TÍTULO GIGANTE */}
          <h1 className="hero-title-xl">
            FLASHCARDS <span className="title-muted">APP</span>
          </h1>

          {/* CARDS CENTRALIZADOS (usa seus cards) */}
          <div className="bodak-cards" id="plans">
            <div className="card mini-card mini-1" id="hero-card-1">
              <div className="mini-top">
                <span>Plan</span>
                <span>01</span>
              </div>
              <div /> {/* espaço do meio (ícone/pixel etc se quiser) */}
              <div className="mini-bottom">
                <span>01</span>
                <span>Plan</span>
              </div>
            </div>

            <div className="card mini-card mini-2" id="hero-card-2">
              <div className="mini-top">
                <span>Plan</span>
                <span>02</span>
              </div>
              <div />
              <div className="mini-bottom">
                <span>02</span>
                <span>Plan</span>
              </div>
            </div>

            <div className="card mini-card mini-3" id="hero-card-3">
              <div className="mini-top">
                <span>Plan</span>
                <span>03</span>
              </div>
              <div />
              <div className="mini-bottom">
                <span>03</span>
                <span>Plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* “FOOTER” DO HERO (texto/cta embaixo, igual referência) */}
        <div className="hero-footer">
          <div className="hero-footer-left">
            <span className="price-pill">Revisão realmente inteligente</span>

            <p className="hero-lead">
              Pare de revisar tudo: revise só o que vai te fazer evoluir.{" "}
            </p>
            <span className="muted">
              Em vez de “estudar mais”, estude melhor. Flashcards adaptativos
              organizam suas revisões para maximizar retenção e reduzir
              esquecimento.
            </span>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#plans">
                Baixar grátis na App Store
              </a>
              <a className="btn btn-secondary" href="#services">
                Ver detalhes
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <h1>TODO: COLOCAR VIDEO AQUI</h1>
      </section>

      <section className="services">
        <div className="services-header">
          <h1>TODO: AS FUNCIONALIDADES</h1>
        </div>
      </section>

      <section className="cards">
        <div className="cards-container">
          <div className="card" id="card-1">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>01</span>
                  </div>
                  <div className="card-title">
                    <span>01</span>
                    <span>Plan</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>01</span>
                  </div>
                  <div className="card-copy">
                    <p>Discovery</p>
                    <p>Research</p>
                    <p>Strategy</p>
                    <p>Design</p>
                    <p>Development</p>
                    <p>Launch</p>
                  </div>
                  <div className="card-title">
                    <span>01</span>
                    <span>Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" id="card-2">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>02</span>
                  </div>
                  <div className="card-title">
                    <span>02</span>
                    <span>Plan</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>02</span>
                  </div>
                  <div className="card-copy">
                    <p>Branding</p>
                    <p>Identity</p>
                    <p>Marketing</p>
                    <p>Content</p>
                    <p>SEO</p>
                    <p>Analytics</p>
                  </div>
                  <div className="card-title">
                    <span>02</span>
                    <span>Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" id="card-3">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>03</span>
                  </div>
                  <div className="card-title">
                    <span>03</span>
                    <span>Plan</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Plan</span>
                    <span>03</span>
                  </div>
                  <div className="card-copy">
                    <p>Support</p>
                    <p>Maintenance</p>
                    <p>Updates</p>
                    <p>Security</p>
                    <p>Hosting</p>
                    <p>Optimization</p>
                  </div>
                  <div className="card-title">
                    <span>03</span>
                    <span>Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Thanks for scrolling!</h1>
      </section>
    </>
  );
}
