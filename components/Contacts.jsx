'use client'

// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';


const info = [
    {
        icon: <FaPhoneAlt className="text-xl text-accent animate-pulse"/>,
        title: "Phone",
        description: "+233 559332747"    
    },
    {
        icon: <FaEnvelope className="text-xl text-accent animate-pulse"/>,
        title: "Email",
        description: "k.hoenyefia@gmail.com"    
    },
    {
        icon: <FaMapMarkerAlt className="text-xl text-accent animate-pulse"/>,
        title: "Location",
        description: "Accra, Ghana"    
    },
]

const Contacts = () => {
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = (data) => {
        const templateParams = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            number: data.number,
            message: data.message,
        };

        emailjs.send('service_tsce0zp', 'template_iuh0epg', templateParams, 'AoYEAVNGA_j52am8p')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully');
                reset();
            }, (error) => {
                console.log('FAILED...', error);
                alert('Error sending messag');
            });
    }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="flex flex-col text-center md:text-left max-w-7xl px-6 sm:px-10 mx-auto mb-10 items-center"> {/* Reduced mb-20 to mb-10 */}
    
    <h3 className="text-center uppercase tracking-[20px] text-gray-500 text-2xl mb-1">Contact <span className="text-accent">Me</span></h3>
    <h4 className="text-md text-center uppercase tracking-[6px] text-gray-500">Let&apos;s Work Together</h4>
    <p className="text-gray-500 tracking-[2px] mb-4">Send me a message and let&apos;s talk</p>
  
    <div className="flex flex-col-reverse xl:flex-row gap-10 mt-5"> {/* Reduced gap and margin */}
      <form action="#" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <label htmlFor="firstname" className="text-semibold capitalize">
            <Input {...register('firstName')} type="firstname" placeholder="First Name" />
          </label>
          <label htmlFor="lastname" className="text-semibold">
            <Input {...register('lastName')} type="lastname" placeholder="Last Name" />
          </label>
          <label htmlFor="email">
            <Input {...register('email')} type="email" placeholder="Email" />
          </label>
          <label htmlFor="number">
            <Input {...register('number')} type="number" placeholder="Phone Number" /> 
          </label>
        </div>
        <label htmlFor="message">
          <Textarea {...register('message')} className="h-[30px]" placeholder="Type your message..." />
        </label>
        <Button size="md" className="max-w-40 py-3" type="submit">Submit</Button>
      </form>
      
      <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
        <ul className="flex flex-col gap-10">
          {info.map((item, index) => (
            <li key={index} className="flex items-center gap-6 text-left">
              <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] text-accent rounded-md flex items-center justify-center bg-[#27272c]">
                <div className="text-[28px] text-accent">{item.icon}</div>
              </div>
              <div className="flex-1">
                <p className="text-white/60">{item.title}</p>
                <h3 className="text-xl">{item.description}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
  
  )
}

export default Contacts