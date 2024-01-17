import type { Contact } from '../../content/home/home.types';

type ContactModalContentProps = {
  contact: Contact;
};

export const ContactModalContent = ({
  contact: { location, email, instagram },
}: ContactModalContentProps) => {
  return (
    <div className="flex h-full flex-col justify-center text-2xl">
      <p>{location}</p>
      <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
        {email}
      </a>
      <a
        href={`https://www.instagram.com/${instagram}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`@${instagram}`}
      </a>
    </div>
  );
};
