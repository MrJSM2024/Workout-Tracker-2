const initialWorkoutData = [
  // ... (keep your existing workout data)
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

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Weekly Workout Tracker</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>
      {workoutData.map((day, dayIndex) => (
        <div key={day.day} style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '10px' }}>{day.day}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Exercise</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Sets</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Reps</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Weight</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Completed</th>
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((exercise, exerciseIndex) => (
                <tr key={exercise.name}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{exercise.name}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value)}
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value)}
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="text"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value)}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="checkbox"
                      checked={isExerciseCompleted(day.day, exercise.name)}
                      onChange={(e) => saveWorkout(day.day, exercise.name, 'completed', e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(React.createElement(WorkoutTracker), document.getElementById('root'));
};

ReactDOM.render(<WorkoutTracker />, document.getElementById('root'));
