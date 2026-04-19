import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import { portfolioData } from "../../data/portfolioData";
import "./Hero.scss";
import HeroMorphScene from "./HeroMorphScene";

export default function Hero() {
  const { hero } = portfolioData;
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tagline = hero.taglines[currentTagline];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === tagline) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTagline((prev) => (prev + 1) % hero.taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? tagline.substring(0, prev.length - 1)
          : tagline.substring(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline, hero.taglines]);

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-code-comment">
            <span className="code-slashes">{'//'}</span> introducing the developer
          </div>

          <span className="hero-greeting">
            <span className="code-keyword">const</span>{' '}
            <span className="code-var">greeting</span>{' '}
            <span className="code-operator">=</span>{' '}
            <span className="code-string">"Hello, I'm"</span>
            <span className="code-semi">;</span>
          </span>

          <h1 className="hero-name">
            <span className="code-keyword">class</span>{" "}
            {hero.name.split(" ")[0]}
            <span className="code-operator">_</span>
            <span className="gradient">
              {hero.name.split(" ").slice(1).join("_")}
            </span>
          </h1>

          <div className="hero-title-wrapper">
            <span className="hero-title-static">
              <span className="code-keyword">role</span>
              <span className="code-operator">:</span>
            </span>
            <span className="hero-title-dynamic">"{displayText}"</span>
          </div>

          <div className="hero-description-block">
            <div className="code-comment-block">
              <span className="code-comment-open">{'/**'}</span>
              <p className="hero-description">
                <span className="code-star">{' * '}</span>{hero.summary}
              </p>
              <span className="code-comment-close">{' */'}</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              <FiArrowRight /> <span className="btn-code">startCollab<span className="btn-parens">()</span></span>
            </Link>
            <a href={hero.cvLink} className="btn-outline" download>
              <FiDownload /> <span className="btn-code">downloadCV<span className="btn-parens">()</span></span>
            </a>
          </div>

          <div className="hero-socials">
            <a
              href={hero.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href={hero.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href={`mailto:${hero.socials.email}`} aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <HeroMorphScene />
        </div>
      </div>

    </section>
  );
}
