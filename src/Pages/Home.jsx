import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Job from "./Job";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  console.log(jobs);

  const [query, setQuery] = useState("");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  //filter jobs by title

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio based Filtering
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Button based filtering
  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  //  Main function
  const filterData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems;
    }

    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingdate,
        }) =>
          jobLocation.toLowerCase() === selected ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() == selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }

    return filteredJobs.map((data, idx) => <Card key={idx} data={data} />);
  };

  const result = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner state={query} handleQuery={handleQuery} />
      <div>
        <Job result={result} />
      </div>
    </div>
  );
};

export default Home;
