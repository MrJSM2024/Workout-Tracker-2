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
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
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
                      checked={completedWorkouts[currentDate] && 
                               completedWorkouts[currentDate][day.day] && 
                               completedWorkouts[currentDate][day.day][exercise.name] && 
                               completedWorkouts[currentDate][day.day][exercise.name].completed || false}
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

ReactDOM.render(<WorkoutTracker />, document.getElementById('root'));
