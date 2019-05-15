import * as io from 'socket.io-client'
import config from './config';

const socket = io.connect(config.api.entrypoint);

export default socket;
