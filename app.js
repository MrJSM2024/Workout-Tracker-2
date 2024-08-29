const workouts = [
    { day: "Monday", exercises: ["Push-ups", "Squats", "Plank"] },
    { day: "Wednesday", exercises: ["Pull-ups", "Lunges", "Crunches"] },
    { day: "Friday", exercises: ["Bench Press", "Deadlifts", "Shoulder Press"] }
];

function renderWorkouts() {
    const workoutList = document.getElementById('workoutList');
    workoutList.innerHTML = '';
    workouts.forEach((workout, index) => {
        const workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout';
        workoutDiv.innerHTML = `<h2>${workout.day}</h2>`;
        workout.exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise';
            exerciseDiv.innerHTML = `
                <input type="checkbox" id="${exercise}" name="${exercise}">
                <label for="${exercise}">${exercise}</label>
            `;
            workoutDiv.appendChild(exerciseDiv);
        });
        workoutList.appendChild(workoutDiv);
    });
}

function saveWorkouts() {
    const completedExercises = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        completedExercises.push(checkbox.name);
    });
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    alert('Workouts saved!');
}

function loadSavedWorkouts() {
    const savedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];
    savedExercises.forEach(exercise => {
        const checkbox = document.querySelector(`input[name="${exercise}"]`);
        if (checkbox) checkbox.checked = true;
    });
}

window.onload = function() {
    renderWorkouts();
    loadSavedWorkouts();
};
