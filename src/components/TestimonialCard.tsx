import Star from "../assets/star.svg";
import StarOuter from "../assets/starOuter.svg";

interface TestimonialCardProps {
    image: string;
    testimony: string;
    name: string;
    role: string;
    rating: number;
}

export default function TestimonialCard({ image, testimony, name, role, rating }: TestimonialCardProps) {
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);

    return (
        <div className="carousel-card">
            <img src={image} alt="Imagem perfil cliente" />
            <span className="testimony">
                <p>{testimony}</p>
            </span>
            <span className="rating">
                {stars.map((isFilled, index) => (
                    <img
                        key={index}
                        src={isFilled ? Star : StarOuter}
                        alt="ícone estrela"
                        width={isFilled ? 22 : 20}
                        height={isFilled ? 20 : 22}
                    />
                ))}
            </span>
            <span className="names">
                <p className="bold">{name}</p>
                <p>{role}</p>
            </span>
        </div>
    );
}