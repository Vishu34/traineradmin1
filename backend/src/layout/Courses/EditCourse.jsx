import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

function EditCourses() {
  //get current details of the cource
  const { id } = useParams();
  const [data, loading, error] = useFetch(`/courses/${id}`, true);
  //create a state to store all the data that will be sent with request
  const [formData, setFormData] = useState({
    cslug: "",
    ctitle: "",
    cintro: "",
    AccessPeriodDays: "",
    caddon: "",
    cstatus: "",
    ccategory: "",
    csubcategory: "",
    ctype: "",
    cduration: "",
    cfess: "",
    cofferfees: "",
    ctrainer: "",
    cthumbnail: null,
    ccoverimage: null,
    cdemovideo: null,
    ckeywords: "",
    cmodules: "",
    cdescription: "",
  });
  //when the data is fetched set it to the form data
  useEffect(() => {
    if (!loading && !error) {
      setFormData(data.data);
    }
  }, [data, loading, error]);
  //create a functon to handle the change of the data
  const handleChange = (e) => {
    setFormData((prevParams) => ({
      ...prevParams,
      [e.target.name]: e.target.value,
    }));
  };
  //create a function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //logic to update data
    console.log("form submitted", formData);
  };
  return (

    <div className="w-100 p-3 bg-main">
      <form
        // Form for Adding Course information
        className="forms-sample w-100 m-2 p-4 card"
        onSubmit={handleSubmit}
      >
        {/* Form inputs for course details */}
        <div className="w-100 d-flex gap-3">
          {/* Form group for coursename*/}
          <div className="form-group w-100 row">
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Slug</label>
              <input
                type="text"
                className="form-control"
                value={formData.cslug}
                name="cslug"
                placeholder="Course Slug"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.ctitle}
                name="ctitle"
                placeholder="Course Title"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Intro</label>
              <input
                type="text"
                className="form-control"
                value={formData.cintro}
                name="cintro"
                placeholder="Course Intro"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">
                Course Access Period Days
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.AccessPeriodDays}
                name="AccessPeriodDays"
                placeholder="Course Access Period Days"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Addon</label>
              <input
                type="text"
                className="form-control"
                value={formData.caddedon}
                name="caddedon"
                placeholder="Course Addons"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Status</label>
              <input
                type="text"
                className="form-control"
                value={formData.cstatus}
                name="cstatus"
                placeholder="Course Status"
                onChange={handleChange}
              />
            </div>

            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Category</label>
              <input
                type="text"
                className="form-control"
                value={formData.ccategory}
                name="ccategory"
                placeholder="Course Category"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Subcategory</label>
              <input
                type="text"
                className="form-control"
                value={formData.csubcategory}
                name="csubcategory"
                placeholder="Course Subcategory"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Type</label>
              <input
                type="text"
                className="form-control"
                value={formData.ctype}
                name="ctype"
                placeholder="Course Type"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Duration</label>
              <input
                type="text"
                className="form-control"
                value={formData.cduration}
                name="cduration"
                placeholder="Course Duration"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Fees</label>
              <input
                type="text"
                className="form-control"
                value={formData.cfess}
                name="cfess"
                placeholder="Course Fees"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Offer Fees</label>
              <input
                type="text"
                className="form-control"
                value={formData.cofferfees}
                name="cofferfees"
                placeholder="Course Offer Fees"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Trainer</label>
              <input
                type="text"
                className="form-control"
                value={formData.ctrainer}
                name="ctrainer"
                placeholder="Course Trainer"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Thumbnail</label>
              <input
                type="file"
                className="form-control"
                value={formData.cthumbnail}
                name="cthumbnail"
                placeholder="Course Duration"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Cover Image</label>
              <input
                type="file"
                className="form-control"
                value={formData.ccoverimage}
                name="ccoverimage"
                placeholder="Course Cover Image"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Demo Video</label>
              <input
                type="file"
                className="form-control"
                value={formData.cdemovideo}
                name="cdemovideo"
                placeholder="Course Demo Video"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Course Keywords</label>
              <input
                type="text"
                className="form-control"
                // value={params.cname || ""}
                name="ckeywords"
                value={formData.ckeywords}
                placeholder="Course keywords"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Course Modules</label>
              <textarea
                name="csubcategory"
                value={formData.csubcategory}
                id=""
                className="form-control"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Course Discription</label>
              <textarea
                name="cdescription"
                value={formData.cdescription}
                id=""
                className="form-control"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit and cancel buttons */}
        <button type="submit" className="btn my-2 btn-primary ">
          Submit
        </button>
        <button type="reset" className="btn my-2 btn-light">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCourses;
