import React, { useState, useEffect } from 'react';

// ... keep your initialWorkoutData as is, but add a notes field to each exercise ...

const WorkoutTracker = () => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [trackerTitle, setTrackerTitle] = useState("Comprehensive Flexible Workout Tracker");
  const [exerciseLog, setExerciseLog] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  useEffect(() => {
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
    // ... keep this function as is ...
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    // ... keep this function as is ...
  };

  const moveExercise = (dayIndex, currentIndex, direction) => {
    // ... keep this function as is ...
  };

  const addExercise = (dayIndex) => {
    const newWorkoutData = [...workoutData];
    const newId = Math.max(...newWorkoutData[dayIndex].exercises.map(e => e.id), 0) + 1;
    newWorkoutData[dayIndex].exercises.push({ id: newId, name: "New Exercise", sets: 3, reps: 10, weight: "Body weight", notes: "" });
    setWorkoutData(newWorkoutData);
  };

  const deleteExercise = (dayIndex, exerciseId) => {
    const newWorkoutData = [...workoutData];
    const deletedExercise = newWorkoutData[dayIndex].exercises.find(e => e.id === exerciseId);
    setRecentlyDeleted([...recentlyDeleted, { dayIndex, exercise: deletedExercise }]);
    newWorkoutData[dayIndex].exercises = newWorkoutData[dayIndex].exercises.filter(e => e.id !== exerciseId);
    setWorkoutData(newWorkoutData);
  };

  const undoDelete = () => {
    if (recentlyDeleted.length > 0) {
      const { dayIndex, exercise } = recentlyDeleted[recentlyDeleted.length - 1];
      const newWorkoutData = [...workoutData];
      newWorkoutData[dayIndex].exercises.push(exercise);
      setWorkoutData(newWorkoutData);
      setRecentlyDeleted(recentlyDeleted.slice(0, -1));
    }
  };

  const updateDate = (dayIndex, newDate) => {
    // ... keep this function as is ...
  };

  const updateDayTitle = (dayIndex, newTitle) => {
    // ... keep this function as is ...
  };

  const copyToClipboard = () => {
    const data = JSON.stringify({ completedWorkouts, exerciseLog }, null, 2);
    navigator.clipboard.writeText(data).then(() => {
      alert("Workout data copied to clipboard!");
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{trackerTitle}</h1>
      <input
        type="text"
        value={trackerTitle}
        onChange={(e) => setTrackerTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={copyToClipboard} className="ml-4 p-2 bg-blue-500 text-white rounded">
        Copy Workout Data
      </button>
      {recentlyDeleted.length > 0 && (
        <button onClick={undoDelete} className="ml-4 p-2 bg-yellow-500 text-white rounded">
          Undo Delete
        </button>
      )}
      {workoutData.map((day, dayIndex) => (
        <div key={day.day} className="mb-8">
          <input
            type="text"
            value={day.day}
            onChange={(e) => updateDayTitle(dayIndex, e.target.value)}
            className="text-xl font-semibold mb-2 p-2 border rounded"
          />
          <input
            type="date"
            value={day.date}
            onChange={(e) => updateDate(dayIndex, e.target.value)}
            className="ml-4 p-2 border rounded"
          />
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Exercise</th>
                <th className="border p-2">S</th>
                <th className="border p-2">R</th>
                <th className="border p-2">Weight</th>
                <th className="border p-2">Done</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2">Order</th>
                <th className="border p-2">Del</th>
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((exercise, exerciseIndex) => (
                <tr key={exercise.id}>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'name', e.target.value)}
                      className="w-48"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value)}
                      className="w-12"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value)}
                      className="w-12"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value)}
                      className="w-24"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={completedWorkouts[day.date]?.[day.day]?.[exercise.id]?.completed || false}
                      onChange={(e) => saveWorkout(day, exercise, e.target.checked)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={exercise.notes || ''}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'notes', e.target.value)}
                      className="w-32"
                    />
                  </td>
                  <td className="border p-2">
                    <button onClick={() => moveExercise(dayIndex, exerciseIndex, 'up')}>↑</button>
                    <button onClick={() => moveExercise(dayIndex, exerciseIndex, 'down')}>↓</button>
                  </td>
                  <td className="border p-2">
                    <button onClick={() => deleteExercise(dayIndex, exercise.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => addExercise(dayIndex)} className="mt-2 p-2 bg-green-500 text-white rounded">
            Add Exercise
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutTracker;
