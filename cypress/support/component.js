import "./commands";

import { mount } from "cypress/react18";
import "../../src/assets/style.css";
Cypress.Commands.add("mount", mount);
