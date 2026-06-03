export const metadata = {
  title: 'Mykonos Planning',
  description: 'Pianifica la tua vacanza a Mykonos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body style={{
        margin: 0,
        backgroundColor: '#EAF7FA',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#3E4A5B',
        transition: 'background-color 0.3s, color 0.3s'
      }}>
        {children}
      </body>
    </html>
  );
}