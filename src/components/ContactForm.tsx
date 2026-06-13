import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
                        placeholder="Digite sua mensagem"
                        style={{ width: "100%", padding: "10px", height: "100px" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LdLRRwtAAAAAPs-jYK2BQNbpELC6F8p6V-DJwEG"
                        onChange={handleCompleteChallenge}
                    />
                </div>

                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", width: "100%" }}>
                    Enviar E-mail
                </button>
            </form>
        </section>
    );
}