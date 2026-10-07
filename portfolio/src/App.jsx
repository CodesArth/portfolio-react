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

function Projects() {
  return (
    <section id="projetos" className="section">
      <h2>Projetos</h2>
      <div className="projects">
        {projects.map((p) => (
          <article key={p.title} className="project">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="project-links">
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Ver online</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Código</a>}
            </div>
          </article>
        ))}
      </div>
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
