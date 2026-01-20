import "../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper bg-green-600 w-7/8 mx-auto rounded-md shadow-2xl shadow-black m-5">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
