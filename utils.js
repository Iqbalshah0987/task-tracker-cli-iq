const fs = require('fs');
const file_path = "./tasks.json";


function getNextId() {
    let idTrackerPath = './id_tracker.json';
    let trackerData = { lastId: 0 };

    if (fs.existsSync(idTrackerPath)) {
        trackerData = JSON.parse(fs.readFileSync(idTrackerPath, { encoding: 'utf8' }));
    }

    trackerData.lastId += 1;
    fs.writeFileSync(idTrackerPath, JSON.stringify(trackerData), { encoding: 'utf8' });

    return trackerData.lastId;
}


function add_task(description) {

    try {

        if (!fs.existsSync(file_path)) {
            fs.writeFile(file_path, JSON.stringify([]), { encoding: "utf8", flag: "w" }, (err) => console.log(err));
        }

        const status = "todo";
        let now = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
        const createdAt = now;
        const updatedAt = now;

        let all_task_str = fs.readFileSync(file_path, { encoding: 'utf8', flag: 'r' });
        let all_task = JSON.parse(all_task_str);
        const id = getNextId();


        all_task.push({
            id, description, status, createdAt, updatedAt
        });

        all_task_str = JSON.stringify(all_task);
        fs.writeFileSync(file_path, all_task_str, { encoding: "utf8", flag: 'w' });
        console.log(`Task added successfully (ID: ${id})`);
    } catch (error) {
        console.log(error);
    }

}

function update_task(id, description=null, status=null) {
    try {

        let all_task_str = fs.readFileSync(file_path, { encoding: 'utf8', flag: 'r' });
        let all_task = JSON.parse(all_task_str);
        let is_task_updated = false;
        all_task.forEach(task => {
            if (task.id == id) {
                if(description){
                    task.description = description;
                }
                if(status){
                    task.status = status;
                }
                task.updatedAt = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
                is_task_updated = true;
            }
        });

        if (is_task_updated) {
            fs.writeFileSync(file_path, JSON.stringify(all_task), { encoding: 'utf8', flag: 'w' });
            // console.log(`Task Updated Successfully (ID: ${id})`);
        } else {
            console.log(`Provided ID is not valid.`);
        }
    } catch (error) {
        console.log(error);
    }
}

function delete_task(id) {
    try {
        let all_task_str = fs.readFileSync(file_path, { encoding: 'utf8', flag: 'r' });
        let all_task = JSON.parse(all_task_str);
        let updated_task = all_task.filter(task => task.id != id);

        if (updated_task.length < all_task.length) {
            fs.writeFileSync(file_path, JSON.stringify(updated_task), { encoding: 'utf8', flag: 'w' });
            console.log(`Task Deleted Successfully (ID: ${id})`);
        } else {
            console.log(`Provided ID is not valid.`);
        }

    } catch (error) {
        console.log(error);
    }
}


function list_task(status=null){
    try {

        let all_task_str = fs.readFileSync(file_path, { encoding: 'utf8', flag: 'r' });
        let all_task = JSON.parse(all_task_str);

        let filter_tasks = all_task;
        if(status){
            filter_tasks = all_task.filter(task => task.status == status);
        }
        
        if(filter_tasks.length>0){
            console.table(filter_tasks);
        }
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = { add_task, update_task, delete_task, list_task };