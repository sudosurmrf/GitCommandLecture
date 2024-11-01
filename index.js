import { Terminal } from '@xterm/xterm';
// const { Terminal } = require('@xterm/xterm');


const terminal = new Terminal();

document.addEventListener("DOMContentLoaded", () => {

  const terminalOutput = document.getElementById("terminal-output");
  const commandInput = document.getElementById("command-input");
  const runButton = document.getElementById("run");
  // runButton.addEventListener("click", () => {
  //   runCommand();
  // });

  const terminalContainer = document.getElementById('terminal-container');
  terminal.open(terminalContainer);


  terminal.setOption('cursorBlink', true);
  terminal.write('Welcome to the terminal!\r\n');

 
  terminal.onData(data => {
    console.log(`User entered: ${data}`);
});
  
  const commandDescriptions = {
    // Setup Commands
    "git config --global user.name": "Sets the name you want attached to your commits.",
    "git config --global user.email": "Sets the email you want attached to your commits.",
    "git init": "Initializes a new Git repository in the current directory.",
    
    // Basic Commands
    "git status": "Shows the status of your current directory and tracked files.",
    "git add .": "Stages all changes in the current directory for the next commit.",
    "git commit -m": "Commits the staged changes with a message describing the commit.",
    "git log": "Shows the commit history for the repository.",
    
    // Branching Commands
    "git branch": "Lists all branches in your repository.",
    "git branch branch_name": "Creates a new branch with the specified name.",
    "git checkout branch_name": "Switches to the specified branch.",
    "git merge branch_name": "Merges the specified branch into the current branch.",
    
    // Undo Commands
    "git reset --soft HEAD~1": "Moves the last commit to the staging area without deleting changes.",
    "git reset --hard HEAD~1": "Completely removes the last commit and discards changes.",
    "git revert commit_hash": "Reverts a specific commit without rewriting history.",
    
    // Fixing Merge Conflicts
    "git merge branch_name (conflict)": "Attempts to merge branch; if conflicts, manual conflict resolution is needed.",
    "git status (conflict)": "Shows files with conflicts after a failed merge attempt.",
    "git add conflicted_file": "Stages resolved conflicts in the specified file.",
    "git merge --abort": "Aborts the merge and restores the previous state.",
    
    // Stashing Commands
    "git stash": "Temporarily stores changes in a 'stash' to work on later.",
    "git stash list": "Lists all stashes available.",
    "git stash apply": "Applies the most recent stash and keeps it in the stash list.",
    "git stash pop": "Applies the most recent stash and removes it from the stash list.",
    
    // Collaboration Commands
    "git remote add origin URL": "Links the repository to a remote server.",
    "git push -u origin branch_name": "Pushes commits to the remote repository and sets upstream tracking.",
    "git pull": "Fetches changes from the remote repository and merges them into the current branch.",
    "git clone URL": "Creates a copy of a repository from a remote URL."
  };
  
  
  const runCommand = () => {
    const command = commandInput.value.trim();
    if (command) {
      displayCommandOutput(command);
    } else {
      terminalOutput.innerHTML += "\n> Please enter a command.\n";
    }
  }
  
  const handleCommandClick = (command) => {
    commandInput.value = command;
    // displayCommandOutput(command); //uncomment this if you want the commands to instant run
  }
  
  const displayCommandOutput = (command) => {
    const trimmedCommand = command.trim();
    const baseCommand = trimmedCommand.split(" ")[0];
    
    let output = commandDescriptions[trimmedCommand];
    if (!output) {
      output = commandDescriptions[baseCommand];
    }
    if (!output) {
      output = "Command not found.";
    }
    terminalOutput.innerHTML += `\n> ${command}\n${output}\n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    commandInput.value = "";
  }
  document.querySelectorAll(".command-name").forEach((element) => {
    element.addEventListener("click", () => handleCommandClick(element.textContent));
  });
  
});