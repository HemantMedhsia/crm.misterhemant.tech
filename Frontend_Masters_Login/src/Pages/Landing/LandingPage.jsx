import React from "react";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.css";
import "./assets/css/templatemo-training-studio.css";
import vedio from "../../assets/images/edu-vedio.mp4";
import gd from "../../assets/images/gd.jpg";
import atten from "../../assets/images/atten.jpg";
import perform from "../../assets/images/perform.jpg";
import parent from "../../assets/images/parent.jpg";
import noti from "../../assets/images/noti.jpg";
import class1 from "../../assets/images/class.jpg";
import fee from "../../assets/images/fee.jpg";
import contact from "../../assets/images/contact.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainingStudio = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#ccefe3]">
      {/* Preloader */}
      {/* <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div> */}

      {/* Header */}
      <header className="header-area header-sticky bg-black shadow-md">
        <div className="container mx-auto main-nav">
          <div className="row flex justify-between items-center ">
            {/* Logo */}
            <a href="/" className="logo mt-4">
              <h2><strong>Easy</strong><em> India ERP</em></h2>
            </a>

            {/* Menu - Desktop */}
            <ul className="hidden md:flex nav">
              <li className="scroll-to-section">
                <a
                  href="#top"
                  className=" hover:text-indigo-500 active"
                >
                  Home
                </a>
              </li>
              <li className="scroll-to-section">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-indigo-500"
                >
                  About
                </a>
              </li>
              <li className="scroll-to-section">
                <a
                  href="#contact-us"
                  className="text-gray-700 hover:text-indigo-500"
                >
                  Contact
                </a>
              </li>
              <li className="main-button">
                <a
                  onClick={handleLogin}
                  className=""
                >
                  Login
                </a>
              </li>
            </ul>

            {/* Mobile Menu Trigger */}
            <button
              className="menu-trigger md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="material-icons text-gray-700">menu</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <ul
            className={`md:hidden flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <li className="scroll-to-section">
              <a
                href="#top"
                className="text-gray-700 hover:text-indigo-500 active"
              >
                Home
              </a>
            </li>
            <li className="scroll-to-section">
              <a
                href="#features"
                className="text-gray-700 hover:text-indigo-500"
              >
                About
              </a>
            </li>
            <li className="scroll-to-section">
              <a
                href="#contact-us"
                className="text-gray-700 hover:text-indigo-500"
              >
                Contact
              </a>
            </li>
            <li className="main-button">
              <button
                onClick={handleLogin}
                className="text-white bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-lg"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Banner */}
      <div className="main-banner" id="top">
        <video autoPlay muted loop id="bg-video">
          <source src={vedio} type="video/mp4" />
        </video>
        <div className="video-overlay header-text">
          <div className="caption">
            <h6>
              Transform the Way Schools <em>Manage</em>, <em>Connect</em>, and{" "}
              <em>Grow</em>
            </h6>
            <h2>
              easy with our <em>CRM School Application</em>
            </h2>
            <div className="flex justify-center gap-4">
              <div className="main-button scroll-to-section">
                <a href="#features">Become a member</a>
              </div>
              <div
                className="main-button scroll-to-section"
                onClick={handleLogin}
              >
                <a href="#features">Go to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className=" py-16" id="features">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Explore Our <span className="text-indigo-600">Features</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Revolutionize your school management with powerful tools and
              intuitive designs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${atten})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Attendance Tracking</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Simplify attendance management with automated tools.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${perform})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Performance Reports</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Generate comprehensive academic and behavioral insights.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${parent})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Parent Portal</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Keep parents informed with real-time updates and insights.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${noti})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Automated Notifications</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Notify students, parents, and staff instantly with smart
                  alerts.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${class1})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Class Scheduling</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Organize and manage class schedules effortlessly.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${fee})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h4 className="text-lg font-bold">Fee Management</h4>
                <p className="mt-2 text-[#6FDCE3] text-md">
                  Streamline payment processing and fee tracking with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="section relative call-to-action"
        id="call-to-action"
        style={{
          backgroundImage: `url(${gd})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "black",
        }}
      >
        <div className="h-full bg-black absolute top-0 w-full bg-opacity-30 backdrop-blur-sm "></div>
        <div className="">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cta-content text-center">
                <h2>
                  Don’t <em>think</em>, begin <em>today</em>!
                </h2>
                <p>
                  Empower your school with seamless management and smarter
                  connections.
                </p>
                <div className="flex justify-center gap-4 sm:flex-wrap">
                  <div className="main-button scroll-to-section">
                    <a href="#our-classes">Get Started for Free</a>
                  </div>
                  <div className="main-button scroll-to-section">
                    <a href="#our-classes">Become a member</a>
                  </div>
                  <div className="main-button scroll-to-section">
                    <a href="#our-classes">Login to Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20" id="why-choose-us">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-semibold mb-6">
            Why <em>Choose Us</em>?
          </h2>
          <p class="text-lg mb-12 text-gray-700">
            Here are a few reasons why our School CRM solution is the best
            choice for your institution.
          </p>

          <div class="grid md:grid-cols-3 gap-12">
            {/* <!-- Reason 1 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/support.png"
                alt="quality-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">Quality Support</h3>
              <p class="text-gray-700">
                Our team offers round-the-clock support to help you with any
                issues, ensuring your smooth experience with the CRM.
              </p>
            </div>

            {/* <!-- Reason 2 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/data-configuration.png"
                alt="data-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">
                Customizable Solutions
              </h3>
              <p class="text-gray-700">
                Our CRM system is fully customizable to meet your school's
                unique needs, making it the perfect fit for your institution.
              </p>
            </div>

            {/* <!-- Reason 3 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/safe.png"
                alt="reliability-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">Reliable & Secure</h3>
              <p class="text-gray-700">
                Our platform ensures your data is secure with top-notch
                encryption, providing a safe environment for your school's
                sensitive information.
              </p>
            </div>

            {/* <!-- Reason 4 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/running.png"
                alt="automation-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">
                Automation at Its Best
              </h3>
              <p class="text-gray-700">
                Automate tasks like attendance, grades, and communication to
                save time and reduce manual errors in your administrative tasks.
              </p>
            </div>

            {/* <!-- Reason 5 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/organization.png"
                alt="organization-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">Enhanced Organization</h3>
              <p class="text-gray-700">
                With our CRM, manage student records, teacher schedules, and
                school events in a seamless and organized way.
              </p>
            </div>

            {/* <!-- Reason 6 --> */}
            <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/graph.png"
                alt="analytics-icon"
                class="mb-6 w-16 h-16"
              />
              <h3 class="text-2xl font-semibold mb-4">Powerful Analytics</h3>
              <p class="text-gray-700">
                Access detailed insights and analytics to monitor school
                performance, attendance, and grades to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="bg-cover bg-center py-20"
        id="contact-us"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "black",
        }}
      >
        <div class="container mx-auto text-center text-black">
          <h2 class="text-4xl font-semibold mb-6">Get in Touch with Us</h2>
          <p class="text-lg mb-12">
            Have any questions or feedback? We would love to hear from you!
          </p>

          <div class="flex justify-center">
            <form
              action="#"
              method="POST"
              class="bg-black opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
            >
              <div>
                <label
                  for="name"
                  class="block text-lg text-left font-medium text-gray-100"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-lg text-left font-medium text-gray-100"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label
                  for="message"
                  class="block text-lg text-left font-medium text-gray-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full py-3 bg-[#73BBA3] text-black rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#73BBA3] text-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            {/* Left section: Contact info and services */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 text-left">
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <p>123 School Lane, Education City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: support@schoolcrm.com</p>
            </div>

            {/* Middle section: Services or About */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 text-left">
              <h4 className="text-xl font-bold mb-4">Our Services</h4>
              <ul className="space-y-2 text-black">
                <li>
                  <a
                    href="#features"
                    className=" text-black hover:text-green-500 transition"
                  >
                    CRM Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-black hover:text-green-500 transition"
                  >
                    Student Management
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-black hover:text-green-500 transition"
                  >
                    Parent-Teacher Communication
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className=" text-black hover:text-green-500 transition"
                  >
                    Attendance Tracking
                  </a>
                </li>
              </ul>
            </div>

            {/* Right section: Social Media Links */}
            <div className="w-full md:w-1/3 text-left">
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-2xl text-black">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  className="hover:text-green-500 text-black"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-green-500 text-black"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:text-green-500 text-black"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-green-500 text-black"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-green-500 text-black"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="text-center mt-8 opacity-50">
            <p>
              Copyright &copy; {new Date().getFullYear()}{" "}
              <span className="text-white">Easy India Erp</span> | Developed and
              Designed by{" "}
              <a
                href="https://www.aradhyatechnologies.in"
                className="hover:text-green-500 text-white"
              >
                Aradhya Technologies and Skill Development.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrainingStudio;
