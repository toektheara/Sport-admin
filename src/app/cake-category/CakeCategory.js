import React, { useEffect, useState } from "react";
import axios_instance from "../../libs/axiosInstance";

const CakeCategory = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios_instance
      .get("/cake-categories")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!data)
    return (
      <div>
        <div className="spinner-wrapper">
          <div className="donut"></div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Cake Category{" "}
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span></span>Overview{" "}
              <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
            </li>
          </ul>
        </nav>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Cake Category List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> name </th>
                      <th> description </th>
                      <th> Tracking ID </th>
                      <th> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.cakeCategoryList ? data.cakeCategoryList.map((item) => {
                      return (
                        <tr key={item.id} >
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.id}</td>
                          <td>
                            <a href={`/cake-category/${item.id}/edit`}>
                              <button
                                type="submit"
                                className="btn btn-gradient-success mr-2"
                              >
                                Edit
                              </button>
                            </a>
                          </td>
                        </tr>
                      );
                    }) : undefined}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCategory;
