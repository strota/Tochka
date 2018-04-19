function setTime() {
    var computedStyle = getComputedStyle(document.getElementById('border-length')).width;
    var input_time = document.forms["idform"].elements["input"].value
    if (input_time == '') {
        input_time = 60;
    }
    document.getElementById('button_start').disabled = true;
    var length = Number((computedStyle).substr(0, computedStyle.length - 2));
    var yellow_flag = Math.floor(length / 2);
    var orange_flag = Math.floor(length / 4) * 3;
    var red_flag = Math.floor(length / 8) * 7;
    var value = Math.floor(length / input_time);
    migInt = setInterval(function() {
        if (length > 0) {
            var time_value = getComputedStyle(document.getElementById('span-length')).width;
            var time_value = Number((time_value).substr(0, time_value.length - 2));
            document.getElementById('span-length').style.width = time_value + value;
            if ((time_value >= yellow_flag) & (time_value < orange_flag)) {
                document.getElementById('span-length').style.background = 'linear-gradient(to right, #fefcea, #e5f136)';
            }
            if ((time_value >= orange_flag) & (time_value < red_flag)) {
                document.getElementById('span-length').style.background = 'linear-gradient(to right, #fefcea, #f1b636)';
            }
            if (time_value >= red_flag) {
                document.getElementById('span-length').style.background = 'linear-gradient(to right, #fefcea, #f15236)';
            }
            length = length - value;
        }
        else {
            var audio = document.getElementById('my_audio');
            audio.play();
            document.getElementById('span-length').innerHTML = 'ВЕРНИСЬ К ПОЛЬЗОВАТЕЛЮ';
            clearTime(migInt);
        }
    }, 1000);
}
function deleteTime() {
    clearTimeout(migInt);
    document.getElementById('span-length').innerHTML = '';
    document.getElementById('span-length').style.width = 0;
    document.getElementById('button_start').disabled = false;
    document.getElementById('span-length').style.background = 'linear-gradient(to right, #fefcea, #8af136)';
}