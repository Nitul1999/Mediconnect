import React from 'react'
import '../stylesheet/header.css'
import logo from '../assets/mediconnectlogo.png'

export const Header = () => {
  return (
   <div className="header p1 ">
    <div className="header-items flex justify-space-around item-center gap-1 p1">
        <div className="header-image">
            <img src={logo} alt="" />
        </div>
        <div className="addres-header  flex item-center gap-1">
            <i class="ri-map-2-line ic"></i>
            <p>Address: 123 Main St, Anytown, USA</p>
        </div>
        <div className="mail-header flex  item-center gap-1">
            <i class="ri-mail-line ic "></i>
            <p>Email - mediconnect@gmail.com</p>
        </div>
        <div className="contact-header flex item-center gap-1">
            <i class="ri-phone-line ic"></i>
            <p> Phone: 9876545678654</p>
        </div>
    </div>
   </div>
  )
}
