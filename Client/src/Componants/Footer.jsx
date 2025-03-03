import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex gap-4 py-3 mt-20 items-center justify-between'>
      <a href="">      <img src={assets.logo} alt="" width={150}/>
      </a>
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Sujal | All rights reserved</p>
      <div className='flex gap-2.5'>
        <a href="https://www.facebook.com/login/" target='_blank'>        <img src={assets.facebook_icon} alt="" width={35} />
        </a>
        <a href="https://x.com/?lang=en"target='_blank'>        <img src={assets.twitter_icon } alt="" width={35} />
        </a>
        <a href="https://www.instagram.com"target='_blank'>        <img src={assets.instagram_icon} alt="" width={35} />
        </a>

      </div>
    </div>
  )
}

export default Footer
