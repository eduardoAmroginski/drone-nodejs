import readline from "readline";
import { createSocket } from "dgram";
import CommandParser from "./CommandParser.js";
import Commander from "./Commander.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TELLO_CMD_PORT = 8889;
const TELLO_HOST = "192.168.10.1";

const getSocket = () => {
  const socket = createSocket("udp4");
  socket.bind(TELLO_CMD_PORT);
  return socket;
};

//Closure
(async function start() {
  const socket = getSocket();
  const cmder = new Commander(socket, TELLO_HOST, TELLO_CMD_PORT);
  await cmder.sendInitCommand();
  const cmdp = new CommandParser({
    onTakeoff: async () => {
      await cmder.sendTakeOff();
    },
    onLand: async () => {
      await cmder.sendLand();
    },
    onForward: async (dist) => {
      await cmder.sendForward(dist);
    },
    onBack: async (dist) => {
      await cmder.sendBack(dist);
    },
    onRight: async (dist) => {
      await cmder.sendRight(dist);
    },
    onLeft: async (dist) => {
      await cmder.sendLeft(dist);
    },
    onCw: async (dist) => {
      await cmder.sendCw(dist);
    },
    onCcw: async (dist) => {
      await cmder.sendCcw(dist);
    },
    onFlip: async (position) => {
      await cmder.sendFlip(position);
    },
    onBattery: async () => {
      await cmder.getBattery();
    },
  });
  console.log(`Iniciando!`);

  socket.on("message", (msg) => {
    console.log(`Dji Tello: ${msg.toString()}`);
  });

  socket.on("error", (err) => {
    console.log(`Dji Tello ERROR: ${err}`);
  });
  socket.on("listening", () => {
    console.log(`Socket is listening!`);
  });

  console.log("Enter a command: ");

  rl.on("line", (line) => {
    if (!cmdp.parseCommand(line)) {
      if (line === "exit") {
        console.log("Bye!");
        process.exit(0);
      }
      console.log("Invalid Command!");
    }
  });
})();
