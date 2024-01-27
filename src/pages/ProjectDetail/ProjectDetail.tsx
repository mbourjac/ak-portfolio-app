import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ProjectGallery } from '../../components/ProjectGallery';
import { ProjectInfo } from '../../components/ProjectInfo';
import { ProjectNav } from '../../components/ProjectNav';
import { Seo } from '../../components/Seo';
import { useHomeQuery } from '../../content/home/home.queries';
import type { Home } from '../../content/home/home.types';
import { useProjectQuery } from '../../content/project/project.queries';
import type { Project } from '../../content/project/project.types';

export const ProjectDetail = () => {
  const initialData = useLoaderData() as {
    projectDetail: Project;
    home: Home;
  };
  const { title, date, description, images, seo, videoUrl, slug } =
    useProjectQuery(initialData.projectDetail);
  const { projectCovers } = useHomeQuery(initialData.home);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleToggleInfo = () => setIsInfoOpen((prevIsOpen) => !prevIsOpen);

  const projectIndex = useMemo(
    () => projectCovers.findIndex((projectCover) => projectCover.slug === slug),
    [projectCovers, slug],
  );
  const nextProjectIndex =
    projectIndex === 0 ? projectCovers.length - 1 : projectIndex - 1;
  const nextProjectSlug = projectCovers[nextProjectIndex]!.slug;

  return (
    <>
      <Seo pageSeo={seo} />
      <section className="relative">
        <ProjectInfo
          title={title}
          description={description}
          date={date}
          isOpen={isInfoOpen}
          handleToggleInfo={handleToggleInfo}
        />
        <ProjectNav isInfoOpen={isInfoOpen} nextProjectSlug={nextProjectSlug} />
        <ProjectGallery images={images} videoUrl={videoUrl} />
      </section>
    </>
  );
};
