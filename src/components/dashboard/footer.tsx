import { FaYoutube, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-4">
      <div className="container mx-auto max-w-8xl px-10">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            <span>2025</span>
            <span className="ml-4">Dashboard Bantul</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600">
              <FaYoutube />
            </a>
            <a href="#" className="text-gray-600">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-600">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;