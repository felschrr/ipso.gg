import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="m-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="p-4 mx-auto w-full max-w-screen-xl md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="https://flowbite.com/" className="hover:underline">Ipso</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
