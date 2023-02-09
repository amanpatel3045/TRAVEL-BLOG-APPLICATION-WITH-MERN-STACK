import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails, postUpdate } from "../api-helpers/helpers";
import { Box, Typography, TextField, FormLabel, Button } from "@mui/material";
import { addPost } from "../api-helpers/helpers";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
function DiaryUpdate() {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          description: data.post.description,
          imageUrl: data.post.image,
          location: data.post.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    setIsLoad(true);
    navigate("/diaries");
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs, id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoad(false));
  };

  if (isLoad) {
    return <Loader open={isLoad} setOpen={setIsLoad} />;
  }

  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
        >
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }}
        />
      </Box>
      {post && (
        <form onSubmit={handleSubmit}>
          <Box
            padding={3}
            display="flex"
            width="80%"
            margin="auto"
            flexDirection={"column"}
          >
            <FormLabel sx={{ fontFamily: "quickstand" }}>Title</FormLabel>
            <TextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quickstand" }}>Description</FormLabel>
            <TextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quickstand" }}>Image URL</FormLabel>
            <TextField
              onChange={handleChange}
              name="imageUrl"
              value={inputs.imageUrl}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quickstand" }}>Location</FormLabel>
            <TextField
              onChange={handleChange}
              name="location"
              value={inputs.location}
              variant="standard"
              margin="normal"
            />

            <Button
              type="submit"
              color="warning"
              sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
              variant="contained"
            >
              Post
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default DiaryUpdate;
