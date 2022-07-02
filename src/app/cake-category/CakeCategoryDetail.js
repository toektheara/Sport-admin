import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import axios_instance from "../../libs/axiosInstance";

const CakeCategoryDetail = () => {
  const [token] = useAuthContext();
  const [data, setData] = useState();

  const params = useParams();

  useEffect(() => {
    axios_instance
      .get(`/cake-category/${params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const x = e.target;

    const input = {
      name: x.name.value,
      description: x.description.value,
    };

    try {
      const res = await axios_instance.post(
        `/cake-category/${params.id}/update`,
        {
          ...input,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      window.location.replace(`/cake-category/${res.data.cakeCategoryId}/edit`);
    } catch (err) {
      console.error(err);
    }
  };

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
          Edit Cake Category{" "}
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
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample" onSubmit={onHandleSubmit}>
                <Form.Group>
                  <label>Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    size="lg"
                    defaultValue={data.cakeCategory.name}
                  />
                </Form.Group>

                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={5}
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    defaultValue={data.cakeCategory.description}
                  />
                </Form.Group>
                <button type="submit" className="btn btn-gradient-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCategoryDetail;
