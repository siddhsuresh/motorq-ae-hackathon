import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
import CreditsIcon from './icons/credits';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Status',
    icon: <StatusIcon />,
    link: '/events',
  },
  {
    title: 'Archives',
    icon: <ArchivesIcon />,
    link: '/map',
  },
  {
    title: 'Credits',
    icon: <CreditsIcon />,
    link: '/event-tokens',
  },
  {
    title: 'Logout',
    icon: <SettingsIcon />,
    link: '/',
  },
];

export default data;
