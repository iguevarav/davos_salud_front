import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Davos Salud - Sistema de Gestión Dermatológica",
  description:
    "Sistema de gestión integral para clínica dermatológica Davos Salud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
