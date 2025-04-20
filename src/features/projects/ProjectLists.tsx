import { Loading } from "../../components/Loading";
import { ProjectCardItem } from "../../components/ProjectCardItem";
import { useProjects } from "../../store/useProjects";


export const ProjectList = () => {
  const { isLoading, data: projects, isError, error, } = useProjects();

  if (isLoading) return <Loading />;
  if(!isLoading && projects && projects?.length <= 0) return <p>No hay projects</p>
  if (isError) return <p>{`${error}`}</p>;

  return (
    <section className="mt-2">
      {projects?.map((project) => (
        <ProjectCardItem key={project.id} project={project} />
      ))}
    </section>
  );
};
