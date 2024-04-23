import React from 'react';
import { Box, Typography } from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
    HourglassEmpty,
    DirectionsRun,
    CheckCircle,
    GroupAdd,
    MonetizationOn,
    Star as StarIcon,
} from '@mui/icons-material';

// Define steps for Quake's roadmap
const steps = [
    { label: 'Step 1', icon: <HourglassEmpty />, title: 'Join the Quake Community', subtitle: 'Start your journey', date: 'Get started' },
    { label: 'Step 2', icon: <DirectionsRun />, title: 'Share Your Creative Projects', subtitle: 'Express yourself', date: 'Start sharing' },
    { label: 'Step 3', icon: <CheckCircle />, title: 'Connect and Collaborate with Others', subtitle: 'Engage with the community', date: 'Connect with others' },
    { label: 'Step 4', icon: <GroupAdd />, title: 'Engage in Community Discussions and Activities', subtitle: 'Interact with fellow creators', date: 'Start engaging' },
    { label: 'Step 5', icon: <MonetizationOn />, title: 'Explore Monetization Opportunities', subtitle: 'Monetize your skills', date: 'Explore opportunities' },
];

function Roadmap() {
    return (
        <Box sx={{ width: '100%', padding: '2rem', color: '#3f4144' }}>
            <Typography variant="h4" gutterBottom align="center">How It Works</Typography>
            <VerticalTimeline>
                {steps.map((step, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: index % 2 === 0 ? 'rgb(33, 150, 243)' : '#fff', color: index % 2 === 0 ? '#fff' : '#3f4144' }}
                        contentArrowStyle={{ borderRight: index % 2 === 0 ? '7px solid  rgb(33, 150, 243)' : '7px solid #fff' }}
                        date={step.date}
                        iconStyle={{ background: index % 2 === 0 ? 'rgb(33, 150, 243)' : '#fff', color: index % 2 === 0 ? '#fff' : '#3f4144' }}
                        icon={step.icon}
                    >
                        <h3 className="vertical-timeline-element-title">{step.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{step.subtitle}</h4>
                    </VerticalTimelineElement>
                ))}
                <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<StarIcon />}
                />
            </VerticalTimeline>
        </Box>
    );
}

export default Roadmap;
