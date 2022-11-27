import { useSession } from 'next-auth/react'
import React from 'react'
import {
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon
} from '@heroicons/react/outline';
import {
    CalendarIcon,
    ClockIcon,
    DesktopComputerIcon,
    UserIcon,
} from '@heroicons/react/solid'
import SidebarRow from './SidebarRow';

function Sidebar() {
    const { data: session, status } = useSession()

  return (
    <div className='p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
        {session?(<SidebarRow src={session.user.image} title={session.user.name} />):null}
        <SidebarRow Icon={UserIcon} title="Friends" />
        <SidebarRow Icon={UserGroupIcon} title="Groups" />
        <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
        <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
        <SidebarRow Icon={CalendarIcon} title="Events" />
        <SidebarRow Icon={ClockIcon} title="Memories" />
        <SidebarRow Icon={ChevronDownIcon} title="see More" />
    </div>
  )
}

export default Sidebar