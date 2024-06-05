import { Footer } from "flowbite-react";
import headerIcon from "../assets/headerIcon.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { HashLink } from "react-router-hash-link";

const FooteSr = () => {
  return (
    <Footer container className="bg-[#1d2d25] text-white rounded-none ">
      <div className="w-full  ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex items-center gap-2 mb-6">
            <img src={headerIcon} alt="" className="w-8 lg:w-14" />
            <HashLink className="text-white text-2xl" to="#top">
              Mind Guide
            </HashLink>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <h1 className="mb-3">About</h1>
              <Footer.LinkGroup col>
                <HashLink
                  to={"https://github.com/abhishekdogra19/Mind-Guide"}
                  className="text-white  "
                >
                  Mind Guide
                </HashLink>
              </Footer.LinkGroup>
            </div>
            <div>
              <h1 className="mb-3">Follow us</h1>
              <Footer.LinkGroup col>
                <HashLink
                  className="text-white  "
                  to={"https://github.com/abhishekdogra19"}
                >
                  Github
                </HashLink>
                <HashLink className="text-white  ">Discord</HashLink>
              </Footer.LinkGroup>
            </div>
            <div>
              <h1 className="mb-3">Legal</h1>
              <Footer.LinkGroup col>
                <HashLink className="text-white  ">Privacy Policy</HashLink>
                <HashLink className="text-white  ">
                  Terms &amp; Conditions
                </HashLink>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Mind Guide"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooteSr;
