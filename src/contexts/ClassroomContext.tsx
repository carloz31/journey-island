import { createContext, useContext, useState, type ReactNode } from 'react';
import { classrooms, allStudents, type Classroom, type Student } from '@/data/counselorMockData';

interface ClassroomContextType {
  currentClassroom: Classroom;
  setCurrentClassroomId: (id: string) => void;
  allClassrooms: Classroom[];
  currentStudents: Student[];
}

const ClassroomContext = createContext<ClassroomContextType | null>(null);

export const ClassroomProvider = ({ children }: { children: ReactNode }) => {
  const [classroomId, setClassroomId] = useState('c1');
  const currentClassroom = classrooms.find(c => c.id === classroomId) || classrooms[0];
  const currentStudents = allStudents.filter(s => s.classroomId === classroomId);

  return (
    <ClassroomContext.Provider value={{
      currentClassroom,
      setCurrentClassroomId: setClassroomId,
      allClassrooms: classrooms,
      currentStudents,
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
