import '@testing-library/jest-dom';
import {server} from './utils/tests/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
