export const metadata = {
  title: 'Mykonos Promoter',
  description: 'Pianifica la tua vacanza a Mykonos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ margin: 0, backgroundColor: '#eef2f5', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
