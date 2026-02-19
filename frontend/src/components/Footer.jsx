import React from 'react'
import { FaYoutube, FaLinkedin, FaInstagram, FaGithub, FaChrome } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <>
            <div className='mt-20 flex w-full flex-col justify-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white border-t pt-10' >

                {/* Footer section upper part */}
                <div className='w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-10 ' >
                    {/* Footer section left part */}
                    <div className='w-full md:w-1/2 lg:max-w-1/4' >
                        {/* Footer logo */}
                        <div className="sansita text-xl md:text-2xl font-bold mb-8">
                            a1<span className='text-[#FF0000]'>shows</span>.in
                        </div>

                        {/* Footer info paragraph */}
                        <p className='mb-4 font-normal text-sm text-gray-400' >
                            This is the best movie movie ticket
                            website  here you can book latest
                            movie ticket with regional price
                            and check upcoming moving.
                        </p>

                        {/* Footer social media links */}
                        <div className='flex gap-4' >
                            <Link className='text-xl transition-all duration-300 ease-in hover:scale-105' to='https://www.youtube.com/a1sartaj' target='_blank' rel='noopener noreferrer' ><FaYoutube color='white' /></Link>

                            <Link className='text-xl transition-all duration-300 ease-in hover:scale-105' to='https://www.linkedin.com/in/a1sartaj/' target='_blank' rel='noopener noreferrer' ><FaLinkedin
                                color='white' /></Link>

                            <Link className='text-xl transition-all duration-300 ease-in hover:scale-105' to='https://www.instagram.com/a1sartaj' target='_blank' rel='noopener noreferrer' ><FaInstagram color='white' /></Link>

                            <Link className='text-xl transition-all duration-300 ease-in hover:scale-105' to='https://github.com/sartaj9806' target='_blank' rel='noopener noreferrer' ><FaGithub color='white' /></Link>

                            <Link className='text-xl transition-all duration-300 ease-in hover:scale-105' to='https://a1sartaj.in' target='_blank' rel='noopener noreferrer' ><FaChrome color='white' /></Link>
                        </div>
                    </div>

                    {/* Footer Section right part */}
                    <div className='flex flex-col md:flex-row justify-between gap-20 w-full md:w-1/2 lg:max-w-1/4 ' >
                        {/* Footer left side of right section part */}
                        <div>
                            <h3 className='font-bold text-lg'>Company</h3>
                            <p className='text-sm text-gray-400'>Home</p>
                            <p className='text-sm text-gray-400'>Movies</p>
                            <p className='text-sm text-gray-400'>Theaters</p>
                            <p className='text-sm text-gray-400'>About</p>
                            <p className='text-sm text-gray-400'>Contact</p>
                        </div>

                        {/* Footer right side of right section part */}
                        <div>
                            <h3 className='font-bold text-lg' >Get in touch</h3>
                            <p className='text-sm text-gray-400'>+91 98XXXXXX06</p>
                            <a className='text-sm text-gray-400' href="mailto:sartaj9806@gmail.com">Sartaj9806@gmail.com</a>
                        </div>
                    </div>
                </div>


            </div>

            {/* Footer section lower part */}
            <div className='py-2 text-center  text-sm text-black bg-[#F0B100] w-full' >
                Copyright 2025 © a1Sartaj.in. All Right Reserved.
            </div>
        </>
    )
}

export default Footer
