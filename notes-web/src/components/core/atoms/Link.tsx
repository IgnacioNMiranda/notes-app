import React from "react";
import './Link.css';

export const Link = ({ href, children }: any) => <a href={href}>{children}</a>;
