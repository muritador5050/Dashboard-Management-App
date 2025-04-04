import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
export default function Profile() {
  return (
    <div>
      <Tabs>
        <TabList justifyContent='flex-end'>
          <Tab>Profile</Tab>
          <Tab>Followers</Tab>
          <Tab>Freinds</Tab>
          <Tab>Gallery</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
