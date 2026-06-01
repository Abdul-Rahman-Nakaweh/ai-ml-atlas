import type { Concept } from "@/types/concept";
import { foundationLessons } from "./foundations";
import { metricLessons } from "./metrics";
import { preprocessingLessons } from "./preprocessing";
import { algorithmLessons } from "./algorithms";
import { validationLessons } from "./validation";
import { deepLearningLessons } from "./deeplearning";
import { modernAILessons } from "./modern";
import { deploymentLessons } from "./deployment";
import { miscLessons } from "./misc";

const lessonSources = [
  foundationLessons,
  metricLessons,
  preprocessingLessons,
  algorithmLessons,
  validationLessons,
  deepLearningLessons,
  modernAILessons,
  deploymentLessons,
  miscLessons,
];

/** Merged mini-lesson content keyed by concept id */
export const lessonEnrichment: Partial<Record<string, Partial<Concept>>> = Object.assign(
  {},
  ...lessonSources
);

export function applyLessonEnrichment(concept: Concept): Concept {
  const patch = lessonEnrichment[concept.id];
  if (!patch) return concept;
  return {
    ...concept,
    ...patch,
    learnBefore: patch.learnBefore?.length ? patch.learnBefore : concept.learnBefore,
    learnAfter: patch.learnAfter?.length ? patch.learnAfter : concept.learnAfter,
    relatedConcepts: patch.relatedConcepts?.length
      ? patch.relatedConcepts
      : concept.relatedConcepts,
    equation: patch.equation ?? concept.equation,
  };
}
