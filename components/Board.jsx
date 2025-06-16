// components/Board.jsx
// By default a server component
import TaskColumn from './TaskColumn';

export default function Board({ tasksByStatus }) {
  const columns = [
    { key: 'TODO', title: 'To do' },
    { key: 'IN_PROGRESS', title: 'In progress' },
    { key: 'DONE', title: 'Done' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-full overflow-auto">
      {columns.map((col) => (
        <TaskColumn
          key={col.key}
          statusKey={col.key}
          title={col.title}
          tasks={tasksByStatus[col.key] || []}
        />
      ))}
    </div>
  );
}
