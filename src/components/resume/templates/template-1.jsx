import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoveUpRight } from "lucide-react";

const TemplateOne = ({ resumeData }) => {
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
  } = resumeData;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-dashed rounded-lg">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-lg text-gray-600">{jobRole}</p>
      </div>
      <Separator className="my-4" />

      {/* Contact & Socials */}
      <div className="flex justify-between text-sm text-gray-600">
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Location: {contact.location}</p>
      </div>
      <div className="mt-2 flex gap-2">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-blue-600 hover:underline"
          >
            {link.title}
          </a>
        ))}
      </div>
      <Separator className="my-4" />

      {/* Profile Summary */}
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Profile Summary</h2>
          <p className="text-gray-700 mt-2">{profileSummary}</p>
        </CardContent>
      </Card>
      <Separator className="my-4" />

      {/* Experience */}
      <h2 className="text-xl font-semibold">Experience</h2>
      {experience.map((exp, index) => (
        <Card key={index} className="border-none shadow-none">
          <CardContent className="p-4">
            <h3 className="font-semibold">
              {exp.jobRole} - {exp.companyName}
            </h3>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.endDate}
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      <Separator className="my-4" />

      {/* Education */}
      <h2 className="text-xl font-semibold">Education</h2>
      {education.map((edu, index) => (
        <Card key={index} className="border-none shadow-none">
          <CardContent className="p-4">
            <h3 className="font-semibold">{edu.universityName}</h3>
            <p className="text-sm text-gray-500">
              {edu.degreeTitle} • {edu.startYear} - {edu.endYear}
            </p>
          </CardContent>
        </Card>
      ))}
      <Separator className="my-4" />

      {/* Projects */}
      <h2 className="text-xl font-semibold">Projects</h2>
      {projects.map((proj, index) => (
        <Card key={index} className="border-none shadow-none">
          <CardContent className="p-4">
            <h3 className="font-semibold">{proj.title}</h3>
            <p className="text-sm text-gray-500">
              {proj.startDate} - {proj.endDate || "Present"}
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {proj.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      <Separator className="my-4" />

      {/* Skills */}
      <h2 className="text-xl font-semibold">Technical Skills</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {techSkills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
      <Separator className="my-4" />

      {/* Achievements & Courses */}
      <h2 className="text-xl font-semibold">Achievements</h2>
      {achievements.map((ach, index) => (
        <p key={index} className="text-gray-700">
          • {ach.title}: {ach.description}
        </p>
      ))}
      <Separator className="my-4" />
      <h2 className="text-xl font-semibold">Courses</h2>
      {courses.map((course, index) => (
        <p key={index} className="text-gray-700 flex items-center gap-3">
          • {course.title}
          <a href={course.link} className="text-blue-600 hover:underline">
            <MoveUpRight className="size-4" />
          </a>
        </p>
      ))}
      <Separator className="my-4" />

      {/* Passion */}
      {passion && (
        <Card className="border-none shadow-none">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">Passion</h2>
            <p className="text-gray-700 mt-2">
              {passion.title}: {passion.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplateOne;
