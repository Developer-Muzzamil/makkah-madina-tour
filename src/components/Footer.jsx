import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'; // Importing more icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-4 ">
              Next Stop: Haram is dedicated to providing travelers with detailed information about the holy cities of Makkah, Madina, and more.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-gray-400">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitter size={30} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaInstagram size={30} />
              </a>
              {/* <a href="#" className="hover:text-gray-400">
                <FaGithub size={30} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaLinkedin size={30} />
              </a> */}
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <a href="/" className="hover:text-gray-400">Home</a>
              </li>
              <li>
                <a href="/makkah" className="hover:text-gray-400">Makkah</a>
              </li>
              <li>
                <a href="/madina" className="hover:text-gray-400">Madina</a>
              </li>
              <li>
                <a href="/hajj" className="hover:text-gray-400">Hajj</a>
              </li>
              <li>
                <a href="/umrah" className="hover:text-gray-400">Umrah</a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-400">Services</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">About Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-sm">Email: <a href="mailto:contact@nextstopharam.com" className="hover:text-gray-400">contact@nextstopharam.com</a></p>
              </li>
              <li>
                <p className="text-sm">Phone: <a href="tel:+91 1234567890" className="hover:text-gray-400">+91 1234-567-890</a></p>
              </li>
              <li>
                <p className="text-sm">Address: CGC-TDC, Moghalpura</p>
                
              </li>
                <li>
                    <p className="text-sm">Hyderabad, India - 500005</p>
                </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Next Stop: Haram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
