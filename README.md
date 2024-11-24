# Task Tracker CLI
Sample solution for the [Task Tracker](https://roadmap.sh/projects/task-tracker) callenge from [roadmap.sh](https://roadmap.sh).

A simple Node.js CLI tool to manage tasks, such as adding, updating, deleting, and listing tasks. 

## Installation

To use the `task-tracker-cli` tool globally, follow these steps:

1. **Clone the repository or install as a package**:
   
   Clone the repo or install directly via npm:
   ```bash
   git clone https://github.com/Iqbalshah0987/task-tracker-cli-iq.git
   cd task-tracker-cli-iq
   npm install -g
2. ** Commands

   ```bash
   # Adding a new task
   task-cli add "Buy groceries"
   # Output: Task added successfully (ID: 1)
   
   # Updating and deleting tasks
   task-cli update 1 "Buy groceries and cook dinner"
   task-cli delete 1
    
   # Marking a task as in progress or done
   task-cli mark-in-progress 1
   task-cli mark-done 1
    
   # Listing all tasks
   task-cli list
    
   # Listing tasks by status
   task-cli list done
   task-cli list todo
   task-cli list in-progress

