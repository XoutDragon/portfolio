import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";
import { GrDocument } from "react-icons/gr";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const icons = {
  FaGithub,
  FaLinkedin,
  SiHandshake,
  GrDocument,
};

export const getIcon = (name: string | undefined) =>
  icons[name as keyof typeof icons];
