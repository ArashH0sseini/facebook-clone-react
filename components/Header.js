/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon
} from '@heroicons/react/solid'
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from '../public/logo.svg'

function Header() {
  const { data: session, status } = useSession()

  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
      <div className='flex items-center'>
        <Image src={Logo}
          width={40}
          height={40}
          layout="fixed"
          alt='fb-logo' />
        <div className='flex ml-2 items-center rounded-full bg-gray-200 p-2'>
          <SearchIcon className='h-6 text-gray-600' />
          <input className='hidden md:inline-flex ml-1 items-center bg-transparent 
          outline-none placeholder-gray-500 flex-shrink' type='text' placeholder='Search Facebook' />
        </div>
      </div>

      <div className='flex justify-center grow'>
        <div className='flex space-x-6 md:space-x-2'>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      <div className='flex items-center sm:space-x-2 justify-end'>
        {/* Profile Pic */}
        {
          session ? (
            <>
              <Image
                onClick={signOut}
                className="rounded-full cursor-pointer"
                src={session.user.image}
                width="40"
                height="40"
                layout="fixed"
                alt=""
              />
              <p className='whitespace-nowrap font-semibold pr-3'>{session.user.name}</p>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <p className='whitespace-nowrap font-semibold pr-3 cursor-pointer'>Sign in</p>
            </Link>
          )
        }
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  )
}

export default Header