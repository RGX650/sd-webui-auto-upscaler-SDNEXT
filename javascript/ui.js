function au_before_starting() {

    var res = create_submit_args(arguments);

    var idTaskEle = get_ele_id_task();
    if (idTaskEle.value != "0") {
        console.log("重复任务！")
        res[0] = "repetitive" + idTaskEle.value;
        return res;
    }

    var id = randomId();
    res[0] = id;
    console.log("id: " + id)

    var processCountEle = get_ele_process_count();
    processCountEle.value = -1;

    var process_btn = get_ele_process_btn();
    clickBtn(process_btn);

    return res;
}

function au_up() {

    console.log("start js au_up")
    var processCountEle = get_ele_process_count();
    var processCurrEle = get_ele_process_curr();
    var res = create_submit_args(arguments);
    console.log("res: " + res)

    var id = randomId();
    res[0] = id;

    res[1] = processCountEle.value;

    if (res[1] == "0") {
        console.log("process_count 值为" + res[1] + ", 即将停止任务");
        return res;
    }

    var process_btn = get_ele_process_btn();

    if (res[1] == "-1") {
        console.log("process_count 值为" + res[1] + ", 即将重启任务");
        clickBtn(process_btn);
        return res;
    }

    res[2] += 1;
    state = get_state_ele();
    state.textContent = "(" + res[2] + "/" + res[1] + ") " + "Processing...";
    processCurrEle.value = res[2].toString();

    requestProgress(res[0], gradioApp().getElementById('auto_upscaler_gallery_container'), gradioApp().getElementById('auto_upscaler_gallery'), function() {
        // gradioApp().getElementById("auto_upscaler_start_btn").style.display = "block";
        // gradioApp().getElementById("auto_upscaler_end_btn").style.display = "none";
        
        var idTaskEle = get_ele_id_task();
        var processCountEle = get_ele_process_count();
        var processCurrEle = get_ele_process_curr();

        state = get_state_ele();
        state.textContent = "(" + res[2] + "/" + res[1] + ") " + "Complete.";

        if (idTaskEle.value == "0" || parseInt(processCurrEle.value) >= parseInt(processCountEle.value)) {
            state.textContent = "All Complete.";
            var interrupt_btn = gradioApp().getElementById('auto_upscaler_end_btn');
            interrupt_btn.click();

        } else {
            var process_btn = get_ele_process_btn();
            clickBtn(process_btn);
        }

    });

    return res;

}

function auto_upscaler() {

    state = get_state_ele();
    state.textContent = "processing...";
    // gradioApp().getElementById("auto_upscaler_start_btn").style.display = "none";
    // gradioApp().getElementById("auto_upscaler_end_btn").style.display = "block";

    var id = randomId();
    // var id = "auto_upscaler_task_id_value";
    localStorage.setItem("auto_upscaler_task_id", id);

    requestProgress(id, gradioApp().getElementById('auto_upscaler_gallery_container'), gradioApp().getElementById('auto_upscaler_gallery'), function() {
        // gradioApp().getElementById("auto_upscaler_start_btn").style.display = "block";
        // gradioApp().getElementById("auto_upscaler_end_btn").style.display = "none";
        state = get_state_ele();
        state.textContent = "finished.";
        localStorage.removeItem("auto_upscaler_task_id");
    });

    var res = create_submit_args(arguments);

    console.log(res)

    res[0] = id;

    return res;
}

function show_end_info() {

    state = get_state_ele();
    
    var res = create_submit_args(arguments);
    state.textContent = "stopping..." + res[0];

    return res;
}

function get_state_ele() {

    state = gradioApp().getElementById('auto_upscaler_state');

    if (!state) {
        box_div = gradioApp().getElementById('auto_upscaler_console');
        var state = document.createElement("p");
        state.setAttribute("id", "auto_upscaler_state");
        state.style.fontSize = "36px"; // 设置字体大小，这里设置为24像素
        box_div.appendChild(state);
    }

    return state;
}

function get_ele_process_count() {
    return document.querySelector('#auto_upscaler_process_count input');
}

function get_ele_process_curr() {
    return document.querySelector('#auto_upscaler_process_curr input');
}

function get_ele_process_btn() {
    return gradioApp().getElementById('auto_upscaler_process_btn');
}

function get_ele_id_task() {
    return document.querySelector('#auto_upscaler_id_task textarea');
}

function clickBtn(process_btn) {
    setTimeout(function() {
        process_btn.click();
    }, 3000);
}


