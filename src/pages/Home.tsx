import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TestimonialCard from "../components/TestimonialCard";
import Logo from "../assets/logo.svg";
import Menu from "../assets/menu.svg";
import Close from "../assets/close.svg";
import HeroRectangleOne from "../assets/images/rectangleOne.png";
import HeroRectangleTwo from "../assets/images/rectangleTwo.png";
import "../styles/hero.css";
import "../styles/header.css";
import "../styles/utility.css";
import Button from "../components/Button";
import Profile from "../assets/images/profile.png";
import ProfileTwo from "../assets/images/profile2.png";
import ProfileThree from "../assets/images/profile3.png";
import Card from "../components/Card";
import Check from "../assets/Check.svg";
import IconInsta from "../assets/insta.svg";
import IconFace from "../assets/face.svg";
import IconYT from "../assets/you.svg";
import korn from "../assets/images/korn.png";
import radiohead from "../assets/images/radiohead.png";
import deftones from "../assets/images/deftones.png";

export default function Home() {
    const [email, setEmail] = useState("");
    function handleCompleteChallenge(token: string | null) {
        if (!token) {
            setChallengeCompleted(false);
            return;
        }
        setChallengeCompleted(true);
    }

    function isValidForm() {
        const isValidFields = email.trim() !== "" && message.trim() !== "";
        return isValidFields && isChallengeCompleted;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Por favor, preencha todos os campos e marque a caixa 'Eu não sou um robô'.");
            return;
        }

        try {
            await sendContactEmail();

            alert("E-mail enviado com sucesso!");
            setEmail("");
            setMessage("");
            setChallengeCompleted(false);
            recaptchaRef.current?.reset();

        } catch (erro: any) {
            alert(erro.message || "Erro ao enviar E-mail.");
        }
    }
    const [message, setMessage] = useState("");
    const [isChallengeCompleted, setChallengeCompleted] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    async function sendContactEmail() {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                message
            }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error(body.error ?? "Erro ao enviar E-mail.");
        }
    }
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }
    }, [showMobileMenu]);
    return (
        <>
            <header className="py-sm">
                <div className="container">
                    <nav className="flex items-center justify-between">
                        <img src={Logo} alt="Logo Dreamscape" width={220} height={80} />

                        <div className="desktop-only">
                            <ul className="flex gap-1">
                                <li><a href="#">Home</a></li>
                                <li><a href="#solution">Diferenciais</a></li>
                                <li><a href="#testimonials">Depoimentos</a></li>
                                <li><a href="#pricing">Clube</a></li>
                                <li><a href="#contato">Contato</a></li>
                            </ul>
                        </div>

                        <div className="desktop-only">
                            <div className="flex items-center">
                                <a className="reverse-color ml-lg" href="">Login</a>
                                <button style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Cadastre-se
                                </button>
                            </div>
                        </div>

                        <div className="mobile-menu">
                            {showMobileMenu ? (
                                <div className="mobile-menu-content">
                                    <div className="container flex">
                                        <ul>
                                            <li><a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#">Home</a></li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#solution">Diferenciais</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#testimonials">Depoimentos</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#pricing">Clube</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#contact">Contato</a> </li>
                                            <li><a onClick={() => setShowMobileMenu(!showMobileMenu)} className="reverse-color" href="#">Login</a></li>
                                        </ul>
                                        <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                            <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                    <img src={Menu} alt="ícone menu" width={24} height={24} />
                                </span>

                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <section id="hero">
                <span className="desktop-only">
                    <img src={HeroRectangleTwo} alt="Retangulo um tela inicial" />
                </span>
                <img src={HeroRectangleOne} alt="Retangulo dois tela inicial" />
                <div className="container content">
                    <p className="desktop-only">
                        Entre no Dreamscape.
                    </p>
                    <h1>Vista a trilha sonora da sua vida.</h1>
                    <p>Camisetas premium com estampas exclusivas para quem sabe que a música não se ouve, se sente e se veste.
                    </p>
                    <div className="flex gap-1">
                        <span><Button text="Cadastre-se" /></span>
                        <span className="desktop-only">
                            <Button text="Veja mais" secondary />
                        </span>
                    </div>
                </div>
            </section>
            <section id="solution" className="container">
                <header>
                    <span>
                        <h2>Qualidade</h2>
                        <span className="desktop-only">
                            <h2>Feito para a roda punk</h2>
                        </span>
                    </span>
                    <p>
                        Atitude é com a gente! A <strong>Dreamscape </strong>
                        já veste centenas de fãs pelo Brasil. Do mosh pit ao sofá de casa, 
                        veja os diferenciais das nossas camisetas.
                    </p>
                </header>

                <div className="even-columns container">
                    <Card
                        image={korn}
                        title="Modelagem Oversized"
                        description="Caimento perfeito, pesado e estruturado. Desenvolvido para você curtir os melhores shows com o máximo de conforto e estilo."
                    />
                    <Card
                        image={deftones}
                        title="Estampas 'High Fidelity'"
                        description="Impressão digital de ponta que não racha ou desbota. Cores vivas e texturas profundas para honrar as capas dos seus álbuns favoritos."
                    />
                    <Card
                        image={radiohead}
                        title="Entrega Supersonic"
                        description="Logística pesada e ágil. Seu pedido é despachado na velocidade da luz para você não perder a estreia da turnê da sua banda do coração."
                    />
                </div>
            </section >
            <section id="testimonials">
                <header className="container">
                    <span>
                        <p className="desktop-only">O que a galera está dizendo</p>
                        <h2>Avaliações do Dreamscape</h2>
                    </span>
                    <p>
                        Quem veste sabe da qualidade da nossa malha. Estamos acabando com aquela ideia de que
                        camiseta de banda tem que ser desconfortável ou encolher na primeira lavagem. Confira quem já aprovou.
                    </p>
                </header>
                <section className="carousel">
                    <div className="carousel-content">

                        <TestimonialCard
                            image={Profile}
                            testimony="Comprei a peita do White Pony e o tecido é surreal. Parece que estou abraçado numa nuvem enquanto escuto 'Passenger'. A entrega foi super rápida!"
                            name="Chino M."
                            role="Fã de Deftones"
                            rating={5}
                        />

                        <TestimonialCard
                            image={ProfileTwo}
                            testimony="A estampa do In Rainbows é a coisa mais linda que já vi. A qualidade da impressão é absurda, lavei várias vezes e não desbotou absolutamente nada."
                            name="Thom Y."
                            role="Fã de Radiohead"
                            rating={5}
                        />

                        <TestimonialCard
                            image={ProfileThree}
                            testimony="Normalmente eu reclamo de comprar roupa online, mas do caimento dessa camiseta eu não posso falar um 'A'. É simplesmente perfeito, mad about it!"
                            name="Liam G."
                            role="Fã de Oasis"
                            rating={5}
                        />

                    </div>
                </section>
            </section>
            <section id="pricing" className="container">
                <header>
                    <p className="desktop-only">Assinaturas e Benefícios</p>
                    <h2>Clube Dreamscape</h2>
                </header>
                <section className="even-columns gap-1-5">
                    <div className="pricing-card">
                        <span className="plan">
                            <h3>Membro VIP</h3>
                            <p>Crie sua conta para ficar por dentro dos nossos lançamentos limitados.</p>
                        </span>
                        <h2>Grátis</h2>
                        <Button text="Cadastrar agora" secondary key="free" />
                        <span className="hr" /><span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>Acesso antecipado aos drops</p>
                        </span>
                        <ul className="features">
                            <li>
                                <img src={Check} alt="ícone check" width={24} height={24} />
                                <p>Newsletter de novidades</p>
                            </li>
                        </ul>
                    </div>
                    <div className="pricing-card premium">
                        <span className="bonus">
                            <p>CLUBE DE ASSINATURA</p>
                        </span>
                        <span className="plan">
                            <h3>Rockbox Premium</h3>
                            <p>Para quem quer uma nova camiseta de banda exclusiva e surpresa na porta de casa.</p>
                        </span>
                        <span className="price">
                            <h2>R$ 89,90</h2>
                            <p>/mês</p>
                        </span>
                        <Button text="Assinar Clube" secondary key="premium" />
                        <span className="hr" />
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>1 Camiseta Exclusiva por mês</p>
                        </span>
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>Adesivos colecionáveis</p>
                        </span>
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>Frete Grátis para todo Brasil</p>
                        </span>
                    </div>
                </section>
            </section>
            <section id="contato" style={{ padding: "40px 20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                <h2>Fale Conosco</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            style={{ width: "100%", padding: "10px" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite sua mensagem ou dúvida"
                            style={{ width: "100%", padding: "10px", height: "100px" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCompleteChallenge}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ padding: "10px 20px", cursor: "pointer", width: "100%", backgroundColor: "var(--primary-color)", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold" }}
                    >
                        Enviar Mensagem
                    </button>
                </form>
            </section>
            <footer className="footer-container">
                <div className="footer-grid">

                    <div className="footer-brand">
                        <h3>Dreamscape</h3>
                        <p>A trilha sonora da sua vida, estampada com atitude e qualidade para o seu dia a dia.</p>
                        <div className="footer-socials">
                            <img src={IconInsta} alt="Instagram" width={24} height={24} />
                            <img src={IconFace} alt="Facebook" width={24} height={24} />
                            <img src={IconYT} alt="YouTube" width={24} height={24} />
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>A Marca</h4>
                        <ul className="footer-links">
                            <li>Nossa História</li>
                            <li>Sustentabilidade</li>
                            <li>Blog da Cena Alternativa</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>A Loja</h4>
                        <ul className="footer-links">
                            <li>Últimos Lançamentos</li>
                            <li>Clube Dreamscape</li>
                            <li>Políticas de Frete e Devolução</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Suporte</h4>
                        <ul className="footer-links">
                            <li>Como lavar sua peça</li>
                            <li>Tabela de Medidas</li>
                            <li>Dúvidas Frequentes (FAQ)</li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>©2026 Dreamscape - Todos os direitos reservados.</p>
                </div>

            </footer>
        </>
    );
}