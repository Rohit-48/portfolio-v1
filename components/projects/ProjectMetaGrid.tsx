import type { Project } from "@/types/project";

interface ProjectMetaGridProps {
  status: Project["status"];
  year: number;
  stack: string[];
}

const statusDetailMap: Record<Project["status"], string> = {
  live: "Live in production",
  wip: "Work in progress",
  archived: "Archived",
};

export default function ProjectMetaGrid({
  status,
  year,
  stack,
}: ProjectMetaGridProps) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div>
        <p className="mb-2 font-mono text-[10px] text-ghost tracking-label uppercase">
          STATUS
        </p>
        <p className="font-mono text-[14px] font-medium text-primary leading-[1.4]">
          {statusDetailMap[status]}
        </p>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] text-ghost tracking-label uppercase">
          YEAR
        </p>
        <p className="font-mono text-[14px] font-medium text-primary leading-[1.4]">
          {year}
        </p>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] text-ghost tracking-label uppercase">
          BUILT WITH
        </p>
        <ul className="space-y-1">
          {stack.map((item) => (
            <li
              key={item}
              className="font-mono text-[13px] font-medium text-primary leading-[1.4]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
