import { clsx, type ClassValue } from "clsx";
import { New_Rocker } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const headFont = New_Rocker({
  subsets: ["latin"],
  weight: ["400"],
});

interface FAQProps {
  [key: string]: string;
}
export const predefinedAnswers: FAQProps = {
  "What is Vinyl Viper?":
    "Vinyl Viper is a music discovery platform that allows users to explore a vast catalog of artists, bands, and their discographies. 🎶 You can browse through albums and save your favorite tracks and albums. ❤️",
  "Who is the app for?":
    "Vinyl Viper is for music enthusiasts who love discovering new artists and exploring full discographies. 🎧 Whether you're a casual listener or a dedicated fan, this app is for you! 🚀",
  "How do I add songs or albums to my favorites?":
    "To add a song or album to your favorites, simply click on the heart icon ❤️ next to the title. You can access your favorite tracks and albums anytime in your profile. 📁",
  "How do I create an account?":
    "To create an account, click on the 'Sign Up' button on the main page. ✍️ Enter your email, create a password, and you're all set to start exploring! 🚀",
  "I have a question that is not answered here.":
    "If you have a question that is not answered here, please contact support@vinylviper.com 😊",
  "How do I sign in to my account?":
    "To sign in to your account, click on the 'Sign In' button on the main page. ✍️ Enter your email and password, and you're all set to start exploring! 🚀",
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};