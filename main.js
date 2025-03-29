//localstorageに保存
//保存時JSON形式で

//todoのデータ構造
//id, title ,done

let data = [];

const load_data = () => { //function load_data()
    const data = localStorage.getItem('data');
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

const save_data = () => {
    localStorage.setItem('data', JSON.stringify(data));
}

const rendor_items = () => {
    const list = document.querySelector("#items");
    list.innerHTML = ""; //リストを空にする
    data.forEach((item) => {
        // if (item.done) {
        //     return;
        // }
        const li = document.createElement("li");
        // li.innerText = item.title;
        li.setAttribute("id", item.id);
        const check_box = document.createElement("input");
        check_box.type = "checkbox";
        check_box.checked = item.done;
        check_box.addEventListener("click", () => {
            complete_item(item.id);
        });
        li.appendChild(check_box);
        const title = document.createElement("span");
        title.innerText = item.title;
        if (item.done) {
            title.style.textDecoration = "line-through";
        }
        li.appendChild(title);
        const delete_btn = document.createElement("button");
        delete_btn.innerText = "削除";
        delete_btn.addEventListener("click", () => {
            delete_item(item.id);
        });
        li.appendChild(delete_btn);
        list.appendChild(li);
    });
}

const add_item = () => {
    const title_doc = document.querySelector("#new_task_name");
    if (title_doc.value === "") {
        alert("タスクを入力してください");
        return;
    }
    const item = {
        id: crypto.randomUUID(),
        title: title_doc.value,
        done: false,
    };
    data.push(item);
    title_doc.value = ""; //入力欄を空にする
    save_data();
    rendor_items();
}

const complete_item = (id) => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data[index].done = !data[index].done;
        save_data();
        rendor_items();
    }
}

const delete_item = (id) => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        save_data();
        rendor_items();
    }
}

document.querySelector("#add_task_button").addEventListener("click",add_item);
data = load_data(); //load_data()を実行してdataに代入
rendor_items(); //初期表示