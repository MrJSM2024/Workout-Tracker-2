import React, { useState, useEffect } from 'react';

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
  { day: "Day 2: Rest", date: new Date().toISOString().split('T')[0], exercises: [] },
  {
    day: "Day 3: Lower Body",
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { id: 1, name: "Squats chair height", sets: 3, reps: 8, weight: "Body weight", notes: "" },
      { id: 2, name: "Bulgarian Split Squat", sets: 2, reps: 8, weight: "Body weight", notes: "" },
      { id: 3, name: "Romanian Deadlifts", sets: 3, reps: 10, weight: "8lb dumbbells", notes: "" },
      { id: 4, name: "Calf Raises", sets: 3, reps: 8, weight: "Body weight", notes: "" },
      { id: 5, name: "Shoulders External Rotation", sets: 3, reps: 8, weight: "Red Band", notes: "" },
      { id: 6, name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight", notes: "" },
      { id: 7, name: "Planks", sets: 3, reps: 1, weight: "15 sec", notes: "" },
      { id: 8, name: "Seated Band Rows", sets: 3, reps: 10, weight: "Red double band w/handles 15/35lb feet", notes: "" },
      { id: 9, name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold", notes: "" },
      { id: 10, name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold", notes: "" }
    ]
  },
  { day: "Day 4: Rest", date: new Date().toISOString().split('T')[0], exercises: [] },
  {
    day: "Day 5: Upper Body",
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { id: 1, name: "Pull-ups (modified as needed)", sets: 3, reps: 8, weight: "Body weight", notes: "" },
      { id: 2, name: "Skull Crushers (Lying)", sets: 3, reps: 10, weight: "8lb dumbbells", notes: "" },
      { id: 3, name: "Hammer Curls", sets: 3, reps: 10, weight: "8lb dumbbells", notes: "" },
      { id: 4, name: "Prone Y, W, T Raises", sets: 2, reps: 15, weight: "No weight", notes: "" },
      { id: 5, name: "Seated Band Rows", sets: 3, reps: 10, weight: "Light band", notes: "" },
      { id: 6, name: "Flex Craneo Cervical (Chin Tuck)", sets: 3, reps: 6, weight: "20% flex, 6 sec hold", notes: "" },
      { id: 7, name: "Rot Cervical con mano (both sides)", sets: 3, reps: 6, weight: "20% strength, 6 sec hold", notes: "" }
    ]
  },
  { day: "Day 6: Rest", date: new Date().toISOString().split('T')[0], exercises: [] },
  { day: "Day 7: Rest", date: new Date().toISOString().split('T')[0], exercises: [] }
];

const WorkoutTracker = () => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [trackerTitle, setTrackerTitle] = useState("Comprehensive Flexible Workout Tracker");

  useEffect(() => {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
      setCompletedWorkouts(JSON.parse(savedData));
    }
  }, []);

  const saveWorkout = (day, exercise, completed) => {
    const newCompletedWorkouts = {
      ...completedWorkouts,
      [day.date]: {
        ...completedWorkouts[day.date],
        [day.day]: {
          ...completedWorkouts[day.date]?.[day.day],
          [exercise.id]: {
            ...completedWorkouts[day.date]?.[day.day]?.[exercise.id],
            completed
          }
        }
      }
    };
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutData(newWorkoutData);
  };

  const moveExercise = (dayIndex, currentIndex, direction) => {
    const newWorkoutData = [...workoutData];
    const exercises = newWorkoutData[dayIndex].exercises;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < exercises.length) {
      [exercises[currentIndex], exercises[newIndex]] = [exercises[newIndex], exercises[currentIndex]];
      setWorkoutData(newWorkoutData);
    }
  };

  const addExercise = (dayIndex) => {
    const newWorkoutData = [...workoutData];
    const newId = Math.max(...newWorkoutData[dayIndex].exercises.map(e => e.id), 0) + 1;
    newWorkoutData[dayIndex].exercises.push({
      id: newId,
      name: "New Exercise",
      sets: 3,
      reps: 10,
      weight: "Body weight",
      notes: ""
    });
    setWorkoutData(newWorkoutData);
  };

  const deleteExercise = (dayIndex, exerciseId) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].exercises = newWorkoutData[dayIndex].exercises.filter(e => e.id !== exerciseId);
    setWorkoutData(newWorkoutData);
  };

  const updateDate = (dayIndex, newDate) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].date = newDate;
    setWorkoutData(newWorkoutData);
  };

  const updateDayTitle = (dayIndex, newTitle) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].day = newTitle;
    setWorkoutData(newWorkoutData);
  };

  return (
    <div className="p-5">
      <input
        type="text"
        value={trackerTitle}
        onChange={(e) => setTrackerTitle(e.target.value)}
        className="text-2xl font-bold mb-5 w-full"
      />
      {workoutData.map((day, dayIndex) => (
        <div key={day.day} className="mb-8">
          <input
            type="text"
            value={day.day}
            onChange={(e) => updateDayTitle(dayIndex, e.target.value)}
            className="text-xl font-semibold mb-2 w-full"
          />
          <input
            type="date"
            value={day.date}
            onChange={(e) => updateDate(dayIndex, e.target.value)}
            className="mb-2"
          />
          {day.exercises.length > 0 && (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Exercise</th>
                  <th className="text-left p-2 border-b w-16">Sets</th>
                  <th className="text-left p-2 border-b w-16">Reps</th>
                  <th className="text-left p-2 border-b">Weight</th>
                  <th className="text-left p-2 border-b w-20">Done</th>
                  <th className="text-left p-2 border-b">Notes</th>
                  <th className="text-left p-2 border-b">Order</th>
                  <th className="text-left p-2 border-b w-12">Del</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((exercise, exerciseIndex) => (
                  <tr key={exercise.id}>
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'name', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value)}
                        className="w-full"
                        min="1"
                        step="1"
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value)}
                        className="w-full"
                        min="1"
                        step="1"
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        value={exercise.weight}
                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="p-2 border-b text-center">
                      <input
                        type="checkbox"
                        checked={completedWorkouts[day.date]?.[day.day]?.[exercise.id]?.completed || false}
                        onChange={(e) => saveWorkout(day, exercise, e.target.checked)}
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        value={exercise.notes || ''}
                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'notes', e.target.value)}
                        className="w-full"
                        placeholder="Add notes..."
                      />
                    </td>
                    <td className="p-2 border-b">
                      <button onClick={() => moveExercise(dayIndex, exerciseIndex, 'up')} className="mr-1">↑</button>
                      <button onClick={() => moveExercise(dayIndex, exerciseIndex, 'down')}>↓</button>
                    </td>
                    <td className="p-2 border-b">
                      <button onClick={() => deleteExercise(dayIndex, exercise.id)}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={() => addExercise(dayIndex)} className="mt-2">Add Exercise</button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutTracker;
