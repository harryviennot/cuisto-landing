import { Timer } from "@phosphor-icons/react/dist/ssr";
import type { Instruction } from "@/types/recipe";

interface Props {
  instructions: Instruction[];
  title: string;
  stepPrefix: string;
}

export default function InstructionsList({ instructions, title, stepPrefix }: Props) {
  if (!instructions || instructions.length === 0) return null;

  // Group instructions by their group field
  const groupedInstructions = instructions.reduce<Record<string, Instruction[]>>(
    (acc, inst) => {
      const group = inst.group || "_default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(inst);
      return acc;
    },
    {}
  );

  const groups = Object.entries(groupedInstructions);
  const hasGroups = groups.length > 1 || (groups.length === 1 && groups[0][0] !== "_default");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-heading">{title}</h2>

      {hasGroups ? (
        // Render grouped instructions
        <div className="space-y-8">
          {groups.map(([group, items]) => (
            <div key={group}>
              {group !== "_default" && (
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
                  {group}
                </h3>
              )}
              <ol className="space-y-6">
                {items.map((inst) => (
                  <InstructionItem
                    key={inst.step_number}
                    instruction={inst}
                    stepPrefix={stepPrefix}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        // Render flat list
        <ol className="space-y-6">
          {instructions.map((inst) => (
            <InstructionItem
              key={inst.step_number}
              instruction={inst}
              stepPrefix={stepPrefix}
            />
          ))}
        </ol>
      )}
    </div>
  );
}

function InstructionItem({
  instruction,
  stepPrefix,
}: {
  instruction: Instruction;
  stepPrefix: string;
}) {
  const { step_number, title, description, timer_minutes } = instruction;

  return (
    <li className="flex gap-4">
      {/* Step number */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
          {step_number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex flex-row justify-between gap-2 mb-1">
          <h4 className="font-medium text-text-heading ">
            {stepPrefix}{step_number}
            {title && title !== `Step ${step_number}` && `: ${title}`}
          </h4>
          {timer_minutes && (
            <div className="inline-flex items-center gap-1.5 px-2 border border-border  text-muted rounded-full text-sm">
              <Timer className="w-4 h-4" weight="fill" />
              <span>{timer_minutes} min</span>
            </div>
          )}
        </div>
        <p className="text-text-body leading-relaxed">{description}</p>

      </div>
    </li>
  );
}
