export const metadata = {
  title: 'Mykonos Promoter',
  description: 'Pianifica la tua vacanza a Mykonos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{
        margin: 0,
        backgroundColor: '#f0f7f4',
        fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#1e2a3e',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        {children}
      </body>
    </html>
  );
}
