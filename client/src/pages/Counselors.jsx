import { Link } from "react-router-dom";

const counselors = [
  {
    type: "Academic Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-speech-therapy-illustration_23-2149211795.jpg?w=1060&t=st=1701240171~exp=1701240771~hmac=7724e7522d1530150a446d7c781fc7bf01fcb98fd123df50ff5a3d9a6e5132a9",
  },
  {
    type: "Career Counselor",
    image:
      "https://cdn.vectorstock.com/i/1000x1000/75/62/psychotherapy-counseling-doctor-psychologist-vector-25617562.webp",
  },
  {
    type: "Personal Counselor",
    image:
      "https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4874.jpg?w=740&t=st=1701239974~exp=1701240574~hmac=0113c9f934511efbd7fdec887780a1d0419b0c9daef878ededa42d54a722352a",
  },
  {
    type: "Financial Counselor",
    image:
      "https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg?w=1060&t=st=1701240027~exp=1701240627~hmac=1834e3cae4356cabb9d2131497e0886a3087f2c1202571135610816574b114d7",
  },
  {
    type: "Health and Wellness Counselor",
    image:
      "https://img.freepik.com/free-vector/medical-worker-with-clipboard-waiting-patients_74855-7617.jpg?w=1380&t=st=1701240056~exp=1701240656~hmac=16eb398c823e4f8fd11c0abea654bba7166348188b9faf8868214bffc3257dc4",
  },
  {
    type: "Student Life Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-visit-psychologist-concept_52683-69070.jpg?w=996&t=st=1701240107~exp=1701240707~hmac=2263fc5eaa7dfbcbdf544e73f298064cf82f0e8d7ca0ded471712d03d37fa2f4",
  },
  {
    type: "Emotional Support Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-visit-psychologist-concept_52683-69069.jpg?w=740&t=st=1701240136~exp=1701240736~hmac=da1f260b4eafd0ca44d15abbdac1ac8feec04af3fd94ebe9451dd8feb023d996",
  },
];

const Counselors = () => {
  return (
    <div className="overflow-hidden p-10">
      <div className="text-4xl font-bold text-center text-gray-800 py-10">
        Kindly choose your designated{" "}
        <span className="text-green-400">counselor</span>.
      </div>
      <div className="p-3 grid grid-cols-3 gap-4 ">
        {counselors.map((counselor, index) => (
          <div
            key={index}
            className="text-white bg-slate-700 h-96 p-2 rounded-xl relative hover:scale-110 hover:flex-1  duration-300"
          >
            <img
              src={counselor.image}
              alt=""
              className="h-2/3 w-full object-cover"
            />
            <h2 className="text-3xl text-center mt-10 hover:text-red-500">
              <Link to={`/counselors/chat/${counselor.type.toLowerCase()}`}>
                {counselor.type}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counselors;
