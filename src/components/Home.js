import { Card, Col, Layout, Row } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from './homeSlice';
import { useDispatch, useSelector } from 'react-redux';

const IMG_URL = `https://image.tmdb.org/t/p/w500/`;

const Home = () => {
  //#region Using UseState hooks
  // const [movies, setMovies] = useState([]);

  // const getMovies = async () => {
  //   let response = await fetch(API_URL);
  //   let data = await response.json();
  //   if (data.results.length > 0) {
  //     setMovies(data.results);
  //   }
  // };

  // useEffect(() => {
  //   getMovies();
  // }, []);

  //#endregion

  // -------------- Using Redux --------------------
  const movies = useSelector((state) => state.home.movies.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <>
      {movies && movies.length > 0 && (
        <Layout.Content className="main-container">
          <Row gutter={16}>
            {movies.map((movie, index) => (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                key={index}
                className="movieCard-container"
                data-testid="column"
              >
                <Link to={`/movie/${movie.id}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        className="movieCard-image"
                        src={IMG_URL + movie.poster_path}
                        alt={movie.title}
                      />
                    }
                    size="small"
                  >
                    <p className="movieCard-title">{movie.title}</p>
                    <p className="movieCard-description">
                      {movie.overview.length > 100
                        ? movie.overview.substring(0, 100) + '...'
                        : movie.overview}
                    </p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Layout.Content>
      )}
    </>
  );
};

export default Home;
