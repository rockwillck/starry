var filled = false
document.getElementById("chart").style.height = "0"
function change() {
    filled = document.getElementById("bday").value != "" && document.getElementById("time").value != ""
    if (filled) {
        document.getElementById("chart").style.transform = "scale(1)"
        document.getElementById("chart").style.height = ""
        document.getElementById("chart").disabled = false
    } else {
        document.getElementById("chart").style.transform = ""
        document.getElementById("chart").style.height = "0"
        document.getElementById("chart").disabled = true
    }
}

if (localStorage.getItem("date") != undefined && localStorage.getItem("time") != undefined && localStorage.getItem("name") != undefined) {
    document.getElementById("bday").value = localStorage.getItem("date")
    document.getElementById("time").value = localStorage.getItem("time")
    document.getElementById("name").value = localStorage.getItem("name")
    chart()
}

var id = 0
var bday
var uName = ""
function chart() {
    document.getElementById("setup").style.transform = "scale(0)"
    bdaydate = document.getElementById("bday").value.split("-").map(x => parseInt(x))
    time = document.getElementById("time").value.split(":").map(x => parseInt(x))
    uName = document.getElementById("name").value
    localStorage.setItem("date", document.getElementById("bday").value)
    localStorage.setItem("time", document.getElementById("time").value)
    localStorage.setItem("name", document.getElementById("name").value)
    bday = new Date(`${bdaydate[0].toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false})}-${bdaydate[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}-${bdaydate[2].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}T${time[0].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`)

    today = new Date();

    // Set the time to noon (12:00:00)
    today.setHours(12);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    id = today.getTime() - bday.getTime()
    horoscope()
}

function getSentence(val, own) {
    soulValue = val/2356585920%183/183
    societyValue = val/48000%40/40
    energyValue = val/35244%24.39/24.39
    luckValue = val/0.8048081173%100/100

    if (own) {
        document.getElementById("soul").value = soulValue
        document.getElementById("society").value = societyValue
        document.getElementById("energy").value = energyValue
        document.getElementById("luck").value = luckValue
    }

    luckIndex = Math.floor(luckValue*3)
    soulIndex = Math.floor(soulValue*3)

    let sentence = ""
    if (luckIndex != 1) {
        sentence += `Be ${luckIndex == 0 ? word("wary", val) : word("jubilant")}, for ${luckIndex == 0 ? word("bad", val) : word("good")} tidings come your way.`
    }

    sentence += ` You${energyValue < 0.5 ? (" " + word("may", val)) : ""} feel ${energyValue < 0.5 ? word("tired", val) : word("energized", val)}, ${societyValue < 0.5 ? (energyValue < 0.5 ? "for the world is against you today." : "but the world is not on your side today.") : (energyValue < 0.5 ? "but the world stands with you today." : "for the world sides with you today.")}`
    if (soulIndex != 1) {
        sentence += ` ${soulIndex == 0 ? word("unfortunately", val) : word("thankfully", val)}, your relationship with those around you will be ${soulIndex == 0 ? word("troubled", val) : word("productive", val)}.`
    }
    
    return sentence
}

function horoscope() {
    document.getElementById("reading").style.scale = 1
    document.getElementById("horoscope").innerText = getSentence(id, true)
}

function word(w, val) {
    synonyms = {
        "wary": ["cautious", "distrustful", "vigilant", "alert", "skeptical"],
        "jubilant": ["elated", "ecstatic", "exuberant", "joyful", "thrilled"],
        "bad": ["awful", "poor", "negative", "terrible", "horrible"],
        "good": ["great", "excellent", "fine", "superb", "positive"],
        "may": ["might", "could", "can", "possibly", "perchance"],
        "tired": ["exhausted", "weary", "fatigued", "drained", "spent"],
        "energized": ["invigorated", "refreshed", "revitalized", "rejuvenated", "charged"],
        "unfortunately": ["regrettably", "unluckily", "sadly", "unfortunately", "alas"],
        "thankfully": ["gratefully", "fortunately", "luckily", "blessedly", "thankfully"],
        "troubled": ["distressed", "worried", "concerned", "anxious", "bothered"],
        "productive": ["efficient", "effective", "fruitful", "successful", "prolific"]
    };
    return synonyms[w][val % synonyms[w].length]
}

function connect() {
    document.getElementById("popup").innerHTML = `<button onclick="document.getElementById('popup').style.top=''">close</button>
    <br>
    <hr>
    <br>
    <a id="popupIdent"></a>
    <button onclick="copyIdent(this)">copy</button>
    <br>
    <hr>`
    document.getElementById("popup").style.top = "50%"
    document.getElementById("popupIdent").innerText = document.getElementById("name").value.replaceAll(" ", ".").replaceAll("@", "").toLowerCase() + "@" + bday.getTime().toString(26)
    document.getElementById("popupIdent").href = "add.html?" + document.getElementById("popupIdent").innerText
    if (localStorage.getItem("friends") != undefined) {
        for (friend of [...new Set(localStorage.getItem("friends").split(",").filter(n => (n != '' && n != document.getElementById("popupIdent").innerText)))]) {
            document.getElementById("popup").innerHTML += `<p>${(friend.split("@")[0])}: ${getSentence(today.getTime() - parseInt(friend.split("@")[1], 26), false).toLowerCase()}</p>`
        }
    }
}

async function copyIdent(btn) {
    try {
        await navigator.clipboard.writeText("Add me on starry at: " + document.getElementById("popupIdent").href);
        btn.innerText = "copied!"
        setTimeout(() => {
            btn.innerText = "copy"
        }, 500)
    } catch (err) {
        btn.innerText = "error!"
        setTimeout(() => {
            btn.innerText = "copy"
        }, 500)
    }
}