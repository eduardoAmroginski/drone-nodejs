// Exemplo de uso de Readline
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual a melhor marca de Drones do Mundo? ", (answer) => {
  console.log(`A melhor marca de Drones é: ${answer}`);

  switch (answer) {
    case "command":
      console.log("Ligando o Drone");
      break;
    case "takeoff":
      console.log("Drone decolando!");
      break;
    default:
      console.log("Ligue o Drone");
      break;
  }

  rl.close();
});
