import type { ActivityStep } from '@/data/activityData';
import ContentStepView from './ContentStepView';
import OpenQuestionStepView from './OpenQuestionStepView';
import MultipleChoiceStepView from './MultipleChoiceStepView';
import LikertStepView from './LikertStepView';
import FileUploadStepView from './FileUploadStepView';
import DragDropStepView from './DragDropStepView';

export interface StepAnswer {
  openText?: string;
  selectedOption?: string | null;
  likertValue?: number | null;
  uploadedFile?: File | null;
  dragOrder?: string[];
  dragMatches?: Record<string, string>;
}

interface Props {
  step: ActivityStep;
  answer: StepAnswer;
  onAnswerChange: (patch: Partial<StepAnswer>) => void;
}

/** Returns true if the step's required input has been fulfilled */
export function isStepComplete(step: ActivityStep, answer: StepAnswer): boolean {
  switch (step.type) {
    case 'rpg':
      return true; // controlled by dialogue "Next"
    case 'content':
      return true;
    case 'open_question':
      return !step.required || (answer.openText?.trim().length ?? 0) > 0;
    case 'multiple_choice':
      if (step.mode === 'validation') {
        const sel = step.options.find(o => o.id === answer.selectedOption);
        return sel?.isCorrect === true;
      }
      return answer.selectedOption != null;
    case 'likert':
      return answer.likertValue != null;
    case 'file_upload':
      return answer.uploadedFile != null;
    case 'drag_drop':
      if (step.mode === 'match' && step.pairs) {
        const matches = answer.dragMatches ?? {};
        const allCorrect = step.pairs.every(p => matches[p.id] === p.match);
        return step.requireAllCorrect ? allCorrect : Object.keys(matches).length === step.pairs.length;
      }
      return true;
    default:
      return true;
  }
}

const StepRenderer = ({ step, answer, onAnswerChange }: Props) => {
  switch (step.type) {
    case 'content':
      return <ContentStepView step={step} />;
    case 'open_question':
      return (
        <OpenQuestionStepView
          step={step}
          value={answer.openText ?? ''}
          onChange={v => onAnswerChange({ openText: v })}
        />
      );
    case 'multiple_choice':
      return (
        <MultipleChoiceStepView
          step={step}
          selected={answer.selectedOption ?? null}
          onSelect={id => onAnswerChange({ selectedOption: id })}
        />
      );
    case 'likert':
      return (
        <LikertStepView
          step={step}
          value={answer.likertValue ?? null}
          onChange={v => onAnswerChange({ likertValue: v })}
        />
      );
    case 'file_upload':
      return (
        <FileUploadStepView
          step={step}
          file={answer.uploadedFile ?? null}
          onFileChange={f => onAnswerChange({ uploadedFile: f })}
        />
      );
    case 'drag_drop':
      return (
        <DragDropStepView
          step={step}
          order={answer.dragOrder ?? step.items.map(i => i.id)}
          onReorder={o => onAnswerChange({ dragOrder: o })}
          matches={answer.dragMatches ?? {}}
          onMatchChange={m => onAnswerChange({ dragMatches: m })}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
