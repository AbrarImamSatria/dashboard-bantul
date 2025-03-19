import { FaYoutube, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#5F7161] py-4">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <span>2025</span>
            <span className="ml-4">Dashboard Bantul</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaYoutube />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;