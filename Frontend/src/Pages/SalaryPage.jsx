import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState();
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => setSalary(data));
  }, [searchText]);

  const handleSearch = () => {
    const filteredJobs = salary.filter((job) => {
      const title = job.title ? job.title.toLowerCase() : ""; // Check if job.jobTitle is defined
      const search = searchText ? searchText.toLowerCase() : ""; // Check if searchText is defined
      return title.indexOf(search) !== -1;
    });
    console.log(filteredJobs);
    setSalary(filteredJobs);
  };

  //   console.log(searchText);
  return (
    <div className="max-w-screen-2x1 container mx-auto xl:px-24 px-4">
      <PageHeader title={"Estimate Salary"} path={"Salary"} />
      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 p1-3 border focus: outline-none1g:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="☐ bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* Salary Card */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {salary.map((data) => (
          <div key={data.id} className="shadow px-4 py-8">
            <h4 className="font-semibold text-xl">{data.title}</h4>
            <p className="my-2 font-medium ☐ text-blue text-lg">
              {data.salary}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/" className="underline">
                {data.status}
              </a>
              <a href="/" className="underline">
                {data.skills}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryPage;
