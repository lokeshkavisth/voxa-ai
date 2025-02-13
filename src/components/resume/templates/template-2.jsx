import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ResumeTemplate = ({ resume }) => {
  return (
    <div className="max-w-4xl mx-auto bg-background border border-dashed rounded-lg">
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (Personal Details) */}

        <div className="col-span-1 space-y-6 py-6 pl-6 rounded-lg bg-primary-foreground">
          {/* Header */}
          <div className="text-center p-4">
            <h1 className="text-3xl font-bold">{resume.name}</h1>
            <p className="text-lg text-gray-600">{resume.jobRole}</p>
          </div>

          {/* Contact */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <Separator />
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" /> {resume.contact.email}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" /> {resume.contact.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" /> {resume.contact.location}
              </p>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <Separator />
              {resume.socialLinks.map((link, index) => (
                <p
                  key={index}
                  className="flex items-center gap-2 text-blue-500"
                >
                  <Globe className="w-4 h-4" />
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Separator />
              <div className="flex flex-wrap gap-2 mt-2">
                {resume.techSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Experience, Education, Projects) */}
        <div className="col-span-2 space-y-6 py-6 pr-6">
          {/* Experience */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Experience</h2>
              <Separator />
              {resume.experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{exp.companyName}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.jobRole} • {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="list-disc list-inside mt-1 text-gray-700">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <Separator />
              {resume.education.map((edu, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">
                    {edu.universityName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {edu.degreeTitle} • {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="border-none shadow-none">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Separator />
              {resume.projects.map((project, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.companyName && (
                    <p className="text-sm text-gray-600">
                      {project.companyName}
                    </p>
                  )}
                  <ul className="list-disc list-inside mt-1 text-gray-700">
                    {project.description.map((desc, i) => (
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
};

export default ResumeTemplate;
