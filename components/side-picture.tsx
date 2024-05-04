import RugbyMauaLogoPath from '../app/assets/rugby-maua-logo.png'
import { Landmark } from 'lucide-react';
import Image from 'next/image'

export default function SidePicture() {
  return (
    <div className={`w-1/2 h-screen bg-[url(../app/assets/auth-layout-bg.jpg)] bg-center rounded-e-3xl`}>
      <div className='flex flex-row gap-2 p-5 items-center w-full text-primary'>
        <Landmark strokeWidth={2} className='text-' />
        <h1 className='font-bold'>Rugby Mauá Finance</h1>
      </div>
    </div>
  )
}
