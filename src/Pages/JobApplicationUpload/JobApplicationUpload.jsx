import { useContext, useEffect, useState } from "react";
import BigButton from "../../components/Button/BigButton";
import info from "./assets/Info-circle.png";
import LetterCard from "./components/LetterCard";
import ProfileCard from "./components/ProfileCard";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";

const JobApplicationUpload = () => {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT_URL;
  const { token, clientId } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage(value);
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/designer/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response?.data?.data[0]?.email);
      const data = response?.data?.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const jobApplication = async () => {
    try {
      // setIsLoading(true);
      if (!message) {
        return toast.error("Please enter the message!");
      } else {
        setIsLoading(true)
        const response = await axios.post(
          `${baseUrl}/job/apply/${clientId}`,
          {
            message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // console.log("https://tailors-mall-backend.onrender.com/api/v1");

  // const [jobApplicationData, setJobApplicationData] = useState(() => {
  //   const savedJobApplicationData = localStorage.getItem("jobApplication");
  //   return savedJobApplicationData
  //     ? JSON.parse(savedJobApplicationData)
  //     : {
  //         letter: "",
  //         file: "",
  //       };
  // });

  // useEffect(() => {
  //   localStorage.setItem("jobData", JSON.stringify(jobApplicationData));
  // }, [jobApplicationData]);

  return (
    <>
      <div className="flex flex-col flex-shrink-0 w-full px-4 gap-8 md:px-10 lg:px-16 lg:gap-11">
        <Navbar text="Share work" />
        <div className="flex py-5 px-4 items-center gap-1 rounded-lg w-fit bg-[#fff2b0] mt-[120px]">
          <img src={info} alt="" className="flex-shrink-0" />
          <p className="text-[#535353] text-[11px] font-medium leading-[15.4px]">
            Your application will be submitted with your Tailora profile and
            projects
          </p>
        </div>

        {/* <div className="flex gap-6 justify-center flex-col items-center w-full lg:flex-row"> */}
        <div className="flex flex-col lg:items-center lg:flex-row gap-6">
          <ProfileCard userData={userData} />

          {/* <div className="flex lg:w-[60%] flex-col gap-4"> */}
          <LetterCard
            handleChange={handleChange}
            message={message}
            setMessage={setMessage}
          />
        </div>

        <div className="flex lg:justify-end">
          <button
            onClick={jobApplication}
            className="rounded-[100px] flex items-center justify-center px-7 py-3 bg-[#008080] h-10 text-[#E6F2F2] text-[12px] w-full leading-4 font-medium md:text-base md:leading-[22.4px] lg:text-[16px] lg:w-fit"
          >
            {isLoading ? (
              <div className="flex justify-center space-x-2">
                <span>Sending</span>
                <Oval
                  height={20}
                  width={20}
                  color="white"
                  secondaryColor="white"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <span className="text-center">Send Application</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobApplicationUpload;
