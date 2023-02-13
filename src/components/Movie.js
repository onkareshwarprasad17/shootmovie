import {
  Badge,
  Col,
  Descriptions,
  Divider,
  Image,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "./movieSlice";
const IMG_URL = `https://image.tmdb.org/t/p/w500/`;

const Movie = () => {
  const params = useParams();

  //#region Using useState hook

  // const [movie, setMovie] = useState({});
  // const MOVIE_URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=76753a92ec5331ee546d385fbd9eb031&language=en-US`;

  // useEffect(() => {
  //   getMovieDetails();
  // }, []);

  // const getMovieDetails = async () => {
  //   const response = await fetch(MOVIE_URL);
  //   const data = await response.json();
  //   if (Object.entries(data).length) {
  //     setMovie(data);
  //   }
  // };
  //#endregion

  // ------------------ Using Redux --------------------
  const movie = useSelector((state) => state.movie.movieDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(params.id));
  }, [dispatch]);

  return (
    <>
      {movie && Object.entries(movie).length > 0 && (
        <Layout.Content className="movie-container">
          <Row gutter={6}>
            <Col lg={{ span: 10 }}>
              <Image width={`20rem`} src={IMG_URL + movie.poster_path} />
            </Col>
            <Col lg={{ span: 10 }}>
              <Typography.Title level={2} className="movie-title">
                {movie.title}
              </Typography.Title>
              <Typography.Text>{movie.overview}</Typography.Text>
              <Divider orientation="left">Genres</Divider>
              {console.log(movie.genres)}
              <Space>
                {movie?.genres.map((genre) => (
                  <Badge count={genre.name} showZero key={genre.name}></Badge>
                ))}
              </Space>
              <Divider orientation="left">Production Company(s)</Divider>
              <Space>
                {movie?.production_companies.map((company) => (
                  <Badge count={company.name} ke={company.name}></Badge>
                ))}
              </Space>
              <Descriptions
                title="More Info"
                layout="vertical"
                className="movie-description"
              >
                <Descriptions.Item label="Status of Release">
                  {movie.status}
                </Descriptions.Item>
                <Descriptions.Item label="Release Date">
                  {movie.release_date}
                </Descriptions.Item>
                <Descriptions.Item label="Revenue">{`${
                  movie.revenue / 10 ** 6
                }M`}</Descriptions.Item>
                <Descriptions.Item label="Budget">
                  {`${movie.budget / 10 ** 6}M`}
                </Descriptions.Item>
                <Descriptions.Item label="Runtime(in minutes)">
                  {movie.runtime}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Layout.Content>
      )}
    </>
  );
};

export default Movie;
