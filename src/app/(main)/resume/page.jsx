"use client";

import { ResumeForm } from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import resumeSchema from "@/lib/schemas/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("form");

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      jobRole: "",
      profileSummary: "",
      contact: { email: "", phone: "", location: "" },
      socialLinks: [
        {
          title: "",
          url: "",
        },
      ],
      experience: [
        {
          companyName: "",
          jobRole: "",
          startDate: "",
          endDate: "",
          location: "",
          description: [],
        },
      ],
      education: [
        {
          universityName: "",
          degreeTitle: "",
          startYear: "",
          endYear: "",
          cgpa: "",
          location: "",
        },
      ],
      projects: [
        {
          title: "",
          companyName: "",
          jobRole: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      techSkills: [],
      achievements: [
        {
          title: "",
          description: "",
        },
      ],
      courses: [
        {
          title: "",
          description: "",
          link: "",
        },
      ],
      passion: { title: "", description: "" },
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (data) => {
    // Mock function to save resume to database
    console.log("form-data: ", "\n", data);
    toast({
      title: "Resume saved",
      description: "Your resume has been successfully saved to the database.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex justify-end space-x-4">
            <Button onClick={handleSubmit(onSubmit)}>Save Resume</Button>
          </div>
        </div>

        <TabsContent value="form">
          <ResumeForm form={form} />
        </TabsContent>
        <TabsContent value="preview">
          <ResumePreview data={form.getValues()} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
