'use client'
import { useState, useEffect,useRef } from "react";
import {  bison } from '@/components/fonts/fonts';
import UnderlineSvg   from '@/assets/svg/UnderlineSvg.js'
import ArrowUpSvg  from '@/assets/svg/ArrowUpSvg';
import Link from 'next/link';
import  LeftPinkButterfullySvg   from  '@/assets/svg/LeftPinkButterfullySvg.js'
import RightPinkButterfullysvg from "@/assets/svg/RightPinkButterfullysvg";
import imggray from '@/assets/images/foundationboy.png';
import ShapeheroSvg  from '@/assets/svg/ShapeheroSvg.js';
import HeroShapeBottomSvg  from '@/assets/svg/HeroShapeBottomSvg';
import DonateSvg   from '@/assets/svg/DonateSvg';
import HeroWavesShapeSvg   from '@/assets/svg/HeroWavesShapeSvg'
import person from '@/assets/images/person.png'
import StarSvg  from '@/assets/svg/StarSvg'
import SmileSvg  from '@/assets/svg/SmileSvg';
import ShadowSvg  from '@/assets/svg/ShadowSvg';
import { FaDonate, FaHandsHelping, FaMoneyBillWave, FaHeart } from 'react-icons/fa';
import StarikSvg  from '@/assets/svg/StarikSvg'

import Image from "next/image";

const BOX_HEIGHT = 85;
const STAR_BOXES = [0, 46];

const HeroSection = () => {

  const heroRef = useRef(null);
    const [numBoxes, setNumBoxes] = useState(0);
    const [cols, setCols] = useState(12);
 useEffect(() => {
     const calculateBoxes = () => {
       if (!heroRef.current) return;
 
       const height = heroRef.current.offsetHeight;
 
       // columns based on screen width
       let columns = 12;
       if (window.innerWidth < 640) columns = 4;
       else if (window.innerWidth < 1024) columns = 6;
 
       const rows = Math.ceil(height / BOX_HEIGHT);
       setCols(columns);
       setNumBoxes(rows * columns);
     };
 
     calculateBoxes();
     window.addEventListener("resize", calculateBoxes);
     return () => window.removeEventListener("resize", calculateBoxes);
   }, []);

  return (
    
    <div 
     ref={heroRef}
    className="flex flex-col gap-2 w-full h-auto  bg-gradient-to-b from-[#D6EEF080] to-transparent relative overflow-hidden  ">
    {/* box background */}
         <div
        className={`grid absolute left-0 top-[-80px] z-0 w-full mt-16`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: numBoxes }).map((_, index) => (
        <div
  key={index}
  className="h-[85px] border-r border-b border-black/5 relative"
>

 {STAR_BOXES.includes(index) && (
  <div className="absolute top-full left-full -translate-x-1/2 -translate-y-1/2 z-0   hidden  md:block">
    <StarikSvg />
  </div>
)}
</div>
        ))}
      </div>

       {/* main title */}
    <div className=" w-full  flex justify-center items-center">
            <div className="flex flex-col gap-2 w-full relative    ">
            <div className=" flex flex-col gap-8  container mx-auto  px-3.5">

              <h2
                className={`
                    text-black
                    text-[50px]   leading-14 lg:leading-tight lg:text-[60px] xl:text-[80px]  pt-9
                    text-center

                    ${bison.className}
                `}
                >
                Everyone was born with <br /> a gift, let it{" "}
                <span className="relative inline-block">
                    <span className="relative z-10">shine...</span>

                    <span className="absolute left-0 right-0 bottom-[-5px] md:bottom-[-10px] z-0">
                    <UnderlineSvg className="w-[100px] md:w-[150px] lg:w-[200px] xl:w-[190px] " />
                    </span>
                </span>
                </h2>
                <div className="   w-full px-3  sm:px-0  sm:w-[80%]  lg:w-[65%] mx-auto      ">
            <p className="text-[#030F0CCC]  text-sm sm:text-base md:text-lg xl:text-[20px] text-center font-thin  ">IAMGIFTED Foundation supports families and empowers youth to discover and grow their unique talents through sports, education, and mental health initiatives.</p>
                </div>
                <div className="flex gap-0.5 w-full justify-center">
                
                  <div className="flex flex-row gap-0 group cursor-pointer pt-3">
                

                    <Link href="/donate ">
                      <button className="btn-donate group-hover:bg-lavender cursor-pointer  z-5    w-[198px] h-[50px] ">
                        <span className="btn-donate-hover group-hover:w-56 group-hover:h-56"></span>
                        <span className="btn-donate-text group-hover:text-black">
                        Join the Movement
                        </span>
                      </button>
                    </Link>
                
                    <Link href="/donate">
                      <button className="btn-icon group-hover:bg-lavender cursor-pointer z-5   ">
                        <span className="btn-icon-hover group-hover:translate-y-0"></span>
                        <ArrowUpSvg className="text-white group-hover:text-black z-10" />
                      </button>
                    </Link>
                
                  </div>
                
                </div>

            </div>
                    
                    <div className="absolute  top-[15%]  left-[-15px] sm:left-[-20px] ">
                        <LeftPinkButterfullySvg  className=' w-[120px] h-[150px] sm:w-[200px] sm:h-[200px] z-0 '/>
                        </div>
                        <div className="absolute  top-[15%]     right-[-15px] sm:right-[-20px]   z-0 ">
                        <RightPinkButterfullysvg  className='  w-[120px] h-[150px] sm:w-[200px] sm:h-[200px] z-0 '/>
                        </div>

              

                   {/*volunter section */}
                    <div className=" flex  flex-col lg:flex-row gap-4 w-full pb-6    container mx-auto  px-3.5 items-end">
                    {/* left section */}
                    <div className=" w-full lg:w-[70%]    flex flex-col sm:flex-row  sm:items-end gap-4 ">
                        {/* left section   first  section  */}

                    <div className=" flex flex-col w-full sm:w-[45%]   gap-8  ">
                    <div className=" flex flex-col gap-2">
                    <h1 className="  font-thin text-black/80   text-[22px]  sm:text-[25px] ">Volunteer with us to <br/> make a difference.</h1>
                    <h2 className="  font-semibold  text-[22px]  sm:text-[25px]  underline">Join the Foundation</h2>

                    </div>

                     <div className=" pt-7">
                      <div className="bg-grayblue-alt   rounded-[21px] flex flex-col gap-2.5 p-4">
                    <div className=" flex flex-row items-center  justify-between w-full">
                    <h2 className="  font-semibold   text-3xl sm:text-[38px] lg:text-[45px]">50k+</h2>
                    <Image
                       src={person}
                       alt="img"
                       width={82}
                       height={82}

                    />

                    </div>
                    <div className=" text-[#030F0CCC] text-base lg:text-[17px]   pt-16">
                    <p>Join the generous people who have already Donated.</p>
                   </div>
                    </div>

                     </div>

                      

                    </div>
                      {/*  right section   first  section  */}
                    <div className=" flex flex-col w-full sm:w-[55%]  h-[386px]    bg-light-cyan rounded-[21px] relative overflow-hidden ">
                    <div className=" absolute z-0">
                                  <ShapeheroSvg/>
                    </div>


   <div className=" absolute z-0 bottom-0">
                                  <HeroShapeBottomSvg/>
                    </div>


                       <div className=" absolute z-3   bottom-[-10px]   right-0">
                                  <ShadowSvg/>
                    </div>
                   
                    <div className=" relative flex flex-row gap-2 z-5 w-full px-4 h-full py-4">
                    <div className=" w-full flex flex-col  h-full justify-between   ">
                    <div className=" w-[70%]">
                       <p className="  text-[22px] sm:text-[25px] md:text-[27px]  font-semibold">Support sports, education, and mental health initiatives.</p>

                    </div>
                       
                            <div className="flex flex-row gap-0 group cursor-pointer ">
                            

                                <Link href="/donate">
                                <button className="btn-donate group-hover:bg-lavender cursor-pointer  w-[146px] h-[42px]">
                                    <span className="btn-donate-hover group-hover:w-56 group-hover:h-56"></span>
                                    <span className="btn-donate-text group-hover:text-black">
                                    Donate  Now
                                    </span>
                                </button>
                                </Link>
                            
                            
                            
                            </div>
                    </div>

                  

                    </div>

                   <div className=" absolute  bottom-0  right-[-50px] md:right-0">
                        <Image
                     src={imggray}
                     alt="img"
                     width={344}
                     height={344}
                     className="  w-[250px] sm:w-[230px] md:w-[250px]"
                     />
                     </div>
          
                        
                    </div>


                    </div>
                        {/* rigth section */}
                            <div className="w-full lg:w-[30%]    flex flex-col sm:flex-row lg:flex-col gap-4 ">
                            {/* top */}
                                  <div className=" flex flex-col  w-full justify-between h-[300px] lg:h-[342px]    bg-black rounded-[21px] relative overflow-hidden ">
                                     <div className="flex flex-row items-center justify-between  p-4  ">
                                          <h2 className="  font-semibold  text-white  text-5xl">80%</h2>
                                          <StarSvg/>
                                       </div>


                                    <div  className={' block lg:hidden w-full'}>
                                             <div className="grid   grid-cols-4 gap-3 px-4">
                                                        <div className="flex flex-col items-center gap-2 text-white cursor-pointer hover:text-yellow-400">
                                                            <FaDonate size={28} />
                                                            <span className="text-sm sm:text-base md:text-lg">Donate</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2 text-white cursor-pointer hover:text-green-400">
                                                            <FaHandsHelping size={28} />
                                                            <span className="text-sm sm:text-base md:text-lg">Help</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2 text-white cursor-pointer hover:text-blue-400">
                                                            <FaMoneyBillWave size={28} />
                                                            <span className="text-sm sm:text-base md:text-lg">Fund</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2 text-white cursor-pointer hover:text-pink-400">
                                                            <FaHeart size={28} />
                                                            <span className=" text-sm sm:text-base md:text-lg">Support</span>
                                                        </div>
                                        </div>
                                    </div>
                                   
                                      
                                        <DonateSvg className={'  hidden lg:block     w-full   scale-115 '}/>
                                        <div className="p-4 ">
                                        <p className=" text-base sm:text-[17px]  text-white/70">Create meaningful impact by addressing the most pressing challenges of our time.</p>

                                        </div>
                                  </div>
                                {/* bottom*/}
                                   <div className=" flex flex-row items-center gap-1.5 h-fit  lg:h-auto bg-thistle p-3 rounded-[21px]">
                                           <SmileSvg/>
                                           <p className="  text-[22px]  md:text-[25px] font-semibold">Bring happiness to their Lives</p>
                                   </div>
                          


                            </div>

                    
                    </div>
          


            </div>
        </div>

     


 
    </div>
  )
}

export default HeroSection