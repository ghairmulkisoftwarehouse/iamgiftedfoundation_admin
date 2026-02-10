import DashboardSvg from '../assets/svgs/sidebar/DashboardSvg';
import CommunitySvg from '../assets/svgs/sidebar/CommunitySvg';
import CategoriesSvg   from '../assets/svgs/sidebar/CategoriesSvg';
import ImpactSvg   from '../assets/svgs/sidebar/ImpactSvg';
import AppUserSvg   from '../assets/svgs/sidebar/AppUserSvg';
import DonationSvg from '../assets/svgs/sidebar/DonationSvg';
import EventSvg from '../assets/svgs/sidebar/EventSvg';
import PanelUserSvg from '../assets/svgs/sidebar/PanelUserSvg';
import SettingSvg from '../assets/svgs/sidebar/SettingSvg';
import ProgramsSvg from '../assets/svgs/sidebar/ProgramsSvg';
import PeertoPeerSvg from '../assets/svgs/sidebar/PeertoPeerSvg';
import CompanySvg  from '../assets/svgs/sidebar/CompanySvg'
import UserSvg from '../assets/svgs/sidebar/UserSvg';
import PillarSvg from '../assets/svgs/sidebar/PillarSvg';


export const menuItems = [
  { name: "Dashboard", icon: DashboardSvg  ,path : '/app/dashboard' },
  { name: "App User", icon: AppUserSvg,path : '/app/app-user' },
  { name: "Events", icon: EventSvg ,path : '/app/events' },
  { name: "Programs", icon: ProgramsSvg,path : '/app/Programs' },
    { name: "Pillers", icon: PillarSvg,path : '/app/piller' },

  
  { name: "Donations", icon: DonationSvg,path:'/app/donations' },
  { name:"Company", icon: CompanySvg,path:'/app/company' },
    { name:"Categories", icon: CategoriesSvg,path:'/app/categories' },
   { name:"Impact", icon: ImpactSvg,path:'/app/impact' },
  // { name: "Peer to Peer Fundraising", icon: PeertoPeerSvg,path : '/app/peer-to-peer-fundraising' },
  // { name: "Community", icon: CommunitySvg,path : '/app/community' },
  { name: "Teams", icon: CommunitySvg ,path : '/app/teams' },
  { name: "Panel User", icon: PanelUserSvg,path : '/app/panel-user' },
  { name: "Settings", icon: SettingSvg,path : '/'  },
];



        