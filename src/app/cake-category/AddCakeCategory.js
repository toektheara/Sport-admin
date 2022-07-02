import React from "react";
import { Form } from 'react-bootstrap';
import useAuthContext from "../../context/AuthContext";
import axios_instance from "../../libs/axiosInstance";

const AddCakeCategory = () => {
  const [token] = useAuthContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const x = e.target;

    const input = {
      name: x.name.value,
      description: x.description.value
    };

    try {
      const res = await axios_instance.post('/cake-category/create', {
          ...input
      }, { headers: {'Authorization': 'Bearer '+  token} })

      window.location.replace(`/cake-category/${res.data.cakeCategory.id}`)
    } catch(err) {
      console.error(err)
    }
  };
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Create Cake Category{" "}
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

export default AddCakeCategory;
