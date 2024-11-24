#!/usr/bin/env node
const {add_task, update_task, delete_task, list_task} = require('./utils');

const args = process.argv.slice(2);

if(args.length == 0){
    console.log("Use --help to see the available commands.");
    process.exit(0);
}

const command = args[0];
let id, task, status;
switch (command) {
    case '--help':
        console.log(`
            Available Commands:
            --help                          :   Show this help message
            task-cli add <task>             :   Add a new task
            task-cli delete <id>            :   Delete a task
            task-cli update <id> <task>     :   Update a task
            task-cli mark-in-progress <id>  :   Marking a task as in progress
            task-cli mark-done <id>         :   Marking a task as done
            task-cli list                   :   Listing all tasks
            task-cli list done              :   Listing tasks which is done
            task-cli list todo              :   Listing tasks which is in todo
            task-cli list in-progress       :   Listing tasks which is in progress
        `);        
        break;
    case 'add':
        task = args[1];
        if(!task){
            console.log("Error: no task provided. Usage: add <task>");
            process.exit(0);
        }
        add_task(task);
        break;
    case 'update':
        id = args[1];
        task = args[2];
        if(!task || !id){
            console.log("Error: no task or id provided. Usage: update <id> <task>");
            process.exit(0);
        }
        update_task(id, task);
        break;
    case 'delete':
        id = args[1];
        if(!id){
            console.log("Error: no id provided. Usage: delete <id>");
            process.exit(0);
        }
        delete_task(id);
        break;
    case 'mark-in-progress':
        id = args[1];
        if(!id){
            console.log("Error: no id provided. Usage: mark-in-progress <id>");
            process.exit(0);
        }
        update_task(id, null, 'in-progress');
        break;
    case 'mark-done':
        id = args[1];
        if(!id){
            console.log("Error: no id provided. Usage: mark-done <id>");
            process.exit(0);
        }
        update_task(id, null, 'done');
        break;
    case 'list':
        status = args[1]??null;
        list_task(status);
        break;
    default:
        console.log("Use --help to see the available commands.");
        break;
}