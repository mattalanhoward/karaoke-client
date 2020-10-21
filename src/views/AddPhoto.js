import React, { Component } from "react";
import { uploadImage } from "../service";

function AddPhoto({ addImage }) {
  const handleImageUpload = (e) => {
    console.log("The file to be uploaded is", e.target.files[0]);
    uploadImage(e.target.files[0])
      .catch(console.error)
      .then((res) => addImage(res));
  };

  return (
    <>
      <form>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <button type="submit">Submit</button>
      </form>{" "}
    </>
  );
}

export default AddPhoto;