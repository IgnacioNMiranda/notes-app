import React from 'react';
import { Button } from '../atoms/Button';
import { Link } from '../atoms/Link';
import './RightNavbar.css';

interface RightNavbarProps {
  elements: {
    text: string;
    onClick?: () => void;
    href?: string;
    show: boolean;
  }[];
}

export const RightNavbar = ({ elements }: RightNavbarProps) => {
  const navbarElements = elements.map(({ text, onClick, href = '', show }: any) => {
    if (show) {
      if (href === '') {
        return (
          <li key={text}>
            <Button extraClasses="navbarButton" text={text} onClick={onClick} />
          </li>
        );
      }
      return (
        <li key={text}>
          <Link href={href} />
          {text}
          <Link />
        </li>
      );
    }
    return null;
  });

  return (
    <nav>
      <ul>{navbarElements}</ul>
    </nav>
  );
};
