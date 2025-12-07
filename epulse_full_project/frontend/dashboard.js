async function predict() {
    let data = {
        temperature: parseFloat(document.getElementById("temp").value),
        hour: parseInt(document.getElementById("hour").value),
        equipment_load: parseFloat(document.getElementById("load").value)
    };

    let res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    let result = await res.json();

    document.getElementById("result").innerText = "Predicted Energy: " + result.predicted_energy;

    let optRes = await fetch("http://127.0.0.1:5000/optimize", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    let optData = await optRes.json();
    document.getElementById("opt").innerText = "Optimization: " + optData.suggestion;
}
