import {setupServer} from 'msw/node';
import {requestHandlers} from './requestHandlers';

export const server = setupServer(...requestHandlers);
