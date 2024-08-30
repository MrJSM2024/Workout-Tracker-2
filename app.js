var initialWorkoutData = [
  {
    day: "Day 1: Upper Body",
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { id: 1, name: "Push-ups", sets: 2, reps: 8, weight: "Body weight", notes: "" },
      { id: 2, name: "Dumbbell Rows", sets: 3, reps: 10, weight: "8lb", notes: "" },
      { id: 3, name: "Hammer Curls", sets: 3, reps: 10, weight: "8lb", notes: "" }
    ]
  },
  {
    day: "Day 2: Lower Body",
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { id: 1, name: "Squats", sets: 3, reps: 8, weight: "Body weight", notes: "" },
      { id: 2, name: "Lunges", sets: 2, reps: 10, weight: "Body weight", notes: "" },
      { id: 3, name: "Calf Raises", sets: 3, reps: 15, weight: "Body weight", notes: "" }
    ]
  }
];

function WorkoutTracker() {
  var [workoutData, setWorkoutData] = React.useState(initialWorkoutData);
  var [completedWorkouts, setCompletedWorkouts] = React.useState({});

  React.useEffect(function() {
    var savedData = localStorage.getItem('workoutData');
    if (savedData) {
      setCompletedWorkouts(JSON.parse(savedData));
    }
  }, []);

  function saveWorkout(day, exercise, completed) {
    var newCompletedWorkouts = Object.assign({}, completedWorkouts);
    if (!newCompletedWorkouts[day.date]) newCompletedWorkouts[day.date] = {};
    if (!newCompletedWorkouts[day.date][day.day]) newCompletedWorkouts[day.date][day.day] = {};
    newCompletedWorkouts[day.date][day.day][exercise.id] = { completed: completed };
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));
  }

  function updateExercise(dayIndex, exerciseIndex, field, value) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
  }

  function addExercise(dayIndex) {
    var newWorkoutData = workoutData.slice();
    var newId = Math.max.apply(null, newWorkoutData[dayIndex].exercises.map(function(e) { return e.id; })) + 1;
    newWorkoutData[dayIndex].exercises.push({ id: newId, name: "New Exercise", sets: 3, reps: 10, weight: "Body weight", notes: "" });
    setWorkoutData(newWorkoutData);
  }

  function deleteExercise(dayIndex, exerciseId) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises = newWorkoutData[dayIndex].exercises.filter(function(e) { return e.id !== exerciseId; });
    setWorkoutData(newWorkoutData);
  }

  return React.createElement('div', { className: "p-4" },
    React.createElement('h1', { className: "text-2xl font-bold mb-4" }, "Workout Tracker"),
    workoutData.map(function(day, dayIndex) {
      return React.createElement('div', { key: day.day, className: "mb-8" },
        React.createElement('h2', { className: "text-xl font-semibold mb-2" }, day.day),
        React.createElement('p', null, "Date: ", day.date),
        React.createElement('table', { className: "w-full border-collapse border" },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { className: "border p-2" }, "Exercise"),
              React.createElement('th', { className: "border p-2" }, "S"),
              React.createElement('th', { className: "border p-2" }, "R"),
              React.createElement('th', { className: "border p-2" }, "Weight"),
              React.createElement('th', { className: "border p-2" }, "Done"),
              React.createElement('th', { className: "border p-2" }, "Notes"),
              React.createElement('th', { className: "border p-2" }, "Del")
            )
          ),
          React.createElement('tbody', null,
            day.exercises.map(function(exercise, exerciseIndex) {
              return React.createElement('tr', { key: exercise.id },
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "text",
                    value: exercise.name,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'name', e.target.value); },
                    className: "w-full"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "number",
                    value: exercise.sets,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value); },
                    className: "w-full"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "number",
                    value: exercise.reps,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value); },
                    className: "w-full"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "text",
                    value: exercise.weight,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value); },
                    className: "w-full"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "checkbox",
                    checked: completedWorkouts[day.date] && completedWorkouts[day.date][day.day] && completedWorkouts[day.date][day.day][exercise.id] && completedWorkouts[day.date][day.day][exercise.id].completed || false,
                    onChange: function(e) { saveWorkout(day, exercise, e.target.checked); }
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "text",
                    value: exercise.notes,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'notes', e.target.value); },
                    className: "w-full"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('button', { 
                    onClick: function() { deleteExercise(dayIndex, exercise.id); },
                    className: "bg-red-500 text-white px-2 py-1 rounded"
                  }, "Del")
                )
              );
            })
          )
        ),
        React.createElement('button', {
          onClick: function() { addExercise(dayIndex); },
          className: "mt-2 bg-green-500 text-white px-4 py-2 rounded"
        }, "Add Exercise")
      );
    })
  );
}

ReactDOM.render(React.createElement(WorkoutTracker), document.getElementById('root'));
