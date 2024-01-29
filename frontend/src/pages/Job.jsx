import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import data from "../components/DummyData/Data.json";
import JobPosting from "../components/JobPosting.jsx";
import ForCompanies from "../components/ForCompanies.jsx";

function Job() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [displayBody, setDisplayBody] = useState(false);

  const onChangeLocationHandler = (e) => {
    setSearchLocation(e.target.value);
  };

  const onChangeJobProfileHandler = (e) => {
    setSearchText(e.target.value);
  };

  const Search = (item) => {
    setSearchText(item);
    console.log("search", item);
  };

  const goToForCompanies = () => {
    setDisplayBody(true);
  };

  const goToForYou = () => {
    setDisplayBody(false);
  };

  const filterPeople = () => {
    return data.people.filter((person) => {
      const locationMatch = person.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
      const jobProfileMatch = person.jobProfile
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return locationMatch && jobProfileMatch;
    });
  };

  const data2 = [
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "Rejection Experience : INTERVIEW",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: "Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description:
        "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
  ];

  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="w-screen min-h-screen ">
        {/* Search Bars */}
        <div className="h-[4em] w-full flex flex-col g-0 items-center justify-start p-2 ">
          {/* Location Search Bar */}
          <div className="flex justify-center items-center w-fit h-10 p-3 g-2 border-black border-2 rounded-md">
            <input
              type="text"
              value={searchLocation}
              onChange={onChangeLocationHandler}
              className="rounded-md border-thin"
              placeholder="Enter Location"
            />
            <input
              type="text"
              value={searchText}
              onChange={onChangeJobProfileHandler}
              className="rounded-md border-thin"
              placeholder="Enter Job Profile"
            />
            <button
              className="w-fit p-1"
              onClick={() => Search(searchLocation)}
            >
              Search
            </button>
          </div>

          {/* Job Profile Search Bar
          <div className='flex justify-center items-center w-1/5 h-10 p-1 g-2 border-black border-2 rounded-md'>
            <button className='w-fit p-1' onClick={() => Search(searchJobProfile)}>
              Search
            </button>
          </div> */}

          {/* Search Results Dropdown */}
          <div className="dropdown absolute h-fit w-1/5">
            {Array.isArray(data.people) ? (
              data.people
                .filter((item) => {
                  const searchItems = searchText.toLowerCase();
                  console.log(searchItems);
                  const fullname = item.fullName.toLowerCase();

                  // Check if searchItems is empty or fullname starts with searchItems
                  return (
                    searchItems !== "" &&
                    fullname.startsWith(searchItems) &&
                    fullname !== searchItems
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <div
                    className="dropdown-row cursor-pointer text-center"
                    key={item.id}
                    onClick={() => Search(item.fullName)}
                  >
                    {item.fullName}
                  </div>
                ))
            ) : (
              <div className="error-message">Invalid data format</div>
            )}
          </div>
        </div>

        {/* SubNavbar */}
        <div className=" h-[8em] w-full flex justify-evenly items-center">
          <div className="font-bold cursor-pointer" onClick={goToForYou}>
            For You
          </div>
          <div className="font-bold cursor-pointer" onClick={goToForCompanies}>
            For Companies
          </div>
        </div>
         
        {/* Search Tags & Body */}
        <div className="flex justify-between min-h-screen w-full p-2">
          {/* Search Tags */}
          <div className="w-2/12 h-fit flex flex-col gap-3">
            <div className="w-full h-1/2 bg-slate-200 rounded-md border-1 border-blue-900 flex flex-wrap items-start justify-start gap-1 p-3">
              <div className="font-bold text-center w-full">Job Location</div>
              {/* Tags */}
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                value={"Delhi"}
              >
                Delhi
              </button>
              <button
                className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center"
                value={"Mumbai"}
              >
                Mumbai
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Chennai
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Hyderabad
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Banglore
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Noida
              </button>
            </div>

            <div className="w-full h-1/2 bg-slate-200 rounded-md border-1 border-blue-900 flex flex-wrap items-start justify-start gap-1 p-1">
              <div className="font-bold text-center w-full">Job Profile</div>
              {/* Tags */}
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Data Analyst
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Web Devloper
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                SEO specialist
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Meta Creater
              </button>
              <button className="w-fit h-[35px] bg-zinc-300 rounded-[21px] p-2 text-center">
                Educator
              </button>
            </div>
          </div>

          {/* Main Body of Content */}
          <div className="w-10/12 h-screen bg-white flex flex-col p-2 ">
            <div className="grid-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayBody ? (
                <>
                  {/* Infinite scroll test   */}
                  <ForCompanies/>
                </>
              ) : (
                data2.map((item, index) => (
                  <JobPosting
                    key={index}
                    title={item.title}
                    company={item.company}
                    position={item.position}
                    location={item.location}
                    jobType={item.jobType}
                    salary={item.salary}
                    description={item.description}
                    tags={item.tags}
                    image={item.image}
                    posted={item.posted}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;