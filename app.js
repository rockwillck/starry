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

if (localStorage.getItem("date") != undefined && localStorage.getItem("time") != undefined) {
    document.getElementById("bday").value = localStorage.getItem("date")
    document.getElementById("time").value = localStorage.getItem("time")
    chart()
}

var id = 0
function chart() {
    document.getElementById("setup").style.transform = "scale(0)"
    bdaydate = document.getElementById("bday").value.split("-").map(x => parseInt(x))
    time = document.getElementById("time").value.split(":").map(x => parseInt(x))
    localStorage.setItem("date", document.getElementById("bday").value)
    localStorage.setItem("time", document.getElementById("time").value)
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

function horoscope() {
    document.getElementById("reading").style.scale = 1
    soulValue = Math.floor(id/2356585920)%183/183
    document.getElementById("soul").value = soulValue
    societyValue = Math.floor(id/48000)%40/40
    document.getElementById("society").value = societyValue
    energyValue = Math.floor(id/35244)%24.39/24.39
    document.getElementById("energy").value = energyValue
    luckValue = Math.floor(id/0.8048081173)%100/100
    document.getElementById("luck").value = luckValue

    luckIndex = Math.floor(luckValue*3)
    soulIndex = Math.floor(soulValue*3)

    sentence = ""
    if (luckIndex != 1) {
        sentence += `Be ${luckIndex == 0 ? word("wary") : word("jubilant")}, for ${luckIndex == 0 ? word("bad") : word("good")} tidings come your way.`
    }

    sentence += ` You${energyValue < 0.5 ? (" " + word("may")) : ""} feel ${energyValue < 0.5 ? word("tired") : word("energized")}, ${societyValue < 0.5 ? (energyValue < 0.5 ? "for the world is against you today." : "but the world is not on your side today.") : (energyValue < 0.5 ? "but the world stands with you today." : "for the world sides with you today.")}`
    if (soulIndex != 1) {
        sentence += ` ${soulIndex == 0 ? word("unfortunately") : word("thankfully")}, your relationship with those around you will be ${soulIndex == 0 ? word("troubled") : word("productive")}.`
    }
    document.getElementById("horoscope").innerText = sentence
}

function word(w) {
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
    return synonyms[w][id % synonyms[w].length]
}