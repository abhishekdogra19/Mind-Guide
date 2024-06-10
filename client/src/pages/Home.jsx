import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import hero from "../assets/hero.png";
import Counselors from "../components/Counselors";
import Tools from "../components/Tools";
import ContactIllustraion from "../assets/Contact_illustration.jpg";
const Home = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Career Counseling",
      img: "https://i.pinimg.com/564x/94/2d/25/942d2571b68cfb3e577352f3790ca598.jpg",
      description: `Our AI-powered career counseling offers students tailored advice
      by analyzing their profiles and matching them with ideal career
      options, ensuring they embark on a fulfilling professional
      journey.`,
    },
    {
      title: "Sentiment Analysis Tool",
      img: "https://i.pinimg.com/564x/c1/21/d3/c121d3f414b1bf5214a6b876451d26b9.jpg",
      description:
        "Using cutting-edge AI, our sentiment analysis tools monitor students' well-being, alerting them to potential issues and enhancing overall emotional support by assessing sentiment in feedback and interactions.      ",
    },
    {
      title: "Academic Planning and Goal Setting",
      img: "https://img.freepik.com/free-vector/learning-concept-illustration_114360-3454.jpg?t=st=1717396196~exp=1717399796~hmac=e61be2a695827d71cb1edb23d9707925e5b70d0f8d67a24b6ce2f0467128d1d5&w=826",
      description:
        "Our AI constructs personalized academic roadmaps for students, considering their unique learning styles and progress, while also generating detailed student reports to provide insights into academic performance and areas for improvement.      ",
    },
  ];
  return (
    <div id="top" className="relative">
      <section className="min-h-screen relative flex flex-col pt-32 lg:pt-0 lg:justify-center  bg-primaryColor text-white">
        <div className="flex flex-col-reverse lg:items-center justify-center lg:flex-row w-full px-10">
          <div className="flex px-6 lg:pl-6  flex-col items-start justify-center gap-6  lg:w-full">
            <h1 className="text-3xl lg:text-6xl font-semibold">
              Unlock your Potential
            </h1>
            <p className="text-xs lg:text-xl">
              Discover the power of education with Mind-Guide.
              <br /> Transform your future and achieve your goals.
            </p>
            <Button
              className="bg-white text-primaryColor text-xs lg:text-xl px-2 py-1 rounded-2xl hover:bg-cyan-700"
              onClick={() => navigate("/")}
            >
              Enroll Now
            </Button>
          </div>
          <div className="w-full  object-cover z-50">
            <img src={hero} alt="" className="   mx-auto " />
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 border-white z-40 "
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,122.7C96,149,192,203,288,229.3C384,256,480,256,576,218.7C672,181,768,107,864,69.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
      <section className="min-h-96  py-6 flex flex-col gap-6  items-center justify-between  w-full mx-auto bg-white">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-extrabold tracking- text-center  max-w-2xl w-full lg:text-4xl ">
            {" "}
            What type of{" "}
            <span className="text-green-600 font-extrabold">therapy</span> are
            you looking for ?
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="border-2 px-4 lg:px-10 py-6 lg:py-8 text-xl rounded-lg"
            >
              <h1 className="text-xl lg:text-2xl font-extrabold mb-2 text-center text-primaryColor">
                {card.title}
              </h1>
              <div className="lg:h-96 group overflow-hidden  rounded-lg  mb-10 ">
                <img
                  src={card.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 duration-300"
                />
              </div>
              <p className="text-sm lg:text-xl font-semibold text-primaryColor text-justify">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Counselors />
      <Tools />
      {/* Contact */}
      <section
        id="contact"
        className="px-3 py-6 lg:p-10 flex flex-col items-center justify-center gap-1 w-full z-50 "
      >
        <div>
          <h1 className="text-2xl font-extrabold tracking- text-center  max-w-2xl w-full lg:text-4xl ">
            {" "}
            <span className="text-green-600 font-extrabold">Contact</span> Form
          </h1>
        </div>
        <div className="flex w-full items-center justify-center flex-col lg:flex-row p-4 lg:px-20 ">
          <div className="lg:h-[36rem] group overflow-hidden w-full  rounded-lg  ">
            <img
              src={ContactIllustraion}
              alt=""
              className="w-full h-full  object-contain object-center group-hover:scale-105 duration-300"
            />
          </div>
          <form
            action="mailto:2020a1r062@mietjammu.in"
            method="post"
            encType="text/plain"
            className="flex flex-col gap-3 w-full max-w-3xl mx-auto z-40"
          >
            <Label htmlFor="name" value="Name" />
            <TextInput
              type="text"
              id="name"
              placeholder="Enter Name"
              className="  rounded-xl"
            />
            <Label htmlFor="email" value="Email" />
            <TextInput
              type="email"
              id="email"
              placeholder="Enter Email"
              className="  rounded-xl"
            />
            <Label htmlFor="message" value="Your Message" />
            <Textarea
              id="message"
              placeholder="Your Message..."
              rows="10"
              className="  rounded-xl"
            />
            <button className="bg-primaryColor py-4  w-full text-white rounded-xl border-2 border-white">
              Send
            </button>
          </form>
        </div>
      </section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 border-white z-10 min-h-[24rem] "
      >
        <path
          fill="#325342"
          fillOpacity="1"
          d="M0,96L48,122.7C96,149,192,203,288,229.3C384,256,480,256,576,218.7C672,181,768,107,864,69.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Home;
