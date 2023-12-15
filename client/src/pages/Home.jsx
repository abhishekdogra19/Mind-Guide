import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section
        id="secOne"
        className="h-screen pl-3 flex flex-col items-start justify-center gap-6 "
      >
        <h1 className="text-7xl ">Unlock your Potential</h1>
        <p className="text-2xl ">
          Discover the power of education with Mind-Guide.
          <br /> Transform your future and achieve your goals
        </p>
        <button
          className="bg-cyan-950 text-xl px-7 py-4 rounded-2xl hover:bg-cyan-700"
          onClick={() => navigate("/")}
        >
          Enroll Now
        </button>
      </section>
      <section
        id="secTwo"
        className="h-screen flex items-center justify-between px-10  bg-gray-200"
      >
        <div className=" w-2/4">
          <h1 className="text-5xl mb-6 font-semibold">About us</h1>
          <p className="text-justify leading-7">
            Welcome to our Mind Guide App, where we empower students on their
            educational journey by harnessing the power of AI. Our mission is to
            provide students with personalized guidance and counseling across a
            multitude of fields, helping them navigate the complexities of
            academia and career choices. Whether you&#39;re seeking advice in
            the realms of science, art, business, or any other area, our
            AI-driven platform connects you with expert counselors who can offer
            tailored insights and support. We believe that by leveraging
            cutting-edge technology, we can offer a comprehensive, dynamic, and
            inclusive approach to counseling, ensuring that every student has
            the opportunity to reach their full potential. Your aspirations are
            our priority, and we&#39;re here to guide you every step of the way.
          </p>
        </div>
        <img
          src={
            "https://images.unsplash.com/photo-1573495804664-b1c0849525af?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          className="h-2/4 rounded-2xl"
        />
      </section>
      <section className="h-screen px-10 pt-10 bg-gradient-to-br from-white to-gray-800">
        <h1 className="text-6xl">Services</h1>
        <div className="flex">
          <div className="w-1/3 p-10">
            <img
              src={
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="w-full h-80 object-cover rounded-3xl"
            />
            <h2 className="text-2xl my-2">Career Counseling </h2>
            <p className="text-justify">
              Our AI-powered career counseling offers students tailored advice
              by analyzing their profiles and matching them with ideal career
              options, ensuring they embark on a fulfilling professional
              journey.
            </p>
          </div>
          <div className="w-1/3 p-10">
            <img
              src={
                "https://img.freepik.com/free-photo/collage-customer-experience-concept_23-2149367121.jpg?w=1380&t=st=1700475840~exp=1700476440~hmac=59cd5b9a7bb333be1068e7a5acc1825fed98eb474ae182bc91c4d03c3a788e37"
              }
              alt=""
              className="w-full h-80 object-cover
               rounded-3xl"
            />
            <h2 className="text-2xl my-2">Sentiment Analysis Tools</h2>
            <p className="text-justify">
              Using cutting-edge AI, our sentiment analysis tools monitor
              students&#39; well-being, alerting them to potential issues and
              enhancing overall emotional support by assessing sentiment in
              feedback and interactions.
            </p>
          </div>
          <div className="w-1/3 p-10">
            <img
              src={
                "https://images.unsplash.com/photo-1506784881475-0e408bbca849?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="w-full h-80 object-cover rounded-3xl"
            />
            <h2 className="text-2xl my-2">
              Academic Planning and Goal Setting
            </h2>
            <p className="text-justify">
              Our AI constructs personalized academic roadmaps for students,
              considering their unique learning styles and progress, while also
              generating detailed student reports to provide insights into
              academic performance and areas for improvement.
            </p>
          </div>
        </div>
      </section>
      <section id="contact" className="p-10 flex gap-1 h-9">
        <div className="flex flex-col items-start justify-start gap-10 pr-4">
          <h1 className="text-4xl">Contact Us</h1>
          <p className="text-xl">
            Reach out to us using the contact form. We are here to help and
            answer any questions you may have. We look forward to hearing from
            you!
          </p>
        </div>
        <form
          action="mailto:2020a1r062@mietjammu.in"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-3 w-2/3"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            title="name"
            placeholder="Enter Name"
            className="border-solid border-2 border-gray-400 rounded-xl p-2 "
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            title="email"
            placeholder="Enter Email"
            className="border-solid border-2 border-gray-400 rounded-xl p-2 "
          />
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            cols="50"
            rows="10"
            className="border-solid border-2 border-gray-400 rounded-xl p-2 "
            placeholder="Your Message..."
          ></textarea>
          <input
            type="submit"
            value="Send"
            className="bg-gray-800 py-2 text-white rounded-xl"
          />
        </form>
      </section>
    </div>
  );
};

export default Home;
