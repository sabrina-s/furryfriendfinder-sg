import React, { useState } from "react";
import axios from "axios";

const AvatarPage = () => {
  const [avatar, setAvatar] = useState({ image: "" });

  const handleImageChange = (e) => {
    setAvatar({ image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", avatar.image);

    axios
      .post("http://localhost:5000/avatars", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>upload avatar here</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        ></input>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AvatarPage;
