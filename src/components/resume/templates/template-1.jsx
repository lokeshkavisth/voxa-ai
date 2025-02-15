import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MoveUpRight } from "lucide-react";
import { forwardRef } from "react";

const TemplateOne = forwardRef(({ resume }, ref) => {
  const {
    name,
    jobRole,
    profileSummary,
    contact,
    socialLinks,
    experience,
    education,
    projects,
    techSkills,
    achievements,
    courses,
    passion,
  } = resume;

  return (
    <div className="max-w-4xl mx-auto  bg-background border border-dashed rounded-lg">
      <div ref={ref} className="p-6">
        {/* Header Section */}
        <div className="text-center ">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-lg">{jobRole}</p>
        </div>
        <Separator className="my-4" />

        {/* Contact & Socials */}
        <div className="flex justify-between text-sm">
          <p>Email: {contact?.email}</p>
          <p>Phone: {contact?.phone}</p>
          <p>Location: {contact?.location}</p>
        </div>
        <div className="mt-2 flex gap-2">
          {socialLinks?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-blue-600/80 hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>
        <Separator className="my-4" />

        {/* Profile Summary */}
        <div className="border-none shadow-none">
          <h2 className="text-xl font-semibold">Profile Summary</h2>
          <p className="text-muted-foreground mt-2">{profileSummary}</p>
        </div>
        <Separator className="my-4" />

        {/* Experience */}
        <h2 className="text-xl font-semibold">Experience</h2>
        {experience?.map((exp, index) => (
          <div key={index} className="border-none shadow-none">
            <div className="p-4">
              <h3 className="font-semibold">
                {exp.jobRole} - {exp.companyName}
              </h3>
              <p className="text-sm text-muted-foreground/90">
                {exp.startDate} - {exp.endDate}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {exp.description?.split("/").map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <Separator className="my-4" />

        {/* Education */}
        <h2 className="text-xl font-semibold">Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="border-none shadow-none">
            <div className="p-4">
              <h3 className="font-semibold">{edu.universityName}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.degreeTitle} • {edu.startYear} - {edu.endYear}
              </p>
            </div>
          </div>
        ))}
        <Separator className="my-4" />

        {/* Projects */}
        <h2 className="text-xl font-semibold">Projects</h2>
        {projects?.map((proj, index) => (
          <div key={index} className="border-none shadow-none">
            <div className="p-4">
              <h3 className="font-semibold">{proj.title}</h3>
              <p className="text-sm text-muted-foreground/90">
                {proj.startDate} - {proj.endDate || "Present"}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {proj.description?.split("/").map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <Separator className="my-4" />

        {/* Skills */}
        <h2 className="text-xl font-semibold">Technical Skills</h2>
        <div className="flex flex-wrap gap-2 p-4">
          {techSkills?.split(",").map((skill, index) => (
            <Badge key={index} variant={"secondary"}>
              {skill}
            </Badge>
          ))}
        </div>
        <Separator className="my-4" />

        {/* Achievements & Courses */}
        <h2 className="text-xl font-semibold">Achievements</h2>
        <div className="p-4">
          <ul className="list-disc list-inside text-muted-foreground">
            {achievements?.map((ach, i) => (
              <li key={i}>
                {ach.title}: {ach.description}
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-4" />

        <h2 className="text-xl font-semibold">Courses</h2>
        <div className="p-4">
          {courses?.map((course, index) => (
            <p
              key={index}
              className="text-muted-foreground flex items-center gap-3"
            >
              • {course.title}
              <a
                href={course.link}
                className="text-blue-600/80 hover:underline"
              >
                <MoveUpRight className="size-4" />
              </a>
            </p>
          ))}
        </div>
        <Separator className="my-4" />

        {/* Passion */}
        {passion && (
          <div className="border-none shadow-none">
            <h2 className="text-xl font-semibold">Passion</h2>
            <p className="text-muted-foreground mt-2">
              {passion.title}: {passion.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

export default TemplateOne;
