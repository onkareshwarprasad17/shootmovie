import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DetailsBanner from './DetailsBanner';
import PosterFallback from '../../../assets/no-image-poster.png';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';

describe('Details Banner renders correctly', () => {
  test('details banner text renders', () => {
    const data = {
      id: 123,
      title: 'Shazam',
      year: '2023',
      overview: 'this is overview',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 9.8,
      posterImg: '/1.png',
    };

    render(
      <MemoryRouter initialEntries={['/movie/123']}>
        <Provider store={store}>
          <DetailsBanner data={data} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Shazam/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).not.toHaveTextContent('...');

    expect(screen.getAllByTestId('genre-badge')).toHaveLength(1);

    const posterImage = screen.getByTestId('poster');
    expect(posterImage).toBeInTheDocument();

    expect(posterImage).toHaveAttribute(
      'src',
      expect.stringContaining('1.png')
    );
  });

  test('ellipsis renders properly when overview is greater than MAX_LINES', async () => {
    const data = {
      id: 123,
      title: 'Shazam',
      year: '2023',
      overview:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex ipsa iste delectus eveniet necessitatibus dolores id atque. Ab nemo in non doloremque voluptatibus alias exercitationem quam, a harum repudiandae deleniti! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate ipsa voluptates, tempora nam quas earum at quo quia unde aperiam vel veritatis ratione labore ullam doloribus illo amet eligendi dolores?',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 9.8,
      posterImg: '/1.png',
    };

    render(
      <MemoryRouter initialEntries={['/movie/123']}>
        <Provider store={store}>
          <DetailsBanner data={data} />
        </Provider>
      </MemoryRouter>
    );
    const showMoreButton = screen.getByText('More Details');
    const ellipsis = screen.getByTestId('ellipsis');

    expect(showMoreButton).toBeInTheDocument();
    expect(ellipsis).toBeInTheDocument();
    expect(screen.getByTestId('overview')).not.toHaveTextContent(data.overview);

    await fireEvent.click(ellipsis);

    expect(screen.getByTestId('overview')).toHaveTextContent(data.overview);
    expect(ellipsis).not.toBeInTheDocument();
  });

  test('poster fallbacks correctly', async () => {
    const data = {
      id: 123,
      title: 'Shazam',
      year: '2023',
      overview: 'this is overview',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 9.8,
      posterImg: null,
    };

    render(
      <MemoryRouter initialEntries={['/movie/123']}>
        <Provider store={store}>
          <DetailsBanner data={data} />
        </Provider>
      </MemoryRouter>
    );

    const posterImg = screen.getByTestId('poster');
    expect(posterImg).toHaveAttribute('src', 'NaN');
    fireEvent.error(posterImg);
    expect(posterImg).toHaveAttribute('src', `${PosterFallback}`);
  });
});
