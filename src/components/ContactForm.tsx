import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/contactForm.css";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isChallengeCompleted, setChallengeCompleted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
      alert("Por favor, Confirme que você não é um robô.");
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        alert("E-mail enviado com sucesso!");
        setEmail("");
        setMessage("");
        setChallengeCompleted(false);
        recaptchaRef.current?.reset();
      } else {
        alert("Erro ao enviar o e-mail.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <section id="contato" className="contactForm">
      <div className="contactForm__container">
        <h2 className="contactForm__title">Entre em Contato</h2>
        <p className="contactForm__subtitle">
          Envie sua mensagem e retornaremos o mais breve possível.
        </p>

        <form onSubmit={handleSubmit} className="contactForm__form">
          <div className="contactForm__field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="contactForm__input"
              required
            />
          </div>

          <div className="contactForm__field">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              className="contactForm__textarea"
              required
            />
          </div>

          <div className="contactForm__captcha">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdLRRwtAAAAAPs-jYK2BQNbpELC6F8p6V-DJwEG"
              onChange={handleCompleteChallenge}
            />
          </div>

          <button type="submit" className="contactForm__button">
            Enviar E-mail
          </button>
        </form>
      </div>
    </section>
  );
}