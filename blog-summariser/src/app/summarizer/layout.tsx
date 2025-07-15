
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<>
        <header>
          <div className="navbar bg-[#020202] shadow-sm px-6">
            <div className="flex items-center ">
              
              <span className="text-2xl font-semibold text-[#F0E7D8]">
                BlinkBlog
              </span>
            </div>

          </div>
        </header>

        {children}
     </>
  );
}
