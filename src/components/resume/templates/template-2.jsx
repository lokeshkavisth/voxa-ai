import React, { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Globe, MoveUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ResumeTemplate = forwardRef(({ resume }, ref) => {
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
    <div className="max-w-5xl mx-auto bg-background border border-dashed rounded-lg">
      <div ref={ref} className="grid grid-cols-3 gap-6">
        {/* Left Column (Personal Details) */}

        <div className="col-span-1 space-y-6 p-6 rounded-lg bg-primary-foreground">
          {/* Header */}
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg">{jobRole}</p>
          </div>

          {/* Contact */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4 px-0 space-y-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <Separator />
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4" /> {contact.email}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4" /> {contact.phone}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" /> {contact.location}
              </p>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4 px-0 space-y-2">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <Separator />
              {socialLinks.map((link, index) => (
                <p
                  key={index}
                  className="flex items-center gap-2 text-blue-600/80"
                >
                  <Globe className="size-4" />
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="py-4 px-0">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Separator />
              <div className="flex flex-wrap gap-2 mt-2">
                {techSkills.split(",").map((skill, index) => (
                  <Badge key={index} variant={"outline"}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Courses */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="py-4 px-0">
              <h2 className="text-xl font-semibold">Courses</h2>
              <Separator />
              <div className="flex flex-wrap gap-2 mt-2">
                <ul className="list-disc text-muted-foreground p-4">
                  {courses.map((course, index) => (
                    <li key={index}>
                      <div className="flex items-center gap-2">
                        {course.title}
                        <a
                          href={course.link}
                          className="text-blue-600/80 hover:underline"
                        >
                          <MoveUpRight className="size-4" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Passion */}

          {passion && (
            <Card className="border-none shadow-none bg-transparent">
              <h2 className="text-xl font-semibold">Passion</h2>
              <Separator />
              <p className="text-muted-foreground py-4">
                {passion.title}: {passion.description}
              </p>
            </Card>
          )}
        </div>

        {/* Right Column (Experience, Education, Projects) */}
        <div className="col-span-2 space-y-6 py-6 pr-6">
          {/* Experience */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4 px-0">
              <h2 className="text-xl font-semibold">Experience</h2>
              <Separator />
              {experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{exp.companyName}</h3>
                  <p className="text-sm text-muted-foreground/90">
                    {exp.jobRole} • {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground p-4">
                    {exp.description?.split("/").map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4 px-0">
              <h2 className="text-xl font-semibold">Education</h2>
              <Separator />
              {education.map((edu, index) => (
                <div key={index} className="p-4">
                  <h3 className="text-lg font-semibold">
                    {edu.universityName}
                  </h3>
                  <p className="text-sm text-muted-foreground/90">
                    {edu.degreeTitle} • {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4 px-0">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Separator />
              {projects.map((project, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.companyName && (
                    <p className="text-sm text-muted-foreground/90">
                      {project.companyName}
                    </p>
                  )}
                  <ul className="list-disc list-inside p-4 text-muted-foreground">
                    {project.description?.split("/").map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default ResumeTemplate;
