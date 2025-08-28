'use client'
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import MyCourse from './my-courses/MyCourse';
import MyProfile from './my-profile/MyProfile';
import Settings from './settings/Settings';
import MyPayments from './my-payments/MyPayments';
import './style.css';
import MyRecipt from './my-recipt/MyRecipt';

const ProfileTabs = () => {
  return (
    <TabView className="container custom-tabs">
        <TabPanel header="My Courses">
            <MyCourse />
        </TabPanel>
        <TabPanel header="My Profile">
            <MyProfile _id={''} />
        </TabPanel>
        {/* <TabPanel header="My Recipt">
            <MyRecipt />
        </TabPanel> */}
        <TabPanel header="Settings">
            <Settings />
        </TabPanel>
    </TabView>
  )
}

export default ProfileTabs