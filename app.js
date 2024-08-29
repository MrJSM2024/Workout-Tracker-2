const initialWorkoutData = [
  {
    day: "Day 1: Upper Body",
    exercises: [
      { name: "Push-ups (on Knees or Incline)", sets: 2, reps: 8, weight: "Body weight" },
      { name: "Bent over Dumbbell Rows", sets: 3, reps: 10, weight: "8lb dumbbells" },
      { name: "Hammer Curls", sets: 3, reps: 10, weight: "8lb dumbbells" },
      { name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight" },
      { name: "Seated Band Rows", sets: 3, reps: 10, weight: "Green band w/handles 10/25lb feet" },
      { name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold" },
      { name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold" }
    ]
  },
  { day: "Day 2: Rest", exercises: [] },
  {
    day: "Day 3: Lower Body",
    exercises: [
      { name: "Squats chair height", sets: 3, reps: 8, weight: "Body weight" },
      { name: "Bulgarian Split Squat", sets: 2, reps: 8, weight: "Body weight" },
      { name: "Romanian Deadlifts", sets: 3, reps: 10, weight: "8lb dumbbells" },
      { name: "Calf Raises", sets: 3, reps: 8, weight: "Body weight" },
      { name: "Shoulders External Rotation", sets: 3, reps: 8, weight: "Red Band" },
      { name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight" },
      { name: "Planks", sets: 3, reps: 1, weight: "15 sec" },
      { name: "Seated Band Rows", sets: 3, reps: 10, weight: "Red double band w/handles 15/35lb feet" },
      { name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold" },
      { name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold" }
    ]
  },
  { day: "Day 4: Rest", exercises: [] },
  {
    day: "Day 5: Upper Body",
    exercises: [
      { name: "Pull-ups (modified as needed)", sets: 3, reps: 8, weight: "Body weight" },
      { name: "Skull Crushers (Lying)", sets: 3, reps: 10, weight: "8lb dumbbells" },
      { name: "Hammer Curls", sets: 3, reps: 10, weight: "8lb dumbbells" },
      { name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight" },
      { name: "Seated Band Rows", sets: 3, reps: 10, weight: "Light band" },
      { name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold" },
      { name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold" }
    ]
  },
  { day: "Day 6: Rest", exercises: [] },
  { day: "Day 7: Rest", exercises: [] }
];

const WorkoutTracker = () => {
  const [workoutData, setWorkoutData] = React.useState(initialWorkoutData);
  const [currentDate, setCurrentDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [completedWorkouts, setCompletedWorkouts] = React.useState({});

  React.useEffect(() => {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
      setCompletedWorkouts(JSON.parse(savedData));
    }
  }, []);

  const saveWorkout = (day, exerciseName, field, value) => {
    const newCompletedWorkouts = Object.assign({}, completedWorkouts);
    if (!newCompletedWorkouts[currentDate]) {
      newCompletedWorkouts[currentDate] = {};
    }
    if (!newCompletedWorkouts[currentDate][day]) {
      newCompletedWorkouts[currentDate][day] = {};
    }
    if (!newCompletedWorkouts[currentDate][day][exerciseName]) {
      newCompletedWorkouts[currentDate][day][exerciseName] = {};
    }
    newCompletedWorkouts[currentDate][day][exerciseName][field] = value;
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    const newWorkoutData = workoutData.slice();
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
  };

  const isExerciseCompleted = (day, exerciseName) => {
    return completedWorkouts[currentDate] &&
           completedWorkouts[currentDate][day] &&
           completedWorkouts[currentDate][day][exerciseName] &&
           completedWorkouts[currentDate][day][exerciseName].completed;
  };

  return React.createElement('div', { style: { padding: '20px' } },
    React.createElement('h1', { style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' } }, 'Weekly Workout Tracker'),
    React.createElement('div', { style: { marginBottom: '20px' } },
      React.createElement('input', {
        type: 'date',
        value: currentDate,
        onChange: (e) => setCurrentDate(e.target.value),
        style: { marginRight: '10px' }
      })
    ),
    workoutData.map((day, dayIndex) => 
      React.createElement('div', { key: day.day, style: { marginBottom: '30px' } },
        React.createElement('h2', { style: { fontSize: '20px', fontWeight: 'semibold', marginBottom: '10px' } }, day.day),
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { style: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' } }, 'Exercise'),
              React.createElement('th', { style: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' } }, 'Sets'),
              React.createElement('th', { style: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' } }, 'Reps'),
              React.createElement('th', { style: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' } }, 'Weight'),
              React.createElement('th', { style: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' } }, 'Completed')
            )
          ),
          React.createElement('tbody', null,
            day.exercises.map((exercise, exerciseIndex) => 
              React.createElement('tr', { key: exercise.name },
                React.createElement('td', { style: { padding: '8px', borderBottom: '1px solid #ddd' } }, exercise.name),
                React.createElement('td', { style: { padding: '8px', borderBottom: '1px solid #ddd' } },
                  React.createElement('input', {
                    type: 'number',
                    value: exercise.sets,
                    onChange: (e) => updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value),
                    style: { width: '40px' }
                  })
                ),
                React.createElement('td', { style: { padding: '8px', borderBottom: '1px solid #ddd' } },
                  React.createElement('input', {
                    type: 'number',
                    value: exercise.reps,
                    onChange: (e) => updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value),
                    style: { width: '40px' }
                  })
                ),
                React.createElement('td', { style: { padding: '8px', borderBottom: '1px solid #ddd' } },
                  React.createElement('input', {
                    type: 'text',
                    value: exercise.weight,
                    onChange: (e) => updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value),
                    style: { width: '100px' }
                  })
                ),
                React.createElement('td', { style: { padding: '8px', borderBottom: '1px solid #ddd' } },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: isExerciseCompleted(day.day, exercise.name),
                    onChange: (e) => saveWorkout(day.day, exercise.name, 'completed', e.target.checked)
                  })
                )
              )
            )
          )
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(WorkoutTracker), document.getElementById('root'));
