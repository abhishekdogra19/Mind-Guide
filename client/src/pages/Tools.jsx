import toneAnalyzer from "../assets/tone-detector.jpeg";
const Tools = () => {
  return (
    <div className="h-screen py-2 flex flex-col gap-5">
      <h1 className="text-5xl p-2 text-center font-semibold">
        Analysis & Assessment Tools
      </h1>
      <div className="flex  h-full bg-slate-200 text-xl p-10 justify-around">
        <div className="text-white h-96 bg-slate-700 w-1/4 p-2 rounded-xl hover:scale-110 duration-500">
          <img src={toneAnalyzer} alt="" className="h-2/3" />
          <h2 className="text-3xl text-center mt-10 hover:text-red-500">
            <a href="https://abhishekdogra19.github.io/Speech-Text-ToneAnalyzer/">
              Text Tone Analyzer
            </a>
          </h2>
        </div>
        <div className="text-white h-96 bg-slate-700 w-1/4 p-2 rounded-xl hover:scale-110 duration-500 relative">
          <div className="bg-black absolute top-0 left-0 w-full h-full opacity-60 z-10 rounded-xl"></div>
          <img
            src={
              "https://img.freepik.com/free-vector/sad-corporate-man-worried-about-failure-decreasing-business-leadership-success-career-progress-concept-flat-illustration-business-man_1150-37432.jpg?w=740&t=st=1700475485~exp=1700476085~hmac=8e4d76e2582af8e7c5f00497f8e2007abf5dca4e65197d7c1596a03c4254ce31"
            }
            alt=""
            className="h-2/3 w-full object-cover "
          />
          <h2 className="text-3xl text-center mt-10 hover:text-red-500">
            <a href="">Personality Test</a>
          </h2>
          <p className="text-4xl whitespace-nowrap -rotate-12 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
