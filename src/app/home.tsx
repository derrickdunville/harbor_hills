import React from 'react';
import Image from "next/image";

export const Home = () => {
 return (
   <div data-testid={'home-page'}> 
    <Image src={'/images/backgrounds/0.jpg'} alt={'view of the lake'} width={1920} height={1080} />
   </div>
 );
};
