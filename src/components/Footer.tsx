import React from 'react';
import {Box, Button, Flex, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";

export const Footer = () => {
  return (
    <Flex
      position={"absolute"}
      width={"100%"}
      bottom={0}
      bg="gray.100"
      justifyContent="center"
    >
      <Button>
        ABOUT
      </Button>
      <Button>
        EVENTS
      </Button>
      <Button>
        RESOURCES
      </Button>
      <VStack mt={-10}>
        <Image src={"/images/logo.png"} alt={"logo"} width={224} height={228} />
        <Image src={"/images/logo-text.png"} alt={"logo-text"} width={322} height={50} style={{marginBottom: '20px'}}/>
        <Text fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} Harbor Hills Association. All rights reserved.
        </Text>
      </VStack>
      <Button>
        THE LAGOON
      </Button>
      <Button>
        PHOTOS
      </Button>
    </Flex>
  );
};
