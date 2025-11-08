import React from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'
import { Average } from 'next/font/google'
import { ModeToggle } from './ui/mode-toggle'

const Header = async () => {

  await checkUser();

  return (
    <div className='fixed top-0 w-full z-40 border-b 
  bg-white dark:bg-gray-900/70 
  backdrop-blur-md border-gray-200 dark:border-gray-700 transition-colors duration-300'>
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link  href="/">
          <Image src={"/FinSight_logo.png"} alt="FinSight App Logo" height={60} width={200} 
          className='h-30 w-auto object-contain'
           />
        </Link>
      
      <div className='ml-50 '> {/*gap-x-2*/}
        <ModeToggle />
      </div>
       <div className='flex items-center space-x-4'> {/*gap-x-2*/}
        <SignedIn>
          <Link href="/dashboard" className='text-gray-600 hover:text-blue-800 flex items-center gap-2'>
            <Button variant="outline">
              <LayoutDashboard size={18}/>
              <span className="hidden md:inline">Dashboard</span>
              </Button>
          </Link>

          <Link href={"/transaction/create"}>
            <Button className="flex items-center gap-2">
              <PenBox size={18}/>
              <span className="hidden md:inline">Add Transaction</span>
              </Button>
          </Link>
        </SignedIn>


        <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton>
                <Button variant="outline">Sign Up</Button>

            </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
           appearance={{
            elements: {
              avatarBox: 'w-10 h-10',
            },
          }}
          />
        </SignedIn>
        </div>
        </nav>
    </div>
  )
}

export default Header