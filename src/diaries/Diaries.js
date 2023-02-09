import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import DiaryItem from "./DiaryItem";
import { getAllPosts } from "../api-helpers/helpers";
import Loader from "../Loader";

const Diaries = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getAllPosts()
      .then((data) => setPosts(data?.posts.reverse()))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader open={isLoading } setOpen={setIsLoading}/>;
  }

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent="center"
      alignItems={"center"}
    >
      {" "}
      {posts &&
        posts.map((item, index) => (
          <DiaryItem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item._id}
            location={item.location}
            title={item.title}
            key={index}
            user={item.user}
          />
        ))}
    </Box>
  );
};

export default Diaries;
