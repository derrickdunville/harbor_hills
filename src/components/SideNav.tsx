import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";


const links = ["Home", "About", "Events", "Lagoon", "Photos"];

const NavItem = ({text}: { text: string }) => (
  <Link href={`/${text.toLowerCase()}`} style={{textDecoration: 'none'}}>
    <Text fontSize="lg" fontWeight="medium" mb="2">
      {text}
    </Text>
  </Link>
);

export const SideNav = () => {
  return (
    <Box>
      <Flex
        flexDirection="column"
        p="4"
        borderRight="1px solid #e2e8f0"
        height="100vh"
        width="200px"
      >
        <Image src={"/images/logo.png"} alt={"logo"} width={150} height={150} style={{marginBottom: '20px'}}/>
        <>
          {links.map((link) =>
            <Box key={link}>
              <NavItem text={link}/>
            </Box>
          )}
        </>
      </Flex>
    </Box>
  );
};
