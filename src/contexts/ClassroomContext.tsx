import { createContext, useContext, useState, type ReactNode } from 'react';
import { classrooms, allStudents, type Classroom, type Student } from '@/data/counselorMockData';

interface ClassroomContextType {
  /** Currently focused classroom (always a real one). Used by views that require a single classroom context. */
  currentClassroom: Classroom;
  setCurrentClassroomId: (id: string) => void;
  allClassrooms: Classroom[];
  /** Students in the currently focused classroom only. */
  currentStudents: Student[];
  /** Students across every classroom. */
  allStudents: Student[];
}

const ClassroomContext = createContext<ClassroomContextType | null>(null);

export const ClassroomProvider = ({ children }: { children: ReactNode }) => {
  const [classroomId, setClassroomId] = useState('c1');
  const currentClassroom = classrooms.find(c => c.id === classroomId) || classrooms[0];
  const currentStudents = allStudents.filter(s => s.classroomId === currentClassroom.id);

  return (
    <ClassroomContext.Provider value={{
      currentClassroom,
      setCurrentClassroomId: setClassroomId,
      allClassrooms: classrooms,
      currentStudents,
      allStudents,
    }}>
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => {
  const ctx = useContext(ClassroomContext);
  if (!ctx) throw new Error('useClassroom must be used within ClassroomProvider');
  return ctx;
};
