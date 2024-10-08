var initialWorkoutData = [
  // ... (keep the initialWorkoutData as is)
];

var WorkoutTracker = function() {
  var [workoutData, setWorkoutData] = React.useState(initialWorkoutData);
  var [completedWorkouts, setCompletedWorkouts] = React.useState({});
  var [trackerTitle, setTrackerTitle] = React.useState("Comprehensive Flexible Workout Tracker");

  React.useEffect(function() {
    var savedData = localStorage.getItem('workoutData');
    if (savedData) {
      setCompletedWorkouts(JSON.parse(savedData));
    }
  }, []);

  var saveWorkout = function(day, exercise, completed) {
    var newCompletedWorkouts = Object.assign({}, completedWorkouts);
    if (!newCompletedWorkouts[day.date]) newCompletedWorkouts[day.date] = {};
    if (!newCompletedWorkouts[day.date][day.day]) newCompletedWorkouts[day.date][day.day] = {};
    if (!newCompletedWorkouts[day.date][day.day][exercise.id]) newCompletedWorkouts[day.date][day.day][exercise.id] = {};
    newCompletedWorkouts[day.date][day.day][exercise.id].completed = completed;
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));
  };

  var updateExercise = function(dayIndex, exerciseIndex, field, value) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
  };

  var moveExercise = function(dayIndex, currentIndex, direction) {
    var newWorkoutData = workoutData.slice();
    var exercises = newWorkoutData[dayIndex].exercises;
    var newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < exercises.length) {
      var temp = exercises[currentIndex];
      exercises[currentIndex] = exercises[newIndex];
      exercises[newIndex] = temp;
      setWorkoutData(newWorkoutData);
    }
  };

  var addExercise = function(dayIndex) {
    var newWorkoutData = workoutData.slice();
    var newId = Math.max.apply(null, newWorkoutData[dayIndex].exercises.map(function(e) { return e.id; }).concat([0])) + 1;
    newWorkoutData[dayIndex].exercises.push({ id: newId, name: "New Exercise", sets: 3, reps: 10, weight: "Body weight", notes: "" });
    setWorkoutData(newWorkoutData);
  };

  var deleteExercise = function(dayIndex, exerciseId) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises = newWorkoutData[dayIndex].exercises.filter(function(e) { return e.id !== exerciseId; });
    setWorkoutData(newWorkoutData);
  };

  var updateDate = function(dayIndex, newDate) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].date = newDate;
    setWorkoutData(newWorkoutData);
  };

  var updateDayTitle = function(dayIndex, newTitle) {
    var newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].day = newTitle;
    setWorkoutData(newWorkoutData);
  };

  return React.createElement('div', { className: "p-4" },
    React.createElement('h1', { className: "text-2xl font-bold mb-4" }, trackerTitle),
    React.createElement('input', {
      type: "text",
      value: trackerTitle,
      onChange: function(e) { setTrackerTitle(e.target.value); },
      className: "mb-4 p-2 border rounded"
    }),
    workoutData.map(function(day, dayIndex) {
      return React.createElement('div', { key: day.day, className: "mb-8" },
        React.createElement('input', {
          type: "text",
          value: day.day,
          onChange: function(e) { updateDayTitle(dayIndex, e.target.value); },
          className: "text-xl font-semibold mb-2 p-2 border rounded"
        }),
        React.createElement('input', {
          type: "date",
          value: day.date,
          onChange: function(e) { updateDate(dayIndex, e.target.value); },
          className: "ml-4 p-2 border rounded"
        }),
        React.createElement('table', { className: "w-full border-collapse border" },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { className: "border p-2" }, "Exercise"),
              React.createElement('th', { className: "border p-2" }, "Sets"),
              React.createElement('th', { className: "border p-2" }, "Reps"),
              React.createElement('th', { className: "border p-2" }, "Weight"),
              React.createElement('th', { className: "border p-2" }, "Done"),
              React.createElement('th', { className: "border p-2" }, "Notes"),
              React.createElement('th', { className: "border p-2" }, "Order"),
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
                    className: "w-full",
                    min: "1",
                    step: "1"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "number",
                    value: exercise.reps,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value); },
                    className: "w-full",
                    min: "1",
                    step: "1"
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
                    className: "w-full",
                    placeholder: "Add notes..."
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('button', { onClick: function() { moveExercise(dayIndex, exerciseIndex, 'up'); } }, "↑"),
                  React.createElement('button', { onClick: function() { moveExercise(dayIndex, exerciseIndex, 'down'); } }, "↓")
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('button', { onClick: function() { deleteExercise(dayIndex, exercise.id); } }, "Del")
                )
              );
            })
          )
        ),
        React.createElement('button', {
          onClick: function() { addExercise(dayIndex); },
          className: "mt-2 p-2 bg-green-500 text-white rounded"
        }, "Add Exercise")
      );
    })
  );
};

ReactDOM.render(React.createElement(WorkoutTracker), document.getElementById('root'));
