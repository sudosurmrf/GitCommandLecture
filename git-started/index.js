const commands = [
  { 
    acceptedCommands: ["git init"], 
    instruction: "Initialize the repository with 'git init'", 
    completed: false 
  },
  { 
    acceptedCommands: ["git add .", "git add --all"], 
    instruction: "Add files with 'git add .' or 'git add --all'", 
    completed: false 
  },
  { 
    acceptedCommands: ["git commit -m", "git commit -am"], 
    instruction: "Commit your changes with 'git commit -m \"message\"'", 
    completed: false 
  },
  { 
    acceptedCommands: ["git branch feature", "git checkout -b feature"], 
    instruction: "Create a new branch with 'git branch feature' or 'git checkout -b feature'", 
    completed: false 
  },
  { 
    acceptedCommands: ["git merge feature"], 
    instruction: "Merge the branch with 'git merge feature'", 
    completed: false 
  },
  { 
    acceptedCommands: ["git push -u origin main", "git push origin main"], 
    instruction: "Push to GitHub with 'git push -u origin main' or 'git push origin main'", 
    completed: false 
  },
];

let currentStep = 0;

document.getElementById("instructionText").innerText = commands[currentStep].instruction;

const executeCommand = () => {
  const input = document.getElementById("commandInput").value.trim();
  const output = document.getElementById("output");

  if (currentStep < commands.length && isValidCommand(input, currentStep)) {
    commands[currentStep].completed = true;
    output.innerHTML += `<div>> ${input}</div><div>Command successful: ${commands[currentStep].instruction}</div>`;
    document.getElementById(`step${currentStep + 1}`).classList.add("completed");
    
    currentStep++;
    if (currentStep < commands.length) {
      document.getElementById("instructionText").innerText = commands[currentStep].instruction;
    } else {
      document.getElementById("instructionText").innerText = "Lesson complete! You've learned the basics of Git!";
    }
  } else {
    output.innerHTML += `<div>> ${input}</div><div style="color: red;">Error: Incorrect command. Try again.</div>`;
  }

  document.getElementById("commandInput").value = "";
  output.scrollTop = output.scrollHeight;
}

const isValidCommand = (input, step) => {
  return commands[step].acceptedCommands.some(command => input.startsWith(command));
}
