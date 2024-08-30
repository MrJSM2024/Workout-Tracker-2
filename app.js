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
    const newCompletedWorkouts = {
      ...completedWorkouts,
      [day.date]: {
        ...(completedWorkouts[day.date] || {}),
        [day.day]: {
          ...(completedWorkouts[day.date] && completedWorkouts[day.date][day.day] || {}),
          [exercise.id]: {
            ...(completedWorkouts[day.date] && completedWorkouts[day.date][day.day] && completedWorkouts[day.date][day.day][exercise.id] || {}),
            completed
          }
        }
      }
    };
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem('workoutData', JSON.stringify(newCompletedWorkouts));

    if (completed) {
      const newLog = [
        ...exerciseLog,
        {
          date: day.date,
          day: day.day,
          exercise: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          notes: exercise.notes,
          order: day.exercises.findIndex(e => e.id === exercise.id) + 1
        }
      ];
      setExerciseLog(newLog);
      localStorage.setItem('exerciseLog', JSON.stringify(newLog));
    }
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
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].date = newDate;
    setWorkoutData(newWorkoutData);
  };

  const updateDayTitle = (dayIndex, newTitle) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[dayIndex].day = newTitle;
    setWorkoutData(newWorkoutData);
  };

  const copyToClipboard = () => {
    const data = JSON.stringify({ completedWorkouts, exerciseLog }, null, 2);
    navigator.clipboard.writeText(data).then(() => {
      alert("Workout data copied to clipboard!");
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>{trackerTitle}</h1>
      <input
        type="text"
        value={trackerTitle}
        onChange={(e) => setTrackerTitle(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <button onClick={copyToClipboard} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Copy Workout Data
      </button>
      {recentlyDeleted.length > 0 && (
        <button onClick={undoDelete} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
          Undo Delete
        </button>
      )}
      {workoutData.map((day, dayIndex) => (
        <div key={day.day} style={{ marginBottom: '30px' }}>
          <input
            type="text"
            value={day.day}
            onChange={(e) => updateDayTitle(dayIndex, e.target.value)}
            style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="date"
            value={day.date}
            onChange={(e) => updateDate(dayIndex, e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Exercise</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>S</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>R</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Weight</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Done</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Notes</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Order</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Del</th>
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((exercise, exerciseIndex) => (
                <tr key={exercise.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'name', e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'sets', e.target.value)}
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'reps', e.target.value)}
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type="text"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, 'weight', e.target.value)}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type="
