import SectionTitle from "./SectionTitle";

interface Props {
    id: string;
    title: string;
    description: string;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({ id, title, description, children }: React.PropsWithChildren<Props>) => {
    return (
        <section id={id} className="landing-section scroll-mt-24 py-14 lg:py-20">
            <SectionTitle>
                <h2 className="mb-4">{title}</h2>
            </SectionTitle>
            <p className="section-description mb-10">{description}</p>
            {children}
        </section>
    )
}

export default Section
