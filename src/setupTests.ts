import '@testing-library/jest-dom';
import {server} from './utils/tests/server';

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
