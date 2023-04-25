import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Hero from './Hero';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import useFetch from '../../../redux/hooks/useFetch';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Hero renders', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            backdrop_path: '/1.jpg',
            original_title: 'Movie 1',
            overview: 'movie 1 is at first card',
            vote_average: 8.5,
          },
          {
            id: 2,
            backdrop_path: '/2.jpg',
            original_title: 'Movie 2',
            overview: 'movie 2 is at second card',
            vote_average: 7.0,
          },
        ],
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Hero />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('carousel renders correctly', () => {
    const cardImage = screen.getAllByTestId('card-image');

    expect(cardImage.length).toBe(2);
  });

  test('dots are rendered correctly', () => {
    const dots = screen.getAllByTestId(/dot-\d+/i);

    expect(dots).toHaveLength(2);
  });

  test('carousel moves correctly when arrow buttons are clicked', async () => {
    const leftArrowButton = screen.getByTestId('left-arrow');
    const rightArrowButton = screen.getByTestId('right-arrow');
    const currentCard = screen.getAllByRole('link');
    const dots = screen.getAllByTestId(/dot-\d+/i);

    expect(currentCard.length).toBe(2);
    expect(leftArrowButton).toBeInTheDocument();
    expect(rightArrowButton).toBeInTheDocument();

    await fireEvent.click(rightArrowButton);
    expect(currentCard[1]).toHaveClass('active');
    expect(currentCard[0]).not.toHaveClass('active');
    expect(dots[1]).toHaveClass('active');

    await fireEvent.click(leftArrowButton);
    expect(currentCard[0]).toHaveClass('active');
    expect(dots[0]).toHaveClass('active');

    await fireEvent.click(leftArrowButton);
    expect(currentCard[1]).toHaveClass('active');
    expect(currentCard[0]).not.toHaveClass('active');

    await fireEvent.click(rightArrowButton);
    expect(currentCard[0]).toHaveClass('active');
    expect(dots[0]).toHaveClass('active');
  });

  test('renders movies when there are results in the data', () => {
    expect(screen.queryAllByTestId('heroCarousel-card')).toHaveLength(2);
  });
});

test('does not render movies when there are no results in the data', () => {
  useFetch.mockReturnValueOnce({
    data: {},
  });
  const { queryByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Hero />
      </Provider>
    </MemoryRouter>
  );
  expect(queryByTestId('heroCarousel-card')).not.toBeInTheDocument();
});
