import { NavLink } from 'react-router-dom';

const navItems = [
  {
    label: 'Home',
    to: '/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: 'Library',
    to: '/library',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
      </svg>
    ),
  },
  {
    label: 'Trending',
    to: '/trending',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  {
    label: 'History',
    to: '/history',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v4l5-4.5L13 0v3z" />
      </svg>
    ),
  },
  {
    label: 'Subscriptions',
    to: '/subscriptions',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6l8 5 8-5v12zm-8-7L4 6h16l-8 5z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 bg-[#0f0f0f] overflow-y-auto hidden md:flex flex-col pt-2 pb-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-2.5 rounded-lg mx-2 text-sm transition-colors ${
              isActive
                ? 'bg-[#272727] text-white font-medium'
                : 'text-gray-400 hover:bg-[#272727] hover:text-white'
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}