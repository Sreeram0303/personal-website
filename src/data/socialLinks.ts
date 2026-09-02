import type { IconType } from "react-icons";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { profile } from "./profile";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  { label: "GitHub", href: profile.github, icon: SiGithub },
  { label: "LeetCode", href: profile.leetcode, icon: SiLeetcode },
  { label: "Email", href: profile.gmailComposeUrl, icon: LuMail },
];
