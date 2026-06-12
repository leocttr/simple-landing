interface CardProps {
    image: string;
    title: string;
    description: string;
}

export default function Card({ image, title, description }: CardProps) {
    return (
        <div className="card">
            <span>
                <img src={image} alt={`ícone ${title}`} width={144} height={104} />
            </span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <hr />
            </div>
        </div>
    );
}