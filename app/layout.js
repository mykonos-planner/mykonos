export const metadata = {
  title: 'Mykonos Promoter',
  description: 'Pianifica la tua vacanza a Mykonos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ margin: 0, backgroundColor: '#f5f7fa' }}>{children}</body>
    </html>
  );
}