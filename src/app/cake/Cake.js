import React, { useState, useEffect } from "react";
import axios_instance from "../../libs/axiosInstance";

const Cake = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios_instance
      .get("/cakes")
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
          Cake{" "}
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
              <h4 className="card-title">Cake List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> thumbnail </th>
                      <th> name </th>
                      <th> price </th>
                      <th> description </th>
                      <th> bakery shop </th>
                      <th> cake category </th>
                      <th> Tracking ID </th>
                      <th> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.cakeList
                      ? data.cakeList.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                <img
                                  src={
                                    item.thumbnail
                                      ? item.thumbnail
                                      : require("../../assets/images/faces/face1.jpg")
                                  }
                                  className="mr-2"
                                  alt="face"
                                />
                              </td>
                              <td>{item.name} </td>
                              <td> {item.price}$ </td>
                              <td> {item.description} </td>
                              <td> {item.bakery_shop_id} </td>
                              <td>{item.cake_category_id}</td>
                              <td> {item.id} </td>
                              <td>
                                <a href={`/cake/${item.id}/edit`}>
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
                        })
                      : undefined}
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

export default Cake;
