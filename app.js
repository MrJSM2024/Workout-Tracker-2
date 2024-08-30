const initialWorkoutData = [
  {
    day: "Day 1: Upper Body",
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { id: 1, name: "Push-ups (on Knees or Incline)", sets: 2, reps: 8, weight: "Body weight", notes: "" },
      { id: 2, name: "Bent over Dumbbell Rows", sets: 3, reps: 10, weight: "8lb dumbbells", notes: "" },
      { id: 3, name: "Hammer Curls", sets: 3, reps: 10, weight: "8lb dumbbells", notes: "" },
      { id: 4, name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight", notes: "" },
      { id: 5, name: "Seated Band Rows", sets: 3, reps: 10, weight: "Green band w/handles 10/25lb feet", notes: "" },
      { id: 6, name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold", notes: "" },
      { id: 7, name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold", notes: "" }
    ]
  },
  // ... (keep the rest of your initialWorkoutData as is, just add the notes field to each exercise)
];

const WorkoutTracker = () => {
  const [workoutData, setWorkoutData] = React.useState(initialWorkoutData);
  const [completedWorkouts, setCompletedWorkouts] = React.useState({});
  const [trackerTitle, setTrackerTitle] = React.useState("Comprehensive Flexible Workout Tracker");
  const [exerciseLog, setExerciseLog] = React.useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = React.useState([]);

  React.useEffect(() => {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
      setCompletedWorkouts(JSON.parse(savedData));
    }
    const savedLog = localStorage.getItem('exerciseLog');
    if (savedLog) {
      setExerciseLog(JSON.parse(savedLog));
    }
  }, []);

  const saveWorkout = (day, exercise, completed) => {
    const newCompletedWorkouts = Object.assign({}, completedWorkouts);
    if (!newCompletedWorkouts[day.date]) {
      newCompletedWorkouts[day.date] = {};
    }
    if (!newCompletedWorkouts[day.date][day.day]) {
      newCompletedWorkouts[day.date][day.day] = {};
    }
    if (!newCompletedWorkouts[day.date][day.day][exercise.id]) {
      newCompletedWorkouts[day.date][day.day][exercise.id] = {};
    }
    newCompletedWorkouts[day.date][day.day][exercise.id].completed = completed;
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));

    if (completed) {
      const newLog = exerciseLog.concat([{
        date: day.date,
        day: day.day,
        exercise: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        notes: exercise.notes,
        order: day.exercises.findIndex(function(e) { return e.id === exercise.id; }) + 1
      }]);
      setExerciseLog(newLog);
      localStorage.setItem('exerciseLog', JSON.stringify(newLog));
    }
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    const newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
  };

  const moveExercise = (dayIndex, currentIndex, direction) => {
    const newWorkoutData = workoutData.slice();
    const exercises = newWorkoutData[dayIndex].exercises;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < exercises.length) {
      const temp = exercises[currentIndex];
      exercises[currentIndex] = exercises[newIndex];
      exercises[newIndex] = temp;
      setWorkoutData(newWorkoutData);
    }
  };

  const addExercise = (dayIndex) => {
    const newWorkoutData = workoutData.slice();
    const newId = Math.max.apply(null, newWorkoutData[dayIndex].exercises.map(function(e) { return e.id; }).concat([0])) + 1;
    newWorkoutData[dayIndex].exercises.push({ id: newId, name: "New Exercise", sets: 3, reps: 10, weight: "Body weight", notes: "" });
    setWorkoutData(newWorkoutData);
  };

  const deleteExercise = (dayIndex, exerciseId) => {
    const newWorkoutData = workoutData.slice();
    const deletedExercise = newWorkoutData[dayIndex].exercises.find(function(e) { return e.id === exerciseId; });
    setRecentlyDeleted(recentlyDeleted.concat([{ dayIndex: dayIndex, exercise: deletedExercise }]));
    newWorkoutData[dayIndex].exercises = newWorkoutData[dayIndex].exercises.filter(function(e) { return e.id !== exerciseId; });
    setWorkoutData(newWorkoutData);
  };

  const undoDelete = () => {
    if (recentlyDeleted.length > 0) {
      const lastDeleted = recentlyDeleted[recentlyDeleted.length - 1];
      const newWorkoutData = workoutData.slice();
      newWorkoutData[lastDeleted.dayIndex].exercises.push(lastDeleted.exercise);
      setWorkoutData(newWorkoutData);
      setRecentlyDeleted(recentlyDeleted.slice(0, -1));
    }
  };

  const updateDate = (dayIndex, newDate) => {
    const newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].date = newDate;
    setWorkoutData(newWorkoutData);
  };

  const updateDayTitle = (dayIndex, newTitle) => {
    const newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].day = newTitle;
    setWorkoutData(newWorkoutData);
  };

  const copyToClipboard = () => {
    const data = JSON.stringify({ completedWorkouts: completedWorkouts, exerciseLog: exerciseLog }, null, 2);
    navigator.clipboard.writeText(data).then(function() {
      alert("Workout data copied to clipboard!");
    });
  };

  return React.createElement('div', { className: "p-4" },
    React.createElement('h1', { className: "text-2xl font-bold mb-4" }, trackerTitle),
    React.createElement('input', {
      type: "text",
      value: trackerTitle,
      onChange: function(e) { setTrackerTitle(e.target.value); },
      className: "mb-4 p-2 border rounded"
    }),
    React.createElement('button', {
      onClick: copyToClipboard,
      className: "ml-4 p-2 bg-blue-500 text-white rounded"
    }, "Copy Workout Data"),
    recentlyDeleted.length > 0 && React.createElement('button', {
      onClick: undoDelete,
      className: "ml-4 p-2 bg-yellow-500 text-white rounded"
    }, "Undo Delete"),
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
              React.createElement('th', { className: "border p-2" }, "S"),
              React.createElement('th', { className: "border p-2" }, "R"),
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
                    className: "w-48"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "number",
                    min: "1",
                    max: "100",
                    value: exercise.sets,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value); },
                    className: "w-12"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "number",
                    min: "1",
                    max: "100",
                    value: exercise.reps,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value); },
                    className: "w-12"
                  })
                ),
                React.createElement('td', { className: "border p-2" },
                  React.createElement('input', {
                    type: "text",
                    value: exercise.weight,
                    onChange: function(e) { updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value); },
                    className: "w-24"
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
                    className: "w-32"
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
