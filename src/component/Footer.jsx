'use client';

import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { resourcesLinks, platformLinks } from '../constants';

const Footer = () => (
  <footer className="mt-20 border-t py-10 border-neutral-700">
    <div className="flex flex-wrap justify-between items-start">
      <div className="flex-1">
        <h3 className="text-md font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          {resourcesLinks.map((link, index) => (
            <li key={index}>
              <a className="text-neutral-300 hover:text-white" href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h3 className="text-md font-semibold mb-4">Platform</h3>
        <ul className="space-y-2">
          {platformLinks.map((link, index) => (
            <li key={index}>
              <a className="text-neutral-300 hover:text-white" href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex gap-4">
        <a
          href="https://t.me/+1_YhzCR3lhZlMzI8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-300 hover:text-white text-4xl mt-[-30px]"
        >
          <FaTelegram />
        </a>
        <a
          href="https://www.instagram.com/billion_forex_team"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-300 hover:text-white text-4xl mt-[-30px]"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
