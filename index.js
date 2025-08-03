
import HoursSetup from "./business-logic/hours-setup.js";
import WorkHoursTracker from "./business-logic/work-hours-tracker.js";

const hoursSetup = new HoursSetup();
const workHoursTracker = new WorkHoursTracker();



const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const registerHoursButton = document.getElementById("registerHours");


const hoursSummary = document.getElementById("hoursSummary");
const hoursInFavorSummary = document.getElementById("hoursInFavorSummary");
const hoursAgainstSummary = document.getElementById("hoursAgainstSummary");
const historialList = document.querySelector("ol");





registerHoursButton.addEventListener("click", () => {
    const fromTime = fromSelect.value;
    const toTime = toSelect.value;
});


registerHoursButton.addEventListener("click", () => {
    const fromTime = fromSelect.value;
    const toTime = toSelect.value;
    
    if (!fromTime || !toTime) {
        alert("⚠️ Por favor selecciona tanto la hora de entrada como la de salida");
        return;
    }
    
    try {
        const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const workDay = workHoursTracker.registerWorkDay(today, fromTime, toTime, 0.5);

        fromSelect.value = "";
        toSelect.value = "";
        
 
        updateSummary();
        updateHistorial();
        
        alert(`✅ Jornada registrada: ${workHoursTracker.formatHours(workDay.workedHours)} horas trabajadas`);
    } catch (error) {
        alert(`❌ Error al registrar la jornada: ${error.message}`);
    }
});


function updateSummary() {
    const totals = workHoursTracker.getTotals();
    
    hoursSummary.textContent = workHoursTracker.formatHours(totals.totalWorkedHours);
    hoursInFavorSummary.textContent = workHoursTracker.formatHours(totals.extraHours);
    hoursAgainstSummary.textContent = workHoursTracker.formatHours(totals.pendingHours);
}


function updateHistorial() {
    const workDays = workHoursTracker.getWorkDays();
    

    historialList.innerHTML = "";
    
    if (workDays.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No hay jornadas registradas aún";
        emptyItem.style.fontStyle = "italic";
        emptyItem.style.color = "#666";
        historialList.appendChild(emptyItem);
        return;
    }
    

    workDays.slice().reverse().forEach((day, index) => {
        const listItem = document.createElement("li");
        const actualIndex = workDays.length - 1 - index;
        
        const date = new Date(day.date).toLocaleDateString('es-ES');
        const workedHoursFormatted = workHoursTracker.formatHours(day.workedHours);
        const difference = (day.workedHours + day.breakHours) - workHoursTracker.STANDARD_WORK_DAY;
        
        let statusIcon = "⚖️";
        let statusText = "";
        
        if (difference > 0) {
            statusIcon = "✅";
            statusText = ` (+${workHoursTracker.formatHours(difference)} extras)`;
        } else if (difference < 0) {
            statusIcon = "⚠️";
            statusText = ` (${workHoursTracker.formatHours(Math.abs(difference))} pendientes)`;
        }
        
        listItem.innerHTML = `
            <strong>${date}</strong>: ${day.startTime} - ${day.endTime} 
            (${workedHoursFormatted}h trabajadas) ${statusIcon}${statusText}
            <button onclick="removeWorkDay(${actualIndex})" style="margin-left: 10px; font-size: 12px;">🗑️</button>
        `;
        
        historialList.appendChild(listItem);
    });
}

window.removeWorkDay = function(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta jornada?")) {
        if (workHoursTracker.removeWorkDay(index)) {
            updateSummary();
            updateHistorial();
            alert("✅ Jornada eliminada correctamente");
        } else {
            alert("❌ Error al eliminar la jornada");
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {
    updateSummary();
    updateHistorial();
});