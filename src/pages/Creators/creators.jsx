import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components";

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  //   Pagination useState(s)
  const [currentCreatorPage, setCurrentCreatorPage] = useState(
    parseInt(sessionStorage.getItem("currentCreatorPage")) || 1
  );
  const limit = 20;

  useEffect(() => {
    async function fetchCreators(currentCreatorPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/creators?limit=${limit}&offset=${
          (currentCreatorPage - 1) * limit
        }&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setCreators(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchCreators(currentCreatorPage);
    sessionStorage.setItem("currentCreatorPage", currentCreatorPage);

    document.title = "Marvel Creators";
  }, [currentCreatorPage, limit]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentCreatorPage(number);
    sessionStorage.setItem(currentCreatorPage, number);
  };

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <>
      <section className="container-fluid bg-dark">
        <div className="container vh-auto">
          <h3 className="text-bold fw-bold text-center py-3">
            Marvel Creators
          </h3>
          <div className="d-flex justify-content-between">
            <div className="">Total Creators Found : {total}</div>
            <div className="text-center h6 fw-bold bg-black p-3">
              Page {currentCreatorPage} of {totalPages()}
            </div>
            <div className="text-center h6">
              Total Characters Rendered : {count}
            </div>
          </div>

          <div className="row">
            {creators.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-success card my-3 bg-black">
                    <Link
                      key={c.id}
                      to={`/creators/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className="card-img-top"
                          alt={"img of " + c.fullName}
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-success py-3">
                            {c.fullName}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="container d-flex overflow-auto pt-5">
              <nav aria-label="Page navigation example ">
                <ul className="pagination">
                  {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                    (number) => (
                      <li
                        key={number}
                        className={`page-item ${
                          currentCreatorPage === number ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(number)}
                        >
                          {number}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Creators;
