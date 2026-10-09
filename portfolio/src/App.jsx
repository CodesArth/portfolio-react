import { useEffect, useRef, useState } from "react";
import { profile, skills, projects } from "./data.js";
import companyLogo from "./assets/codesarth.png";
import profilePhoto from "./assets/fotoarthur.png";

function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="logo">{profile.name}</a>
      <nav aria-label="Principal">
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <p className="role">{profile.role}</p>
        <h1>{profile.headline}</h1>
        <a className="btn" href="#projetos">Ver projetos</a>
      </div>

      <div className="hero-visual" aria-label="Perfil de Arthur Ítalo">
        <div className="profile-photo-wrap">
          <img
            className="profile-photo"
            src={profilePhoto}
            alt="Foto de Arthur Ítalo"
          />
        </div>
        <div className="company-logo-wrap">
          <img
            className="company-logo"
            src={companyLogo}
            alt="Logotipo da CodesArth"
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="section">
      <h2>Sobre mim</h2>
      <p className="about">{profile.about}</p>
      <ul className="skills">
        {skills.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </section>
  );
}

function getProjectCycleWidth(track) {
  const firstProject = track.children[0];
  const repeatedProject = track.children[projects.length];
  return repeatedProject.offsetLeft - firstProject.offsetLeft;
}

function wrapProjectTrack(track) {
  const cycleWidth = getProjectCycleWidth(track);
  if (!cycleWidth) return;

  const loopStart = cycleWidth * 0.5;
  const loopOffset = ((track.scrollLeft - loopStart) % cycleWidth + cycleWidth) % cycleWidth;
  if (track.scrollLeft < loopStart || track.scrollLeft >= loopStart + cycleWidth) {
    track.scrollLeft = loopStart + loopOffset;
  }
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const projectTrackRef = useRef(null);
  const dragStateRef = useRef(null);
  const suppressCardClickRef = useRef(false);

  useEffect(() => {
    if (!activeProject) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setActiveProject(null);
      if (event.key === "ArrowLeft" && activeProject.images.length > 0) {
        setActiveImage((index) =>
          (index - 1 + activeProject.images.length) % activeProject.images.length,
        );
      }
      if (event.key === "ArrowRight" && activeProject.images.length > 0) {
        setActiveImage((index) => (index + 1) % activeProject.images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  useEffect(() => {
    const track = projectTrackRef.current;
    if (!track) return undefined;

    function centerTrack() {
      track.scrollLeft = getProjectCycleWidth(track);
    }

    function wrapTrack() {
      wrapProjectTrack(track);
    }

    centerTrack();
    track.addEventListener("scroll", wrapTrack);
    window.addEventListener("resize", centerTrack);
    return () => {
      track.removeEventListener("scroll", wrapTrack);
      window.removeEventListener("resize", centerTrack);
    };
  }, []);

  function openProject(project) {
    setActiveImage(0);
    setActiveProject(project);
  }

  function startProjectDrag(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    dragStateRef.current = { pointerId: event.pointerId, lastX: event.clientX, moved: false };
  }

  function moveProjectDrag(event) {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragState.lastX;
    if (Math.abs(distance) > 2 && !dragState.moved) {
      dragState.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (dragState.moved) {
      event.currentTarget.scrollLeft -= distance;
      wrapProjectTrack(event.currentTarget);
    }
    dragState.lastX = event.clientX;
  }

  function endProjectDrag(event) {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    suppressCardClickRef.current = dragState.moved;
    if (dragState.moved) {
      window.setTimeout(() => {
        suppressCardClickRef.current = false;
      }, 0);
    }
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function moveWithKeyboard(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const track = projectTrackRef.current;
    const nextProject = track?.children[1];
    const currentProject = track?.children[0];
    if (!track || !nextProject || !currentProject) return;

    event.preventDefault();
    track.scrollLeft += (nextProject.offsetLeft - currentProject.offsetLeft)
      * (event.key === "ArrowRight" ? 1 : -1);
  }

  return (
    <section id="projetos" className="section">
      <h2>Projetos</h2>
      <div
        className="project-carousel"
        ref={projectTrackRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos"
        tabIndex={0}
        onPointerDown={startProjectDrag}
        onPointerMove={moveProjectDrag}
        onPointerUp={endProjectDrag}
        onPointerCancel={endProjectDrag}
        onKeyDown={moveWithKeyboard}
        onClickCapture={(event) => {
          if (suppressCardClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressCardClickRef.current = false;
          }
        }}
      >
        {[0, 1, 2].flatMap((copy) =>
          projects.map((project, index) => (
            <article
              key={`${copy}-${project.title}`}
              className="project"
              role="button"
              tabIndex={copy === 1 ? 0 : -1}
              aria-hidden={copy !== 1}
              onClick={() => openProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProject(project);
                }
              }}
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${projects.length}: ${project.title}. Ver detalhes.`}
            >
              <div className="project-heading">
                {project.logo && <img className="project-logo" src={project.logo} alt="" />}
                <div className="project-heading-copy">
                  <h3>{project.title}</h3>
                  {project.status && <span className="project-status">{project.status}</span>}
                </div>
              </div>
              <p>{project.description}</p>
              <ul className="tags">
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <span className="project-prompt">Explorar projeto <span aria-hidden="true">↗</span></span>
            </article>
          )),
        )}
      </div>

      {activeProject && (
        <div className="project-overlay" onClick={() => setActiveProject(null)}>
          <section
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-close"
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Fechar detalhes do projeto"
            >
              ×
            </button>

            <div className="project-gallery">
              {activeProject.images.length > 0 ? (
                <>
                  <img
                    className="project-image"
                    src={activeProject.images[activeImage]}
                    alt={`${activeProject.title}, imagem ${activeImage + 1}`}
                  />
                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        className="gallery-arrow gallery-previous"
                        type="button"
                        onClick={() => setActiveImage((index) =>
                          (index - 1 + activeProject.images.length) % activeProject.images.length,
                        )}
                        aria-label="Foto anterior"
                      >
                        ‹
                      </button>
                      <button
                        className="gallery-arrow gallery-next"
                        type="button"
                        onClick={() => setActiveImage((index) =>
                          (index + 1) % activeProject.images.length,
                        )}
                        aria-label="Próxima foto"
                      >
                        ›
                      </button>
                      <span className="gallery-count">
                        {activeImage + 1} / {activeProject.images.length}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <div className="gallery-empty" role="status">
                  <span>{activeProject.title}</span>
                </div>
              )}
            </div>

            <div className="project-details">
              <p className="project-kicker">Projeto</p>
              <h3 id="project-dialog-title">{activeProject.title}</h3>
              <p className="project-description">{activeProject.details || activeProject.description}</p>
              <ul className="tags">
                {activeProject.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="section">
      <h2>Contato</h2>
      <p>Quer conversar sobre um projeto ou vaga? Me escreva.</p>
      <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
      <ul className="social">
        {profile.links.map((l) => (
          <li key={l.label}>
            <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
