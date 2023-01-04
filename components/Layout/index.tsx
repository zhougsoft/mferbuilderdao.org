import React from 'react'
import Footer from './Footer'
import Header from './Header'

// TODO: wrap next/head in this and support a dynamic 'pageTitle' prop

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-skin-backdrop text-skin-base min-h-screen flex items-center justify-around">
      <div className="max-w-[1400px] flex flex-col items-center justify-around">
        <Header />
        <div className="w-full relative z-20 bg-skin-backdrop min-h-screen">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
