import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/components/context/context';
import Header from '../../src/components/Header';
import store from '../../src/components/redux/store';
/* eslint-disable cypress/no-unnecessary-waiting */
function renderLoginCommponent(user) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AuthContext.Provider value={{ user }}>
          <Header />
        </AuthContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}

describe('Header Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it('renders', () => {
    cy.mount(renderLoginCommponent());
  });

  it('shows the logout button only when user is logged in', () => {
    let login = cy.stub().returns('eyJhbGciOiJIUzI1NiIsIn');
    let user = login();
    cy.mount(renderLoginCommponent(user));
    cy.get('.logout-button').should('exist');
    cy.wait(2000);
  });

  it('hide the logout button only when user is logged out', () => {
    let logout = cy.stub().returns(null);
    let user = logout();
    cy.mount(renderLoginCommponent(user));
    cy.get('.logout-button').should('not.exist');
  });
});
