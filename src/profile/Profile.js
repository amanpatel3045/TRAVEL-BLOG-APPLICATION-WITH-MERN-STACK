import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getUserDetails } from "../api-helpers/helpers";
// import DiaryItem from "../diaries/DiaryItem";
import DiaryItem from "../diaries/DiaryItem";

const Profile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box display="flex" flexDirection={"column"}>
      <Typography
        textAlign={"center"}
        variant="h3"
        fontFamily={"quickStand"}
        padding={2}
      >
        User Profile
      </Typography>
      <Typography fontFamily={"quickstand"} padding={1} textAlign="left">
        Name:Aman
      </Typography>
      <Typography fontFamily={"quickstand"} padding={1} textAlign="left">
        Email:amanpatel3045@gmail.com
      </Typography>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        {user.posts.map((post, index) => (
          <DiaryItem
            key={index}
            title={post.title}
            date={post.date}
            description={post.description}
            id={post.id}
            image={post.image}
            location={post.location}
            user={user._id}
            
          />
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
