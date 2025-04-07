import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Box,
  Text,
  Stack,
} from '@chakra-ui/react';

//Faq
export default function Faq() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Stack textAlign='center'>
        <Heading color='white'>Frequently asked questions</Heading>
        <Text fontSize='xl'>
          Get to know more about ready-to-use admin dashboard templates
        </Text>
      </Stack>
      <Accordion
        allowToggle
        maxW={800}
        bg='rgb(17, 28, 45)'
        borderRadius='2xl'
        mt={9}
        p={5}
        transition='ease-in-out'
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text
                fontWeight='medium'
                fontSize='xl'
                as='span'
                flex='1'
                textAlign='left'
                color='white'
              >
                What&apos;s Admin Dashboard?
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Admin Dashboard is the backend interface of a website or an
            application that helps to manage the website&apos;s overall content
            and settings. It is widely used by the site owners to keep track of
            their website, make changes to their content, and more.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text
                fontWeight='medium'
                fontSize='xl'
                as='span'
                flex='1'
                textAlign='left'
                color='white'
              >
                What should an admin dashboard template should include?
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Admin dashboard template should include user & SEO friendly design
            with a variety of components and application designs to help create
            your own web application with ease. This could include customization
            options, technical support and about 6 months of future updates.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text
                fontWeight='medium'
                fontSize='xl'
                as='span'
                flex='1'
                textAlign='left'
                color='white'
              >
                Why should i buy admin dashboard template from Wrappixe?
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Wrappixel offers high-quality templates that are easy to use and
            fully customizable. With over 101,801 happy customers & trusted by
            10,000+ Companies. Wrappixel is recognized as the leading online
            source for buying admin templates.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text
                fontWeight='medium'
                fontSize='xl'
                as='span'
                flex='1'
                textAlign='left'
                color='white'
              >
                Do wrappixel offers a money back gurantees
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            There is no money back guarantee in most companies, but if you are
            unhappy with our product, Wrappixel gives you a 100% money back
            guarantee
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
