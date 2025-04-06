'use client';
import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  RadioGroup,
  Radio,
  Stack,
  FormControl,
  FormLabel,
  ButtonGroup,
} from '@chakra-ui/react';
import PageTitle from '@/components/pageTitle';

//calendar
export default function Calendar() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState('danger');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calendarRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEvent = () => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.addEvent({
      title: eventTitle,
      start: startDate,
      end: endDate || undefined,
      color: eventColorMap[eventColor] || 'blue', // optional
    });
    // Reset form
    setEventTitle('');
    setStartDate('');
    setEndDate('');
    setEventColor('danger');
    onClose();
  };

  const eventColorMap: Record<string, string> = {
    danger: 'red',
    success: 'green',
    primary: 'blue',
    warning: 'orange',
  };
  return (
    <Box>
      <PageTitle />
      <Box p={5} bg='gray.800' borderRadius='xl' boxShadow='lg'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          headerToolbar={{
            left: 'prev,next addEventButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          customButtons={{
            addEventButton: {
              text: 'Add Event',
              themeIcon: 'red',
              click: onOpen,
            },
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
          }}
          events={[]}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent bg=' rgb(17, 28, 45)' color='rgb(124, 143, 172);'>
          <ModalHeader>New Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading mb={4}>Add/EditEvent</Heading>
            <VStack align='stretch' spacing={4}>
              <FormControl>
                <FormLabel>Event Title</FormLabel>
                <Input
                  placeholder='Title...'
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </FormControl>

              <RadioGroup value={eventColor} onChange={setEventColor}>
                <Text>Event Color</Text>
                <Stack direction='row'>
                  <Radio value='danger'>Danger</Radio>
                  <Radio value='success'>Success</Radio>
                  <Radio value='primary'>Primary</Radio>
                  <Radio value='warning'>Warning</Radio>
                </Stack>
              </RadioGroup>

              <FormControl>
                <FormLabel>Enter Start Date</FormLabel>
                <Input
                  type='datetime-local'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <FormLabel mt={3}>Enter End Date</FormLabel>
                <Input
                  type='datetime-local'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme='orange'
                borderRadius='3xl'
                onClick={handleAddEvent}
              >
                Send
              </Button>
              <Button colorScheme='blue' borderRadius='3xl' onClick={onClose}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
