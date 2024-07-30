// components/MiniLayout.tsx
import React, { ReactNode } from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

type MiniLayoutProps = {
  children: ReactNode;
};

const MiniLayout: React.FC<MiniLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Add your header component here */}
      <Header/>

      {/* Content of the page */}
      {children}

      {/* Add your footer component here */}
      <Footer/>
    </div>
  );
};

export default MiniLayout;
