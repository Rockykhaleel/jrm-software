import { useEffect, useState } from "react";
import Navigation from "../../Components/admin/Navigation";
import logo from "../../assets/logo-new-JRM-2685501165.png";

// eslint-disable-next-line react/prop-types
const SAllBranches = ({ Toggle }) => {
  const [object, setObject] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/user/getAllUsers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setObject(data.data);
    };

    fetchData();
  }, []);

  // Function to handle changes in the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the data based on the search query
  const filteredData = object.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="px-3">
        <Navigation Toggle={Toggle} />
        <div className="container-fluid">
          <div className="row g-3 my-2">
            {/* Search bar */}
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            /> */}
            <div className="searchBox ">
              <input
                className="searchInput"
                type="text"
                name=""
                placeholder="Search something"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="searchButton" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2_17)">
                    <g filter="url(#filter0_d_2_17)">
                      <path
                        d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        shapeRendering="crispEdges"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_17"
                      x="-0.418549"
                      y="3.70435"
                      width="29.7139"
                      height="29.7139"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_17"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_17"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <clipPath id="clip0_2_17">
                      <rect
                        width="28.0702"
                        height="28.0702"
                        fill="white"
                        transform="translate(0.403503 0.526367)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            {filteredData.map((item) => {
              return (
                <div className="col-md-4" key={item._id}>
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      <div className="card mb-3">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={logo}
                              className="img-fluid rounded-start"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <h6 className="card-subtitle mb-2 text-body-secondary">
                                {item.address}
                              </h6>
                              <a href="#" className="card-link">
                                {item.email}
                              </a>
                              <a href="#" className="card-link">
                                {item.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAllBranches;
